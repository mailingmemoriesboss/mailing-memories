import Stripe from "stripe";
import { confirmOrder, json } from "./_lib/durableOrders";
import { deliverOne } from "./_lib/orderNotifications";

export default async (req: Request) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  const key = Netlify.env.get("STRIPE_SECRET_KEY");
  const signingSecret = Netlify.env.get("STRIPE_WEBHOOK_SECRET");
  if (!key || !signingSecret) return json(503, { error: "Webhook configuration unavailable." });
  const signature = req.headers.get("stripe-signature");
  if (!signature) return json(400, { error: "Missing signature." });
  const stripe = new Stripe(key);
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(await req.text(), signature, signingSecret);
  } catch {
    return json(400, { error: "Invalid signature." });
  }
  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return json(200, { received: true });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve((event.data.object as Stripe.Checkout.Session).id);
    if (session.metadata?.orderFlow !== "durable-v1") {
      // Existing pre-migration sessions must be reconciled separately.
      return json(200, { received: true, legacy: true });
    }
    if (session.payment_status === "unpaid") return json(200, { received: true, pending: true });
    const order = await confirmOrder(session);
    // The payment update has already durably queued the email in the same transaction.
    // Email failure must never undo payment; the scheduled worker will retry.
    try { await deliverOne(order.id); } catch {
      console.error("Immediate owner notification failed; review outbox and scheduled worker.");
    }
    return json(200, { received: true });
  } catch {
    // Non-2xx response lets Stripe retry; do not acknowledge an unsaved paid order.
    return json(503, { error: "Payment reconciliation failed. Retry required." });
  }
};
export const config = { path: "/api/stripe-webhook" };
