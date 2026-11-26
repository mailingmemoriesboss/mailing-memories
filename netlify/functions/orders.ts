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
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
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

    // Keep the admin's order list usable even if notification storage is not ready.
    let notificationAvailable = false;
    let notifications: Record<string, string> = {};
    try {
      const result = await fetch(
        `${supabaseUrl.replace(/\/$/, "")}/rest/v1/order_notification_outbox?select=order_id,status&order=queued_at.desc&limit=1000`,
        { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, signal: AbortSignal.timeout(4500) }
      );
      if (result.ok) {
        const rows = await result.json() as { order_id: string; status: string }[];
        notifications = Object.fromEntries(rows.map(row => [row.order_id, row.status]));
        notificationAvailable = true;
      }
    } catch { /* Surface unavailable state below. */ }
    let fulfillmentAvailable=false;
    let confirmations: Record<string,string>={};
    try {
      const result=await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/fulfillment_confirmation_outbox?select=order_id,status&limit=1000`,{headers:{apikey:supabaseKey,Authorization:`Bearer ${supabaseKey}`},signal:AbortSignal.timeout(4500)});
      if(result.ok){const rows=await result.json() as {order_id:string;status:string}[];confirmations=Object.fromEntries(rows.map(r=>[r.order_id,r.status]));fulfillmentAvailable=true;}
    }catch{/* Keep order list available. */}
    return jsonResponse(200, { orders: orders.map(order => ({
      fulfillment_confirmation_status: fulfillmentAvailable?(confirmations[order.id]||"not sent"):"unavailable",
      ...order, notification_status: notificationAvailable ? (notifications[order.id] || "not recorded") : "unavailable",
    })) });
  } catch (error) {
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : "Unknown function error",
    });
  }
};

export const config = {
  path: "/api/orders",
};
