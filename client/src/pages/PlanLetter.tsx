/**
 * PLAN A LETTER — Streamlined Entry Point
 * 
 * Single purpose: Select a mailing date, then choose how to write the message.
 * After choosing, user is sent to /send with the date encoded in the URL.
 * The SendCard page then remembers the date and shows it in the order summary.
 * 
 * Design: Clean, minimal, focused.
 * Typography: Cormorant Garamond (serif) + Work Sans (sans)
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { PageShell, FadeIn, PenStroke } from "@/components/Layout";

/* ─── Starter Phrases (from Home.tsx) ─── */
const STARTER_PHRASES = [
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

/* ─── Shared input styles ─── */
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

export default function PlanLetter() {
  const [, setLocation] = useLocation();
  const [selectedDate, setSelectedDate] = useState("");
  const [showPhrases, setShowPhrases] = useState(false);

  // Calculate minimum date (today + 1 week to allow time for handwriting/mailing)
  const today = new Date();
  const minDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const minDateStr = minDate.toISOString().split("T")[0];

  // Calculate delivery date (3-5 business days after mailing date)
  const getDeliveryEstimate = (mailingDate: string) => {
    const date = new Date(mailingDate);
    date.setDate(date.getDate() + 5); // Add 5 days as upper estimate
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

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
      {/* Hero Section */}
      <section style={{
        padding: "clamp(40px, 5vw, 64px) 24px clamp(32px, 4vw, 48px)",
        background: "var(--mm-cream)",
      }}>
        <div className="max-w-[720px] mx-auto">
          <FadeIn>
            <p style={{
              margin: "0 0 8px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--mm-burgundy)",
            }}>
              Plan Ahead
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--mm-forest)",
            }}>
              Plan a letter
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "var(--mm-ink-soft)",
              maxWidth: "440px",
            }}>
              Prepare your words now. We'll handwrite and mail your letter on the exact date you choose, 
              ensuring your thoughtfulness arrives exactly when it matters.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Form */}
      <section style={{ padding: "clamp(40px, 5vw, 64px) 24px", background: "var(--mm-cream)" }}>
        <div className="max-w-[600px] mx-auto">

          {/* Step 1: Select Date */}
          <FadeIn>
            <div style={{
              padding: "32px",
              background: "rgba(255,255,255,0.5)",
              border: "1px solid var(--mm-line)",
              backdropFilter: "blur(8px)",
              marginBottom: "24px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{
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
                }}>
                  1
                </span>
                <h2 style={{
                  margin: 0,
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  color: "var(--mm-forest)",
                }}>
                  When should we mail it?
                </h2>
              </div>
              <p style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "var(--mm-ink-muted)",
                lineHeight: 1.6,
              }}>
                Select the date we hand your letter to the USPS.
              </p>

              <label style={labelStyle}>Mailing date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={minDateStr}
                style={inputStyle}
              />

              {/* Delivery estimate */}
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
                  <p style={{
                    margin: 0,
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--mm-burgundy)",
                    marginBottom: "4px",
                  }}>
                    📬 Mailing Date
                  </p>
                  <p style={{
                    margin: 0,
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    color: "var(--mm-ink-soft)",
                    lineHeight: 1.6,
                  }}>
                    This is the date we plan to hand your letter to USPS. Final delivery timing depends on USPS after that date.
                  </p>
                </motion.div>
              )}
            </div>
          </FadeIn>

          {/* Step 2: Choose how to write */}
          <AnimatePresence>
            {selectedDate && (
              <FadeIn delay={0.1}>
                <div style={{
                  padding: "32px",
                  background: "rgba(255,255,255,0.5)",
                  border: "1px solid var(--mm-line)",
                  backdropFilter: "blur(8px)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <span style={{
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
                    }}>
                      2
                    </span>
                    <h2 style={{
                      margin: 0,
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "var(--mm-forest)",
                    }}>
                      Your words
                    </h2>
                  </div>
                  <p style={{
                    margin: "0 0 24px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    color: "var(--mm-ink-muted)",
                    lineHeight: 1.6,
                  }}>
                    Choose how you'd like to prepare your message.
                  </p>

                  {/* Two-box decision */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Option 1: Write own */}
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
                        <h3 style={{
                          margin: "0 0 8px",
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          color: "var(--mm-forest)",
                        }}>
                          I know what I want to write
                        </h3>
                        <p style={{
                          margin: 0,
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.75rem",
                          lineHeight: 1.6,
                          color: "var(--mm-ink-soft)",
                        }}>
                          Go directly to the letter editor to write and send your message.
                        </p>
                      </div>
                      <div style={{
                        marginTop: "16px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--mm-burgundy)",
                      }}>
                        Write a letter →
                      </div>
                    </div>

                    {/* Option 2: Browse phrases */}
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
                        <h3 style={{
                          margin: "0 0 8px",
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          color: "var(--mm-forest)",
                        }}>
                          I need help getting started
                        </h3>
                        <p style={{
                          margin: 0,
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.75rem",
                          lineHeight: 1.6,
                          color: "var(--mm-ink-soft)",
                        }}>
                          Browse some of our starter phrases to find the right words.
                        </p>
                      </div>
                      <div style={{
                        marginTop: "16px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--mm-burgundy)",
                      }}>
                        {showPhrases ? "Close phrases ↑" : "Browse phrases ↓"}
                      </div>
                    </div>
                  </div>

                  {/* Phrase browser */}
                  <AnimatePresence>
                    {showPhrases && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: "hidden", marginTop: "24px" }}
                      >
                        <div style={{
                          padding: "20px",
                          background: "rgba(255,255,255,0.8)",
                          border: "1px solid var(--mm-line)",
                        }}>
                          <div className="flex flex-col gap-3">
                            {STARTER_PHRASES.map((phrase, idx) => (
                              <div 
                                key={idx}
                                onClick={() => handleUsePhraseClick(phrase.line)}
                                className="p-4 cursor-pointer transition-colors hover:bg-mm-cream-soft border border-transparent hover:border-mm-line"
                              >
                                <p style={{
                                  margin: "0 0 4px",
                                  fontFamily: "var(--font-sans)",
                                  fontSize: "0.6rem",
                                  fontWeight: 600,
                                  letterSpacing: "0.05em",
                                  textTransform: "uppercase",
                                  color: "var(--mm-burgundy)",
                                }}>
                                  {phrase.deck}
                                </p>
                                <p style={{
                                  margin: 0,
                                  fontFamily: "var(--font-serif)",
                                  fontSize: "0.95rem",
                                  fontStyle: "italic",
                                  color: "var(--mm-ink)",
                                  lineHeight: 1.5,
                                }}>
                                  "{phrase.line}"
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

      {/* Reassurance */}
      <section style={{
        padding: "clamp(32px, 4vw, 48px) 24px",
        background: "var(--mm-cream-deep)",
      }}>
        <div className="max-w-[600px] mx-auto text-center">
          <FadeIn>
            <p style={{
              margin: "0 0 12px",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.3,
              color: "var(--mm-forest)",
            }}>
              "You remembered. That's what matters."
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              lineHeight: 1.7,
              color: "var(--mm-ink-muted)",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              Life gets busy. Important dates slip past. This service exists so the people who matter 
              to you know they haven't been forgotten — even when your schedule says otherwise.
            </p>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
}
