import { readAdminSessionCookie, verifyAdminSessionToken } from "./_lib/adminAuth";
import { json } from "./_lib/durableOrders";
export default async (req:Request)=>{
 try {
  if(new URL(req.url).hostname!=="mailingmemories.com")return json(404,{error:"Not found"});
  if(req.method!=="POST")return json(405,{error:"Method not allowed"});
  const secret=Netlify.env.get("ADMIN_SESSION_SECRET");
  if(!secret||!verifyAdminSessionToken(readAdminSessionCookie(req),secret))return json(401,{error:"Admin authentication required"});
  if(req.headers.get("origin")!=="https://mailingmemories.com"||!req.headers.get("content-type")?.startsWith("application/json"))return json(403,{error:"Invalid origin"});
  const body=await req.json();
  if(body?.confirm!==true)return json(400,{error:"Confirmation required"});
  const from=Netlify.env.get("ORDER_EMAIL_FROM"),to=Netlify.env.get("ORDER_EMAIL_TO"),key=Netlify.env.get("RESEND_API_KEY");
  if(!from||!to||!key)return json(503,{error:"Email configuration incomplete"});
  const date=new Date().toISOString().slice(0,10);
  const res=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json","Idempotency-Key":"mm-owner-fulfillment-test/"+date},body:JSON.stringify({from,to:[to],subject:"Mailing Memories — owner-only confirmation test",text:"This is a synthetic fulfillment email test, sent only to your configured business inbox. No customer order was changed and no customer was emailed.\n\nExample customer wording: Your handwritten card has been mailed. Thank you for trusting Mailing Memories with your words.\n\nMailing Memories\nBecause presence deserves real paper."}),signal:AbortSignal.timeout(6000)});
  if(!res.ok)return json(502,{error:"Email provider did not accept the test"});
  const data=await res.json();
  if(typeof data.id!=="string")return json(502,{error:"Email acceptance not confirmed"});
  return json(200,{status:"accepted",note:"Check your business inbox. Repeated requests today reuse the same provider message."});
 }catch{return json(503,{error:"Unable to verify test email"});}
};
export const config={path:"/api/test-fulfillment-email"};
