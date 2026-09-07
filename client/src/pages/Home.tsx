import { Link } from "wouter";
import { FadeIn, PageShell } from "@/components/Layout";

const IMAGES = {
  handwriting: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-writing-today_baf52ba5.png",
  envelope: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-envelope-card_d47e65e0.png",
};

const primaryButton: React.CSSProperties = {
  minHeight: "52px",
  padding: "0 24px",
  borderRadius: "4px",
  background: "var(--mm-forest)",
  color: "#f7f2eb",
  fontFamily: "var(--font-sans)",
  fontSize: "0.82rem",
  fontWeight: 700,
  letterSpacing: "0.025em",
  textDecoration: "none",
};

const secondaryButton: React.CSSProperties = {
  minHeight: "52px",
  padding: "0 24px",
  borderRadius: "4px",
  border: "1px solid var(--mm-line-strong)",
  background: "rgba(255,255,255,0.42)",
  color: "var(--mm-forest)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.82rem",
  fontWeight: 700,
  letterSpacing: "0.025em",
  textDecoration: "none",
};

function Hero() {
  return (
    <section
      style={{
        padding: "clamp(56px, 8vw, 108px) 24px clamp(64px, 8vw, 96px)",
        background: "var(--mm-cream-soft)",
      }}
    >
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <FadeIn>
            <p
              style={{
                margin: "0 0 18px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.73rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--mm-burgundy)",
              }}
            >
              Handwritten card service · $15
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1
              style={{
                margin: "0 0 24px",
                maxWidth: "760px",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(3rem, 7vw, 5.4rem)",
                fontWeight: 600,
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                color: "var(--mm-forest)",
              }}
            >
              Your words. Handwritten and mailed for you.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              style={{
                margin: "0 0 30px",
                maxWidth: "650px",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 2vw, 1.16rem)",
                lineHeight: 1.8,
                color: "var(--mm-ink-soft)",
              }}
            >
              You write the message. I handwrite it on quality cardstock, address a clean white envelope, add postage, and mail it anywhere in the U.S.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <Link href="/send" className="inline-flex items-center justify-center" style={primaryButton}>
                Send a Card — $15
              </Link>
              <Link href="/messages" className="inline-flex items-center justify-center" style={secondaryButton}>
                I need help with the words
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="flex flex-wrap gap-x-5 gap-y-2"
              style={{
                marginTop: "26px",
                paddingTop: "22px",
                borderTop: "1px solid var(--mm-line)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--mm-ink-muted)",
              }}
            >
              <span>Mailed in 1–2 business days</span>
              <span>U.S. mailing</span>
              <span>Secure Stripe checkout</span>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-5">
          <FadeIn delay={0.08}>
            <figure style={{ margin: 0 }}>
              <div
                style={{
                  padding: "10px",
                  background: "#fffdf9",
                  border: "1px solid var(--mm-line)",
                  boxShadow: "0 22px 55px rgba(34, 29, 24, 0.09)",
                }}
              >
                <img
                  src={IMAGES.handwriting}
                  alt="A handwritten card being prepared on cream cardstock"
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </div>
              <figcaption
                style={{
                  marginTop: "12px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.74rem",
                  lineHeight: 1.5,
                  color: "var(--mm-ink-muted)",
                }}
              >
                Every order is prepared one card at a time — not printed from a handwriting font or written by a robot.
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
    {
      number: "01",
      title: "Write your message",
      text: "Use your own exact words, or start with the free Find Your Words library if you are stuck.",
    },
    {
      number: "02",
      title: "Tell me where it goes",
      text: "Add the recipient address, your return address, and review everything before checkout.",
    },
    {
      number: "03",
      title: "I handwrite and mail it",
      text: "After secure payment, I prepare the card and envelope and mail standard orders within 1–2 business days.",
    },
  ];

  return (
    <section id="how-it-works" style={{ padding: "clamp(64px, 8vw, 96px) 24px", background: "#ffffff" }}>
      <div className="max-w-[1180px] mx-auto">
        <FadeIn>
          <div style={{ maxWidth: "700px", marginBottom: "38px" }}>
            <p
              style={{
                margin: "0 0 10px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--mm-burgundy)",
              }}
            >
              How it works
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 600,
                lineHeight: 1.05,
                color: "var(--mm-forest)",
              }}
            >
              Simple enough to finish in a few minutes.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={0.05 * index}>
              <div
                style={{
                  height: "100%",
                  padding: "28px",
                  background: "var(--mm-cream-soft)",
                  border: "1px solid var(--mm-line)",
                }}
              >
                <p
                  style={{
                    margin: "0 0 34px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--mm-burgundy)",
                  }}
                >
                  {step.number}
                </p>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.55rem",
                    fontWeight: 600,
                    color: "var(--mm-forest)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    color: "var(--mm-ink-soft)",
                  }}
                >
                  {step.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatYouReceive() {
  const included = [
    "One handwritten folded cardstock card",
    "Your message written by hand",
    "A clean white envelope",
    "Recipient and return address written on the envelope",
    "Postage and U.S. mailing",
    "Standard mailing within 1–2 business days",
  ];

  return (
    <section style={{ padding: "clamp(64px, 8vw, 104px) 24px", background: "var(--mm-cream-deep)" }}>
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <FadeIn>
            <div
              style={{
                padding: "10px",
                background: "#fffdf9",
                border: "1px solid rgba(23,21,19,0.12)",
                boxShadow: "0 18px 48px rgba(34, 29, 24, 0.08)",
              }}
            >
              <img
                src={IMAGES.envelope}
                alt="A handwritten card and addressed envelope"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <FadeIn>
            <p
              style={{
                margin: "0 0 10px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--mm-burgundy)",
              }}
            >
              What $15 includes
            </p>
            <h2
              style={{
                margin: "0 0 22px",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: 1.06,
                color: "var(--mm-forest)",
              }}
            >
              No hidden package. No complicated options.
            </h2>
            <p
              style={{
                margin: "0 0 24px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.98rem",
                lineHeight: 1.75,
                color: "var(--mm-ink-soft)",
              }}
            >
              Mailing Memories is intentionally simple. You provide the words and mailing details; I handle the physical follow-through.
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div style={{ borderTop: "1px solid rgba(23,21,19,0.15)" }}>
              {included.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "22px 1fr",
                    gap: "10px",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(23,21,19,0.12)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    lineHeight: 1.55,
                    color: "var(--mm-ink)",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "var(--mm-burgundy)", fontWeight: 700 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function HumanSection() {
  return (
    <section style={{ padding: "clamp(64px, 8vw, 98px) 24px", background: "var(--mm-forest)" }}>
      <div className="max-w-[900px] mx-auto text-center">
        <FadeIn>
          <p
            style={{
              margin: "0 0 12px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(247,242,235,0.58)",
            }}
          >
            A real handwritten card
          </p>
          <h2
            style={{
              margin: "0 auto 22px",
              maxWidth: "780px",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.35rem, 5vw, 4.2rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              color: "#f7f2eb",
            }}
          >
            The message is yours. The handwriting is human.
          </h2>
          <p
            style={{
              margin: "0 auto",
              maxWidth: "720px",
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(247,242,235,0.72)",
            }}
          >
            Mailing Memories is a small, hands-on service. I personally handwrite each order from the message you provide. The point is not to imitate handwriting — it is to put your actual words onto real paper and get them into the mail.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function HelpfulExtras() {
  return (
    <section style={{ padding: "clamp(64px, 8vw, 96px) 24px", background: "#ffffff" }}>
      <div className="max-w-[1180px] mx-auto">
        <FadeIn>
          <div style={{ maxWidth: "680px", marginBottom: "34px" }}>
            <p
              style={{
                margin: "0 0 10px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--mm-burgundy)",
              }}
            >
              Built for follow-through
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.1rem, 5vw, 3.4rem)",
                fontWeight: 600,
                lineHeight: 1.08,
                color: "var(--mm-forest)",
              }}
            >
              A little help when you need it. No extra clutter when you don’t.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn delay={0.05}>
            <div style={{ height: "100%", padding: "30px", border: "1px solid var(--mm-line)", background: "var(--mm-cream-soft)" }}>
              <p style={{ margin: "0 0 8px", fontFamily: "var(--font-serif)", fontSize: "1.65rem", fontWeight: 600, color: "var(--mm-forest)" }}>
                Find Your Words
              </p>
              <p style={{ margin: "0 0 20px", fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--mm-ink-soft)" }}>
                Browse free opening lines and message starters when you know who you want to reach but do not know how to begin.
              </p>
              <Link href="/messages" style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", fontWeight: 700, color: "var(--mm-forest)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                Browse message starters
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div style={{ height: "100%", padding: "30px", border: "1px solid var(--mm-line)", background: "var(--mm-cream-soft)" }}>
              <p style={{ margin: "0 0 8px", fontFamily: "var(--font-serif)", fontSize: "1.65rem", fontWeight: 600, color: "var(--mm-forest)" }}>
                Plan Ahead
              </p>
              <p style={{ margin: "0 0 20px", fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--mm-ink-soft)" }}>
                Prepare the card now and choose a future USPS mailing date at least three days ahead. There is no scheduling fee.
              </p>
              <Link href="/plan" style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", fontWeight: 700, color: "var(--mm-forest)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                Plan a card
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function TrustAndPolicies() {
  return (
    <section style={{ padding: "58px 24px", background: "var(--mm-cream-soft)", borderTop: "1px solid var(--mm-line)" }}>
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <FadeIn>
            <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, color: "var(--mm-forest)" }}>
              Know what happens before you pay.
            </h2>
            <p style={{ margin: 0, maxWidth: "760px", fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--mm-ink-soft)" }}>
              Pricing, mailing timing, cancellation limits, USPS issues, and privacy handling are documented publicly. Questions can also be sent to hello@mailingmemories.com.
            </p>
          </FadeIn>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <FadeIn delay={0.05}>
            <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
              <Link href="/policies" className="inline-flex items-center justify-center" style={secondaryButton}>
                Customer Policies
              </Link>
              <Link href="/faq" className="inline-flex items-center justify-center" style={secondaryButton}>
                FAQ
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ padding: "clamp(70px, 9vw, 110px) 24px", background: "var(--mm-cream-deep)" }}>
      <div className="max-w-[780px] mx-auto text-center">
        <FadeIn>
          <p style={{ margin: "0 0 10px", fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mm-burgundy)" }}>
            $15 · postage included
          </p>
          <h2 style={{ margin: "0 0 18px", fontFamily: "var(--font-serif)", fontSize: "clamp(2.35rem, 6vw, 4.2rem)", fontWeight: 600, lineHeight: 1.04, color: "var(--mm-forest)" }}>
            Send the message you keep meaning to send.
          </h2>
          <p style={{ margin: "0 auto 28px", maxWidth: "620px", fontFamily: "var(--font-sans)", fontSize: "0.98rem", lineHeight: 1.75, color: "var(--mm-ink-soft)" }}>
            Write it now. I’ll handle the handwriting, envelope, postage, and mailing.
          </p>
          <Link href="/send" className="inline-flex items-center justify-center" style={primaryButton}>
            Start Your Card — $15
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <HowItWorks />
      <WhatYouReceive />
      <HumanSection />
      <HelpfulExtras />
      <TrustAndPolicies />
      <FinalCTA />
    </PageShell>
  );
}
