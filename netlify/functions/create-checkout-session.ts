import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { contactEmail } = body ?? {};

    if (!contactEmail || typeof contactEmail !== "string") {
      return new Response(JSON.stringify({ error: "A valid customer email is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const checkoutReference = crypto.randomUUID();
    const origin =
      req.headers.get("origin") || "https://themailingmemories.netlify.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1SzlpFCNWxRiI3jgIryZeMVI",
          quantity: 1,
        },
      ],
      customer_email: contactEmail.trim(),
      client_reference_id: checkoutReference,
      success_url: `${origin}/send?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/send?payment=cancelled`,
      metadata: {
        checkoutReference,
        contactEmail: contactEmail.trim(),
        orderType: "send_now",
      },
      payment_intent_data: {
        metadata: {
          checkoutReference,
          contactEmail: contactEmail.trim(),
          orderType: "send_now",
        },
      },
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    return new Response(
      JSON.stringify({
        url: session.url,
        checkoutReference,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unable to create checkout session.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = {
  path: "/api/create-checkout-session",
};
