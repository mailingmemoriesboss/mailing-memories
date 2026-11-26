import { describe, expect, it } from "vitest";
import { authorized, calendarRow, statuses } from "../calendar-orders";
describe("calendar order access",()=>{
 const secret="a".repeat(64);
 it("rejects missing token or configuration",()=>{expect(authorized(null,secret)).toBe(false);expect(authorized("Bearer "+secret,undefined)).toBe(false);});
 it("requires exact bearer token",()=>{expect(authorized("Bearer "+secret,secret)).toBe(true);expect(authorized("Bearer "+secret+"x",secret)).toBe(false);});
 it("omits personal information",()=>{expect(calendarRow({id:"1",paid_at:"date",requested_ship_date:null,status:"paid",message_text:"private",sender_email:"private",address_line1:"private"})).toEqual({id:"1",paid_at:"date",requested_ship_date:null,status:"paid"});});
 it("excludes unpaid orders",()=>{expect(statuses).not.toContain("draft");expect(statuses).not.toContain("pending_payment");});
});
