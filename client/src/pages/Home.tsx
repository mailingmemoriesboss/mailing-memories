/**
 * MAILING MEMORIES — "The Writing Desk" Landing Page
 * 
 * Design Philosophy: Wabi-sabi meets editorial stationery.
 * Every element feels placed by hand. Texture over flatness.
 * Horizontal flow over vertical stacking. Restraint as luxury.
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { PageShell, FadeIn } from "@/components/Layout";

/* ─── CDN Image URLs ─── */
const IMAGES = {
  heroDesk: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hero-desk-atmosphere-P8UMTNZD3BSYLVuuy22JRa.webp",
  handWritingToday: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-writing-today_baf52ba5.png",
};

/* ─── Tonal Hierarchy Data ─── */
const DECK_THEMES = {
  "In the Hard Season": {
    base: "#5C6B73",
    bg: "#E6EEF0",
    header: "#455A64",
    text: "#263238",
  },
  "The Caregiver": {
    base: "#8A9A86",
    bg: "#F0F3EF",
    header: "#6B7D6A",
    text: "#3C473B",
  },
  "Letters I Never Sent": {
    base: "#3A3F44",
    bg: "#EBECEE",
    header: "#2C3034",
    text: "#1A1D1F",
  },
  "The Long Friendship": {
    base: "#C87964",
    bg: "#F8EDE9",
    header: "#A65F4D",
    text: "#5C352B",
  },
  "Love That Isn't Romantic": {
    base: "#D4A5A5",
    bg: "#FDF4F4",
    header: "#B08484",
    text: "#6B4F4F",
  },
  "Gratitude": {
    base: "#D9A05B",
    bg: "#FFF9EC",
    header: "#B3824A",
    text: "#6B4F2C",
  },
  "Just Because": {
    base: "#F2C9C9",
    bg: "#FFF8F8",
    header: "#D1A7A7",
    text: "#8C6A6A",
  },
  "Admiration & Character": {
    base: "#2C3E50",
    bg: "#E8EDF2",
    header: "#213040",
    text: "#15202B",
  },
  "Growth & Pride": {
    base: "#4A6741",
    bg: "#EFF2EE",
    header: "#3A5235",
    text: "#243321",
  },
  "Legacy": {
    base: "#5D4A66",
    bg: "#EEEBF0",
    header: "#4B3B52",
    text: "#2E2432",
  },
};

const QUOTES = [
  { deck: "In the Hard Season", line: "I am not going to tell you it will pass. I am just going to stay close while it is here." },
  { deck: "The Long Friendship", line: "Most of what we have built together happened in ordinary moments that did not announce themselves as important." },
  { deck: "Gratitude", line: "The world is easier to be in because people like you exist in it." },
  { deck: "Love That Isn't Romantic", line: "I do not say this enough, and when I do say it, it does not come out the way I mean it. So I am writing it instead." },
  { deck: "Just Because", line: "You were in my mind today and I did not want to just let that pass." },
  { deck: "The Caregiver", line: "Most of what you do is not visible to anyone but you. I want you to know I have been paying attention." },
  { deck: "Admiration & Character", line: "You did the right thing when the easier thing was sitting right there. I want to say that I noticed." },
  { deck: "Growth & Pride", line: "I can see the difference. It is not subtle anymore and I want to say something about it." },
  { deck: "Legacy", line: "You made something real. Not everyone does. I want to say that clearly." },
  { deck: "Letters I Never Sent", line: "You were gone before I found the words. I have found them now." },
];

const DECKS = [
  { title: "Grief & Hard Seasons", desc: "For when there are no words, but you want to stay close.", theme: DECK_THEMES["In the Hard Season"] },
  { title: "Milestones & Gratitude", desc: "For naming the specific things that matter most.", theme: DECK_THEMES["Gratitude"] },
  { title: "Apology & Repair", desc: "For finding a clean starting point for reconciliation.", theme: DECK_THEMES["Just Because"] },
  { title: "The Caregiver", desc: "For honoring the invisible work that sustains us.", theme: DECK_THEMES["The Caregiver"] },
  { title: "The Long Friendship", desc: "For celebrating the history built in ordinary moments.", theme: DECK_THEMES["The Long Friendship"] },
];

