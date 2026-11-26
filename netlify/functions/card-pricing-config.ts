import {json} from "./_lib/durableOrders";
export default async (req:Request)=>{
 if(req.method!=="GET")return json(405,{error:"Method not allowed"});
 return json(200,{pricingV2:Netlify.env.get("CARD_PRICING_V2_ENABLED")==="true"&&new URL(req.url).hostname==="mailingmemories.com"});
};
export const config={path:"/api/card-pricing-config"};
