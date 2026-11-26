import { json } from "./durableOrders";
export function validPhoto(value: unknown): value is string | null {
 if(value===null) return true;
 if(typeof value!=="string" || value.length>700000 || value.length%4!==0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(value)) return false;
 const b=Buffer.from(value,"base64");
 return b.length<=525000 && b.length>4 && b[0]===255 && b[1]===216 && b[2]===255 && b[b.length-2]===255 && b[b.length-1]===217;
}
type Row={order_id:string;customer_email:string;mailed_at:string;photo_base64:string|null;lease_token:string;attempts:number};
export function confirmationEmail(row:Row,from:string) {
 return {from,to:[row.customer_email],subject:"Your Mailing Memories card is on its way",
 text:"Your handwritten card has been mailed. Thank you for trusting Mailing Memories with your words.\n\n"+
 (row.photo_base64?"A photograph of your finished card is attached.\n\n":"")+
 "Order reference: "+row.order_id.slice(0,8)+"\n\nMailing Memories\nBecause presence deserves real paper.\nhttps://mailingmemories.com",
 ...(row.photo_base64?{attachments:[{filename:"mailing-memories.jpg",content:row.photo_base64}]}:{})};
}
export function enabled(){return Netlify.env.get("FULFILLMENT_EMAIL_ENABLED")==="true";}
export async function storage(path:string,method="GET",body?:object) {
 const url=Netlify.env.get("SUPABASE_URL"),key=Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY");
 if(!url||!key)throw Error("Storage unavailable");
 const r=await fetch(url.replace(/\/$/,"")+"/rest/v1/"+path,{method,headers:{apikey:key,Authorization:"Bearer "+key,"Content-Type":"application/json",Prefer:"return=representation"},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(4500)});
 if(!r.ok)throw Error("Confirmation storage unavailable");
 return r.json();
}
export async function deliverConfirmation(id?:string) {
 if(!enabled())return "disabled";
 const key=Netlify.env.get("RESEND_API_KEY"),from=Netlify.env.get("ORDER_EMAIL_FROM");
 if(!key||!from)throw Error("Email configuration unavailable");
 const rows=await storage("rpc/claim_fulfillment_confirmation","POST",{target_id:id||null});
 const row=rows[0] as Row|undefined;
 if(!row)return "empty";
 let providerId:string|null=null;
 try {
  const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json","Idempotency-Key":"mm-fulfillment/"+row.order_id},body:JSON.stringify(confirmationEmail(row,from)),signal:AbortSignal.timeout(4500)});
  if(r.ok){const data=await r.json();if(typeof data.id==="string"&&data.id)providerId=data.id;}
 }catch{/* Never log customer data. */}
 const result=await storage("fulfillment_confirmation_outbox?order_id=eq."+row.order_id+"&status=eq.sending&lease_token=eq."+row.lease_token,"PATCH",providerId?{status:"accepted",provider_id:providerId,accepted_at:new Date().toISOString(),photo_base64:null,customer_email:"",lease_token:null,lease_until:null,last_error:null}:{status:"queued",lease_token:null,lease_until:null,last_error:"Provider acceptance not confirmed",next_attempt_at:new Date(Date.now()+Math.min(60,5*2**Math.min(row.attempts-1,4))*60000).toISOString()});
 if(!Array.isArray(result)||result.length!==1)throw Error("Confirmation lease lost");
 return providerId?"accepted":"queued";
}
export async function runFulfillmentQueue(){let processed=0;for(let i=0;i<2;i++){const r=await deliverConfirmation();if(r==="empty"||r==="disabled")break;processed++;}return json(200,{processed});}
