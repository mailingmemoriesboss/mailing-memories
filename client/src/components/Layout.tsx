import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Link, useLocation } from "wouter";

export function TrustBar() {
  return (
    <div
      style={{
        background: "var(--mm-forest)",
        color: "#f7f2eb",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="max-w-[1180px] mx-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-center"
        style={{
          minHeight: "38px",
          padding: "9px 20px",
          fontFamily: "var(--font-sans)",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.03em",
        }}
      >
        <span>Handwritten by a real person</span>
        <span aria-hidden="true" style={{ opacity: 0.45 }}>•</span>
        <span>Mailed in 1–2 business days</span>
        <span aria-hidden="true" style={{ opacity: 0.45 }}>•</span>
        <span>Secure checkout with Stripe</span>
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
        background: "rgba(250, 247, 242, 0.96)",
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
              fontSize: "clamp(1.35rem, 3vw, 1.7rem)",
              fontWeight: 600,
              color: "var(--mm-forest)",
              letterSpacing: "-0.01em",
            }}
          >
            Mailing Memories
          </span>
          <span
            className="hidden sm:block"
            style={{
              marginTop: "4px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
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
                  fontSize: "0.74rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
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
                borderRadius: "4px",
                background: "var(--mm-forest)",
                color: "#f7f2eb",
                fontFamily: "var(--font-sans)",
                fontSize: "0.74rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
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
          <Link
            href="/"
            className="block no-underline py-4"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--mm-forest)",
              borderBottom: "1px solid var(--mm-line)",
            }}
          >
            Home
          </Link>
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block no-underline py-4"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                fontWeight: 600,
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
            className="no-underline inline-flex items-center justify-center mt-5 w-full"
            style={{
              minHeight: "50px",
              borderRadius: "4px",
              background: "var(--mm-forest)",
              color: "#f7f2eb",
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              fontWeight: 700,
            }}
          >
            Send a Card — $15
          </Link>
        </div>
      )}
    </nav>
  );
}

export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

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
          transition: "transform 0.7s ease",
        }}
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--mm-forest)",
        color: "#f7f2eb",
        padding: "52px 24px 30px",
      }}
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <p
              style={{
                margin: "0 0 10px",
                fontFamily: "var(--font-serif)",
                fontSize: "1.65rem",
                fontWeight: 600,
              }}
            >
              Mailing Memories
            </p>
            <p
              style={{
                margin: 0,
                maxWidth: "390px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.88rem",
                lineHeight: 1.75,
                color: "rgba(247,242,235,0.72)",
              }}
            >
              You write the message. I handwrite it on quality cardstock, address the envelope, add postage, and mail it for you.
            </p>
          </div>

          <div className="md:col-span-3">
            <p
              style={{
                margin: "0 0 14px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(247,242,235,0.5)",
              }}
            >
              Information
            </p>
            {[{ label: "Send a Card", href: "/send" }, { label: "Plan Ahead", href: "/plan" }, { label: "Find Your Words", href: "/messages" }, { label: "FAQ", href: "/faq" }, { label: "Customer & Privacy Policies", href: "/policies" }].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block no-underline"
                style={{
                  padding: "5px 0",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.84rem",
                  color: "rgba(247,242,235,0.76)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:col-span-4">
            <p
              style={{
                margin: "0 0 14px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(247,242,235,0.5)",
              }}
            >
              Questions
            </p>
            <a
              href="mailto:hello@mailingmemories.com"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "#f7f2eb",
                textDecoration: "none",
              }}
            >
              hello@mailingmemories.com
            </a>
            <p
              style={{
                margin: "12px 0 0",
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                lineHeight: 1.65,
                color: "rgba(247,242,235,0.58)",
              }}
            >
              U.S. mailing only. Standard orders are mailed within 1–2 business days.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "42px",
            paddingTop: "22px",
            borderTop: "1px solid rgba(247,242,235,0.14)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              color: "rgba(247,242,235,0.46)",
            }}
          >
            &copy; {new Date().getFullYear()} Mailing Memories. All rights reserved.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              color: "rgba(247,242,235,0.46)",
            }}
          >
            Secure checkout provided by Stripe.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--mm-cream-soft)" }}>
      <TrustBar />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
