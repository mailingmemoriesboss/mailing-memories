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

import { useState, useEffect, useRef } from "react";
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
                What we do
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
                We sell the relief of<br />
                <em style={{ fontStyle: "italic", color: "var(--mm-burgundy)" }}>knowing what to say.</em>
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
                Mailing Memories removes the blank-page paralysis. Our concierge service writes, 
                addresses, and mails a handwritten letter on your behalf — even when you don't have the right words.
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
   CONCIERGE SERVICE SECTION
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
            Concierge Letter Service
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
            Tell us who it's for and what you want to say. We write the letter, hand-address the envelope, 
            and mail it — so the people who matter hear from you, even when life gets in the way.
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
   HOW IT WORKS
   ═══════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Choose Your Card", desc: "Select from our curated collection of premium cotton stationery." },
    { num: "02", title: "Share Your Message", desc: "Type what you'd like to say, or give us a few details and we'll write it for you." },
    { num: "03", title: "We Handle the Rest", desc: "We hand-write your message, address the envelope, and mail it with a real stamp." },
  ];

  return (
    <section id="how" style={{ background: "var(--mm-cream)", padding: "clamp(64px, 8vw, 96px) 24px" }}>
      <div className="max-w-[1240px] mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-8">
            {steps.map((step) => (
              <div key={step.num} className="flex-1 p-8 border border-mm-line bg-white/40">
                <span className="block mb-4 font-serif text-3xl text-mm-burgundy opacity-30">{step.num}</span>
                <h3 className="mb-3 font-serif text-xl font-semibold text-mm-forest">{step.title}</h3>
                <p className="text-mm-ink-soft leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
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
            That thought is worth something. Don't let it pass. Write it down, or let us write it for you — 
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
            Start Writing
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE — Assembly
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <QuoteStrip />
      <WhatWeDo />
      <ServicesSection />
      <HowItWorks />
      <VisualProof />
      <FinalCTA />
    </PageShell>
  );
}
