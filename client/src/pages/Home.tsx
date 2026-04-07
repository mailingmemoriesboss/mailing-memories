/**
 * MAILING MEMORIES — "The Writing Desk" Landing Page
 * 
 * Design Philosophy: Wabi-sabi meets editorial stationery.
 * Every element feels placed by hand. Texture over flatness.
 * Horizontal flow over vertical stacking. Restraint as luxury.
 * 
 * Typography: Cormorant Garamond (serif, emotional) + DM Sans (sans, functional)
 * Palette: Warm cream, walnut, burgundy, pen-blue, forest green
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
};

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "clamp(600px, 85vh, 900px)" }}>
      {/* Background Atmosphere */}
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
            Thoughtful correspondence on real paper
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
            Say what you mean.<br />
            <em style={{ fontStyle: "italic", color: "var(--mm-burgundy)" }}>We will handwrite and mail it.</em>
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
            Mailing Memories is a thoughtful correspondence brand. Right now, our main live offer is a 
            handwritten letter service for when you don't have the time or the words. 
            We write, stamp, and mail real letters on your behalf.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="flex flex-col sm:flex-row items-center gap-5">
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
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(29, 41, 33, 0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(29, 41, 33, 0.15)";
              }}
            >
              Send a Letter
            </Link>
          </div>
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
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   WHAT WE DO
   ═══════════════════════════════════════════════════════ */
function WhatWeDo() {
  return (
    <section id="about" style={{
      background: "var(--mm-cream)",
      padding: "clamp(48px, 6vw, 80px) 24px",
    }}>
      <div className="max-w-[1240px] mx-auto">
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

          <div className="lg:col-span-7 relative">
            <FadeIn delay={0.2}>
              <div className="relative">
                <img
                  src={IMAGES.handWritingToday}
                  alt="A hand writing 'I wanted to write you something today' on cream stationery"
                  className="w-full"
                  style={{
                    borderRadius: "2px",
                    boxShadow: "0 24px 60px rgba(61, 43, 31, 0.15)",
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SERVICE SECTION
   ═══════════════════════════════════════════════════════ */
function ServicesSection() {
  return (
    <section style={{
      background: "var(--mm-forest)",
      padding: "clamp(64px, 10vw, 100px) 24px",
      position: "relative",
    }}>
      <div className="max-w-[800px] mx-auto text-center">
        <FadeIn>
          <h2 style={{
            margin: "0 0 24px",
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
            fontWeight: 500,
            lineHeight: 1.1,
            color: "#f5f1ea",
          }}>
            Handwritten Letter Service
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            margin: "0 auto 40px",
            fontFamily: "var(--font-sans)",
            fontSize: "1.1rem",
            lineHeight: 1.8,
            color: "rgba(245, 241, 234, 0.8)",
            maxWidth: "600px",
          }}>
            Tell us who it's for and what you want to say. We hand-write the letter, address the envelope, 
            and mail it within 1–2 business days. It’s a simple way to show up when you can’t find the time.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <Link
            href="/send"
            className="no-underline inline-flex items-center justify-center transition-all duration-200"
            style={{
              minHeight: "56px",
              padding: "0 40px",
              borderRadius: "999px",
              background: "#f5f1ea",
              color: "var(--mm-forest)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Send a letter — $15
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FINAL CALL TO ACTION
   ═══════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section style={{
      background: "var(--mm-cream)",
      padding: "clamp(80px, 12vw, 140px) 24px",
      textAlign: "center",
    }}>
      <div className="max-w-[700px] mx-auto">
        <FadeIn>
          <h2 style={{
            margin: "0 0 24px",
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 500,
            lineHeight: 1,
            color: "var(--mm-forest)",
          }}>
            Say what you mean<br />
            <em style={{ fontStyle: "italic", color: "var(--mm-burgundy)" }}>on real paper.</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Link
            href="/send"
            className="no-underline inline-flex items-center justify-center transition-all duration-200"
            style={{
              minHeight: "60px",
              padding: "0 48px",
              borderRadius: "999px",
              background: "var(--mm-forest)",
              color: "#f7f2eb",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              boxShadow: "0 12px 32px rgba(29, 41, 33, 0.15)",
            }}
          >
            Start Your Letter
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
      <ServicesSection />
      <FinalCTA />
    </PageShell>
  );
}
