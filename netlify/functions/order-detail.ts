import {
  readAdminSessionCookie,
  verifyAdminSessionToken,
} from "./_lib/adminAuth";

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

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return jsonResponse(400, { error: "Order ID is required." });
    }

    const supabaseUrl = Netlify.env.get("SUPABASE_URL");
    const supabaseKey = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      return jsonResponse(500, { error: "Missing Supabase server configuration." });
    }

    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/orders?id=eq.${encodeURIComponent(id)}&select=*&limit=1`,
      {
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

    const rows = JSON.parse(text);
    const order = Array.isArray(rows) ? rows[0] : rows;

    if (!order) {
      return jsonResponse(404, { error: "Order not found." });
    }

    return jsonResponse(200, { order });
  } catch (error) {
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : "Unable to load order.",
    });
  }
};

export const config = {
  path: "/api/order-detail",
};
