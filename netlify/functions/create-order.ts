type OrderType = "send_now" | "scheduled";
type MessageMode = "exact_words" | "writing_help";

type CreateOrderPayload = {
  order_type: OrderType;
  occasion?: string | null;
  occasion_custom?: string | null;
  message_mode: MessageMode;
  message_text?: string | null;
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
  reminder_enabled?: boolean;
  reminder_send_at?: string | null;
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

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function badRequest(message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

function normalizePayload(body: unknown): CreateOrderPayload | null {
  if (!body || typeof body !== "object") return null;
  return body as CreateOrderPayload;
}

function buildInternalNotes(payload: CreateOrderPayload) {
  const lines = [
    payload.front_message ? `Front of card: ${payload.front_message}` : "",
    payload.return_name ? `Return name: ${payload.return_name}` : "",
    payload.return_address_line1 ? `Return address 1: ${payload.return_address_line1}` : "",
    payload.return_address_line2 ? `Return address 2: ${payload.return_address_line2}` : "",
    payload.return_city || payload.return_state || payload.return_postal_code
      ? `Return city/state/zip: ${payload.return_city || ""}, ${payload.return_state || ""} ${payload.return_postal_code || ""}`.trim()
      : "",
  ].filter(Boolean);

  return lines.length ? lines.join("\n") : null;
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Netlify.env.get("SUPABASE_URL");
    const supabaseKey = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({
          error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const rawBody = await req.json();
    const payload = normalizePayload(rawBody);

    if (!payload) {
      return badRequest("Invalid request body.");
    }

    if (payload.order_type !== "send_now" && payload.order_type !== "scheduled") {
      return badRequest("order_type must be send_now or scheduled.");
    }

    if (
      payload.message_mode !== "exact_words" &&
      payload.message_mode !== "writing_help"
    ) {
      return badRequest("message_mode must be exact_words or writing_help.");
    }

    if (!isNonEmpty(payload.sender_name)) return badRequest("sender_name is required.");
    if (!isNonEmpty(payload.sender_email)) return badRequest("sender_email is required.");
    if (!isNonEmpty(payload.recipient_name)) return badRequest("recipient_name is required.");
    if (!isNonEmpty(payload.address_line1)) return badRequest("address_line1 is required.");
    if (!isNonEmpty(payload.city)) return badRequest("city is required.");
    if (!isNonEmpty(payload.state_region)) return badRequest("state_region is required.");
    if (!isNonEmpty(payload.postal_code)) return badRequest("postal_code is required.");

    if (payload.order_type === "scheduled" && !isNonEmpty(payload.requested_ship_date)) {
      return badRequest("requested_ship_date is required for scheduled orders.");
    }

    if (payload.message_mode === "exact_words" && !isNonEmpty(payload.message_text)) {
      return badRequest("message_text is required for exact_words mode.");
    }

    if (payload.message_mode === "writing_help" && !isNonEmpty(payload.message_brief)) {
      return badRequest("message_brief is required for writing_help mode.");
    }

    const insertBody = {
      order_type: payload.order_type,
      status: "draft",
      occasion: payload.occasion?.trim() || null,
      occasion_custom: payload.occasion_custom?.trim() || null,
      message_mode: payload.message_mode,
      message_text: payload.message_text?.trim() || null,
      message_brief: payload.message_brief?.trim() || null,
      signature_name: payload.signature_name?.trim() || null,
      sender_name: payload.sender_name.trim(),
      sender_email: payload.sender_email.trim(),
      recipient_name: payload.recipient_name.trim(),
      address_line1: payload.address_line1.trim(),
      address_line2: payload.address_line2?.trim() || null,
      city: payload.city.trim(),
      state_region: payload.state_region.trim(),
      postal_code: payload.postal_code.trim(),
      country: payload.country?.trim() || "US",
      requested_ship_date: payload.requested_ship_date || null,
      reminder_enabled: Boolean(payload.reminder_enabled),
      reminder_send_at: payload.reminder_send_at || null,
      amount_cents:
        typeof payload.amount_cents === "number" ? payload.amount_cents : 1500,
      currency: payload.currency?.trim() || "usd",
      internal_notes: buildInternalNotes(payload),
    };

    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/orders`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(insertBody),
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Supabase insert failed (${response.status})`,
          details: text,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const rows = JSON.parse(text);
    const order = Array.isArray(rows) ? rows[0] : rows;

    return new Response(
      JSON.stringify({
        ok: true,
        order,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown function error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = {
  path: "/api/create-order",
};
