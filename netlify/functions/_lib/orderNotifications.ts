import { json } from "./durableOrders";

type Notification = {
  order_id: string;
  amount_cents: number;
  requested_ship_date: string | null;
  lease_token: string;
  attempts: number;
};
type Settings = { url: string; key: string; apiKey: string; from: string; to: string; adminUrl: string };

function settings(): Settings | null {
  if (Netlify.env.get("ORDER_EMAIL_ENABLED") !== "true") return null;
  const url = Netlify.env.get("SUPABASE_URL");
  const key = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const apiKey = Netlify.env.get("RESEND_API_KEY");
  const from = Netlify.env.get("ORDER_EMAIL_FROM");
  const to = Netlify.env.get("ORDER_EMAIL_TO");
  const adminUrl = Netlify.env.get("ORDER_ADMIN_URL");
  if (!url || !key || !apiKey || !from || !to || !adminUrl || !adminUrl.startsWith("https://")) {
    throw new Error("Owner notification settings incomplete.");
  }
  return { url: url.replace(/\/$/, ""), key, apiKey, from, to, adminUrl };
}

export function emailBody(row: Pick<Notification,"order_id"|"amount_cents"|"requested_ship_date">,
    cfg: Pick<Settings,"from"|"to"|"adminUrl">) {
  return {
    from: cfg.from, to: [cfg.to], subject: "Mailing Memories — New paid order",
    text: [
      "A new Mailing Memories order has been paid and saved.",
      "",
      "Order: " + row.order_id,
      "Amount paid: $" + (row.amount_cents / 100).toFixed(2),
      "Requested mailing date: " + (row.requested_ship_date || "Standard mailing"),
      "",
      "Open your secure admin dashboard: " + cfg.adminUrl,
      "Please review the order and prepare it for fulfillment.",
    ].join("\n"),
  };
}

async function database(cfg: Settings, path: string, method: string, body: object) {
  const response = await fetch(cfg.url + "/rest/v1/" + path, {
    method,
    headers: { apikey: cfg.key, Authorization: "Bearer " + cfg.key,
      "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(4500),
  });
  if (!response.ok) throw new Error("Notification storage unavailable.");
  return await response.json();
}

async function settle(cfg: Settings, row: Notification, update: object) {
  const result = await database(cfg,
    "order_notification_outbox?order_id=eq." + encodeURIComponent(row.order_id) +
    "&status=eq.sending&lease_token=eq." + encodeURIComponent(row.lease_token),
    "PATCH", { ...update, lease_until: null, lease_token: null });
  if (!Array.isArray(result) || result.length !== 1) {
    throw new Error("Notification lease lost; verify delivery state.");
  }
}

export async function deliverOne(targetOrder?: string) {
  const cfg = settings();
  if (!cfg) return "disabled";
  const rows = await database(cfg, "rpc/claim_order_notification", "POST",
    { target_order: targetOrder || null });
  const row = rows[0] as Notification | undefined;
  if (!row) return "empty";
  let providerId: string | undefined;
  let failure = "Provider connection failed or timed out";
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + cfg.apiKey,
        "Content-Type": "application/json",
        "Idempotency-Key": "mm-paid-order/" + row.order_id },
      body: JSON.stringify(emailBody(row, cfg)),
      signal: AbortSignal.timeout(4500),
    });
    if (response.ok) {
      const data = await response.json();
      if (typeof data.id === "string" && data.id) providerId = data.id;
      else failure = "Provider response missing message ID";
    } else {
      failure = "Email provider HTTP " + response.status;
    }
  } catch { /* Retry with the same idempotency key. Never log payload or credentials. */ }
  if (providerId) {
    await settle(cfg, row, { status: "accepted", provider_id: providerId,
      accepted_at: new Date().toISOString(), last_error: null });
    return "accepted";
  }
  const delay = Math.min(60, 5 * 2 ** Math.min(row.attempts - 1, 4));
  await settle(cfg, row, { status: "queued", last_error: failure,
    next_attempt_at: new Date(Date.now() + delay * 60000).toISOString() });
  return "retry";
}

export async function runNotificationQueue() {
  let accepted = 0, retry = 0;
  for (let i = 0; i < 2; i++) {
    const state = await deliverOne();
    if (state === "empty" || state === "disabled") break;
    if (state === "accepted") accepted++;
    if (state === "retry") retry++;
  }
  return json(200, { accepted, retry });
}
