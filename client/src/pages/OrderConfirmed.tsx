import { useMemo } from "react";
import { useLocation } from "wouter";
import { PageShell, FadeIn } from "@/components/Layout";

type ConfirmationData = {
  orderId?: string;
  recipientName?: string;
  recipientCity?: string;
  recipientState?: string;
  mailingDate?: string | null;
  email?: string;
  amountPaidCents?: number;
};

export default function OrderConfirmed() {
  const [, setLocation] = useLocation();

  const confirmation = useMemo<ConfirmationData | null>(() => {
    try {
      const raw = sessionStorage.getItem("mailingMemoriesConfirmation");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const mailingDateText = confirmation?.mailingDate
    ? new Date(`${confirmation.mailingDate}T12:00:00`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Within 1–2 business days";

  const amountText = `$${((confirmation?.amountPaidCents ?? 0) / 100).toFixed(2)}`;

  return (
    <PageShell>
      <section
        style={{
          minHeight: "70vh",
          padding: "clamp(54px, 8vw, 96px) 24px",
          background: "var(--mm-cream)",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FadeIn>
            <div
              style={{
                background: "rgba(255,255,255,0.72)",
                border: "1px solid var(--mm-line)",
                padding: "clamp(28px, 5vw, 48px)",
                boxShadow: "0 16px 42px rgba(0,0,0,0.05)",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--mm-burgundy)",
                }}
              >
                Order confirmed
              </p>

              <h1
                style={{
                  margin: "0 0 14px",
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 500,
                  lineHeight: 1.08,
                  color: "var(--mm-forest)",
                }}
              >
                Your letter is confirmed.
              </h1>

              <p
                style={{
                  margin: "0 0 30px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "var(--mm-ink-soft)",
                }}
              >
                Thank you. I have your order and will prepare the handwritten card and envelope for mailing.
              </p>

              {confirmation ? (
                <div
                  style={{
                    borderTop: "1px solid var(--mm-line)",
                    borderBottom: "1px solid var(--mm-line)",
                    padding: "22px 0",
                    marginBottom: "26px",
                    display: "grid",
                    gap: "14px",
                  }}
                >
                  <SummaryRow label="Order number" value={confirmation.orderId || "Confirmed"} />
                  <SummaryRow
                    label="Recipient"
                    value={
                      [
                        confirmation.recipientName,
                        [confirmation.recipientCity, confirmation.recipientState]
                          .filter(Boolean)
                          .join(", "),
                      ]
                        .filter(Boolean)
                        .join(" — ") || "Confirmed"
                    }
                  />
                  <SummaryRow label="Mailing" value={mailingDateText} />
                  <SummaryRow label="Confirmation email" value={confirmation.email || "Provided at checkout"} />
                  <SummaryRow
                    label="Amount paid"
                    value={confirmation.amountPaidCents === 0 ? `${amountText} — Complimentary` : amountText}
                  />
                </div>
              ) : (
                <div
                  style={{
                    padding: "16px 18px",
                    marginBottom: "26px",
                    border: "1px solid var(--mm-line)",
                    background: "rgba(255,255,255,0.5)",
                    fontFamily: "var(--font-sans)",
                    color: "var(--mm-ink-soft)",
                    lineHeight: 1.6,
                  }}
                >
                  Your order was confirmed. Detailed order information is no longer stored in this browser session.
                </div>
              )}

              <div
                style={{
                  padding: "20px",
                  background: "rgba(62, 92, 67, 0.08)",
                  border: "1px solid rgba(62, 92, 67, 0.18)",
                  marginBottom: "26px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 6px",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.15rem",
                    color: "var(--mm-forest)",
                  }}
                >
                  One more thing before it goes in the mail.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                    color: "var(--mm-ink-soft)",
                  }}
                >
                  On the day your letter is mailed, I’ll send a photo preview of the completed card and addressed envelope to the email you provided.
                </p>
              </div>

              <p
                style={{
                  margin: "0 0 24px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.84rem",
                  lineHeight: 1.6,
                  color: "var(--mm-ink-muted)",
                }}
              >
                For privacy, your full letter message is not repeated on this confirmation page.
              </p>

              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem("mailingMemoriesConfirmation");
                  setLocation("/");
                }}
                style={{
                  padding: "12px 18px",
                  border: "none",
                  background: "var(--mm-forest)",
                  color: "#f5f1ea",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                }}
              >
                Return to Mailing Memories
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(120px, 180px) 1fr",
        gap: "12px",
        alignItems: "start",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--mm-ink-muted)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.9rem",
          lineHeight: 1.5,
          color: "var(--mm-ink)",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </span>
    </div>
  );
}
