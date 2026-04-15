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
  const [isCustomDate, setIsCustomDate] = useState(false);

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const messageParam = params.get("message");
    const mailingDateParam = params.get("mailingDate");

    if (messageParam) {
      setInsideMessage(decodeURIComponent(messageParam));
    }
    if (mailingDateParam) {
      setMailingDate(mailingDateParam);
      setIsCustomDate(true);
    }
  }, []);

  const handleFrontChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFrontMessage(e.target.value);
  };

  const handleInsideChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInsideMessage(e.target.value);
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSignatureName(e.target.value);
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
    // Letter step validation
    if (currentStep === 1) {
      return Boolean(insideMessage.trim().length > 0 && signatureName.trim().length > 0);
    }
    // Envelope step validation
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
    // Review step validation
    if (currentStep === 3) {
      return Boolean(contactEmail.trim() && reviewConfirmed);
    }
    return false;
  };

  const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

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
              Write directly on the card, address the envelope, and review your details before sending.
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
                      onClick={() => setCurrentStep(step.num)}
                      className="flex items-center gap-2 bg-transparent border-none p-0"
                      style={{ opacity: 1, cursor: "pointer" }}
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
                        transition: "all 0.25s",
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.74rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color:
                          step.num === currentStep
                            ? "var(--mm-forest)"
                            : "var(--mm-ink-muted)",
                        transition: "all 0.25s",
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
                        background: "var(--mm-line)",
                        margin: "0 12px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          <div style={{ marginTop: "40px" }}>
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
                        margin: "0 0 12px",
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.8rem",
                        fontWeight: 500,
                        color: "var(--mm-forest)",
                      }}
                    >
                      Personalize Your Card
                    </h2>
                    <p
                      style={{
                        margin: "0 0 32px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        color: "var(--mm-ink-soft)",
                        maxWidth: "500px",
                      }}
                    >
                      Click on the dashed areas to write your message. All sections are optional—write as much or as little as you like.
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
                        minHeight: "440px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "320px",
                          aspectRatio: "1.5 / 1",
                          background: "#fdfcf9",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                          padding: "24px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            maxWidth: "240px",
                            height: "1px",
                            background: "rgba(55, 93, 129, 0.18)",
                            marginBottom: "16px",
                          }}
                        />
                        <textarea
                          value={frontMessage}
                          onChange={handleFrontChange}
                          placeholder="Write front message here..."
                          style={{
                            fontFamily: handwrittenFont,
                            fontSize: "clamp(24px, 5vw, 30px)",
                            fontWeight: 400,
                            lineHeight: 1.12,
                            color: "var(--mm-forest)",
                            textAlign: "center",
                            width: "100%",
                            maxWidth: "260px",
                            letterSpacing: "0.01em",
                            outline: "none",
                            background: "transparent",
                            border: frontMessage ? "none" : "1px dashed rgba(55, 93, 129, 0.25)",
                            borderRadius: "4px",
                            resize: "none",
                            overflow: "hidden",
                            minHeight: "80px",
                            cursor: "text",
                            padding: "8px",
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.background = "rgba(245, 241, 234, 0.5)";
                            e.currentTarget.style.borderColor = "rgba(55, 93, 129, 0.4)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.background = "transparent";
                            if (frontMessage) e.currentTarget.style.border = "none";
                          }}
                        />
                        <div
                          style={{
                            width: "100%",
                            maxWidth: "240px",
                            height: "1px",
                            background: "rgba(55, 93, 129, 0.18)",
                            marginTop: "16px",
                          }}
                        />
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
                        minHeight: "440px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "320px",
                          aspectRatio: "1.5 / 1",
                          background: "#fdfcf9",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                          padding: "24px",
                          display: "flex",
                          flexDirection: "column",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            borderLeft: "1px solid rgba(61,43,31,0.08)",
                            paddingLeft: "16px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "1px",
                              background: "rgba(61,43,31,0.06)",
                              marginBottom: "12px",
                            }}
                          />
                          <textarea
                            value={insideMessage}
                            onChange={handleInsideChange}
                            placeholder="Write your message inside..."
                            style={{
                              fontFamily: handwrittenFont,
                              fontSize: "clamp(14px, 4vw, 16px)",
                              lineHeight: 1.34,
                              color: "var(--mm-pen-blue)",
                              width: "100%",
                              minHeight: "120px",
                              outline: "none",
                              background: "transparent",
                              border: insideMessage ? "none" : "1px dashed rgba(61, 43, 31, 0.15)",
                              borderRadius: "4px",
                              resize: "none",
                              cursor: "text",
                              padding: "8px",
                              transition: "all 0.2s",
                              marginBottom: "8px",
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.background = "rgba(245, 241, 234, 0.5)";
                              e.currentTarget.style.borderColor = "rgba(61, 43, 31, 0.25)";
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.background = "transparent";
                              if (insideMessage) e.currentTarget.style.border = "none";
                            }}
                          />
                          <div className="flex items-center" style={{ 
                            border: signatureName ? "none" : "1px dashed rgba(61, 43, 31, 0.15)",
                            borderRadius: "4px",
                            padding: "2px 0",
                            transition: "all 0.2s"
                          }}>
                            <span style={{ fontFamily: handwrittenFont, fontSize: "clamp(14px, 4vw, 16px)", color: "var(--mm-pen-blue)", paddingLeft: "8px" }}>—</span>
                            <input
                              value={signatureName}
                              onChange={(e) => setSignatureName(e.target.value)}
                              placeholder="Sign your name"
                              style={{
                                fontFamily: handwrittenFont,
                                fontSize: "clamp(14px, 4vw, 16px)",
                                color: "var(--mm-pen-blue)",
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                padding: "8px 4px",
                                width: "100%",
                                cursor: "text",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={() => setCurrentStep(2)}
                      style={{
                        padding: "12px 24px",
                        background: "var(--mm-forest)",
                        color: "#f5f1ea",
                        border: "none",
                        borderRadius: "3px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Continue to Envelope →
                    </button>
                  </div>
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
                      Tell us where the letter is going and what return address should appear.
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
                          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                          padding: "16px",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Stamp */}
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            width: "42px",
                            height: "52px",
                            background: `url("${IMAGES.foreverStamp}")`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                          }}
                        />

                        {/* Return Address */}
                        <div
                          style={{
                            maxWidth: "140px",
                            fontFamily: handwrittenFont,
                            fontSize: "10px",
                            lineHeight: 1.3,
                            color: "var(--mm-ink)",
                            opacity: 0.8,
                          }}
                        >
                          <p style={{ margin: 0, fontWeight: 500 }}>{returnNameDisplay}</p>
                          <p style={{ margin: 0 }}>{returnAddress1}</p>
                          {returnAddress2 && <p style={{ margin: 0 }}>{returnAddress2}</p>}
                          <p style={{ margin: 0 }}>
                            {returnCity && `${returnCity}, `}
                            {returnState && `${returnState} `}
                            {returnZip}
                          </p>
                        </div>

                        {/* Recipient Address */}
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "12px",
                          }}
                        >
                          <div
                            style={{
                              textAlign: "left",
                              fontFamily: handwrittenFont,
                              fontSize: "14px",
                              lineHeight: 1.4,
                              color: "var(--mm-ink)",
                            }}
                          >
                            {recipientLines.map((line, idx) => (
                              <p
                                key={idx}
                                style={{
                                  margin: 0,
                                  fontSize: idx === 0 ? fitNameFontSize(line) : "13px",
                                  fontWeight: idx === 0 ? 500 : 400,
                                }}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-8">
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
                            <select 
                              value={recipientState} 
                              onChange={(e) => setRecipientState(e.target.value)} 
                              style={{
                                ...inputStyle, 
                                appearance: "none", 
                                color: recipientState ? "var(--mm-ink)" : "rgba(23, 21, 19, 0.4)",
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath fill=\'none\' stroke=\'%23867d72\' stroke-width=\'1.5\' d=\'M1 1l4 4 4-4\'/%3E%3C/svg%3E")',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                backgroundSize: "10px 6px",
                                paddingRight: "30px"
                              }}
                            >
                              <option value="" style={{ background: "white", color: "var(--mm-ink)" }}>ST</option>
                              {US_STATES.map(st => (
                                <option key={st} value={st} style={{ background: "white", color: "var(--mm-ink)" }}>
                                  {st}
                                </option>
                              ))}
                            </select>
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
                            <select 
                              value={returnState} 
                              onChange={(e) => setReturnState(e.target.value)} 
                              style={{
                                ...inputStyle, 
                                appearance: "none", 
                                color: returnState ? "var(--mm-ink)" : "rgba(23, 21, 19, 0.4)",
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath fill=\'none\' stroke=\'%23867d72\' stroke-width=\'1.5\' d=\'M1 1l4 4 4-4\'/%3E%3C/svg%3E")',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                backgroundSize: "10px 6px",
                                paddingRight: "30px"
                              }}
                            >
                              <option value="" style={{ background: "white", color: "var(--mm-ink)" }}>ST</option>
                              {US_STATES.map(st => (
                                <option key={st} value={st} style={{ background: "white", color: "var(--mm-ink)" }}>
                                  {st}
                                </option>
                              ))}
                            </select>
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
                        cursor: "pointer",
                      }}
                    >
                      ← Back to Card
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      style={{
                        padding: "12px 24px",
                        background: "var(--mm-forest)",
                        color: "#f5f1ea",
                        border: "none",
                        borderRadius: "3px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        cursor: "pointer",
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
                          {insideMessage || "No inside message added"}
                        </p>
                        <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--mm-ink-muted)" }}>
                          — {signatureName || "No signature added"}
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
                              {recipientName || "Not set"}
                              {"\n"}
                              {recipientAddress1 || "Not set"}
                              {recipientAddress2 ? `\n${recipientAddress2}` : ""}
                              {"\n"}
                              {recipientCity || "Not set"}, {recipientState.toUpperCase() || "ST"} {recipientZip || "00000"}
                            </p>
                          </div>
                          <div>
                            <p style={{ margin: "0 0 4px", fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mm-burgundy)" }}>
                              Return address
                            </p>
                            <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.84rem", lineHeight: 1.6, color: "var(--mm-ink-soft)", whiteSpace: "pre-line" }}>
                              {returnName || "Not set"}
                              {"\n"}
                              {returnAddress1 || "Not set"}
                              {returnAddress2 ? `\n${returnAddress2}` : ""}
                              {"\n"}
                              {returnCity || "Not set"}, {returnState.toUpperCase() || "ST"} {returnZip || "00000"}
                            </p>
                          </div>
                        </div>
                        <div style={{ padding: "16px 20px", background: "rgba(139, 58, 58, 0.06)", border: "1px solid rgba(139, 58, 58, 0.15)", marginTop: "16px" }}>
                          <div className="flex justify-between items-start mb-2">
                            <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mm-burgundy)" }}>
                              Mailing Date
                            </p>
                            <button 
                              onClick={() => setIsCustomDate(true)}
                              style={{ 
                                display: isCustomDate ? "none" : "block",
                                background: "none", 
                                border: "none", 
                                color: "var(--mm-burgundy)", 
                                fontSize: "0.65rem", 
                                fontWeight: 600, 
                                textTransform: "uppercase", 
                                letterSpacing: "0.05em", 
                                cursor: "pointer", 
                                textDecoration: "underline" 
                              }}
                            >
                              Select a specific date
                            </button>
                          </div>
                          
                          {!isCustomDate ? (
                            <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--mm-ink)" }}>
                              Next 1–2 business days
                            </p>
                          ) : (
                            <input 
                              type="date" 
                              value={mailingDate || ""} 
                              onChange={(e) => setMailingDate(e.target.value)}
                              min={new Date().toISOString().split("T")[0]}
                              style={{
                                width: "100%",
                                padding: "8px 12px",
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.88rem",
                                background: "white",
                                border: "1px solid var(--mm-line)",
                                borderRadius: "3px",
                                outline: "none"
                              }}
                            />
                          )}
                          
                          {mailingDate && isCustomDate && (
                            <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--mm-ink-soft)" }}>
                              Will be mailed on: {new Date(mailingDate + "T12:00:00").toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          )}
                        </div>
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
                          Order saved! Order ID: {savedOrderId}
                        </div>
                      )}

                      <button
                        onClick={handleCreateOrder}
                        disabled={isSubmitting || !canAdvance()}
                        style={{
                          width: "100%",
                          padding: "16px",
                          background: canAdvance() ? "var(--mm-forest)" : "var(--mm-line)",
                          color: canAdvance() ? "#f5f1ea" : "var(--mm-ink-muted)",
                          border: "none",
                          borderRadius: "3px",
                          fontFamily: "var(--font-sans)",
                          fontSize: "1rem",
                          fontWeight: 600,
                          cursor: canAdvance() && !isSubmitting ? "pointer" : "not-allowed",
                          transition: "background 0.2s",
                          marginTop: "12px",
                        }}
                      >
                        {isSubmitting ? "Saving..." : "Save Order"}
                      </button>
                    </div>

                    <div className="flex justify-start mt-8">
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
                          cursor: "pointer",
                        }}
                      >
                        ← Back to Envelope
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: "var(--mm-cream)" }}>
        <div className="max-w-[1240px] mx-auto text-center">
          <PenStroke color="var(--mm-burgundy)" width="120px" />
          <p
            style={{
              marginTop: "24px",
              fontFamily: "var(--font-serif)",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "var(--mm-forest)",
            }}
          >
            "A card is a hug in an envelope."
          </p>
        </div>
      </section>
    </PageShell>
  );
}
