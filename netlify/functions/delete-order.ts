export default async (req: Request) => {
  if (req.method !== "DELETE") {
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

    const url = new URL(req.url);
    const orderId = url.searchParams.get("id");
    const clearTest = url.searchParams.get("clearTest") === "true";

    if (!orderId && !clearTest) {
      return new Response(JSON.stringify({ error: "Missing order id or clearTest flag" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let supabaseQuery = "";
    if (clearTest) {
      // Logic for "Clear Test Orders": 
      // sender_email contains 'test' or sender_name contains 'test' or internal_notes contains 'keepalive'
      // Or any other logic you'd like to use.
      supabaseQuery = "or=(sender_email.ilike.*test*,sender_name.ilike.*test*,internal_notes.ilike.*keepalive*)";
    } else {
      supabaseQuery = `id=eq.${orderId}`;
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
      return new Response(
        JSON.stringify({
          error: `Supabase delete failed (${response.status})`,
          details: text,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const deletedRows = JSON.parse(text);

    return new Response(
      JSON.stringify({
        ok: true,
        deletedCount: Array.isArray(deletedRows) ? deletedRows.length : 1,
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
  path: "/api/delete-order",
};
