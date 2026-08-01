const ALLOWED_STATUSES = new Set([
  "paid",
  "queued",
  "writing",
  "written",
  "mailed",
  "completed",
  "cancelled",
]);

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  try {
    const body = await req.json();
    const id = body?.id;
    const status = body?.status;

    if (!id || typeof id !== "string") {
      return jsonResponse(400, { error: "Order ID is required." });
    }

    if (!status || typeof status !== "string" || !ALLOWED_STATUSES.has(status)) {
      return jsonResponse(400, { error: "Invalid order status." });
    }

    const supabaseUrl = Netlify.env.get("SUPABASE_URL");
    const supabaseKey = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      return jsonResponse(500, { error: "Missing Supabase server configuration." });
    }

    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/orders?id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ status }),
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return jsonResponse(500, {
        error: `Supabase update failed (${response.status})`,
        details: text,
      });
    }

    const rows = JSON.parse(text);
    const order = Array.isArray(rows) ? rows[0] : rows;

    return jsonResponse(200, { ok: true, order });
  } catch (error) {
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : "Unable to update order.",
    });
  }
};

export const config = {
  path: "/api/update-order-status",
};
