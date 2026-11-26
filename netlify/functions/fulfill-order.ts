import { readAdminSessionCookie,verifyAdminSessionToken } from "./_lib/adminAuth";
import { json } from "./_lib/durableOrders";
import { enabled,validPhoto,storage,deliverConfirmation } from "./_lib/fulfillmentConfirmation";
export default async (req:Request)=>{
 try{
  const secret=Netlify.env.get("ADMIN_SESSION_SECRET");
  if(!secret||!verifyAdminSessionToken(readAdminSessionCookie(req),secret))return json(401,{error:"Admin authentication required"});
  if(!enabled())return json(503,{error:"Fulfillment confirmations not enabled"});
  if(req.method==="GET"){
   const id=new URL(req.url).searchParams.get("id");
   if(!id||! /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(id))return json(400,{error:"Invalid ID"});
   const rows=await storage("fulfillment_confirmation_outbox?select=status,accepted_at&order_id=eq."+id);
   return json(200,{status:rows[0]?.status||"not sent"});
  }
  if(req.method!=="POST")return json(405,{error:"Method not allowed"});
  if(req.headers.get("origin")!=="https://mailingmemories.com" || !req.headers.get("content-type")?.startsWith("application/json"))return json(403,{error:"Invalid request origin"});
  const raw=await req.text();if(raw.length>710000)return json(413,{error:"Photo too large"});
  const b=JSON.parse(raw);
  if(typeof b.id!=="string"||! /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(b.id)||b.confirm!==true||!validPhoto(b.photo??null))return json(400,{error:"Invalid order, photo or confirmation"});
  let status=await storage("rpc/queue_fulfillment_confirmation","POST",{target_id:b.id,photo:b.photo??null});
  if(status==="ineligible")return json(409,{error:"Order cannot be confirmed. Verify payment, status and privacy restrictions."});
  if(status==="queued"){try{const result=await deliverConfirmation(b.id);if(result==="accepted")status=result;}catch{/* Durable queue retains pending request. */}}
  return json(200,{status});
 }catch{return json(503,{error:"Confirmation could not be verified. Refresh order before retrying."});}
};
export const config={path:"/api/fulfill-order"};
