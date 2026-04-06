/**
 * PLAN A LETTER — Future Correspondence Scheduling
 * 
 * Design: Calm, organized, reassuring. Like booking a reservation at a nice restaurant.
 * The emotional hook: "You remembered. That's what matters."
 * 
 * Flow: Choose occasion → Set date → Recipient info → Message/instructions → Review & pay
 * 
 * Typography: Cormorant Garamond (serif) + DM Sans (sans)
 * Palette: Warm cream, walnut, burgundy, forest green
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { PageShell, FadeIn, PenStroke } from "@/components/Layout";

/* ─── CDN Image URLs ─── */
const IMAGES = {
  handWritingToday: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/hand-writing-today_baf52ba5.png",
  letterPenDesk: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/letter-pen-desk_49ca7681.png",
};

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
  const [occasion, setOccasion] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientCity, setRecipientCity] = useState("");
  const [recipientState, setRecipientState] = useState("");
  const [recipientZip, setRecipientZip] = useState("");
  const [messageInstructions, setMessageInstructions] = useState("");
  const [writeItForMe, setWriteItForMe] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const isComplete = occasion && sendDate && recipientName && recipientAddress && recipientCity && recipientState && recipientZip && (messageInstructions.length > 5 || writeItForMe) && senderName && senderEmail;

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
                  alt="Hand writing a letter with a blue pen"
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

      {/* Trust bar */}
      <section style={{ padding: "16px 24px", background: "var(--mm-cream-deep)" }}>
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {[
            "Set it and forget it",
            "Mailed on the exact date",
            "Handwritten on real stationery",
            "Email reminder before it ships",
          ].map((text, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--mm-ink-muted)",
            }}>
              {text}
            </span>
          ))}
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

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
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

          {/* Section 2: Recipient */}
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

          {/* Section 3: Message */}
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
                What should it say?
              </h2>
              <p style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "var(--mm-ink-muted)",
                lineHeight: 1.6,
              }}>
                Write the exact message, or give us the gist and we'll craft it for you.
              </p>

              {/* Toggle */}
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => setWriteItForMe(false)}
                  className="bg-transparent border-none transition-all duration-200"
                  style={{
                    padding: "8px 16px",
                    border: !writeItForMe ? "2px solid var(--mm-forest)" : "1px solid var(--mm-line)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: !writeItForMe ? "var(--mm-forest)" : "var(--mm-ink-muted)",
                    background: !writeItForMe ? "rgba(255,255,255,0.8)" : "transparent",
                  }}
                >
                  I'll write it
                </button>
                <button
                  onClick={() => setWriteItForMe(true)}
                  className="bg-transparent border-none transition-all duration-200"
                  style={{
                    padding: "8px 16px",
                    border: writeItForMe ? "2px solid var(--mm-burgundy)" : "1px solid var(--mm-line)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: writeItForMe ? "var(--mm-burgundy)" : "var(--mm-ink-muted)",
                    background: writeItForMe ? "rgba(255,255,255,0.8)" : "transparent",
                  }}
                >
                  Write it for me
                </button>
              </div>

              <div>
                <label style={labelStyle}>
                  {writeItForMe ? "Tell us the sentiment — we'll find the words" : "Your message (we'll handwrite it exactly)"}
                </label>
                <textarea
                  value={messageInstructions}
                  onChange={(e) => setMessageInstructions(e.target.value)}
                  placeholder={writeItForMe
                    ? "She's been going through a hard time with her mom's health. I want her to know I'm thinking about her and that she doesn't have to be strong all the time..."
                    : "I've been thinking about you lately. I know things have been hard, and I just wanted you to know..."
                  }
                  rows={6}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8 }}
                  {...focusHandlers}
                />
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
                      Scheduled letter · handwritten &amp; mailed
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
                    Schedule &amp; Pay
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
