import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverOne, emailBody } from "./orderNotifications";
const row = { order_id: "12345678-1234-4123-8123-123456789abc", amount_cents: 1500,
  requested_ship_date: "2026-12-01", lease_token: "example-lease", attempts: 1 };
const config = { from: "Example <orders@example.com>", to: "owner@example.com", adminUrl: "https://example.com/admin/orders" };
function setup(responses: Response[], enabled = "true") {
  const env: Record<string,string> = { ORDER_EMAIL_ENABLED: enabled, SUPABASE_URL: "https://example.invalid",
    SUPABASE_SERVICE_ROLE_KEY: "fake", RESEND_API_KEY: "fake", ORDER_EMAIL_FROM: config.from,
    ORDER_EMAIL_TO: config.to, ORDER_ADMIN_URL: config.adminUrl };
  vi.stubGlobal("Netlify", { env: { get: (key: string) => env[key] } });
  const fetchMock = vi.fn();
  for (const response of responses) fetchMock.mockResolvedValueOnce(response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}
const response = (data: object, status = 200) => new Response(JSON.stringify(data), { status });
afterEach(() => vi.unstubAllGlobals());
describe("owner notifications", () => {
  it("includes only minimal order information", () => {
    const mail = emailBody(row, config);
    expect(mail.to).toEqual(["owner@example.com"]);
    expect(mail.text).toContain("$15.00");
    expect(mail.text).toContain("2026-12-01");
    expect(mail.text).toContain("/admin/orders");
    expect(mail.text).not.toContain("message_text");
  });
  it("does not send if disabled", async () => {
    const fetch = setup([], "false");
    expect(await deliverOne()).toBe("disabled");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("does not send if nothing can be claimed", async () => {
    const fetch = setup([response([])]);
    expect(await deliverOne()).toBe("empty");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("uses a stable provider key and records acceptance", async () => {
    const fetch = setup([response([row]), response({ id: "email-id" }), response([row])]);
    expect(await deliverOne(row.order_id)).toBe("accepted");
    expect(fetch.mock.calls[1][1].headers["Idempotency-Key"]).toBe("mm-paid-order/" + row.order_id);
    expect(JSON.parse(fetch.mock.calls[2][1].body)).toMatchObject({status:"accepted",provider_id:"email-id"});
    expect(fetch.mock.calls[2][0]).toContain("lease_token=eq.");
  });
  it("queues a retry on provider failure instead of changing payment", async () => {
    const fetch = setup([response([row]), response({}, 503), response([row])]);
    expect(await deliverOne()).toBe("retry");
    expect(JSON.parse(fetch.mock.calls[2][1].body)).toMatchObject({status:"queued",last_error:"Email provider HTTP 503"});
    expect(fetch.mock.calls[2][0]).toContain("order_notification_outbox");
  });
  it("treats ambiguous acceptance as retryable", async () => {
    const fetch = setup([response([row]), response({}), response([row])]);
    expect(await deliverOne()).toBe("retry");
    expect(JSON.parse(fetch.mock.calls[2][1].body).status).toBe("queued");
  });
});
