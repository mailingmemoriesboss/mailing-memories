export const WORDS_PER_CARD=250;
export const BASE_CARD_CENTS=1500;
export const EXTRA_CARD_CENTS=500;
export const MAX_MESSAGE_CHARS=20000;
export const SHOWCASE_CONSENT_VERSION="2026-11-26-v1";
export function countWords(text:string){return text.trim()?text.trim().split(/\s+/u).length:0;}
export function quoteCard(message:string){
 const words=countWords(message);
 const extraCards=Math.max(0,Math.ceil(words/WORDS_PER_CARD)-1);
 return {words,extraCards,totalCents:BASE_CARD_CENTS+extraCards*EXTRA_CARD_CENTS};
}
export function showcaseConsent(value:unknown){return value===true;}
