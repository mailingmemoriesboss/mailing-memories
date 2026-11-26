import { createHash, timingSafeEqual } from "node:crypto";
import { db, json } from "./_lib/durableOrders";

export function authorized(header: string | null, secret: string | undefined) {
  if (!secret || secret.length < 32 || !header?.startsWith("Bearer ")) return false;
  const digest = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(digest(header.slice(7)), digest(secret));
}

export const statuses = ["paid","queued","writing","written","mailed","completed","cancelled"];
export function calendarRow(row: Record<string, any>) {
  return { id: row.id, paid_at: row.paid_at, requested_ship_date: row.requested_ship_date,
    status: row.status };
}

export default async (req: Request) => {
  if (new URL(req.url).hostname !== "mailingmemories.com") return json(404,{error:"Not found"});
  if (req.method !== "GET") return json(405,{error:"Method not allowed"});
  if (!authorized(req.headers.get("authorization"), Netlify.env.get("CALENDAR_SYNC_TOKEN"))) {
    return json(401,{error:"Unauthorized"});
  }
  const start = new URL(req.url).searchParams.get("since");
  if (!start || !/^\d{4}-\d{2}-\d{2}$/.test(start) ||
      !Number.isFinite(Date.parse(start)) || new Date(start).toISOString().slice(0,10) !== start) {
    return json(400,{error:"Valid start date required"});
  }
  try {
    const query = "?select=id,paid_at,requested_ship_date,status&paid_at=gte." +
      encodeURIComponent(start+"T00:00:00Z") +
      "&status=in.("+statuses.join(",")+")&order=id&limit=500";
    const rows = await db(query);
    if (rows.length >= 500) return json(409,{error:"Calendar snapshot limit exceeded; contact administrator"});
    return json(200,{version:1,orders:rows.map(calendarRow)});
  } catch {
    return json(503,{error:"Calendar order data unavailable"});
  }
};
export const config = {path:"/api/calendar-orders"};
