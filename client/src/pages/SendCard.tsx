import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { PageShell, FadeIn, PenStroke } from "@/components/Layout";

const IMAGES = {
  woodTexture:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/desk-wood-texture-jhuAnbfnjU7sz2zq4KXdHG.webp",
  foreverStamp:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_over_White_House_forever_stamp.jpg/120px-Flag_over_White_House_forever_stamp.jpg",
};

const STEPS = [
    { num: 1, label: "Letter" },
    { num: 2, label: "Envelope" },
    { num: 3, label: "Review" },
  ];

function SectionLabel({ children }: { children: string }) {
  return (
    <label
      style={{
        display: "block",
        marginBottom: "6px",
        fontFamily: "var(--font-sans)",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--mm-ink-muted)",
      }}
    >
      {children}
    </label>
  );
}

function fitNameFontSize(name: string) {
  const length = name.trim().length;
  if (length > 30) return "11px";
  if (length > 22) return "12px";
  return "13px";
}

function PreviewPanel({
  currentStep,
  frontMessage,
  insideMessage,
  signatureName,
  recipientName,
  recipientAddress1,
  recipientAddress2,
  recipientCity,
  recipientState,
  recipientZip,
  returnName,
  returnAddress1,
  returnAddress2,
  returnCity,
  returnState,
  returnZip,
  compact = false,
}: {
  currentStep: number;
  frontMessage: string;
  insideMessage: string;
  signatureName: string;
  recipientName: string;
  recipientAddress1: string;
  recipientAddress2: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  returnName: string;
  returnAddress1: string;
  returnAddress2: string;
  returnCity: string;
  returnState: string;
  returnZip: string;
  compact?: boolean;
}) {
  const handwrittenFont =
    '"Patrick Hand", "Segoe Print", "Bradley Hand", "Trebuchet MS", sans-serif';

  const frontDisplay = frontMessage.trim() || "Thinking of You";
  const insideDisplay =
    insideMessage.trim() || "Your full message will appear here as you type.";
  const signatureDisplay = signatureName.trim() || "Your Name";

  const recipientLines = [
    recipientName || "Recipient Name",
    recipientAddress1 || "123 Main Street",
    recipientAddress2 || "",
    recipientCity || recipientState || recipientZip
      ? `${recipientCity || "City"}, ${recipientState || "ST"} ${recipientZip || "00000"}`
      : "City, ST 00000",
  ].filter(Boolean);

  const returnNameDisplay = returnName.trim() || "Your Name";

  const labelColor = compact
    ? "rgba(15, 23, 42, 0.46)"
    : "rgba(245, 241, 234, 0.54)";
  const overlay = compact ? "rgba(40, 30, 22, 0.18)" : "rgba(40, 30, 22, 0.38)";

  const baseFrameWidth = compact ? 320 : 360;
  const frameWidth = compact ? Math.min(320, window.innerWidth - 72) : baseFrameWidth;
  const frameHeight = 210;

  const shellWidth = compact ? "100%" : "430px";

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        minHeight: "100%",
        padding: compact ? "20px 12px" : "40px 32px",
        backgroundImage: `url("${IMAGES.woodTexture}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <div className="absolute inset-0" style={{ background: overlay }} />
      <div
        className="relative z-10 w-full"
        style={{ maxWidth: shellWidth, overflow: "hidden" }}
      >
        {currentStep !== 3 && (
          <p
            style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: labelColor,
              textAlign: "center",
            }}
          >
            Live Preview
          </p>
        )}

        <div style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="card-preview"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32 }}
                className="flex flex-col gap-4"
                style={{ width: frameWidth, maxWidth: "100%" }}
              >
                <div
                  style={{
                    width: frameWidth,
                    maxWidth: "100%",
                    height: frameHeight,
                    background: "#faf7f2",
                    padding: "28px 26px",
                    boxShadow:
                      "0 24px 60px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    border: "1px solid rgba(61,43,31,0.06)",
                    margin: "0 auto",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "18px",
                      left: "24px",
                      right: "24px",
                      height: "1px",
                      background: "rgba(55, 93, 129, 0.18)",
                    }}
                  />
                  <p
                    style={{
                      margin: 0,
                      fontFamily: handwrittenFont,
                      fontSize: compact ? "24px" : "30px",
                      fontWeight: 500,
                      lineHeight: 1.12,
                      color: "var(--mm-forest)",
                      textAlign: "center",
                      maxWidth: compact ? "220px" : "280px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {frontDisplay}
                  </p>
                </div>

                <div
                  style={{
                    width: frameWidth,
                    maxWidth: "100%",
                    height: frameHeight,
                    background: "#faf7f2",
                    padding: "18px 20px 16px",
                    boxShadow:
                      "0 24px 60px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.1)",
                    position: "relative",
                    border: "1px solid rgba(61,43,31,0.06)",
                    margin: "0 auto",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "18px",
                      right: "18px",
                      height: "18px",
                      borderBottom: "1px solid rgba(61,43,31,0.06)",
                    }}
                  />
                  <div className="relative z-10" style={{ paddingTop: "6px" }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: handwrittenFont,
                        fontSize: compact ? "14px" : "16px",
                        lineHeight: compact ? 1.28 : 1.34,
                        color: "var(--mm-pen-blue)",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        minHeight: "116px",
                        overflow: "hidden",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {insideDisplay}
                    </p>
                    <p
                      style={{
                        margin: "12px 0 0",
                        fontFamily: handwrittenFont,
                        fontSize: compact ? "14px" : "16px",
                        color: "var(--mm-pen-blue)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      — {signatureDisplay}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="envelope-preview"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32 }}
                style={{
                  width: frameWidth,
                  maxWidth: "100%",
                  height: frameHeight,
                  background: "#f0ebe3",
                  padding: "16px 18px 14px",
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.1)",
                  position: "relative",
                  border: "1px solid rgba(61,43,31,0.06)",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <img
                  src={IMAGES.foreverStamp}
                  alt="Forever stamp"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "12px",
                    width: compact ? "30px" : "40px",
                    height: compact ? "38px" : "50px",
                    objectFit: "contain",
                    background: "transparent",
                    borderRadius: "2px",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "16px",
                    width: compact ? "108px" : "136px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 6px",
                      fontFamily: "var(--font-sans)",
                      fontSize: compact ? "6px" : "7px",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(55, 93, 129, 0.24)",
                    }}
                  >
                    Return address
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontFamily: handwrittenFont,
                      fontSize: compact ? "10px" : fitNameFontSize(returnNameDisplay),
                      lineHeight: 1.08,
                      color: "var(--mm-ink-muted)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {returnNameDisplay}
                  </p>

                  <p
                    style={{
                      margin: "1px 0 0",
                      fontFamily: handwrittenFont,
                      fontSize: compact ? "10px" : "12px",
                      lineHeight: 1.08,
                      color: "var(--mm-ink-muted)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {returnAddress1 || "456 Return Ave"}
                  </p>

                  {returnAddress2 && (
                    <p
                      style={{
                        margin: "1px 0 0",
                        fontFamily: handwrittenFont,
                        fontSize: compact ? "10px" : "12px",
                        lineHeight: 1.08,
                        color: "var(--mm-ink-muted)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {returnAddress2}
                    </p>
                  )}

                  <p
                    style={{
                      margin: "1px 0 0",
                      fontFamily: handwrittenFont,
                      fontSize: compact ? "10px" : "12px",
                      lineHeight: 1.08,
                      color: "var(--mm-ink-muted)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {(returnCity || "City")}, {(returnState || "ST")} {returnZip || "00000"}
                  </p>
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: compact ? "72px" : "78px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: compact ? "190px" : "220px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 6px",
                      fontFamily: "var(--font-sans)",
                      fontSize: compact ? "6px" : "7px",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(55, 93, 129, 0.24)",
                    }}
                  >
                    Recipient
                  </p>

                  {recipientLines.map((line, idx) => (
                    <p
                      key={idx}
                      style={{
                        margin: idx === 0 ? 0 : "2px 0 0",
                        fontFamily: handwrittenFont,
                        fontSize: compact
                          ? idx === 0
                            ? "12px"
                            : "11px"
                          : idx === 0
                          ? "15px"
                          : "13px",
                        lineHeight: 1.08,
                        color: "var(--mm-ink)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="review-preview-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  style={{
                    background: "#faf7f2",
                    padding: compact ? "14px 16px" : "18px 20px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    border: "1px solid rgba(61,43,31,0.06)",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      lineHeight: 1.6,
                      color: "var(--mm-ink-muted)",
                      textAlign: "center",
                    }}
                  >
                    Review is intentionally kept simple.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function SendCard() {
  const [location] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);

  // Extract URL parameters for pre-filling
  const [frontMessage, setFrontMessage] = useState("");
  const [insideMessage, setInsideMessage] = useState("");
  const [signatureName, setSignatureName] = useState("");

  // Pre-fill message from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const messageParam = params.get("message");
    const deckParam = params.get("deck");
    
    if (messageParam) {
      setInsideMessage(decodeURIComponent(messageParam));
    }
    // Note: deckParam is available if needed for future use (e.g., tracking which deck was used)
  }, []);

  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress1, setRecipientAddress1] = useState("");
  const [recipientAddress2, setRecipientAddress2] = useState("");
  const [recipientCity, setRecipientCity] = useState("");
  const [recipientState, setRecipientState] = useState("");
  const [recipientZip, setRecipientZip] = useState("");

  const [returnName, setReturnName] = useState("");
  const [returnAddress1, setReturnAddress1] = useState("");
  const [returnAddress2, setReturnAddress2] = useState("");
  const [returnCity, setReturnCity] = useState("");
  const [returnState, setReturnState] = useState("");
  const [returnZip, setReturnZip] = useState("");

  const [contactEmail, setContactEmail] = useState("");
  const [reviewConfirmed, setReviewConfirmed] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [savedOrderId, setSavedOrderId] = useState("");

  const inputStyle = useMemo(
    () => ({
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
    }),
    []
  );

  const canAdvance = () => {
    if (currentStep === 1) {
      return Boolean(insideMessage.trim().length > 0 && signatureName.trim().length > 0);
    }
    if (currentStep === 2) {
      return Boolean(
        recipientName.trim() &&
          recipientAddress1.trim() &&
          recipientCity.trim() &&
          recipientState.trim() &&
          recipientZip.trim() &&
          returnName.trim() &&
          returnAddress1.trim() &&
          returnCity.trim() &&
          returnState.trim() &&
          returnZip.trim()
      );
    }
    if (currentStep === 3) {
      return Boolean(contactEmail.trim() && reviewConfirmed);
    }
    return false;
  };

  async function handleCreateOrder() {
    setSubmitError("");
    setSavedOrderId("");

    if (!canAdvance()) {
      setSubmitError("Please complete the review details before saving.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_type: "send_now",
          occasion: "send-page",
          message_mode: "exact_words",
          message_text: insideMessage,
          message_brief: frontMessage,
          signature_name: signatureName,
          sender_name: signatureName,
          sender_email: contactEmail,
          recipient_name: recipientName,
          address_line1: recipientAddress1,
          address_line2: recipientAddress2 || null,
          city: recipientCity,
          state_region: recipientState.toUpperCase(),
          postal_code: recipientZip,
          country: "US",
          amount_cents: 1500,
          currency: "usd",
          front_message: frontMessage,
          return_name: returnName,
          return_address_line1: returnAddress1,
          return_address_line2: returnAddress2 || null,
          return_city: returnCity,
          return_state: returnState.toUpperCase(),
          return_postal_code: returnZip,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to create order.");
      }

      setSavedOrderId(data?.order?.id || "");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving your order."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell>
      <section
        style={{
          padding: "clamp(32px, 4vw, 48px) 24px clamp(20px, 2vw, 32px)",
          background: "var(--mm-cream)",
        }}
      >
        <div className="max-w-[1240px] mx-auto">
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
                Handwritten Letter Service
              </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1
              style={{
                margin: "0 0 8px",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--mm-forest)",
              }}
            >
              Send a Letter
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "0.92rem",
                lineHeight: 1.6,
                color: "var(--mm-ink-soft)",
                maxWidth: "560px",
              }}
            >
              Write your letter, address the envelope, and review your details before sending.
            </p>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: "0 24px 24px", background: "var(--mm-cream)" }}>
        <div className="max-w-[1240px] mx-auto">
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-0" style={{ maxWidth: "420px" }}>
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className="flex items-center"
                  style={{ flex: i < STEPS.length - 1 ? 1 : "none" }}
                >
                  <button
                    onClick={() => step.num <= currentStep && setCurrentStep(step.num)}
                    className="flex items-center gap-2 bg-transparent border-none p-0"
                    style={{ opacity: step.num <= currentStep ? 1 : 0.35 }}
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        background:
                          step.num === currentStep
                            ? "var(--mm-forest)"
                            : step.num < currentStep
                            ? "var(--mm-burgundy)"
                            : "var(--mm-line)",
                        color:
                          step.num <= currentStep ? "#f5f1ea" : "var(--mm-ink-muted)",
                      }}
                    >
                      {step.num < currentStep ? "✓" : step.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.68rem",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color:
                          step.num === currentStep
                            ? "var(--mm-forest)"
                            : "var(--mm-ink-muted)",
                      }}
                    >
                      {step.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        margin: "0 12px",
                        background:
                          step.num < currentStep ? "var(--mm-burgundy)" : "var(--mm-line)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section
        style={{
          padding: "0 24px clamp(48px, 6vw, 80px)",
          background: "var(--mm-cream)",
        }}
      >
        <div className="max-w-[1240px] mx-auto">
          <div
            className="grid grid-cols-1 xl:grid-cols-12 gap-0 overflow-hidden"
            style={{
              border: "1px solid var(--mm-line)",
              background: "rgba(255,255,255,0.3)",
            }}
          >
            <div className="xl:col-span-7" style={{ padding: "clamp(28px, 3vw, 44px)" }}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step-card"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ duration: 0.28 }}
                  >
                    <h2
                      style={{
                        margin: "0 0 6px",
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.6rem",
                        fontWeight: 500,
                        color: "var(--mm-forest)",
                      }}
                    >
                      Letter
                    </h2>
                    <p
                      style={{
                        margin: "0 0 24px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.88rem",
                        color: "var(--mm-ink-soft)",
                        lineHeight: 1.6,
                      }}
                    >
                      Write the message that will be handwritten on quality cardstock.
                    </p>

                    <div className="flex flex-col gap-4">
                      <div>
                        <SectionLabel>Front of card (optional)</SectionLabel>
                        <input
                          type="text"
                          value={frontMessage}
                          onChange={(e) => setFrontMessage(e.target.value)}
                          placeholder="Thinking of You"
                          style={inputStyle}
                        />
                        <p
                          style={{
                            margin: "8px 0 0",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.74rem",
                            color: "var(--mm-ink-muted)",
                          }}
                        >
                          A short line or occasion for the front of the card.
                        </p>
                      </div>

                      <div>
                        <SectionLabel>Your message</SectionLabel>
                        <textarea
                          value={insideMessage}
                          onChange={(e) => setInsideMessage(e.target.value)}
                          placeholder="Write your message here..."
                          rows={8}
                          style={{
                            ...inputStyle,
                            resize: "vertical",
                            lineHeight: 1.75,
                          }}
                        />
                        <p
                          style={{
                            margin: "8px 0 0",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.74rem",
                            color: "var(--mm-ink-muted)",
                          }}
                        >
                          Your full message will be handwritten on the card. If you feel stuck, simple support is available.
                        </p>
                      </div>

                      <div>
                        <SectionLabel>Sign it as</SectionLabel>
                        <input
                          type="text"
                          value={signatureName}
                          onChange={(e) => setSignatureName(e.target.value)}
                          placeholder="Your name"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step-envelope"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ duration: 0.28 }}
                  >
                    <h2
                      style={{
                        margin: "0 0 6px",
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.6rem",
                        fontWeight: 500,
                        color: "var(--mm-forest)",
                      }}
                    >
                      Envelope
                    </h2>
                    <p
                      style={{
                        margin: "0 0 24px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.88rem",
                        color: "var(--mm-ink-soft)",
                        lineHeight: 1.6,
                      }}
                    >
                      Tell us where the letter is going and what return address should appear on the envelope.
                    </p>

                    <div className="flex flex-col gap-6">
                      <div>
                        <p
                          style={{
                            margin: "0 0 12px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.74rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--mm-burgundy)",
                          }}
                        >
                          Who’s receiving this?
                        </p>

                        <div className="grid gap-4">
                          <div>
                            <SectionLabel>Recipient full name</SectionLabel>
                            <input
                              type="text"
                              value={recipientName}
                              onChange={(e) => setRecipientName(e.target.value)}
                              placeholder="Their full name"
                              style={inputStyle}
                            />
                          </div>

                          <div>
                            <SectionLabel>Address line 1</SectionLabel>
                            <input
                              type="text"
                              value={recipientAddress1}
                              onChange={(e) => setRecipientAddress1(e.target.value)}
                              placeholder="123 Main Street"
                              style={inputStyle}
                            />
                          </div>

                          <div>
                            <SectionLabel>Address line 2 (optional)</SectionLabel>
                            <input
                              type="text"
                              value={recipientAddress2}
                              onChange={(e) => setRecipientAddress2(e.target.value)}
                              placeholder="Apt, suite, unit"
                              style={inputStyle}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <SectionLabel>City</SectionLabel>
                              <input
                                type="text"
                                value={recipientCity}
                                onChange={(e) => setRecipientCity(e.target.value)}
                                placeholder="City"
                                style={inputStyle}
                              />
                            </div>
                            <div>
                              <SectionLabel>State</SectionLabel>
                              <input
                                type="text"
                                value={recipientState}
                                onChange={(e) => setRecipientState(e.target.value)}
                                placeholder="ND"
                                maxLength={2}
                                style={inputStyle}
                              />
                            </div>
                            <div>
                              <SectionLabel>ZIP</SectionLabel>
                              <input
                                type="text"
                                value={recipientZip}
                                onChange={(e) => setRecipientZip(e.target.value)}
                                placeholder="58102"
                                maxLength={10}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <PenStroke className="my-1" color="var(--mm-line-strong)" />

                      <div>
                        <p
                          style={{
                            margin: "0 0 12px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.74rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--mm-burgundy)",
                          }}
                        >
                          Return address
                        </p>

                        <div className="grid gap-4">
                          <div>
                            <SectionLabel>Sender full name</SectionLabel>
                            <input
                              type="text"
                              value={returnName}
                              onChange={(e) => setReturnName(e.target.value)}
                              placeholder="Your full name"
                              style={inputStyle}
                            />
                          </div>

                          <div>
                            <SectionLabel>Address line 1</SectionLabel>
                            <input
                              type="text"
                              value={returnAddress1}
                              onChange={(e) => setReturnAddress1(e.target.value)}
                              placeholder="456 Return Ave"
                              style={inputStyle}
                            />
                          </div>

                          <div>
                            <SectionLabel>Address line 2 (optional)</SectionLabel>
                            <input
                              type="text"
                              value={returnAddress2}
                              onChange={(e) => setReturnAddress2(e.target.value)}
                              placeholder="Apt, suite, unit"
                              style={inputStyle}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <SectionLabel>City</SectionLabel>
                              <input
                                type="text"
                                value={returnCity}
                                onChange={(e) => setReturnCity(e.target.value)}
                                placeholder="City"
                                style={inputStyle}
                              />
                            </div>
                            <div>
                              <SectionLabel>State</SectionLabel>
                              <input
                                type="text"
                                value={returnState}
                                onChange={(e) => setReturnState(e.target.value)}
                                placeholder="ND"
                                maxLength={2}
                                style={inputStyle}
                              />
                            </div>
                            <div>
                              <SectionLabel>ZIP</SectionLabel>
                              <input
                                type="text"
                                value={returnZip}
                                onChange={(e) => setReturnZip(e.target.value)}
                                placeholder="58102"
                                maxLength={10}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step-review"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ duration: 0.28 }}
                  >
                    <h2
                      style={{
                        margin: "0 0 6px",
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.6rem",
                        fontWeight: 500,
                        color: "var(--mm-forest)",
                      }}
                    >
                      Review
                    </h2>
                    <p
                      style={{
                        margin: "0 0 24px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.88rem",
                        color: "var(--mm-ink-soft)",
                        lineHeight: 1.6,
                      }}
                    >
                      Make sure the card, envelope, and mailing details look right
                      before continuing.
                    </p>

                    <div className="flex flex-col gap-4">
                      <div
                        style={{
                          padding: "16px 20px",
                          background: "rgba(255,255,255,0.5)",
                          border: "1px solid var(--mm-line)",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 4px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--mm-ink-muted)",
                          }}
                        >
                          Card
                        </p>
                        <p
                          style={{
                            margin: "0 0 8px",
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.02rem",
                            color: "var(--mm-forest)",
                          }}
                        >
                          {frontMessage || "No front message added"}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.86rem",
                            color: "var(--mm-ink-soft)",
                            lineHeight: 1.65,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {insideMessage}
                        </p>
                        <p
                          style={{
                            margin: "8px 0 0",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.82rem",
                            color: "var(--mm-ink-muted)",
                          }}
                        >
                          — {signatureName}
                        </p>
                      </div>

                      <div
                        style={{
                          padding: "16px 20px",
                          background: "rgba(255,255,255,0.5)",
                          border: "1px solid var(--mm-line)",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 8px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--mm-ink-muted)",
                          }}
                        >
                          Envelope
                        </p>

                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <p
                              style={{
                                margin: "0 0 4px",
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.72rem",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "var(--mm-burgundy)",
                              }}
                            >
                              Recipient
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.84rem",
                                lineHeight: 1.6,
                                color: "var(--mm-ink-soft)",
                                whiteSpace: "pre-line",
                              }}
                            >
                              {recipientName}
                              {"\n"}
                              {recipientAddress1}
                              {recipientAddress2 ? `\n${recipientAddress2}` : ""}
                              {"\n"}
                              {recipientCity}, {recipientState.toUpperCase()} {recipientZip}
                            </p>
                          </div>

                          <div>
                            <p
                              style={{
                                margin: "0 0 4px",
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.72rem",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "var(--mm-burgundy)",
                              }}
                            >
                              Return address
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.84rem",
                                lineHeight: 1.6,
                                color: "var(--mm-ink-soft)",
                                whiteSpace: "pre-line",
                              }}
                            >
                              {returnName}
                              {"\n"}
                              {returnAddress1}
                              {returnAddress2 ? `\n${returnAddress2}` : ""}
                              {"\n"}
                              {returnCity}, {returnState.toUpperCase()} {returnZip}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          padding: "18px 20px",
                          background: "var(--mm-forest)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <div className="flex items-end justify-between gap-4 flex-wrap">
                          <div>
                            <p
                              style={{
                                margin: 0,
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.62rem",
                                fontWeight: 600,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "rgba(245,241,234,0.56)",
                              }}
                            >
                              Handwritten and mailed
                            </p>
                            <p
                              style={{
                                margin: "4px 0 0",
                                fontFamily: "var(--font-serif)",
                                fontSize: "1.55rem",
                                color: "#f5f1ea",
                              }}
                            >
                              $15
                            </p>
                          </div>

                          <div
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: "0.8rem",
                              lineHeight: 1.5,
                              color: "rgba(245,241,234,0.72)",
                              textAlign: "right",
                            }}
                          >
                            Ships in 1–2 business days
                          </div>
                        </div>
                      </div>

                      <div>
                        <SectionLabel>Your email</SectionLabel>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="you@email.com"
                          style={inputStyle}
                        />
                      </div>

                      <label
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.84rem",
                          lineHeight: 1.55,
                          color: "var(--mm-ink-soft)",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={reviewConfirmed}
                          onChange={(e) => setReviewConfirmed(e.target.checked)}
                          style={{ marginTop: "3px" }}
                        />
                        <span>I’ve reviewed the message and mailing details.</span>
                      </label>

                      {submitError && (
                        <div
                          style={{
                            padding: "14px 16px",
                            background: "rgba(139, 58, 58, 0.06)",
                            border: "1px solid rgba(139, 58, 58, 0.16)",
                            color: "var(--mm-ink)",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.84rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {submitError}
                        </div>
                      )}

                      {savedOrderId && (
                        <div
                          style={{
                            padding: "14px 16px",
                            background: "rgba(62, 92, 67, 0.08)",
                            border: "1px solid rgba(62, 92, 67, 0.18)",
                            color: "var(--mm-ink)",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.84rem",
                            lineHeight: 1.6,
                          }}
                        >
                          Order details saved successfully.
                          <br />
                          Order ID: {savedOrderId}
                        </div>
                      )}

                      <button
                        className="bg-transparent border-none"
                        style={{
                          padding: "14px 28px",
                          borderRadius: "999px",
                          background: reviewConfirmed ? "#f5f1ea" : "rgba(245,241,234,0.45)",
                          color: "var(--mm-forest)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.76rem",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                          transition: "all 0.2s ease",
                          opacity: isSubmitting ? 0.7 : 1,
                          cursor: isSubmitting ? "wait" : "pointer",
                          alignSelf: "flex-start",
                        }}
                        disabled={isSubmitting || !canAdvance()}
                        onClick={handleCreateOrder}
                      >
                        {isSubmitting ? "Saving..." : "Save Order Details"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {currentStep < 3 && (
                <div className="xl:hidden" style={{ marginTop: "24px" }}>
                  <PreviewPanel
                    compact
                    currentStep={currentStep}
                    frontMessage={frontMessage}
                    insideMessage={insideMessage}
                    signatureName={signatureName}
                    recipientName={recipientName}
                    recipientAddress1={recipientAddress1}
                    recipientAddress2={recipientAddress2}
                    recipientCity={recipientCity}
                    recipientState={recipientState}
                    recipientZip={recipientZip}
                    returnName={returnName}
                    returnAddress1={returnAddress1}
                    returnAddress2={returnAddress2}
                    returnCity={returnCity}
                    returnState={returnState}
                    returnZip={returnZip}
                  />
                </div>
              )}

              {currentStep < 3 && (
                <div
                  className="flex items-center justify-between mt-8 pt-6"
                  style={{ borderTop: "1px solid var(--mm-line)" }}
                >
                  {currentStep > 1 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="bg-transparent border-none"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.76rem",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--mm-ink-muted)",
                        padding: "10px 0",
                      }}
                    >
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    onClick={() => canAdvance() && setCurrentStep(currentStep + 1)}
                    className="bg-transparent border-none"
                    style={{
                      padding: "12px 24px",
                      borderRadius: "999px",
                      background: canAdvance() ? "var(--mm-forest)" : "var(--mm-line)",
                      color: canAdvance() ? "#f5f1ea" : "var(--mm-ink-muted)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: canAdvance() ? "pointer" : "not-allowed",
                      opacity: canAdvance() ? 1 : 0.5,
                    }}
                  >
                    Continue →
                  </button>
                </div>
              )}
            </div>

            {currentStep < 3 && (
              <div
                className="hidden xl:block xl:col-span-5"
                style={{ borderLeft: "1px solid var(--mm-line)" }}
              >
                <PreviewPanel
                  currentStep={currentStep}
                  frontMessage={frontMessage}
                  insideMessage={insideMessage}
                  signatureName={signatureName}
                  recipientName={recipientName}
                  recipientAddress1={recipientAddress1}
                  recipientAddress2={recipientAddress2}
                  recipientCity={recipientCity}
                  recipientState={recipientState}
                  recipientZip={recipientZip}
                  returnName={returnName}
                  returnAddress1={returnAddress1}
                  returnAddress2={returnAddress2}
                  returnCity={returnCity}
                  returnState={returnState}
                  returnZip={returnZip}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
                        }
