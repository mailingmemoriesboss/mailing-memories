/**
 * PLAN A LETTER — Future Correspondence Scheduling
 * 
 * Design: Calm, organized, reassuring.
 * The emotional hook: "You remembered. That's what matters."
 * 
 * Flow: Choose occasion → Set date → Recipient info → Message/instructions → Review & pay
 * 
 * Typography: Cormorant Garamond (serif) + Work Sans (sans)
 * Palette: Warm cream, walnut, burgundy, forest green
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { PageShell, FadeIn, PenStroke } from "@/components/Layout";

/* ─── CDN Image URLs ─── */
const IMAGES = {
  handWritingToday: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-writing-today_baf52ba5.png",
  letterPenDesk: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/letter-pen-desk_49ca7681.png",
};

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

/* ─── Occasion types ─── */
const OCCASIONS = [
  { id: "birthday", label: "Birthday", icon: "🎂" },
  { id: "anniversary", label: "Anniversary", icon: "💌" },
  { id: "holiday", label: "Holiday", icon: "🕯️" },
  { id: "memorial", label: "Memorial / Remembrance", icon: "🕊️" },
  { id: "encouragement", label: "Encouragement", icon: "🌿" },
  { id: "just-because", label: "Just Because", icon: "✉️" },
  { id: "milestone", label: "Milestone / Achievement", icon: "⭐" },
  { id: "other", label: "Something Else", icon: "📝" },
];

/* ─── Shared styles ─── */
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

const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--mm-burgundy)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139, 58, 58, 0.08)";
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--mm-line)";
    e.currentTarget.style.boxShadow = "none";
  },
};

