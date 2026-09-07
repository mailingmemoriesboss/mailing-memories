import {
  readAdminSessionCookie,
  verifyAdminSessionToken,
} from "./_lib/adminAuth";

type OrderRow = {
  id: string;
  created_at: string;
  updated_at: string;
  order_type: "send_now" | "scheduled";
  status: string;
  occasion: string | null;
  occasion_custom: string | null;
  sender_name: string;
  sender_email: string;
  recipient_name: string;
  city: string;
  state_region: string;
  requested_ship_date: string | null;
  amount_cents: number;
};

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async (req: Request) => {
  if (req.method !== "GET") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  try {
    const sessionSecret = Netlify.env.get("ADMIN_SESSION_SECRET");
    if (!sessionSecret) {
      return jsonResponse(500, { error: "Missing admin session configuration." });
    }

    const token = readAdminSessionCookie(req);
    if (!verifyAdminSessionToken(token, sessionSecret)) {
      return jsonResponse(401, { error: "Admin authentication required." });
    }

    const supabaseUrl = Netlify.env.get("SUPABASE_URL");
    const supabaseKey = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      return jsonResponse(500, {
        error: "Missing Supabase server configuration.",
      });
    }

    const query =
      "select=id,created_at,updated_at,order_type,status,occasion,occasion_custom,sender_name,sender_email,recipient_name,city,state_region,requested_ship_date,amount_cents,anonymized_at,privacy_hold&order=created_at.desc";

    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/orders?${query}`,
      {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Accept: "application/json",
        },
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return jsonResponse(500, {
        error: `Supabase request failed (${response.status})`,
        details: text,
      });
    }

    const orders = JSON.parse(text) as OrderRow[];

    return jsonResponse(200, { orders });
  } catch (error) {
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : "Unknown function error",
    });
  }
};

export const config = {
  path: "/api/orders",
};
