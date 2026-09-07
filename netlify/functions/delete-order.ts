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
  if (req.method !== "DELETE") {
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

    const url = new URL(req.url);
    const orderId = url.searchParams.get("id");
    const clearTest = url.searchParams.get("clearTest") === "true";

    if (!orderId && !clearTest) {
      return jsonResponse(400, { error: "Missing order id or clearTest flag" });
    }

    let supabaseQuery = "";
    if (clearTest) {
      supabaseQuery = "or=(sender_email.ilike.*test*,sender_name.ilike.*test*,internal_notes.ilike.*keepalive*)";
    } else {
      supabaseQuery = `id=eq.${encodeURIComponent(orderId as string)}`;
    }

    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/orders?${supabaseQuery}`,
      {
        method: "DELETE",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=representation",
        },
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return jsonResponse(500, {
        error: `Supabase delete failed (${response.status})`,
        details: text,
      });
    }

    const deletedRows = JSON.parse(text);

    return jsonResponse(200, {
      ok: true,
      deletedCount: Array.isArray(deletedRows) ? deletedRows.length : 1,
    });
  } catch (error) {
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : "Unknown function error",
    });
  }
};

export const config = {
  path: "/api/delete-order",
};