/* ─── Swipeable Carousel Component ─── */
function SwipeCarousel({ items, renderItem, autoPlay = true, interval = 6000 }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => paginate(1), interval);
    return () => clearInterval(timer);
  }, [index, autoPlay]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prevIndex) => (prevIndex + newDirection + items.length) % items.length);
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
    if (swipe) {
      paginate(offset.x > 0 ? -1 : 1);
    }
  };

  return (
    <div className="relative overflow-hidden w-full flex flex-col items-center">
      <div className="relative w-full flex justify-center items-center min-h-[300px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
              center: { zIndex: 1, x: 0, opacity: 1 },
              exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full flex justify-center cursor-grab active:cursor-grabbing"
          >
            {renderItem(items[index], index)}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex gap-2 mt-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? "bg-mm-ink w-4" : "bg-mm-ink/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

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

      <div className="relative z-20 max-w-[1240px] mx-auto px-6 pt-32 pb-16 flex flex-col items-center text-center">
        <FadeIn>
          <p className="font-sans text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-mm-burgundy mb-5">
            Established in the hard seasons
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1 className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-mm-forest mb-6">
            The things that deserve<br />
            <em className="italic text-mm-burgundy">more than a text.</em>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="font-sans text-[clamp(1rem,1.2vw,1.2rem)] leading-[1.8] font-medium text-mm-ink-soft max-w-[600px] mb-12">
            Mailing Memories is a handwritten letter service for the moments when 
            digital isn't enough. We write, address, and mail real letters on your behalf — 
            so the people who matter truly feel seen.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <Link
            href="/send"
            className="no-underline inline-flex items-center justify-center transition-all duration-200 h-14 px-9 rounded-full bg-mm-forest text-[#f7f2eb] font-sans text-[0.8rem] font-semibold tracking-widest uppercase shadow-xl hover:scale-105"
          >
            Send a Letter
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ROTATING QUOTES CAROUSEL (TONAL)
   ═══════════════════════════════════════════════════════ */
function QuotesCarousel() {
  return (
    <section className="bg-mm-walnut py-16 px-6 overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        <SwipeCarousel
          items={QUOTES}
          renderItem={(quote) => {
            const theme = DECK_THEMES[quote.deck] || DECK_THEMES["In the Hard Season"];
            return (
              <div className="text-center px-4 w-full max-w-[800px]">
                <p 
                  className="font-sans text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-4 transition-colors duration-500"
                  style={{ color: theme.base }}
                >
                  From {quote.deck}
                </p>
                <blockquote
                  className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-normal italic leading-[1.6] mb-8 transition-colors duration-500"
                  style={{ color: theme.bg }}
                >
                  "{quote.line}"
                </blockquote>
                <Link
                  href={`/send?message=${encodeURIComponent(quote.line)}&deck=${encodeURIComponent(quote.deck)}`}
                  className="no-underline inline-flex items-center justify-center transition-all duration-300 h-12 px-7 rounded-full border font-sans text-[0.75rem] font-semibold tracking-widest uppercase hover:bg-white/10"
                  style={{ borderColor: theme.base, color: theme.bg }}
                >
                  Use This Quote
                </Link>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   HOW IT WORKS (WITH BACKGROUND IMAGE)
   ═══════════════════════════════════════════════════════ */
function WhatWeDo() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-mm-cream">
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("${IMAGES.handWritingToday}")`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      />
      <div className="relative z-10 max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <p className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-mm-burgundy mb-4">
              How it works
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-medium leading-tight text-mm-forest mb-8">
              Turn intention into<br />
              <em className="italic text-mm-burgundy">mailed follow-through.</em>
            </h2>
            <div className="w-16 h-1 bg-mm-burgundy/20 mb-8" />
            <p className="font-sans text-[1.05rem] leading-[1.85] text-mm-ink-soft mb-8">
              Mailing Memories helps you follow through on meaningful written connection. 
              We write, stamp, and mail one full handwritten page on quality cardstock for $15. 
              If you feel stuck on the wording, light help getting started is available.
            </p>
            <Link
              href="/send"
              className="no-underline inline-flex items-center font-sans text-[0.8rem] font-bold tracking-widest uppercase text-mm-forest group"
            >
              Start Writing
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   DECKS SECTION (PROMPT CARDS CAROUSEL)
   ═══════════════════════════════════════════════════════ */
function DecksSection() {
  return (
    <section className="py-24 px-6 bg-[#fcfaf7]">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <FadeIn>
              <p className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-mm-burgundy mb-4">
                The Library
              </p>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-medium text-mm-forest">
                Guided Card Decks
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-mm-cream border border-mm-line font-sans text-[0.65rem] font-bold tracking-widest uppercase text-mm-ink-muted">
              Coming Soon
            </div>
          </FadeIn>
        </div>

        <SwipeCarousel
          autoPlay={false}
          items={DECKS}
          renderItem={(deck) => (
            <div 
              className="w-full max-w-[400px] aspect-[3/4] p-8 flex flex-col justify-between shadow-2xl rounded-sm border-t-[12px] transition-all duration-500"
              style={{ 
                backgroundColor: deck.theme.bg,
                borderTopColor: deck.theme.header,
                boxShadow: `0 20px 40px -10px ${deck.theme.base}33`
              }}
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <div className="w-12 h-[1px]" style={{ backgroundColor: deck.theme.header }} />
                  <span className="font-sans text-[0.6rem] font-bold tracking-widest uppercase opacity-40" style={{ color: deck.theme.text }}>MM-PROMPT</span>
                </div>
                <h3 className="font-serif text-3xl mb-6 leading-tight" style={{ color: deck.theme.text }}>{deck.title}</h3>
                <p className="font-sans text-sm leading-relaxed opacity-80" style={{ color: deck.theme.text }}>{deck.desc}</p>
              </div>
              
              <div className="pt-8 border-t border-black/5 flex justify-between items-center">
                <span className="font-sans text-[0.65rem] font-bold tracking-widest uppercase opacity-50" style={{ color: deck.theme.text }}>Volume 01</span>
                <div className="w-8 h-8 rounded-full border flex items-center justify-center opacity-30" style={{ borderColor: deck.theme.text }}>
                  <span className="text-[10px]" style={{ color: deck.theme.text }}>✎</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section id="send" className="bg-mm-forest py-24 px-6 relative overflow-hidden">
      <div className="relative z-10 max-w-[680px] mx-auto text-center">
        <FadeIn>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.15] text-[#f5f1ea] mb-6">
            Someone came to mind<br />
            just now, didn't they?
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-sans text-base leading-[1.85] text-white/70 max-w-[480px] mx-auto mb-10">
            That thought is worth something. Don't let it pass. Say what you mean on real paper — 
            and put it in their hands.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <Link
            href="/send"
            className="no-underline inline-flex items-center justify-center transition-all duration-200 h-14 px-8 rounded-full bg-[#f5f1ea] text-mm-forest font-sans text-[0.78rem] font-semibold tracking-widest uppercase hover:scale-105"
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
      <QuotesCarousel />
      <WhatWeDo />
      <DecksSection />
      <FinalCTA />
    </PageShell>
  );
}
