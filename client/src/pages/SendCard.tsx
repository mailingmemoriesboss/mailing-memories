import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { PageShell, FadeIn, PenStroke } from "@/components/Layout";

const IMAGES = {
  woodTexture:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/desk-wood-texture-jhuAnbfnjU7sz2zq4KXdHG.webp",
  foreverStamp: "/forever-stamp.png",
};

const STEPS = [
  { num: 1, label: "Card" },
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

export default function SendCard() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);

  const [frontMessage, setFrontMessage] = useState("");
  const [insideMessage, setInsideMessage] = useState("");
  const [signatureName, setSignatureName] = useState("");
  const [mailingDate, setMailingDate] = useState("");

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

  const frontRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const messageParam = params.get("message");
    const mailingDateParam = params.get("mailingDate");

    if (messageParam) {
      const decodedMessage = decodeURIComponent(messageParam);
      setInsideMessage(decodedMessage);
      // Ensure the ref is updated immediately
      if (insideRef.current) {
        insideRef.current.textContent = decodedMessage;
      }
    }
    if (mailingDateParam) {
      setMailingDate(mailingDateParam);
    }
  }, []);

  useEffect(() => {
    if (frontRef.current && frontRef.current.textContent !== frontMessage) {
      frontRef.current.textContent = frontMessage;
    }
  }, [frontMessage]);

  useEffect(() => {
    if (insideRef.current) {
      insideRef.current.textContent = insideMessage;
    }
  }, [insideMessage]);

  useEffect(() => {
    if (signatureRef.current && signatureRef.current.textContent !== signatureName) {
      signatureRef.current.textContent = signatureName;
    }
  }, [signatureName]);

  const handleFrontChange = (e: React.FormEvent<HTMLDivElement>) => {
    setFrontMessage(e.currentTarget.textContent || "");
  };

  const handleInsideChange = (e: React.FormEvent<HTMLDivElement>) => {
    setInsideMessage(e.currentTarget.textContent || "");
  };

  const handleSignatureChange = (e: React.FormEvent<HTMLDivElement>) => {
    const text = (e.currentTarget.textContent || "").replace(/^[-–—]\s*/, "");
    setSignatureName(text);
  };

  const inputStyle = useMemo(
    () => ({
      width: "100%",
      padding: "12px 16px",
      fontFamily: "var(--font-sans)",
      fontSize: "0.92rem",
      color: "var(--mm-ink)",
      background: "rgba(255,255,255,0.6)",
      border: "1px solid var(--mm-line)",
      borderRadius: "3px",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
    }),
    []
  );

  const handwrittenFont = "var(--font-handwriting)";

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
          requested_ship_date: mailingDate || null,
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

  const frontDisplay = frontMessage.trim() || "Click to write front message";
  const insideDisplay = insideMessage.trim() || "Click to write your message";
  const signatureDisplay = signatureName.trim() || "Click to sign";

  const recipientLines = [
    recipientName || "Recipient Name",
    recipientAddress1 || "123 Main Street",
    recipientAddress2 || "",
    recipientCity || recipientState || recipientZip
      ? `${recipientCity || "City"}, ${recipientState || "ST"} ${recipientZip || "00000"}`
      : "City, ST 00000",
  ].filter(Boolean);

  const returnNameDisplay = returnName.trim() || "Your Name";

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
              Handwritten Card Service
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
              Send a Card
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
              Write your message on the card, address the envelope, and review your details before sending.
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
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <div style={{ marginBottom: "32px" }}>
                  <h2
                    style={{
                      margin: "0 0 8px",
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.8rem",
                      fontWeight: 500,
                      color: "var(--mm-forest)",
                    }}
                  >
                    Write Your Card
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      color: "var(--mm-ink-soft)",
                      lineHeight: 1.6,
                    }}
                  >
                    Click directly on the card to write. The front is optional. The inside message and signature are required to continue.
                  </p>
                </div>

                <div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  style={{ alignItems: "start" }}
                >
                  <div
                    style={{
                      backgroundImage: `url("${IMAGES.woodTexture}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      padding: "40px 32px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "320px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                        background: "#faf7f2",
                        padding: "28px 26px",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid rgba(61,43,31,0.08)",
                        borderRadius: "3px",
                        minHeight: "160px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
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
                      <div
                        ref={frontRef}
                        contentEditable
                        onInput={handleFrontChange}
                        suppressContentEditableWarning
                        style={{
                          fontFamily: handwrittenFont,
                          fontSize: "clamp(24px, 5vw, 30px)",
                          fontWeight: 400,
                          lineHeight: 1.12,
                          color: frontMessage.trim() ? "var(--mm-forest)" : "rgba(15, 23, 42, 0.35)",
                          textAlign: "center",
                          maxWidth: "220px",
                          letterSpacing: "0.01em",
                          outline: "none",
                          minHeight: "60px",
                          cursor: "text",
                          padding: "8px",
                          borderRadius: "2px",
                          transition: "background 0.2s",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.background = "rgba(245, 241, 234, 0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {frontDisplay}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundImage: `url("${IMAGES.woodTexture}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      padding: "40px 32px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "320px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                        background: "#faf7f2",
                        padding: "18px 20px 16px",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid rgba(61,43,31,0.08)",
                        borderRadius: "3px",
                        minHeight: "160px",
                        position: "relative",
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
                      <div style={{ paddingTop: "6px" }}>
                        <div
                          ref={insideRef}
                          contentEditable
                          onInput={handleInsideChange}
                          suppressContentEditableWarning
                          style={{
                            fontFamily: handwrittenFont,
                            fontSize: "clamp(14px, 4vw, 16px)",
                            lineHeight: 1.34,
                            color: insideMessage.trim() ? "var(--mm-pen-blue)" : "rgba(15, 23, 42, 0.25)",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            minHeight: "80px",
                            outline: "none",
                            cursor: "text",
                            padding: "8px",
                            borderRadius: "2px",
                            transition: "background 0.2s",
                            marginBottom: "8px",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.background = "rgba(245, 241, 234, 0.5)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          {insideDisplay}
                        </div>
                        <div
                          ref={signatureRef}
                          contentEditable
                          onInput={handleSignatureChange}
                          suppressContentEditableWarning
                          style={{
                            fontFamily: handwrittenFont,
                            fontSize: "clamp(14px, 4vw, 16px)",
                            color: signatureName.trim() ? "var(--mm-pen-blue)" : "rgba(15, 23, 42, 0.25)",
                            letterSpacing: "0.01em",
                            outline: "none",
                            cursor: "text",
                            padding: "8px",
                            borderRadius: "2px",
                            transition: "background 0.2s",
                            minHeight: "24px",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.background = "rgba(245, 241, 234, 0.5)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          — {signatureDisplay}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => canAdvance() && setCurrentStep(2)}
                  disabled={!canAdvance()}
                  style={{
                    marginTop: "32px",
                    padding: "14px 32px",
                    background: canAdvance() ? "var(--mm-forest)" : "var(--mm-line)",
                    color: canAdvance() ? "#f5f1ea" : "var(--mm-ink-muted)",
                    border: "none",
                    borderRadius: "3px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: canAdvance() ? "pointer" : "not-allowed",
                    transition: "background 0.2s",
                    display: "block",
                    marginInline: "auto",
                  }}
                >
                  Continue to Envelope →
                </button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-envelope"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <div style={{ marginBottom: "32px" }}>
                  <h2
                    style={{
                      margin: "0 0 8px",
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.8rem",
                      fontWeight: 500,
                      color: "var(--mm-forest)",
                    }}
                  >
                    Address Your Envelope
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      color: "var(--mm-ink-soft)",
                      lineHeight: 1.6,
                    }}
                  >
                    Tell us where the card is going and what return address should appear.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div
                    style={{
                      backgroundImage: `url("${IMAGES.woodTexture}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      padding: "40px 32px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "320px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "320px",
                        height: "200px",
                        background: "#f0ebe3",
                        padding: "16px 18px 14px",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid rgba(61,43,31,0.08)",
                        position: "relative",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={IMAGES.foreverStamp}
                        alt="Forever stamp"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "12px",
                          width: "40px",
                          height: "50px",
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
                          width: "136px",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 6px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "7px",
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
                            fontSize: fitNameFontSize(returnNameDisplay),
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
                            fontSize: "12px",
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
                              fontSize: "12px",
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
                            fontSize: "12px",
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
                          top: "88px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "220px",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 6px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "7px",
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
                              fontSize: idx === 0 ? "15px" : "13px",
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
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div>
                      <p
                        style={{
                          margin: "0 0 12px",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.74rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--mm-burgundy)",
                        }}
                      >
                        Who’s receiving this?
                      </p>
                      <div className="flex flex-col gap-3">
                        <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Full name" style={inputStyle} />
                        <input type="text" value={recipientAddress1} onChange={(e) => setRecipientAddress1(e.target.value)} placeholder="Street address" style={inputStyle} />
                        <input type="text" value={recipientAddress2} onChange={(e) => setRecipientAddress2(e.target.value)} placeholder="Apt, suite, etc. (optional)" style={inputStyle} />
                        <div className="grid grid-cols-3 gap-3">
                          <input type="text" value={recipientCity} onChange={(e) => setRecipientCity(e.target.value)} placeholder="City" style={inputStyle} />
                          <input type="text" value={recipientState} onChange={(e) => setRecipientState(e.target.value.toUpperCase())} placeholder="ST" maxLength={2} style={inputStyle} />
                          <input type="text" value={recipientZip} onChange={(e) => setRecipientZip(e.target.value)} placeholder="ZIP" style={inputStyle} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p
                        style={{
                          margin: "0 0 12px",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.74rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--mm-burgundy)",
                        }}
                      >
                        Return address
                      </p>
                      <div className="flex flex-col gap-3">
                        <input type="text" value={returnName} onChange={(e) => setReturnName(e.target.value)} placeholder="Your name" style={inputStyle} />
                        <input type="text" value={returnAddress1} onChange={(e) => setReturnAddress1(e.target.value)} placeholder="Street address" style={inputStyle} />
                        <input type="text" value={returnAddress2} onChange={(e) => setReturnAddress2(e.target.value)} placeholder="Apt, suite, etc. (optional)" style={inputStyle} />
                        <div className="grid grid-cols-3 gap-3">
                          <input type="text" value={returnCity} onChange={(e) => setReturnCity(e.target.value)} placeholder="City" style={inputStyle} />
                          <input type="text" value={returnState} onChange={(e) => setReturnState(e.target.value.toUpperCase())} placeholder="ST" maxLength={2} style={inputStyle} />
                          <input type="text" value={returnZip} onChange={(e) => setReturnZip(e.target.value)} placeholder="ZIP" style={inputStyle} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="bg-transparent border-none"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--mm-ink-muted)",
                      padding: "10px 0",
                    }}
                  >
                    ← Back to Card
                  </button>
                  <button
                    onClick={() => canAdvance() && setCurrentStep(3)}
                    disabled={!canAdvance()}
                    style={{
                      padding: "12px 24px",
                      background: canAdvance() ? "var(--mm-forest)" : "var(--mm-line)",
                      color: canAdvance() ? "#f5f1ea" : "var(--mm-ink-muted)",
                      border: "none",
                      borderRadius: "3px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: canAdvance() ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to Review →
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step-review"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <div style={{ maxWidth: "760px", margin: "0 auto" }}>
                  <h2
                    style={{
                      margin: "0 0 8px",
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.8rem",
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
                      fontSize: "0.95rem",
                      color: "var(--mm-ink-soft)",
                      lineHeight: 1.6,
                    }}
                  >
                    Make sure the card, envelope, and mailing details look right before saving the order.
                  </p>

                  <div className="flex flex-col gap-4">
                    <div style={{ padding: "16px 20px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--mm-line)" }}>
                      <p style={{ margin: "0 0 4px", fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mm-ink-muted)" }}>
                        Card
                      </p>
                      <p style={{ margin: "0 0 8px", fontFamily: "var(--font-serif)", fontSize: "1.02rem", color: "var(--mm-forest)" }}>
                        {frontMessage || "No front message added"}
                      </p>
                      <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.86rem", color: "var(--mm-ink-soft)", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                        {insideMessage}
                      </p>
                      <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--mm-ink-muted)" }}>
                        — {signatureName}
                      </p>
                    </div>

                    <div style={{ padding: "16px 20px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--mm-line)" }}>
                      <p style={{ margin: "0 0 8px", fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mm-ink-muted)" }}>
                        Envelope
                      </p>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <p style={{ margin: "0 0 4px", fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mm-burgundy)" }}>
                            Recipient
                          </p>
                          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.84rem", lineHeight: 1.6, color: "var(--mm-ink-soft)", whiteSpace: "pre-line" }}>
                            {recipientName}
                            {"\n"}
                            {recipientAddress1}
                            {recipientAddress2 ? `\n${recipientAddress2}` : ""}
                            {"\n"}
                            {recipientCity}, {recipientState.toUpperCase()} {recipientZip}
                          </p>
                        </div>
                        <div>
                          <p style={{ margin: "0 0 4px", fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mm-burgundy)" }}>
                            Return address
                          </p>
                          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.84rem", lineHeight: 1.6, color: "var(--mm-ink-soft)", whiteSpace: "pre-line" }}>
                            {returnName}
                            {"\n"}
                            {returnAddress1}
                            {returnAddress2 ? `\n${returnAddress2}` : ""}
                            {"\n"}
                            {returnCity}, {returnState.toUpperCase()} {returnZip}
                          </p>
                        </div>
                      </div>
                      {mailingDate && (
                        <div style={{ padding: "16px 20px", background: "rgba(139, 58, 58, 0.06)", border: "1px solid rgba(139, 58, 58, 0.15)", marginTop: "16px" }}>
                          <p style={{ margin: "0 0 8px", fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mm-burgundy)" }}>
                            Mailing Date
                          </p>
                          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--mm-ink)" }}>
                            {new Date(mailingDate).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      )}
                    </div>

                    <div style={{ padding: "18px 20px", background: "var(--mm-forest)", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div className="flex items-end justify-between gap-4 flex-wrap">
                        <div>
                          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,241,234,0.56)" }}>
                            Handwritten and mailed
                          </p>
                          <p style={{ margin: "4px 0 0", fontFamily: "var(--font-serif)", fontSize: "1.55rem", color: "#f5f1ea" }}>
                            $15
                          </p>
                        </div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", lineHeight: 1.5, color: "rgba(245,241,234,0.72)", textAlign: "right" }}>
                          Ships in 1–2 business days
                        </div>
                      </div>
                    </div>

                    <div>
                      <SectionLabel>Your email</SectionLabel>
                      <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="you@email.com" style={inputStyle} />
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
                      <input type="checkbox" checked={reviewConfirmed} onChange={(e) => setReviewConfirmed(e.target.checked)} style={{ marginTop: "3px" }} />
                      <span>I’ve reviewed the message and mailing details.</span>
                    </label>

                    {submitError && (
                      <div style={{ padding: "14px 16px", background: "rgba(139, 58, 58, 0.06)", border: "1px solid rgba(139, 58, 58, 0.16)", color: "var(--mm-ink)", fontFamily: "var(--font-sans)", fontSize: "0.84rem", lineHeight: 1.6 }}>
                        {submitError}
                      </div>
                    )}

                    {savedOrderId && (
                      <div style={{ padding: "14px 16px", background: "rgba(62, 92, 67, 0.08)", border: "1px solid rgba(62, 92, 67, 0.18)", color: "var(--mm-ink)", fontFamily: "var(--font-sans)", fontSize: "0.84rem", lineHeight: 1.6 }}>
                        Order details saved successfully.
                        <br />
                        Order ID: {savedOrderId}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="bg-transparent border-none"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--mm-ink-muted)",
                          padding: "10px 0",
                        }}
                      >
                        ← Back to Envelope
                      </button>
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
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageShell>
  );
}
