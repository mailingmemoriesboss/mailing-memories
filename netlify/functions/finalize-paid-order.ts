import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type PaidOrderPayload = {
  order_type: "send_now";
  occasion?: string | null;
  message_mode: "exact_words";
  message_text: string;
  message_brief?: string | null;
  signature_name?: string | null;
  sender_name: string;
  sender_email: string;
  recipient_name: string;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state_region: string;
  postal_code: string;
  country?: string | null;
  requested_ship_date?: string | null;
  amount_cents?: number;
  currency?: string;
  front_message?: string | null;
  return_name?: string | null;
  return_address_line1?: string | null;
  return_address_line2?: string | null;
  return_city?: string | null;
  return_state?: string | null;
  return_postal_code?: string | null;
};

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function buildInternalNotes(
  payload: PaidOrderPayload,
  session: Stripe.Checkout.Session
) {
  const discountCents = Math.max(
    0,
    (session.amount_subtotal ?? 1500) - (session.amount_total ?? 0)
  );

  const lines = [
    "STRIPE CHECKOUT VERIFIED — order completed",
    `Stripe checkout session: ${session.id}`,
    `Stripe payment status: ${session.payment_status}`,
    `Stripe subtotal: $${((session.amount_subtotal ?? 1500) / 100).toFixed(2)}`,
    `Stripe discount: $${(discountCents / 100).toFixed(2)}`,
    `Stripe total: $${((session.amount_total ?? 0) / 100).toFixed(2)}`,
    payload.front_message ? `Front of card: ${payload.front_message}` : "",
    payload.return_name ? `Return name: ${payload.return_name}` : "",
    payload.return_address_line1
      ? `Return address 1: ${payload.return_address_line1}`
      : "",
    payload.return_address_line2
      ? `Return address 2: ${payload.return_address_line2}`
      : "",
    payload.return_city || payload.return_state || payload.return_postal_code
      ? `Return city/state/zip: ${payload.return_city || ""}, ${
          payload.return_state || ""
        } ${payload.return_postal_code || ""}`.trim()
      : "",
  ].filter(Boolean);

  return lines.join("\n");
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  try {
    const supabaseUrl = Netlify.env.get("SUPABASE_URL");
    const supabaseKey = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      return jsonResponse(500, {
        error: "Missing Supabase server configuration.",
      });
    }

    const body = await req.json();
    const sessionId = body?.sessionId;
    const payload = body?.order as PaidOrderPayload | undefined;

    if (!isNonEmpty(sessionId)) {
      return jsonResponse(400, { error: "Stripe session ID is required." });
    }

    if (!payload || typeof payload !== "object") {
      return jsonResponse(400, { error: "Order details are required." });
    }

    if (
      !isNonEmpty(payload.message_text) ||
      !isNonEmpty(payload.sender_name) ||
      !isNonEmpty(payload.sender_email) ||
      !isNonEmpty(payload.recipient_name) ||
      !isNonEmpty(payload.address_line1) ||
      !isNonEmpty(payload.city) ||
      !isNonEmpty(payload.state_region) ||
      !isNonEmpty(payload.postal_code)
    ) {
      return jsonResponse(400, {
        error: "Required order details are incomplete.",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status !== "complete") {
      return jsonResponse(402, { error: "Stripe Checkout is not complete." });
    }

    const subtotal = session.amount_subtotal;
    const total = session.amount_total;

    if (
      subtotal !== 1500 ||
      total === null ||
      total < 0 ||
      total > subtotal ||
      session.currency !== "usd"
    ) {
      return jsonResponse(400, {
        error: "Stripe payment amount does not match this order.",
      });
    }

    const paymentIsValid =
      session.payment_status === "paid" ||
      (total === 0 && session.payment_status === "no_payment_required");

    if (!paymentIsValid) {
      return jsonResponse(402, {
        error: `Stripe checkout completed but payment status was ${session.payment_status}.`,
      });
    }

    const stripeEmail =
      session.customer_details?.email ||
      session.customer_email ||
      session.metadata?.contactEmail ||
      "";

    if (
      stripeEmail &&
      stripeEmail.trim().toLowerCase() !== payload.sender_email.trim().toLowerCase()
    ) {
      return jsonResponse(400, {
        error: "Payment email does not match the submitted order.",
      });
    }

    const checkoutReference =
      session.metadata?.checkoutReference || session.client_reference_id;

    if (!checkoutReference) {
      return jsonResponse(400, {
        error: "Stripe checkout reference is missing.",
      });
    }

    const baseUrl = supabaseUrl.replace(/\/$/, "");
    const headers = {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
    };

    const existingResponse = await fetch(
      `${baseUrl}/rest/v1/orders?occasion_custom=eq.${encodeURIComponent(
        checkoutReference
      )}&select=*&limit=1`,
      { headers }
    );

    if (!existingResponse.ok) {
      const details = await existingResponse.text();
      return jsonResponse(500, {
        error: "Unable to check for an existing completed order.",
        details,
      });
    }

    const existingRows = await existingResponse.json();
    if (Array.isArray(existingRows) && existingRows.length > 0) {
      return jsonResponse(200, {
        ok: true,
        paymentVerified: true,
        amountPaidCents: total,
        order: existingRows[0],
        duplicate: true,
      });
    }

    const insertBody = {
      order_type: "send_now",
      status: "paid",
      occasion: payload.occasion?.trim() || "send-page",
      occasion_custom: checkoutReference,
      message_mode: "exact_words",
      message_text: payload.message_text.trim(),
      message_brief: payload.message_brief?.trim() || null,
      signature_name: payload.signature_name?.trim() || null,
      sender_name: payload.sender_name.trim(),
      sender_email: payload.sender_email.trim(),
      recipient_name: payload.recipient_name.trim(),
      address_line1: payload.address_line1.trim(),
      address_line2: payload.address_line2?.trim() || null,
      city: payload.city.trim(),
      state_region: payload.state_region.trim().toUpperCase(),
      postal_code: payload.postal_code.trim(),
      country: payload.country?.trim() || "US",
      requested_ship_date: payload.requested_ship_date || null,
      reminder_enabled: false,
      reminder_send_at: null,
      amount_cents: total,
      currency: "usd",
      internal_notes: buildInternalNotes(payload, session),
    };

    const insertResponse = await fetch(`${baseUrl}/rest/v1/orders`, {
      method: "POST",
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
      body: JSON.stringify(insertBody),
    });

    const insertText = await insertResponse.text();

    if (!insertResponse.ok) {
      return jsonResponse(500, {
        error: `Supabase insert failed (${insertResponse.status})`,
        details: insertText,
      });
    }

    const rows = JSON.parse(insertText);
    const order = Array.isArray(rows) ? rows[0] : rows;

    return jsonResponse(200, {
      ok: true,
      paymentVerified: true,
      amountPaidCents: total,
      order,
    });
  } catch (error) {
    return jsonResponse(500, {
      error:
        error instanceof Error
          ? error.message
          : "Unable to finalize the completed order.",
    });
  }
};

export const config = {
  path: "/api/finalize-paid-order",
};
