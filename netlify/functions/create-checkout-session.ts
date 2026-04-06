import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async (req: Request) => {
  try {
    const body = await req.json();

    const {
      frontMessage,
      insideMessage,
      signatureName,
      recipientName,
      recipientAddress1,
      recipientAddress2,
      recipientCity,
      recipientState,
      recipientZip,
      returnName,
      returnAddress1,
      returnAddress2,
      returnCity,
      returnState,
      returnZip,
      contactEmail,
    } = body ?? {};

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
      customer_email: contactEmail || undefined,
      success_url: `${origin}/send?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/send?payment=cancelled`,
      metadata: {
        frontMessage: frontMessage || "",
        insideMessage: insideMessage || "",
        signatureName: signatureName || "",
        recipientName: recipientName || "",
        recipientAddress1: recipientAddress1 || "",
        recipientAddress2: recipientAddress2 || "",
        recipientCity: recipientCity || "",
        recipientState: recipientState || "",
        recipientZip: recipientZip || "",
        returnName: returnName || "",
        returnAddress1: returnAddress1 || "",
        returnAddress2: returnAddress2 || "",
        returnCity: returnCity || "",
        returnState: returnState || "",
        returnZip: returnZip || "",
        contactEmail: contactEmail || "",
      },
    });

    return new Response(
      JSON.stringify({
        url: session.url,
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
