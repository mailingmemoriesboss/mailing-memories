/**
 * MAILING MEMORIES — Shared Layout Components
 * 
 * Navigation + Footer extracted from Home for reuse across all pages.
 * Design: "The Writing Desk" — warm cream, pen-stroke accents, editorial serif.
 */

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Link, useLocation } from "wouter";

/* ─── CDN Image URLs ─── */
const IMAGES = {
  paperTexture: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/paper-texture-bg-TLD2xmpcBsfnmyqpjpBz6a.webp",
};

/* ─── Rotating tagline phrases ─── */
const ROTATING_PHRASES = [
  "meaningful written connection",
  "saying what you mean",
  "hard seasons",
  "following through",
  "a legacy of care",
  "an unprompted thought",
  "showing up when words are hard",
  "being seen on real paper",
];

/* ═══════════════════════════════════════════════════════
   ROTATING TAGLINE BAR
   ═══════════════════════════════════════════════════════ */
export function RotatingTagline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRevealing(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
        setIsRevealing(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-50" style={{ background: "#161412", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <style>{`
        @keyframes paperFlip {
          0% {
            opacity: 0;
            transform: rotateY(-90deg) rotateX(0deg);
          }
          50% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          100% {
            opacity: 1;
            transform: rotateY(0deg) rotateX(0deg);
          }
        }
        @keyframes paperFlipOut {
          0% {
            opacity: 1;
            transform: rotateY(0deg);
          }
          100% {
            opacity: 0;
            transform: rotateY(90deg);
          }
        }
      `}</style>
      <div className="max-w-[1240px] mx-auto flex items-center justify-center gap-[6px] text-center flex-wrap px-4 md:px-6"
        style={{
          minHeight: "52px",
          padding: "12px 24px",
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.82)",
        }}>
        <span>Because</span>
        <span
          className="inline-block"
          style={{
            minWidth: "120px",
            color: "#f2e9dc",
            fontWeight: 700,
            perspective: "1000px",
            animation: isRevealing ? "paperFlip 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "paperFlipOut 500ms ease-in forwards",
          }}
          key={currentIndex}
        >
          {ROTATING_PHRASES[currentIndex]}
        </span>
        <span>deserves real paper.</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════ */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Send a Card", href: "/send" },
    { label: "Plan Ahead", href: "/plan" },
    { label: "Find Your Words", href: "/messages" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <nav
      className="sticky top-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(245, 241, 234, 0.92)" : "rgba(245, 241, 234, 0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(23, 21, 19, 0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-6"
        style={{ minHeight: "72px", padding: "0 24px" }}>
        
        {/* Logo */}
        <Link href="/" className="no-underline flex flex-col" style={{ lineHeight: 1 }}>
          <span style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
            fontWeight: 600,
            color: "var(--mm-forest)",
            letterSpacing: "0.01em",
          }}>
            Mailing Memories
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="no-underline inline-flex items-center transition-colors duration-200"
                style={{
                  minHeight: "40px",
                  padding: "0 14px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: location === item.href ? "var(--mm-forest)" : "var(--mm-ink-soft)",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <Link
              href="/send"
              className="no-underline inline-flex items-center justify-center transition-all duration-200"
              style={{
                minHeight: "40px",
                padding: "0 18px",
                borderRadius: "999px",
                border: "1px solid var(--mm-forest)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--mm-forest)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--mm-forest)";
                e.currentTarget.style.color = "#f7f2eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--mm-forest)";
              }}
            >
              Send a Card
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] bg-transparent border-none p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className="block w-[22px] h-[1.5px] transition-all duration-200"
            style={{
              background: "var(--mm-ink)",
              transform: mobileOpen ? "rotate(45deg) translateY(6.5px)" : "none",
            }} />
          <span className="block w-[22px] h-[1.5px] transition-all duration-200"
            style={{
              background: "var(--mm-ink)",
              opacity: mobileOpen ? 0 : 1,
            }} />
          <span className="block w-[22px] h-[1.5px] transition-all duration-200"
            style={{
              background: "var(--mm-ink)",
              transform: mobileOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
            }} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden" style={{
          padding: "16px 24px 32px",
          borderTop: "1px solid var(--mm-line)",
          background: "rgba(245, 241, 234, 0.98)",
        }}>
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block no-underline py-4"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--mm-forest)",
                borderBottom: "1px solid var(--mm-line)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/send"
            onClick={() => setMobileOpen(false)}
            className="no-underline inline-flex items-center justify-center mt-6 w-full"
            style={{
              minHeight: "52px",
              borderRadius: "999px",
              background: "var(--mm-forest)",
              color: "#f7f2eb",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Send a Card
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   FADE-IN WRAPPER (shared)
   ═══════════════════════════════════════════════════════ */
export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PEN STROKE DIVIDER
   ═══════════════════════════════════════════════════════ */
export function PenStroke({ className = "", color = "var(--mm-line-strong)" }: { className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <div
        style={{
          height: "1px",
          background: color,
          transformOrigin: "left",
          transform: isInView ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
export function Footer() {
  return (
    <footer style={{
      background: "#161412",
      padding: "48px 24px 36px",
    }}>
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand */}
          <div className="md:col-span-5">
            <p style={{
              margin: "0 0 10px",
              fontFamily: "var(--font-serif)",
              fontSize: "1.4rem",
              fontWeight: 500,
              color: "rgba(245, 241, 234, 0.85)",
            }}>
              Mailing Memories
            </p>
            <p style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              lineHeight: 1.7,
              color: "rgba(245, 241, 234, 0.4)",
              maxWidth: "320px",
            }}>
              Handwritten letter services for the things that deserve more than a text.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <p style={{
              margin: "0 0 14px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(245, 241, 234, 0.35)",
            }}>
              Navigate
            </p>
            {[
              { label: "Send a Letter", href: "/send" },
              { label: "About", href: "/#about" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "mailto:hello@mailingmemories.com" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block no-underline transition-colors duration-200"
                style={{
                  padding: "4px 0",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  color: "rgba(245, 241, 234, 0.55)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245, 241, 234, 0.85)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 241, 234, 0.55)")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p style={{
              margin: "0 0 14px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(245, 241, 234, 0.35)",
            }}>
              Get in touch
            </p>
            <a
              href="mailto:hello@mailingmemories.com"
              className="no-underline transition-colors duration-200"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                color: "rgba(245, 241, 234, 0.55)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245, 241, 234, 0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 241, 234, 0.55)")}
            >
              hello@mailingmemories.com
            </a>
            <p style={{
              margin: "12px 0 0",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              lineHeight: 1.7,
              color: "rgba(245, 241, 234, 0.35)",
            }}>
              Waynesboro, Virginia
            </p>
          </div>
        </div>

        <div style={{
          marginTop: "40px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(245, 241, 234, 0.08)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "12px",
        }}>
          <p style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            color: "rgba(245, 241, 234, 0.3)",
          }}>
            &copy; {new Date().getFullYear()} Mailing Memories. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="no-underline transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  color: "rgba(245, 241, 234, 0.3)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245, 241, 234, 0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 241, 234, 0.3)")}
                onClick={(e) => e.preventDefault()}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE SHELL — wraps every page with tagline + nav + footer
   ═══════════════════════════════════════════════════════ */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--mm-cream)" }}>
      <RotatingTagline />
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
