/**
 * PLAN A CARD — Streamlined Entry Point
 *
 * Select a mailing date, then choose how to prepare the message.
 * After choosing, the customer is sent to /send with the date encoded in the URL.
 * The SendCard page remembers the date and includes it in the order summary.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { PageShell, FadeIn } from "@/components/Layout";

/* Free starter lines for the live helper experience. Future set/deck names are
 * intentionally not exposed here as current products. */
const STARTER_PHRASES = [
  "I am not going to tell you it will pass. I am just going to stay close while it is here.",
  "Most of what we have built together happened in ordinary moments that did not announce themselves as important.",
  "The world is easier to be in because people like you exist in it.",
  "I do not say this enough, and when I do say it, it does not come out the way I mean it. So I am writing it instead.",
  "You were in my mind today and I did not want to just let that pass.",
  "Most of what you do is not visible to anyone but you. I want you to know I have been paying attention.",
  "You did the right thing when the easier thing was sitting right there. I want to say that I noticed.",
  "I can see the difference. It is not subtle anymore and I want to say something about it.",
  "You made something real. Not everyone does. I want to say that clearly.",
  "You were gone before I found the words. I have found them now.",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  fontFamily: "var(--font-sans)",
  fontSize: "0.92rem",
  color: "var(--mm-ink)",
  background: "rgba(255,255,255,0.6)",
  border: "1px solid var(--mm-line)",
  borderRadius: "2px",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontFamily: "var(--font-sans)",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "var(--mm-ink-muted)",
};

function toLocalDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function PlanLetter() {
  const [, setLocation] = useLocation();
  const [selectedDate, setSelectedDate] = useState("");
  const [showPhrases, setShowPhrases] = useState(false);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  const minDateStr = toLocalDateInputValue(minDate);

  const handleWriteOwn = () => {
    if (selectedDate) {
      setLocation(`/send?mailingDate=${selectedDate}`);
    }
  };

  const handleUsePhraseClick = (phrase: string) => {
    if (selectedDate) {
      const encodedPhrase = encodeURIComponent(phrase);
      setLocation(`/send?mailingDate=${selectedDate}&message=${encodedPhrase}`);
    }
  };

  return (
    <PageShell>
      <section
        style={{
          padding: "clamp(40px, 5vw, 64px) 24px clamp(32px, 4vw, 48px)",
          background: "var(--mm-cream)",
        }}
      >
        <div className="max-w-[720px] mx-auto">
          <FadeIn>
            <p
              style={{
                margin: "0 0 8px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--mm-burgundy)",
              }}
            >
              Plan Ahead
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1
              style={{
                margin: "0 0 16px",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 500,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--mm-forest)",
              }}
            >
              Plan a card
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "var(--mm-ink-soft)",
                maxWidth: "520px",
              }}
            >
              Prepare your words now. We’ll handwrite your card and hand it to USPS on the mailing date you choose. Final delivery timing depends on USPS.
            </p>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 5vw, 64px) 24px", background: "var(--mm-cream)" }}>
        <div className="max-w-[600px] mx-auto">
          <FadeIn>
            <div
              style={{
                padding: "32px",
                background: "rgba(255,255,255,0.5)",
                border: "1px solid var(--mm-line)",
                backdropFilter: "blur(8px)",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "var(--mm-forest)",
                    color: "#f5f1ea",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  1
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.3rem",
                    fontWeight: 500,
                    color: "var(--mm-forest)",
                  }}
                >
                  When should we mail it?
                </h2>
              </div>
              <p
                style={{
                  margin: "0 0 20px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  color: "var(--mm-ink-muted)",
                  lineHeight: 1.6,
                }}
              >
                Choose a mailing date at least three days from today. This is the date we plan to hand your card to USPS.
              </p>

              <label style={labelStyle}>Mailing date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={minDateStr}
                style={inputStyle}
              />

              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  style={{
                    marginTop: "16px",
                    padding: "14px",
                    background: "rgba(139, 58, 58, 0.06)",
                    border: "1px solid rgba(139, 58, 58, 0.15)",
                    borderRadius: "2px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "var(--mm-burgundy)",
                    }}
                  >
                    Mailing Date
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      color: "var(--mm-ink-soft)",
                      lineHeight: 1.6,
                    }}
                  >
                    We’ll plan to hand your card to USPS on this date. Delivery after that handoff is controlled by USPS and is not guaranteed for a specific arrival date.
                  </p>
                </motion.div>
              )}
            </div>
          </FadeIn>

          <AnimatePresence>
            {selectedDate && (
              <FadeIn delay={0.1}>
                <div
                  style={{
                    padding: "32px",
                    background: "rgba(255,255,255,0.5)",
                    border: "1px solid var(--mm-line)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "var(--mm-forest)",
                        color: "#f5f1ea",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      2
                    </span>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.3rem",
                        fontWeight: 500,
                        color: "var(--mm-forest)",
                      }}
                    >
                      Your words
                    </h2>
                  </div>
                  <p
                    style={{
                      margin: "0 0 24px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      color: "var(--mm-ink-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    Choose how you’d like to prepare your message.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={handleWriteOwn}
                      className="cursor-pointer transition-all duration-300 hover:border-mm-forest"
                      style={{
                        padding: "24px",
                        background: "rgba(255,255,255,0.4)",
                        border: "1px solid var(--mm-line)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: "180px",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            margin: "0 0 8px",
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.1rem",
                            fontWeight: 500,
                            color: "var(--mm-forest)",
                          }}
                        >
                          I know what I want to write
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.75rem",
                            lineHeight: 1.6,
                            color: "var(--mm-ink-soft)",
                          }}
                        >
                          Go directly to the card editor to write and send your message.
                        </p>
                      </div>
                      <div
                        style={{
                          marginTop: "16px",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--mm-burgundy)",
                        }}
                      >
                        Write a card →
                      </div>
                    </div>

                    <div
                      onClick={() => setShowPhrases(!showPhrases)}
                      className="cursor-pointer transition-all duration-300"
                      style={{
                        padding: "24px",
                        background: "rgba(255,255,255,0.4)",
                        border: showPhrases ? "1px solid var(--mm-burgundy)" : "1px solid var(--mm-line)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: "180px",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            margin: "0 0 8px",
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.1rem",
                            fontWeight: 500,
                            color: "var(--mm-forest)",
                          }}
                        >
                          I need help getting started
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.75rem",
                            lineHeight: 1.6,
                            color: "var(--mm-ink-soft)",
                          }}
                        >
                          Browse some starter lines to find a direction, then make the message yours.
                        </p>
                      </div>
                      <div
                        style={{
                          marginTop: "16px",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--mm-burgundy)",
                        }}
                      >
                        {showPhrases ? "Close starters ↑" : "Browse starters ↓"}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showPhrases && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: "hidden", marginTop: "24px" }}
                      >
                        <div
                          style={{
                            padding: "20px",
                            background: "rgba(255,255,255,0.8)",
                            border: "1px solid var(--mm-line)",
                          }}
                        >
                          <div className="flex flex-col gap-3">
                            {STARTER_PHRASES.map((phrase, idx) => (
                              <div
                                key={idx}
                                onClick={() => handleUsePhraseClick(phrase)}
                                className="p-4 cursor-pointer transition-colors hover:bg-mm-cream-soft border border-transparent hover:border-mm-line"
                              >
                                <p
                                  style={{
                                    margin: "0 0 4px",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.6rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                    textTransform: "uppercase",
                                    color: "var(--mm-burgundy)",
                                  }}
                                >
                                  Starter line
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "0.95rem",
                                    fontStyle: "italic",
                                    color: "var(--mm-ink)",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  “{phrase}”
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(32px, 4vw, 48px) 24px",
          background: "var(--mm-cream-deep)",
        }}
      >
        <div className="max-w-[600px] mx-auto text-center">
          <FadeIn>
            <p
              style={{
                margin: "0 0 12px",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                fontWeight: 500,
                fontStyle: "italic",
                lineHeight: 1.3,
                color: "var(--mm-forest)",
              }}
            >
              “You remembered. That’s what matters.”
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                lineHeight: 1.7,
                color: "var(--mm-ink-muted)",
                maxWidth: "480px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Life gets busy. Important dates slip past. Plan Ahead lets you prepare the card now and choose a future USPS mailing date without adding a scheduling fee.
            </p>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
}
