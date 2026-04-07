/**
 * MAILING MEMORIES — "The Writing Desk" Landing Page
 * 
 * Design Philosophy: Wabi-sabi meets editorial stationery.
 * Every element feels placed by hand. Texture over flatness.
 * Horizontal flow over vertical stacking. Restraint as luxury.
 */

import { Link } from "wouter";
import { PageShell, FadeIn, PenStroke } from "@/components/Layout";

/* ─── CDN Image URLs ─── */
const IMAGES = {
  letterPenDesk: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/letter-pen-desk_49ca7681.png",
  handEnvelopeCard: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-envelope-card_d47e65e0.png",
  handWritingToday: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-writing-today_baf52ba5.png",
  heroDesk: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hero-desk-atmosphere-P8UMTNZD3BSYLVuuy22JRa.webp",
  paperTexture: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/paper-texture-bg-TLD2xmpcBsfnmyqpjpBz6a.webp",
  deckGrief: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/deck-grief-placeholder.png", // Hypothetical placeholder
};

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "clamp(600px, 85vh, 900px)" }}>
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${IMAGES.heroDesk}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-10" style={{ 
        background: "linear-gradient(to bottom, rgba(245, 241, 234, 0.4) 0%, rgba(245, 241, 234, 0.85) 60%, var(--mm-cream) 100%)" 
      }} />

      <div className="relative z-20 max-w-[1240px] mx-auto px-6 pt-24 pb-12 flex flex-col items-center text-center">
        <FadeIn>
          <p style={{
            margin: "0 0 20px",
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mm-burgundy)",
          }}>
            Established in the hard seasons
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1 style={{
            margin: "0 0 24px",
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "var(--mm-forest)",
          }}>
            The things that deserve<br />
            <em style={{ fontStyle: "italic", color: "var(--mm-burgundy)" }}>more than a text.</em>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p style={{
            margin: "0 auto 40px",
            maxWidth: "600px",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
            lineHeight: 1.7,
            color: "var(--mm-ink-soft)",
          }}>
            Mailing Memories is a handwritten letter service for the moments when 
            digital isn't enough. We write, address, and mail real letters on your behalf — 
            so the people who matter truly feel seen.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <Link
            href="/send"
            className="no-underline inline-flex items-center justify-center transition-all duration-200"
            style={{
              minHeight: "56px",
              padding: "0 36px",
              borderRadius: "999px",
              background: "var(--mm-forest)",
              color: "#f7f2eb",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              boxShadow: "0 12px 32px rgba(29, 41, 33, 0.15)",
            }}
          >
            Send a Letter
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   EDITORIAL QUOTE STRIP
   ═══════════════════════════════════════════════════════ */
function QuoteStrip() {
  return (
    <section style={{
      background: "var(--mm-walnut)",
      padding: "clamp(36px, 4vw, 56px) 24px",
    }}>
      <div className="max-w-[1240px] mx-auto text-center">
        <FadeIn>
          <blockquote style={{
            margin: 0,
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.5,
            color: "rgba(245, 241, 234, 0.92)",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            "I am not going to tell you it will pass. I am just going to stay close while it is here."
          </blockquote>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            margin: "16px 0 0",
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(245, 241, 234, 0.65)",
          }}>
            — From the Hard Seasons Deck
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS (with background imagery)
   ═══════════════════════════════════════════════════════ */
function WhatWeDo() {
  return (
    <section id="about" className="relative overflow-hidden" style={{
      padding: "clamp(48px, 6vw, 80px) 24px",
    }}>
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${IMAGES.handWritingToday}")`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(to right, rgba(245, 241, 234, 0.98) 0%, rgba(245, 241, 234, 0.85) 40%, rgba(245, 241, 234, 0.4) 100%)",
      }} />

      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <p style={{
                margin: "0 0 14px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--mm-burgundy)",
              }}>
                How it works
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{
                margin: 0,
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--mm-forest)",
              }}>
                Turn intention into<br />
                <em style={{ fontStyle: "italic", color: "var(--mm-burgundy)" }}>mailed follow-through.</em>
              </h2>
            </FadeIn>
            <PenStroke className="my-6 max-w-[80px]" color="var(--mm-burgundy)" />
            <FadeIn delay={0.2}>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--mm-ink-soft)",
                maxWidth: "440px",
              }}>
                Mailing Memories helps you follow through on meaningful written connection. 
                We write, stamp, and mail one full handwritten page on quality cardstock for $15. 
                If you feel stuck on the wording, light help getting started is available.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 relative hidden lg:block">
            {/* Background image is shown via CSS on desktop */}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   VISUAL PROOF
   ═══════════════════════════════════════════════════════ */
