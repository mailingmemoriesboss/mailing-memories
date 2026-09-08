import { Link } from "wouter";
import { FadeIn, PageShell } from "@/components/Layout";

const IMAGES = {
  handwriting: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-writing-today_baf52ba5.png",
  envelope: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-envelope-card_d47e65e0.png",
};

const primaryButton: React.CSSProperties = {
  minHeight: "52px",
  padding: "0 24px",
  borderRadius: "6px",
  background: "var(--mm-forest)",
  color: "#f8f6ef",
  fontFamily: "var(--font-sans)",
  fontSize: "0.83rem",
  fontWeight: 700,
  textDecoration: "none",
};

const secondaryButton: React.CSSProperties = {
  minHeight: "52px",
  padding: "0 24px",
  borderRadius: "6px",
  border: "1px solid var(--mm-line-strong)",
  background: "rgba(255,255,255,0.58)",
  color: "var(--mm-forest)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.83rem",
  fontWeight: 700,
  textDecoration: "none",
};

function Hero() {
  return (
    <section className="mm-refined-hero" style={{ padding: "clamp(58px, 8vw, 106px) 24px clamp(68px, 8vw, 98px)" }}>
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <FadeIn><p className="mm-eyebrow" style={{ margin: "0 0 17px" }}>Handwritten card service · $15</p></FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="mm-display" style={{ margin: "0 0 22px", maxWidth: "770px", fontSize: "clamp(3.3rem, 7.4vw, 5.9rem)", lineHeight: 0.94, color: "var(--mm-forest)" }}>
              Your words. Handwritten and mailed for you.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ margin: "0 0 29px", maxWidth: "650px", fontFamily: "var(--font-sans)", fontSize: "clamp(1rem, 2vw, 1.13rem)", lineHeight: 1.78, color: "var(--mm-ink-soft)" }}>
              You write the message. I handwrite it on a 5×7 folded cardstock card, address a clean white envelope, add postage, and mail it anywhere in the U.S.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <Link href="/send" className="inline-flex items-center justify-center" style={primaryButton}>Send a Card — $15</Link>
              <Link href="/messages" className="inline-flex items-center justify-center" style={secondaryButton}>I need help with the words</Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mm-small-rule" style={{ marginTop: "27px", paddingTop: "20px", fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, color: "var(--mm-ink-muted)" }}>
              <span>Mailed in 1–2 business days</span><span>U.S. mailing</span><span>Secure Stripe checkout</span>
            </div>
          </FadeIn>
        </div>
        <div className="lg:col-span-5">
          <FadeIn delay={0.08}>
            <figure style={{ margin: 0 }}>
              <div className="mm-paper-panel" style={{ padding: "10px" }}>
                <img src={IMAGES.handwriting} alt="A handwritten card being prepared" style={{ display: "block", width: "100%", height: "auto" }} />
              </div>
              <figcaption style={{ marginTop: "12px", fontFamily: "var(--font-sans)", fontSize: "0.74rem", lineHeight: 1.55, color: "var(--mm-ink-muted)" }}>
                Each order is prepared one card at a time — not printed from a handwriting font or written by a robot.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["01", "Write your message", "Use your exact words, or start with the free Find Your Words library if you are stuck."],
    ["02", "Add the mailing details", "Enter the recipient and return addresses and review the card before checkout."],
    ["03", "I handwrite and mail it", "After secure payment, I prepare the card and envelope and mail standard orders within 1–2 business days."],
  ];
  return (
    <section style={{ padding: "clamp(66px, 8vw, 96px) 24px", background: "#fffefb" }}>
      <div className="max-w-[1180px] mx-auto">
        <FadeIn><div style={{ maxWidth: "720px", marginBottom: "38px" }}><p className="mm-eyebrow" style={{ margin: "0 0 10px" }}>How it works</p><h2 className="mm-display" style={{ margin: 0, fontSize: "clamp(2.6rem, 5.5vw, 4.1rem)", lineHeight: 1, color: "var(--mm-forest)" }}>Simple enough to finish in a few minutes.</h2></div></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map(([number, title, text], index) => (
            <FadeIn key={number} delay={0.05 * index}>
              <div className="mm-sage-panel" style={{ height: "100%", padding: "29px", borderRadius: "8px" }}>
                <p className="mm-eyebrow" style={{ margin: "0 0 32px" }}>{number}</p>
                <h3 className="mm-display" style={{ margin: "0 0 10px", fontSize: "1.85rem", color: "var(--mm-forest)" }}>{title}</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.72, color: "var(--mm-ink-soft)" }}>{text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatYouReceive() {
  const included = ["One 5×7 folded cardstock card", "Your message written by hand in blue ink", "A clean white envelope", "Recipient and return address written on the envelope", "Postage and U.S. mailing", "Standard mailing within 1–2 business days"];
  return (
    <section style={{ padding: "clamp(66px, 8vw, 102px) 24px", background: "var(--mm-sage-soft)" }}>
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1"><FadeIn><div className="mm-paper-panel" style={{ padding: "10px" }}><img src={IMAGES.envelope} alt="A handwritten card and addressed envelope" style={{ display: "block", width: "100%", height: "auto" }} /></div></FadeIn></div>
        <div className="lg:col-span-6 order-1 lg:order-2">
          <FadeIn><p className="mm-eyebrow" style={{ margin: "0 0 10px" }}>What $15 includes</p><h2 className="mm-display" style={{ margin: "0 0 20px", fontSize: "clamp(2.6rem, 5.5vw, 4rem)", lineHeight: 1, color: "var(--mm-forest)" }}>One simple service. Everything physical is handled.</h2><p style={{ margin: "0 0 23px", fontFamily: "var(--font-sans)", fontSize: "0.97rem", lineHeight: 1.75, color: "var(--mm-ink-soft)" }}>You provide the words and mailing details. I handle the card, handwriting, envelope, postage, and trip into the mail.</p></FadeIn>
          <FadeIn delay={0.06}><div className="mm-small-rule">{included.map((item) => <div key={item} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: "10px", padding: "12px 0", borderBottom: "1px solid var(--mm-line)", fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.55, color: "var(--mm-ink)" }}><span style={{ color: "var(--mm-burgundy)", fontWeight: 700 }}>✓</span><span>{item}</span></div>)}</div></FadeIn>
        </div>
      </div>
    </section>
  );
}

