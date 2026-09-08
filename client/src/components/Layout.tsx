import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Link, useLocation } from "wouter";

const TAGLINE_PHRASES = [
  "the person you keep thinking about",
  "the words that matter",
  "showing up from far away",
  "a small thank-you",
  "an ordinary Tuesday",
  "the thing you meant to say",
];

export function RotatingTagline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % TAGLINE_PHRASES.length);
        setVisible(true);
      }, 280);
    }, 4300);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background: "#eee7dc",
        borderBottom: "1px solid rgba(29,41,33,0.09)",
        color: "var(--mm-forest)",
      }}
    >
      <div
        className="max-w-[1180px] mx-auto flex items-center justify-center text-center"
        style={{ minHeight: "42px", padding: "8px 18px" }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.76rem, 2.1vw, 0.86rem)",
            lineHeight: 1.4,
            color: "var(--mm-forest)",
          }}
        >
          Because{" "}
          <span
            key={index}
            style={{
              display: "inline-block",
              minWidth: "clamp(150px, 34vw, 245px)",
              fontFamily: "var(--font-handwriting)",
              fontSize: "1.08em",
              color: "var(--mm-pen-blue)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(3px)",
              transition: "opacity 260ms ease, transform 260ms ease",
            }}
          >
            {TAGLINE_PHRASES[index]}
          </span>{" "}
          deserves real paper.
        </p>
      </div>
    </div>
  );
}

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { label: "Plan Ahead", href: "/plan" },
    { label: "Find Your Words", href: "/messages" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <nav
      className="sticky top-0 z-40"
      style={{
        background: "rgba(250,247,242,0.96)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--mm-line)",
      }}
    >
      <div
        className="max-w-[1180px] mx-auto flex items-center justify-between gap-6"
        style={{ minHeight: "70px", padding: "0 24px" }}
      >
        <Link href="/" className="no-underline flex flex-col" style={{ lineHeight: 1.08 }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.28rem, 3vw, 1.6rem)",
              fontWeight: 600,
              color: "var(--mm-forest)",
              letterSpacing: "-0.02em",
            }}
          >
            Mailing Memories
          </span>
          <span
            className="hidden sm:block"
            style={{
              marginTop: "4px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.64rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "var(--mm-ink-muted)",
            }}
          >
            Handwritten cards, mailed for you.
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="no-underline inline-flex items-center"
                style={{
                  minHeight: "40px",
                  padding: "0 13px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.76rem",
                  fontWeight: 600,
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
              className="no-underline inline-flex items-center justify-center"
              style={{
                minHeight: "42px",
                padding: "0 18px",
                borderRadius: "6px",
                background: "var(--mm-forest)",
                color: "#f7f2eb",
                fontFamily: "var(--font-sans)",
                fontSize: "0.76rem",
                fontWeight: 700,
              }}
            >
              Send a Card — $15
            </Link>
          </li>
        </ul>

        <button
          className="lg:hidden flex flex-col gap-[5px] bg-transparent border-none p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="block w-[22px] h-[1.5px]" style={{ background: "var(--mm-ink)" }} />
          <span className="block w-[22px] h-[1.5px]" style={{ background: "var(--mm-ink)" }} />
          <span className="block w-[22px] h-[1.5px]" style={{ background: "var(--mm-ink)" }} />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{
            padding: "4px 24px 24px",
            borderTop: "1px solid var(--mm-line)",
            background: "var(--mm-cream-soft)",
          }}
        >
          <Link href="/" className="block no-underline py-4" onClick={() => setMobileOpen(false)} style={mobileLinkStyle}>
            Home
          </Link>
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className="block no-underline py-4" onClick={() => setMobileOpen(false)} style={mobileLinkStyle}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/send"
            onClick={() => setMobileOpen(false)}
            className="no-underline inline-flex items-center justify-center mt-5 w-full"
            style={{ minHeight: "50px", borderRadius: "6px", background: "var(--mm-forest)", color: "#f7f2eb", fontFamily: "var(--font-sans)", fontSize: "0.84rem", fontWeight: 700 }}
          >
            Send a Card — $15
          </Link>
        </div>
      )}
    </nav>
  );
}

const mobileLinkStyle = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "var(--mm-forest)",
  borderBottom: "1px solid var(--mm-line)",
};

export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className={className} style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(10px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export function PenStroke({ className = "", color = "var(--mm-line-strong)" }: { className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <div style={{ height: "1px", background: color, transformOrigin: "left", transform: isInView ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.65s ease" }} />
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "var(--mm-forest)", color: "#f7f2eb", padding: "50px 24px 28px" }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <p style={{ margin: "0 0 10px", fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 600 }}>Mailing Memories</p>
            <p style={{ margin: 0, maxWidth: "390px", fontFamily: "var(--font-sans)", fontSize: "0.88rem", lineHeight: 1.75, color: "rgba(247,242,235,0.72)" }}>
              You write the message. I handwrite it on a folded cardstock card, address the envelope, add postage, and mail it for you.
            </p>
          </div>

          <div className="md:col-span-3">
            <p style={footerLabelStyle}>Information</p>
            {[{ label: "Send a Card", href: "/send" }, { label: "Plan Ahead", href: "/plan" }, { label: "Find Your Words", href: "/messages" }, { label: "FAQ", href: "/faq" }, { label: "Customer & Privacy Policies", href: "/policies" }].map((link) => (
              <Link key={link.label} href={link.href} className="block no-underline" style={{ padding: "5px 0", fontFamily: "var(--font-sans)", fontSize: "0.84rem", color: "rgba(247,242,235,0.76)" }}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:col-span-4">
            <p style={footerLabelStyle}>Questions</p>
            <a href="mailto:mailingmemoriesboss@gmail.com" style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "#f7f2eb", textDecoration: "none" }}>
              Email Mailing Memories
            </a>
            <p style={{ margin: "12px 0 0", fontFamily: "var(--font-sans)", fontSize: "0.8rem", lineHeight: 1.65, color: "rgba(247,242,235,0.58)" }}>
              U.S. mailing only. Standard orders are mailed within 1–2 business days.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "14px" }}>
              <a href="https://www.facebook.com/share/1H5deSru5W/" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}>Facebook</a>
              <a href="https://www.instagram.com/themailingmemories?igsh=MTR4NnhtcDhnaXB5Mg==" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}>Instagram</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "42px", paddingTop: "22px", borderTop: "1px solid rgba(247,242,235,0.14)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px" }}>
          <p style={footerFinePrintStyle}>&copy; {new Date().getFullYear()} Mailing Memories. All rights reserved.</p>
          <p style={footerFinePrintStyle}>Secure checkout provided by Stripe.</p>
        </div>
      </div>
    </footer>
  );
}

const footerLabelStyle = {
  margin: "0 0 14px",
  fontFamily: "var(--font-sans)",
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "rgba(247,242,235,0.5)",
};

const socialLinkStyle = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.8rem",
  color: "rgba(247,242,235,0.72)",
  textDecoration: "none",
};

const footerFinePrintStyle = {
  margin: 0,
  fontFamily: "var(--font-sans)",
  fontSize: "0.72rem",
  color: "rgba(247,242,235,0.46)",
};

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--mm-cream-soft)" }}>
      <RotatingTagline />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
