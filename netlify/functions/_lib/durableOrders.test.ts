import { afterEach, describe, expect, it, vi } from "vitest";
import type Stripe from "stripe";
import { confirmOrder, pendingOrder } from "./durableOrders";

const id = "12345678-1234-4123-8123-123456789abc";
const order = {
  message_text: "A message", sender_name: "Example Sender", sender_email: "sender@example.com",
  recipient_name: "Example Recipient", address_line1: "123 Example St", city: "Fargo",
  state_region: "nd", postal_code: "58102", return_name: "Example Sender",
  return_address_line1: "456 Example St", return_city: "Fargo", return_state: "nd",
  return_postal_code: "58102", country: "US",
};
const session = {
  id: "cs_test_example", mode: "payment", status: "complete", amount_subtotal: 1500,
  amount_total: 1500, currency: "usd", payment_status: "paid", payment_intent: "pi_example",
  client_reference_id: id, metadata: { orderId: id, orderFlow: "durable-v1" },
} as unknown as Stripe.Checkout.Session;

afterEach(() => vi.unstubAllGlobals());

function mockDb(rows: object[][]) {
  vi.stubGlobal("Netlify", { env: { get: (name: string) => name === "SUPABASE_URL" ? "https://example.invalid" : "fake-key" } });
  const mock = vi.fn();
  for (const row of rows) mock.mockResolvedValueOnce(new Response(JSON.stringify(row), { status: 200 }));
  vi.stubGlobal("fetch", mock);
  return mock;
}

describe("durable checkout", () => {
  it("stores valid details as pending and ignores untrusted status, amount and id", () => {
    expect(pendingOrder({ ...order, status: "paid", amount_cents: 1, id: "wrong" }, order.sender_email, id))
      .toMatchObject({ id, status: "pending_payment", amount_cents: 0, state_region: "ND" });
  });
  it("rejects incomplete and mismatched contact data", () => {
    expect(() => pendingOrder({ ...order, message_text: "" }, order.sender_email, id)).toThrow();
    expect(() => pendingOrder(order, "other@example.com", id)).toThrow();
  });
  it("rejects an invalid date", () => {
    expect(() => pendingOrder({ ...order, requested_ship_date: "2026-02-30" }, order.sender_email, id)).toThrow();
  });
  it("marks a linked pending order paid", async () => {
    const fetch = mockDb([[{ id, status: "pending_payment", stripe_checkout_session_id: session.id }], [{ id }]]);
    expect(await confirmOrder(session)).toEqual({ id, amountPaidCents: 1500 });
    const update = fetch.mock.calls[1];
    expect(update[0]).toContain("status=eq.pending_payment");
    expect(JSON.parse(update[1].body)).toMatchObject({ status: "paid", amount_cents: 1500 });
  });
  it("does not repeat updates or revert fulfilled orders on webhook replay", async () => {
    const fetch = mockDb([[{ id, status: "mailed", stripe_checkout_session_id: session.id, paid_at: "2026-11-25", amount_cents: 1500 }]]);
    await confirmOrder(session);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("handles concurrent confirmations without inserting another record", async () => {
    const pending = { id, status: "pending_payment", stripe_checkout_session_id: session.id };
    mockDb([[pending], [], [{ ...pending, paid_at: "2026-11-25", amount_cents: 1500 }]]);
    expect(await confirmOrder(session)).toEqual({ id, amountPaidCents: 1500 });
  });
  it("rejects an unpaid session or an unrelated payment", async () => {
    const fetch = mockDb([]);
    await expect(confirmOrder({ ...session, payment_status: "unpaid" })).rejects.toThrow();
    await expect(confirmOrder({ ...session, client_reference_id: "wrong" })).rejects.toThrow();
    expect(fetch).not.toHaveBeenCalled();
  });
  it("rejects a stored order linked to another session", async () => {
    mockDb([[{ id, status: "pending_payment", stripe_checkout_session_id: "cs_test_other" }]]);
    await expect(confirmOrder(session)).rejects.toThrow();
  });
  it("uses server quote rather than client amounts and preserves explicit permission",()=>{
    const row=pendingOrder({...order,message_text:Array(251).fill("word").join(" "),amount_cents:1,showcase_consent:true},order.sender_email,id,true);
    expect(row).toMatchObject({expected_amount_cents:2000,extra_card_count:1,message_word_count:251,showcase_consent:true,amount_cents:0});
    expect(pendingOrder({...order,showcase_consent:"true"},order.sender_email,id,true)).toMatchObject({showcase_consent:false,showcase_consented_at:null});
  });
  it("verifies v2 stored price and rejects subtotal mismatch",async()=>{
    const v2={...session,amount_subtotal:2000,amount_total:2000,metadata:{orderId:id,orderFlow:"durable-v2"}} as Stripe.Checkout.Session;
    mockDb([[{id,status:"pending_payment",stripe_checkout_session_id:session.id,expected_amount_cents:2000}],[{id}]]);
    expect(await confirmOrder(v2)).toEqual({id,amountPaidCents:2000});
    mockDb([[{id,status:"pending_payment",stripe_checkout_session_id:session.id,expected_amount_cents:2500}]]);
    await expect(confirmOrder(v2)).rejects.toThrow();
  });
  it("accepts a valid 100 percent discount", async () => {
    mockDb([[{ id, status: "pending_payment", stripe_checkout_session_id: session.id }], [{ id }]]);
    expect(await confirmOrder({ ...session, amount_total: 0, payment_status: "no_payment_required" })).toEqual({ id, amountPaidCents: 0 });
  });
});