function HumanSection() {
  return (
    <section style={{ padding: "clamp(70px, 8vw, 104px) 24px", background: "var(--mm-forest)" }}>
      <div className="max-w-[900px] mx-auto text-center">
        <FadeIn>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "rgba(248,246,239,0.58)" }}>A real person writes it</p>
          <h2 className="mm-display" style={{ margin: "0 auto 20px", maxWidth: "790px", fontSize: "clamp(2.8rem, 6vw, 4.7rem)", lineHeight: 0.98, color: "#f8f6ef" }}>The message is yours. The handwriting is human.</h2>
          <p style={{ margin: "0 auto", maxWidth: "730px", fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1.82, color: "rgba(248,246,239,0.76)" }}>I’m Mason. I personally handwrite each Mailing Memories card from the words you provide, then address the envelope, add postage, and mail it. The point is not to imitate handwriting — it is to put your actual words onto real paper.</p>
          <p style={{ margin: "22px 0 0", fontFamily: "var(--font-handwriting)", fontSize: "1.45rem", color: "#9fb6d4" }}>— Mason</p>
        </FadeIn>
      </div>
    </section>
  );
}

function HelpfulExtras() {
  return (
    <section style={{ padding: "clamp(66px, 8vw, 96px) 24px", background: "#fffefb" }}>
      <div className="max-w-[1180px] mx-auto">
        <FadeIn><div style={{ maxWidth: "730px", marginBottom: "34px" }}><p className="mm-eyebrow" style={{ margin: "0 0 10px" }}>Helpful when you need it</p><h2 className="mm-display" style={{ margin: 0, fontSize: "clamp(2.5rem, 5.4vw, 3.9rem)", lineHeight: 1, color: "var(--mm-forest)" }}>Two ways to make follow-through easier.</h2></div></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn delay={0.05}><div className="mm-paper-panel" style={{ height: "100%", padding: "30px", borderRadius: "8px" }}><p className="mm-eyebrow" style={{ margin: "0 0 16px" }}>Find Your Words</p><h3 className="mm-display" style={{ margin: "0 0 12px", fontSize: "2rem", color: "var(--mm-forest)" }}>Start with one good line.</h3><p style={{ margin: "0 0 22px", fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.72, color: "var(--mm-ink-soft)" }}>Browse free opening lines when you know who you want to reach but not how to begin. Tap a line and it opens directly inside the card editor.</p><Link href="/messages" style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", fontWeight: 700, color: "var(--mm-forest)" }}>Browse message starters →</Link></div></FadeIn>
          <FadeIn delay={0.08}><div className="mm-sage-panel" style={{ height: "100%", padding: "30px", borderRadius: "8px" }}><p className="mm-eyebrow" style={{ margin: "0 0 16px" }}>Plan Ahead</p><h3 className="mm-display" style={{ margin: "0 0 12px", fontSize: "2rem", color: "var(--mm-forest)" }}>Set it now so the date doesn’t slip past.</h3><p style={{ margin: "0 0 22px", fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.72, color: "var(--mm-ink-soft)" }}>Prepare a card now for a birthday, Mother’s Day, anniversary, or another date you do not want to forget. Choose the future date you want me to hand it to USPS. No scheduling fee.</p><Link href="/plan" style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", fontWeight: 700, color: "var(--mm-forest)" }}>Plan a card →</Link></div></FadeIn>
        </div>
      </div>
    </section>
  );
}

