/**
 * MAILING MEMORIES — "The Writing Desk" Landing Page
 *
 * Conversion goal: make the current live handwritten-letter service
 * immediately understandable and easy to buy while keeping writing help
 * available as support rather than a competing offer.
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { PageShell, FadeIn, PenStroke } from "@/components/Layout";

const IMAGES = {
  handEnvelopeCard:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-envelope-card_d47e65e0.png",
  handWritingToday:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-writing-today_baf52ba5.png",
  heroDesk:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hero-desk-atmosphere-P8UMTNZD3BSYLVuuy22JRa.webp",
};

const QUOTES = [
  {
    deck: "In the Hard Season",
    line: "I am not going to tell you it will pass. I am just going to stay close while it is here.",
  },
  {
    deck: "The Long Friendship",
    line: "Most of what we have built together happened in ordinary moments that did not announce themselves as important.",
  },
  {
    deck: "Gratitude",
    line: "The world is easier to be in because people like you exist in it.",
  },
  {
    deck: "Love That Isn't Romantic",
    line: "I do not say this enough, and when I do say it, it does not come out the way I mean it. So I am writing it instead.",
  },
  {
    deck: "Just Because",
    line: "You were in my mind today and I did not want to just let that pass.",
  },
  {
    deck: "The Caregiver",
    line: "Most of what you do is not visible to anyone but you. I want you to know I have been paying attention.",
  },
];

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(620px, 88vh, 900px)" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${IMAGES.heroDesk}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(245, 241, 234, 0.45) 0%, rgba(245, 241, 234, 0.88) 62%, var(--mm-cream) 100%)",
        }}
      />

      <div className="relative z-20 max-w-[1240px] mx-auto px-6 pt-28 pb-16 flex flex-col items-center text-center">
        <FadeIn delay={0.08}>
          <p
            style={{
              margin: "0 0 18px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--mm-burgundy)",
            }}
          >
            Personal Correspondence Concierge
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1
            style={{
              margin: "0 0 24px",
              maxWidth: "980px",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 500,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              color: "var(--mm-forest)",
            }}
          >
            The message you’ve been meaning to send.
          </h1>
        </FadeIn>

        <FadeIn delay={0.24}>
          <p
            style={{
              margin: "0 auto 24px",
              maxWidth: "660px",
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
              lineHeight: 1.8,
              fontWeight: 500,
              color: "var(--mm-ink-soft)",
            }}
          >
            You provide the words. We handwrite them on quality cardstock,
            address the envelope, add the stamp, and mail the letter for you.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p
            style={{
              margin: "0 auto 32px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--mm-ink-muted)",
            }}
          >
            One full handwritten page · envelope &amp; U.S. postage included · $15
          </p>
        </FadeIn>

        <FadeIn delay={0.38}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <Link
              href="/send"
              className="no-underline inline-flex items-center justify-center transition-all duration-200"
              style={{
                minHeight: "58px",
                padding: "0 38px",
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
              Send Your Letter — $15
            </Link>

            <Link
              href="/messages"
              className="no-underline transition-all duration-200"
              style={{
                color: "var(--mm-forest)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.84rem",
                fontWeight: 600,
                borderBottom: "1px solid rgba(29, 41, 33, 0.35)",
                paddingBottom: "3px",
              }}
            >
              Not sure what to say? Find your words →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Write what you mean",
      text: "Type the message you want them to receive. If the words are hard to find, use our guided message ideas first.",
    },
    {
      number: "02",
      title: "Tell us where it goes",
      text: "Add the recipient address, your return address, and choose a future mailing date if you want to plan ahead.",
    },
    {
      number: "03",
      title: "We put it on real paper",
      text: "We handwrite your message, address the envelope, stamp it, and place it in the mail. No printer pretending to be a pen.",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ padding: "clamp(72px, 8vw, 104px) 24px" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${IMAGES.handWritingToday}")`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(245, 241, 234, 0.99) 0%, rgba(245, 241, 234, 0.94) 56%, rgba(245, 241, 234, 0.55) 100%)",
        }}
      />

      <div className="max-w-[1240px] mx-auto relative z-10">
        <FadeIn>
          <p
            style={{
              margin: "0 0 12px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--mm-burgundy)",
            }}
          >
            How it works
          </p>
          <h2
            style={{
              margin: 0,
              maxWidth: "650px",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              color: "var(--mm-forest)",
            }}
          >
            From “I should write them” to
            <em style={{ fontStyle: "italic", color: "var(--mm-burgundy)" }}>
              {" "}actually mailed.
            </em>
          </h2>
        </FadeIn>
        <PenStroke className="my-7 max-w-[80px]" color="var(--mm-burgundy)" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[980px]">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={0.08 * (index + 1)}>
              <div
                style={{
                  height: "100%",
                  padding: "28px",
                  background: "rgba(255,255,255,0.64)",
                  border: "1px solid var(--mm-line)",
                }}
              >
                <p
                  style={{
                    margin: "0 0 18px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "var(--mm-burgundy)",
                  }}
                >
                  {step.number}
                </p>
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.35rem",
                    fontWeight: 500,
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

        <FadeIn delay={0.36}>
          <div style={{ marginTop: "34px" }}>
            <Link
              href="/send"
              className="no-underline inline-flex items-center justify-center"
              style={{
                minHeight: "50px",
                padding: "0 28px",
                borderRadius: "999px",
                background: "var(--mm-forest)",
                color: "#f7f2eb",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
              }}
            >
              Start Your Letter
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

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
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(29, 41, 33, 0.9) 0%, rgba(29, 41, 33, 0.68) 52%, rgba(29, 41, 33, 0.28) 100%)",
        }}
      />
      <div
        className="relative z-10 max-w-[1240px] mx-auto flex items-center"
        style={{ minHeight: "480px", padding: "60px 24px" }}
      >
        <div style={{ maxWidth: "540px" }}>
          <FadeIn>
            <p
              style={{
                margin: "0 0 14px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(245, 241, 234, 0.7)",
              }}
            >
              Human, on purpose
            </p>
            <h2
              style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.9rem, 3vw, 2.8rem)",
                fontWeight: 500,
                lineHeight: 1.2,
                color: "#f5f1ea",
              }}
            >
              A real message deserves to feel like one.
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "0.96rem",
                lineHeight: 1.85,
                color: "rgba(245, 241, 234, 0.76)",
              }}
            >
              Every order is handwritten by Mailing Memories, placed in a
              hand-addressed envelope, stamped, and mailed. The technology stays
              behind the scenes. What arrives is simply a personal piece of paper
              from one person to another.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function QuotesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRevealing(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
        setIsRevealing(true);
      }, 450);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = QUOTES[currentIndex];

  return (
    <section
      style={{
        background: "var(--mm-walnut)",
        padding: "clamp(56px, 7vw, 86px) 24px",
      }}
    >
      <div className="max-w-[900px] mx-auto text-center">
        <FadeIn>
          <p
            style={{
              margin: "0 0 14px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(245, 241, 234, 0.62)",
            }}
          >
            Need a starting point? · From {currentQuote.deck}
          </p>
          <blockquote
            key={currentIndex}
            style={{
              margin: "0 auto",
              maxWidth: "820px",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.55rem, 3.5vw, 2.55rem)",
              fontStyle: "italic",
              lineHeight: 1.55,
              color: "rgba(245, 241, 234, 0.96)",
              animation: isRevealing
                ? "fadeInUp 650ms ease-out forwards"
                : "fadeOutDown 400ms ease-in forwards",
            }}
          >
            “{currentQuote.line}”
          </blockquote>
          <Link
            href={`/send?message=${encodeURIComponent(currentQuote.line)}&deck=${encodeURIComponent(currentQuote.deck)}`}
            className="no-underline inline-flex items-center justify-center mt-8"
            style={{
              minHeight: "46px",
              padding: "0 26px",
              borderRadius: "999px",
              border: "1px solid rgba(245, 241, 234, 0.42)",
              color: "rgba(245, 241, 234, 0.94)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
            }}
          >
            Start With These Words
          </Link>
        </FadeIn>

        <div className="flex justify-center gap-2 mt-7">
          {QUOTES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to message idea ${index + 1}`}
              style={{
                width: "8px",
                height: "8px",
                padding: 0,
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                background:
                  index === currentIndex
                    ? "rgba(245, 241, 234, 0.82)"
                    : "rgba(245, 241, 234, 0.22)",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutDown {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}

function DecksSection() {
  return (
    <section
      style={{
        background: "var(--mm-cream)",
        padding: "clamp(72px, 9vw, 110px) 24px",
        borderTop: "1px solid var(--mm-line)",
      }}
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-5">
          <div className="max-w-[560px]">
            <FadeIn>
              <p
                style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--mm-burgundy)",
                }}
              >
                In development
              </p>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 500,
                  color: "var(--mm-forest)",
                }}
              >
                Guided Writing Decks
              </h2>
              <p
                style={{
                  margin: "16px 0 0",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.96rem",
                  lineHeight: 1.7,
                  color: "var(--mm-ink-soft)",
                }}
              >
                A future way to find the words yourself. The handwritten mailing
                service above is available now.
              </p>
            </FadeIn>
          </div>
          <div className="px-5 py-2 rounded-full border border-mm-line font-sans text-[0.7rem] font-semibold tracking-widest uppercase text-mm-ink-muted">
            Coming Soon
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Grief & Hard Seasons",
              desc: "For when there are no perfect words, but you still want to stay close.",
            },
            {
              title: "Milestones & Gratitude",
              desc: "For naming the specific things that deserve to be said out loud.",
            },
            {
              title: "Apology & Repair",
              desc: "For finding a clean, honest starting point when a relationship needs care.",
            },
          ].map((deck) => (
            <div
              key={deck.title}
              style={{
                padding: "28px",
                background: "rgba(255,255,255,0.42)",
                border: "1px solid var(--mm-line)",
              }}
            >
              <h3 className="font-serif text-xl mb-3 text-mm-forest">
                {deck.title}
              </h3>
              <p className="font-sans text-sm text-mm-ink-soft leading-relaxed">
                {deck.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      id="send"
      style={{
        background: "var(--mm-forest)",
        padding: "clamp(64px, 8vw, 96px) 24px",
      }}
    >
      <div className="max-w-[700px] mx-auto text-center">
        <FadeIn>
          <h2
            style={{
              margin: "0 0 20px",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 500,
              lineHeight: 1.15,
              color: "#f5f1ea",
            }}
          >
            Someone came to mind just now, didn’t they?
          </h2>
          <p
            style={{
              margin: "0 auto 30px",
              maxWidth: "520px",
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(245, 241, 234, 0.7)",
            }}
          >
            Give us the words and address. We’ll take care of the handwriting,
            envelope, stamp, and mailing.
          </p>
          <Link
            href="/send"
            className="no-underline inline-flex items-center justify-center"
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
            Send Your Letter — $15
          </Link>
          <p
            style={{
              margin: "16px 0 0",
              fontFamily: "var(--font-sans)",
              fontSize: "0.74rem",
              color: "rgba(245, 241, 234, 0.58)",
            }}
          >
            One full handwritten page · U.S. mailing included
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <HowItWorks />
      <VisualProof />
      <QuotesCarousel />
      <DecksSection />
      <FinalCTA />
    </PageShell>
  );
}
