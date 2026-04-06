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

export default async () => {
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

    const query =
      "select=id,created_at,updated_at,order_type,status,occasion,occasion_custom,sender_name,sender_email,recipient_name,city,state_region,requested_ship_date,amount_cents&order=created_at.desc";

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
      return new Response(
        JSON.stringify({
          error: `Supabase request failed (${response.status})`,
          details: text,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const orders = JSON.parse(text) as OrderRow[];

    return new Response(JSON.stringify({ orders }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown function error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = {
  path: "/api/orders",
};