export default function PlanLetter() {
  const [, setLocation] = useLocation();
  const [occasion, setOccasion] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientCity, setRecipientCity] = useState("");
  const [recipientState, setRecipientState] = useState("");
  const [recipientZip, setRecipientZip] = useState("");
  const [messageInstructions, setMessageInstructions] = useState("");
  const [showPhrases, setShowPhrases] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const isComplete = occasion && sendDate && recipientName && recipientAddress && recipientCity && recipientState && recipientZip && messageInstructions.length > 5 && senderName && senderEmail;

  const handleUsePhrase = (phrase: string) => {
    setMessageInstructions(phrase);
    setShowPhrases(false);
  };

  return (
    <PageShell>
      {/* Hero — calm, reassuring */}
      <section style={{
        padding: "clamp(40px, 5vw, 64px) 24px clamp(32px, 4vw, 48px)",
        background: "var(--mm-cream)",
      }}>
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6">
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
                  Schedule a letter<br />
                  for the day it matters.
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
                  Set the date. We'll handle the rest. A handwritten letter will arrive exactly when 
                  it should — so you never miss the moment that matters.
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-6">
              <FadeIn delay={0.15}>
                <img
                  src={IMAGES.handWritingToday}
                  alt="Hand writing a letter"
                  style={{
                    width: "100%",
                    maxWidth: "520px",
                    boxShadow: "0 20px 50px rgba(61, 43, 31, 0.15)",
                  }}
                />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* The form — single guided flow */}
      <section style={{ padding: "clamp(40px, 5vw, 64px) 24px", background: "var(--mm-cream)" }}>
        <div className="max-w-[720px] mx-auto">

          {/* Section 1: Occasion & Date */}
          <FadeIn>
            <div style={{
              padding: "32px",
              background: "rgba(255,255,255,0.5)",
              border: "1px solid var(--mm-line)",
              backdropFilter: "blur(8px)",
              marginBottom: "2px",
            }}>
              <h2 style={{
                margin: "0 0 4px",
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                fontWeight: 500,
                color: "var(--mm-forest)",
              }}>
                What's the occasion?
              </h2>
              <p style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "var(--mm-ink-muted)",
                lineHeight: 1.6,
              }}>
                This helps us match the right tone and stationery.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setOccasion(occ.id)}
                    className="bg-transparent border-none text-center p-0"
                  >
                    <div
                      className="transition-all duration-200"
                      style={{
                        padding: "14px 8px",
                        border: occasion === occ.id ? "2px solid var(--mm-forest)" : "1px solid var(--mm-line)",
                        background: occasion === occ.id ? "rgba(255,255,255,0.8)" : "transparent",
                      }}
                    >
                      <span style={{ fontSize: "1.2rem", display: "block", marginBottom: "4px" }}>{occ.icon}</span>
                      <span style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        color: occasion === occ.id ? "var(--mm-forest)" : "var(--mm-ink-muted)",
                        letterSpacing: "0.02em",
                      }}>
                        {occ.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div>
                <label style={labelStyle}>When should it arrive?</label>
                <input
                  type="date"
                  value={sendDate}
                  onChange={(e) => setSendDate(e.target.value)}
                  style={inputStyle}
                  {...focusHandlers}
                />
                <p style={{
                  margin: "6px 0 0",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  color: "var(--mm-ink-muted)",
                }}>
                  We'll mail it 2–3 days before this date to ensure on-time delivery.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Section 2: Decision Step */}
          <FadeIn delay={0.05}>
            <div style={{
              padding: "32px",
              background: "rgba(255,255,255,0.5)",
              border: "1px solid var(--mm-line)",
              borderTop: "none",
              backdropFilter: "blur(8px)",
              marginBottom: "2px",
            }}>
              <h2 style={{
                margin: "0 0 4px",
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                fontWeight: 500,
                color: "var(--mm-forest)",
              }}>
                Your Words
              </h2>
              <p style={{
                margin: "0 0 24px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "var(--mm-ink-muted)",
                lineHeight: 1.6,
              }}>
                Choose how you'd like to prepare your message.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Send Now */}
                <div 
                  onClick={() => setLocation('/send')}
                  className="cursor-pointer transition-all duration-300 hover:border-mm-forest group"
                  style={{
                    padding: "24px",
                    background: "rgba(255,255,255,0.4)",
                    border: "1px solid var(--mm-line)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
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
                      Go directly to the letter editor to write and send your message now.
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
                    Send a letter →
                  </div>
                </div>

                {/* Option 2: Need Help */}
                <div 
                  onClick={() => setShowPhrases(!showPhrases)}
                  className="cursor-pointer transition-all duration-300 hover:border-mm-burgundy"
                  style={{
                    padding: "24px",
                    background: "rgba(255,255,255,0.4)",
                    border: showPhrases ? "1px solid var(--mm-burgundy)" : "1px solid var(--mm-line)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
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
                      Browse some of our starter phrases to find the right words for this moment.
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

              {/* Phrase Browser */}
              <AnimatePresence>
                {showPhrases && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{
                      marginTop: "24px",
                      padding: "20px",
                      background: "rgba(255,255,255,0.8)",
                      border: "1px solid var(--mm-line)",
                    }}>
                      <div className="flex flex-col gap-3">
                        {STARTER_PHRASES.map((phrase, idx) => (
                          <div 
                            key={idx}
                            onClick={() => handleUsePhrase(phrase.line)}
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

              {/* Message Input (Always shown if instructions exist, or if they choose a phrase) */}
              <div style={{ marginTop: "24px" }}>
                <label style={labelStyle}>Your message instructions</label>
                <textarea
                  value={messageInstructions}
                  onChange={(e) => setMessageInstructions(e.target.value)}
                  placeholder="Write the exact message, or give us the gist and we'll craft it for you..."
                  rows={6}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8 }}
                  {...focusHandlers}
                />
              </div>
            </div>
          </FadeIn>

          {/* Section 3: Recipient */}
          <FadeIn delay={0.1}>
            <div style={{
              padding: "32px",
              background: "rgba(255,255,255,0.5)",
              border: "1px solid var(--mm-line)",
              borderTop: "none",
              backdropFilter: "blur(8px)",
              marginBottom: "2px",
            }}>
              <h2 style={{
                margin: "0 0 4px",
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                fontWeight: 500,
                color: "var(--mm-forest)",
              }}>
                Who is it for?
              </h2>
              <p style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "var(--mm-ink-muted)",
                lineHeight: 1.6,
              }}>
                We'll hand-address the envelope. Delivered anywhere in the U.S.
              </p>

              <div className="flex flex-col gap-4">
                <div>
                  <label style={labelStyle}>Recipient's name</label>
                  <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Their full name" style={inputStyle} {...focusHandlers} />
                </div>
                <div>
                  <label style={labelStyle}>Street address</label>
                  <input type="text" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} placeholder="123 Main Street, Apt 4" style={inputStyle} {...focusHandlers} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label style={labelStyle}>City</label>
                    <input type="text" value={recipientCity} onChange={(e) => setRecipientCity(e.target.value)} placeholder="City" style={inputStyle} {...focusHandlers} />
                  </div>
                  <div>
                    <label style={labelStyle}>State</label>
                    <input type="text" value={recipientState} onChange={(e) => setRecipientState(e.target.value)} placeholder="VA" maxLength={2} style={inputStyle} {...focusHandlers} />
                  </div>
                  <div>
                    <label style={labelStyle}>ZIP</label>
                    <input type="text" value={recipientZip} onChange={(e) => setRecipientZip(e.target.value)} placeholder="22980" maxLength={10} style={inputStyle} {...focusHandlers} />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Section 4: Your info & Review */}
          <FadeIn delay={0.15}>
            <div style={{
              padding: "32px",
              background: "rgba(255,255,255,0.5)",
              border: "1px solid var(--mm-line)",
              borderTop: "none",
              backdropFilter: "blur(8px)",
            }}>
              <h2 style={{
                margin: "0 0 4px",
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                fontWeight: 500,
                color: "var(--mm-forest)",
              }}>
                Your information
              </h2>
              <p style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "var(--mm-ink-muted)",
                lineHeight: 1.6,
              }}>
                So we can sign the letter and send you a confirmation.
              </p>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Your name" style={inputStyle} {...focusHandlers} />
                  </div>
                  <div>
                    <label style={labelStyle}>Your email</label>
                    <input type="email" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} placeholder="you@email.com" style={inputStyle} {...focusHandlers} />
                  </div>
                </div>

                {/* Reminder toggle */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setReminderEnabled(!reminderEnabled)}
                    className="bg-transparent border-none p-0 flex-shrink-0"
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "1px solid var(--mm-line-strong)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: reminderEnabled ? "var(--mm-forest)" : "transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    {reminderEnabled && <span style={{ color: "#f5f1ea", fontSize: "0.7rem" }}>✓</span>}
                  </button>
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    color: "var(--mm-ink-soft)",
                  }}>
                    Send me a reminder email 3 days before it ships
                  </span>
                </div>

                <PenStroke className="my-2" />

                {/* Price & CTA */}
                <div style={{
                  padding: "24px",
                  background: "var(--mm-forest)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                }}>
                  <div>
                    <p style={{
                      margin: 0,
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(245, 241, 234, 0.55)",
                    }}>
                      Scheduled letter · handwritten & mailed
                    </p>
                    <p style={{
                      margin: "4px 0 0",
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.8rem",
                      fontWeight: 500,
                      color: "#f5f1ea",
                    }}>
                      $18
                    </p>
                  </div>
                  <button
                    className="bg-transparent border-none"
                    style={{
                      padding: "14px 28px",
                      borderRadius: "999px",
                      background: isComplete ? "#f5f1ea" : "rgba(245,241,234,0.3)",
                      color: isComplete ? "var(--mm-forest)" : "rgba(245,241,234,0.5)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: isComplete ? "pointer" : "not-allowed",
                      transition: "all 0.2s ease",
                      boxShadow: isComplete ? "0 8px 20px rgba(0,0,0,0.15)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (isComplete) {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.2)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = isComplete ? "0 8px 20px rgba(0,0,0,0.15)" : "none";
                    }}
                    onClick={() => {
                      if (isComplete) {
                        alert("Stripe checkout will be integrated here for scheduled letters.");
                      }
                    }}
                  >
                    Schedule & Pay
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Reassurance */}
      <section style={{
        padding: "clamp(32px, 4vw, 48px) 24px",
        background: "var(--mm-cream-deep)",
      }}>
        <div className="max-w-[720px] mx-auto text-center">
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
