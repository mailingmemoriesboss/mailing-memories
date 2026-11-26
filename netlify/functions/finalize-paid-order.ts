import Stripe from "stripe";
import { confirmOrder, json, OrderError } from "./_lib/durableOrders";

export default async (req: Request) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  try {
    const body = await req.json();
    if (typeof body?.sessionId !== "string" || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(body.sessionId)) {
      return json(400, { error: "Valid Stripe session ID required." });
    }
    const secret = Netlify.env.get("STRIPE_SECRET_KEY");
    if (!secret) throw new OrderError(503, "Payment verification is unavailable.");
    const session = await new Stripe(secret).checkout.sessions.retrieve(body.sessionId);
    const order = await confirmOrder(session);
    // Return only a receipt identifier and verified amount, never a private letter or addresses.
    return json(200, { ok: true, paymentVerified: true, amountPaidCents: order.amountPaidCents, order: { id: order.id } });
  } catch (error) {
    return error instanceof OrderError ? json(error.status, { error: error.message }) :
      json(503, { error: "Payment verification is temporarily unavailable. Please contact Mailing Memories before paying again." });
  }
};
export const config = { path: "/api/finalize-paid-order" };