function TrustAndPolicies() {
  return (
    <section style={{ padding: "58px 24px", background: "var(--mm-sage-soft)", borderTop: "1px solid var(--mm-line)" }}>
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8"><FadeIn><h2 className="mm-display" style={{ margin: "0 0 10px", fontSize: "clamp(2.1rem, 4.4vw, 3.1rem)", color: "var(--mm-forest)" }}>Know what happens before you pay.</h2><p style={{ margin: 0, maxWidth: "780px", fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--mm-ink-soft)" }}>Pricing, mailing timing, cancellation limits, USPS issues, and privacy handling are documented publicly. Questions can be sent to mailingmemoriesboss@gmail.com.</p></FadeIn></div>
        <div className="lg:col-span-4"><FadeIn delay={0.05}><div className="flex flex-col sm:flex-row lg:justify-end gap-3"><Link href="/policies" className="inline-flex items-center justify-center" style={secondaryButton}>Customer Policies</Link><Link href="/faq" className="inline-flex items-center justify-center" style={secondaryButton}>FAQ</Link></div></FadeIn></div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return <section style={{ padding: "clamp(74px, 9vw, 112px) 24px", background: "var(--mm-sage-deep)" }}><div className="max-w-[800px] mx-auto text-center"><FadeIn><p className="mm-eyebrow" style={{ margin: "0 0 10px" }}>$15 · postage included</p><h2 className="mm-display" style={{ margin: "0 0 18px", fontSize: "clamp(2.9rem, 6.3vw, 4.8rem)", lineHeight: 0.98, color: "var(--mm-forest)" }}>Send the message you keep meaning to send.</h2><p style={{ margin: "0 auto 28px", maxWidth: "620px", fontFamily: "var(--font-sans)", fontSize: "0.98rem", lineHeight: 1.75, color: "var(--mm-ink-soft)" }}>Write it now. I’ll handle the handwriting, envelope, postage, and mailing.</p><Link href="/send" className="inline-flex items-center justify-center" style={primaryButton}>Start Your Card — $15</Link></FadeIn></div></section>;
}

export default function HomeRefined() {
  return <PageShell><Hero /><HowItWorks /><WhatYouReceive /><HumanSection /><HelpfulExtras /><TrustAndPolicies /><FinalCTA /></PageShell>;
}