function VisualProof() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "480px" }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${IMAGES.handEnvelopeCard}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to right, rgba(29, 41, 33, 0.88) 0%, rgba(29, 41, 33, 0.65) 50%, rgba(29, 41, 33, 0.3) 100%)",
      }} />
      <div className="relative z-10 max-w-[1240px] mx-auto flex items-center" style={{
        minHeight: "480px",
        padding: "60px 24px",
      }}>
        <div style={{ maxWidth: "520px" }}>
          <FadeIn>
            <h2 style={{
              margin: "0 0 20px",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 500,
              lineHeight: 1.2,
              color: "#f5f1ea",
            }}>
              Not a sympathy card.<br />
              Not a text message.<br />
              <em style={{ fontStyle: "italic", color: "rgba(245, 241, 234, 0.7)" }}>A real letter, in their hands.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{
              margin: "0 0 28px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.85,
              color: "rgba(245, 241, 234, 0.72)",
            }}>
              Every letter is written on premium cotton stationery, hand-addressed, stamped, 
              and mailed. The person who receives it knows — this was not automated. 
              Someone sat down and meant this.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   COMING SOON: CARD DECKS
   ═══════════════════════════════════════════════════════ */
function DecksSection() {
  return (
    <section style={{
      background: "var(--mm-cream)",
      padding: "clamp(64px, 8vw, 96px) 24px",
      borderTop: "1px solid var(--mm-line)",
    }}>
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-[500px]">
            <FadeIn>
              <p style={{
                margin: "0 0 12px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--mm-burgundy)",
              }}>
                In Development
              </p>
              <h2 style={{
                margin: 0,
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                color: "var(--mm-forest)",
              }}>
                Guided Card Decks
              </h2>
              <p style={{
                marginTop: "16px",
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--mm-ink-soft)",
              }}>
                Gentle structure for the moments when words are hard to find. 
                Our themed decks provide the prompts you need to say what you mean.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.1}>
            <div className="px-5 py-2 rounded-full border border-mm-line font-sans text-[0.7rem] font-semibold tracking-widest uppercase text-mm-ink-muted">
              Coming Soon
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Grief & Hard Seasons", desc: "For when there are no words, but you want to stay close." },
            { title: "Milestones & Gratitude", desc: "For naming the specific things that matter most." },
            { title: "Apology & Repair", desc: "For finding a clean starting point for reconciliation." },
          ].map((deck, i) => (
            <FadeIn key={i} delay={0.1 * (i + 1)}>
              <div className="group relative bg-white/40 border border-mm-line p-8 transition-all hover:bg-white/60">
                <h3 className="font-serif text-xl mb-3 text-mm-forest">{deck.title}</h3>
                <p className="font-sans text-sm text-mm-ink-soft leading-relaxed">{deck.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section id="send" style={{
      background: "var(--mm-forest)",
      padding: "clamp(64px, 8vw, 96px) 24px",
      position: "relative",
    }}>
      <div className="relative z-10 max-w-[680px] mx-auto text-center">
        <FadeIn>
          <h2 style={{
            margin: "0 0 24px",
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
            fontWeight: 500,
            lineHeight: 1.15,
            color: "#f5f1ea",
          }}>
            Someone came to mind<br />
            just now, didn't they?
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            margin: "0 auto 36px",
            maxWidth: "480px",
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            lineHeight: 1.85,
            color: "rgba(245, 241, 234, 0.68)",
          }}>
            That thought is worth something. Don't let it pass. Say what you mean on real paper — 
            and put it in their hands.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <Link
            href="/send"
            className="no-underline inline-flex items-center justify-center transition-all duration-200"
            style={{
              minHeight: "54px",
              padding: "0 32px",
              borderRadius: "999px",
              background: "#f5f1ea",
              color: "var(--mm-forest)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Send a Letter — $15
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <QuoteStrip />
      <WhatWeDo />
      <VisualProof />
      <DecksSection />
      <FinalCTA />
    </PageShell>
  );
}
