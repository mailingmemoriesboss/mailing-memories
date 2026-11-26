import {describe,it,expect} from "vitest";
import {quoteCard,countWords,showcaseConsent} from "../../../shared/cardPricing";
const words=(n:number)=>Array(n).fill("word").join(" ");
describe("card quote",()=>{
 it("keeps 250 words or fewer at $15",()=>{expect(quoteCard(words(1)).totalCents).toBe(1500);expect(quoteCard(words(250))).toEqual({words:250,extraCards:0,totalCents:1500});});
 it("charges every started extra block",()=>{expect(quoteCard(words(251))).toEqual({words:251,extraCards:1,totalCents:2000});expect(quoteCard(words(500)).totalCents).toBe(2000);expect(quoteCard(words(501)).totalCents).toBe(2500);expect(quoteCard(words(1001)).totalCents).toBe(3500);});
 it("counts whitespace-separated words consistently",()=>{expect(countWords("  hello\nworld\tagain  ")).toBe(3);expect(countWords("  ")).toBe(0);});
 it("only accepts explicit boolean true for optional permission",()=>{expect(showcaseConsent(true)).toBe(true);for(const value of [undefined,null,false,"true",1])expect(showcaseConsent(value)).toBe(false);});
});
