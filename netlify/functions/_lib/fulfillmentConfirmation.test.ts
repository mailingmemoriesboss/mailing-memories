import {describe,it,expect} from "vitest";
import {validPhoto,confirmationEmail} from "./fulfillmentConfirmation";
const row={order_id:"12345678-1234-1234-1234-123456789abc",customer_email:"buyer@example.com",mailed_at:"2026-11-26",photo_base64:null,lease_token:"lease",attempts:1};
describe("fulfillment confirmations",()=>{
 it("allows no photo and rejects invalid or oversized input",()=>{expect(validPhoto(null)).toBe(true);expect(validPhoto("abc")).toBe(false);expect(validPhoto("A".repeat(700004))).toBe(false);});
 it("validates jpeg markers",()=>{expect(validPhoto(Buffer.from([255,216,255,0,255,217]).toString("base64"))).toBe(true);expect(validPhoto(Buffer.from([1,2,3,4,5,6]).toString("base64"))).toBe(false);});
 it("addresses only order customer and excludes unrelated fields",()=>{const body=confirmationEmail({...row,recipient_name:"private"} as typeof row,"orders@example.com");expect(body.to).toEqual(["buyer@example.com"]);expect(JSON.stringify(body)).not.toContain("private");expect(body.attachments).toBeUndefined();});
 it("attaches optional picture without a public link",()=>{const b=confirmationEmail({...row,photo_base64:"test"},"orders@example.com");expect(b.attachments).toEqual([{filename:"mailing-memories.jpg",content:"test"}]);});
});
