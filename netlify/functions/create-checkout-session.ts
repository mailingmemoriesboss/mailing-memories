import Stripe from "stripe";
import { db, json, OrderError, pendingOrder } from "./_lib/durableOrders";

export default async (req: Request) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  try {
    const body = await req.json();
    const id = crypto.randomUUID();
    const row = pendingOrder(body?.order, body?.contactEmail, id);
    const secret = Netlify.env.get("STRIPE_SECRET_KEY");
    const signingSecret = Netlify.env.get("STRIPE_WEBHOOK_SECRET");
    const price = Netlify.env.get("STRIPE_CARD_PRICE_ID") || "price_1SzlpFCNWxRiI3jgIryZeMVI";
    if (!secret || !signingSecret) throw new OrderError(503, "Secure checkout is temporarily unavailable.");
    const stripe = new Stripe(secret);
    const origin = new URL(req.url).origin;
    // The order must exist before a checkout URL is ever returned.
    const saved = await db("", "POST", row);
    if (saved[0]?.id !== id) throw new OrderError(503, "Unable to save your order.");
    const metadata = { orderId: id, checkoutReference: id, orderFlow: "durable-v1" };
    const session = await stripe.checkout.sessions.create({
      mode: "payment", payment_method_types: ["card"], allow_promotion_codes: true,
      line_items: [{ price, quantity: 1 }], customer_email: body.contactEmail.trim(),
      client_reference_id: id, metadata,
      payment_intent_data: { metadata },
      success_url: origin + "/send?payment=success&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: origin + "/send?payment=cancelled",
    }, { idempotencyKey: "mm-checkout-" + id });
    if (!session.url) throw new OrderError(503, "Secure payment could not be started.");
    const linked = await db("?id=eq." + id + "&status=eq.pending_payment", "PATCH", { stripe_checkout_session_id: session.id });
    if (linked[0]?.stripe_checkout_session_id !== session.id) {
      throw new OrderError(503, "Secure payment could not be linked to your order.");
    }
    return json(200, { url: session.url, checkoutReference: id });
  } catch (error) {
    if (error instanceof OrderError) return json(error.status, { error: error.message });
    return json(500, { error: "Unable to start secure checkout. Please try again." });
  }
};
export const config = { path: "/api/create-checkout-session" };
