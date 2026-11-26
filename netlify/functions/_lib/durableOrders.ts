import type Stripe from "stripe";

export const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: {
    "Content-Type": "application/json", "Cache-Control": "no-store",
  } });

export class OrderError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

const required = ["message_text", "sender_name", "sender_email", "recipient_name",
  "address_line1", "city", "state_region", "postal_code", "return_name",
  "return_address_line1", "return_city", "return_state", "return_postal_code"] as const;
const optional = ["occasion", "message_brief", "signature_name", "address_line2",
  "front_message", "return_address_line2"] as const;

export function pendingOrder(value: unknown, contactEmail: unknown, id: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new OrderError(400, "Complete order details are required before payment.");
  }
  const input = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of required) {
    const v = input[key];
    if (typeof v !== "string" || !v.trim() || v.length > (key === "message_text" ? 20000 : 500)) {
      throw new OrderError(400, "Missing or invalid order details.");
    }
    out[key] = v.trim();
  }
  for (const key of optional) {
    const v = input[key];
    if (v != null && (typeof v !== "string" || v.length > 20000)) {
      throw new OrderError(400, "Invalid order details.");
    }
    out[key] = typeof v === "string" ? v.trim() || null : null;
  }
  if (typeof contactEmail !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim()) ||
      contactEmail.trim().toLowerCase() !== String(out.sender_email).toLowerCase()) {
    throw new OrderError(400, "A matching customer email is required.");
  }
  const date = input.requested_ship_date;
  if (date != null && date !== "" && (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) {
    throw new OrderError(400, "Invalid mailing date.");
  }
  if (input.country && input.country !== "US") throw new OrderError(400, "US mailing only.");
  return { ...out, id, order_type: "send_now", status: "pending_payment", occasion: out.occasion || "send-page",
    occasion_custom: id, message_mode: "exact_words", country: "US",
    state_region: String(out.state_region).toUpperCase(), return_state: String(out.return_state).toUpperCase(),
    requested_ship_date: date || null, reminder_enabled: false, reminder_send_at: null,
    amount_cents: 0, currency: "usd" };
}

export async function db(query: string, method = "GET", body?: object): Promise<Record<string, any>[]> {
  const url = Netlify.env.get("SUPABASE_URL");
  const key = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new OrderError(503, "Order storage is unavailable.");
  const res = await fetch(url.replace(/\/$/, "") + "/rest/v1/orders" + query, {
    method, headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json", Prefer: "return=representation" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) throw new OrderError(503, "Order storage operation failed.");
  return await res.json();
}

export async function confirmOrder(session: Stripe.Checkout.Session) {
  const total = session.amount_total;
  if (session.mode !== "payment" || session.status !== "complete" ||
      session.amount_subtotal !== 1500 || total === null || total < 0 || total > 1500 ||
      session.currency !== "usd" ||
      !(session.payment_status === "paid" || (total === 0 && session.payment_status === "no_payment_required"))) {
    throw new OrderError(402, "Payment is not verified.");
  }
  const id = session.metadata?.orderId;
  if (session.metadata?.orderFlow !== "durable-v1" || !id ||
      !/^[0-9a-f-]{36}$/i.test(id) || session.client_reference_id !== id) {
    throw new OrderError(409, "This payment requires order reconciliation.");
  }
  const query = "?id=eq." + encodeURIComponent(id);
  const rows = await db(query + "&select=id,status,stripe_checkout_session_id,paid_at,amount_cents");
  const row = rows[0];
  if (!row || row.stripe_checkout_session_id !== session.id) {
    throw new OrderError(409, "Payment could not be matched to its saved order.");
  }
  if (row.paid_at && row.amount_cents === total) return { id: row.id, amountPaidCents: total };
  if (row.status !== "pending_payment") throw new OrderError(409, "Order requires reconciliation.");
  const paymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;
  const changed = await db(query + "&status=eq.pending_payment&stripe_checkout_session_id=eq." + encodeURIComponent(session.id),
    "PATCH", { status: "paid", amount_cents: total, paid_at: new Date().toISOString(), stripe_payment_intent_id: paymentIntent });
  if (changed.length === 0) {
    const current = (await db(query + "&select=id,paid_at,amount_cents,stripe_checkout_session_id"))[0];
    if (!current?.paid_at || current.amount_cents !== total || current.stripe_checkout_session_id !== session.id)
      throw new OrderError(409, "Order requires reconciliation.");
  }
  return { id, amountPaidCents: total };
}
