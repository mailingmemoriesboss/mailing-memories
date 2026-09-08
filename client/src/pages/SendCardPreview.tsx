import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";
import { PageShell } from "@/components/Layout";

const STEPS = [
  { num: 1, label: "Write the card" },
  { num: 2, label: "Address it" },
  { num: 3, label: "Review & pay" },
];

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

const fieldStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "46px",
  padding: "11px 13px",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  color: "var(--mm-ink)",
  background: "rgba(255,253,248,0.88)",
  border: "1px solid rgba(61,48,36,0.16)",
  borderRadius: "7px",
  outline: "none",
  boxShadow: "0 1px 0 rgba(255,255,255,0.7) inset",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "7px",
  fontFamily: "var(--font-sans)",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--mm-ink-muted)",
};

function StepHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div style={{ marginBottom: "26px" }}>
      <p style={{ margin: "0 0 7px", fontFamily: "var(--font-sans)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mm-burgundy)" }}>
        {eyebrow}
      </p>
      <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-serif)", fontSize: "clamp(1.65rem, 4vw, 2.25rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--mm-forest)" }}>
        {title}
      </h2>
      <p style={{ margin: 0, maxWidth: "620px", fontFamily: "var(--font-sans)", fontSize: "0.92rem", lineHeight: 1.7, color: "var(--mm-ink-soft)" }}>
        {body}
      </p>
    </div>
  );
}

function PrimaryButton({ children, disabled = false, onClick }: { children: React.ReactNode; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        minHeight: "48px",
        padding: "0 22px",
        border: "none",
        borderRadius: "7px",
        background: disabled ? "rgba(36,51,41,0.28)" : "var(--mm-forest)",
        color: "#fffaf3",
        fontFamily: "var(--font-sans)",
        fontSize: "0.86rem",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

function BackButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{ minHeight: "44px", padding: "0", background: "transparent", border: "none", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "var(--mm-ink-muted)" }}>
      {children}
    </button>
  );
}

function Progress({ currentStep, onStep }: { currentStep: number; onStep: (step: number) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2" style={{ maxWidth: "650px", marginBottom: "34px" }}>
      {STEPS.map((step) => {
        const active = step.num === currentStep;
        const complete = step.num < currentStep;
        return (
          <button
            key={step.num}
            type="button"
            onClick={() => onStep(step.num)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              padding: "9px 10px",
              background: active ? "rgba(36,51,41,0.07)" : "transparent",
              border: active ? "1px solid rgba(36,51,41,0.16)" : "1px solid transparent",
              borderRadius: "8px",
              color: active ? "var(--mm-forest)" : "var(--mm-ink-muted)",
              textAlign: "left",
            }}
          >
            <span style={{ width: "28px", height: "28px", flex: "0 0 28px", display: "grid", placeItems: "center", borderRadius: "50%", background: active ? "var(--mm-forest)" : complete ? "var(--mm-burgundy)" : "rgba(36,51,41,0.09)", color: active || complete ? "#fffaf3" : "var(--mm-ink-muted)", fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700 }}>
              {step.num}
            </span>
            <span className="hidden sm:block" style={{ fontFamily: "var(--font-sans)", fontSize: "0.74rem", fontWeight: 700 }}>
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CardWorkspace({ frontMessage, setFrontMessage, insideMessage, setInsideMessage, signatureName, setSignatureName }: {
  frontMessage: string;
  setFrontMessage: (value: string) => void;
  insideMessage: string;
  setInsideMessage: (value: string) => void;
  signatureName: string;
  setSignatureName: (value: string) => void;
}) {
  return (
    <div
      style={{
        border: "1px solid rgba(67,51,38,0.13)",
        background: "linear-gradient(145deg, #e7ddcf 0%, #f0e8dc 48%, #e4d8c8 100%)",
        borderRadius: "14px",
        padding: "clamp(18px, 4vw, 34px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
    >
      <div className="grid grid-cols-1 xl:grid-cols-[0.72fr_1.28fr] gap-7 items-center">
        <div>
          <p style={{ margin: "0 0 10px", fontFamily: "var(--font-sans)", fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(61,48,36,0.58)" }}>Front of folded card</p>
          <div
            style={{
              position: "relative",
              aspectRatio: "5 / 7",
              maxWidth: "270px",
              margin: "0 auto",
              background: "linear-gradient(100deg, #fbf7ec 0%, #fffdf8 52%, #f5eedf 100%)",
              border: "1px solid rgba(88,68,48,0.16)",
              borderRadius: "2px 5px 5px 2px",
              boxShadow: "-8px 16px 28px rgba(67,48,32,0.18), 0 3px 7px rgba(67,48,32,0.08)",
              transform: "rotate(-1.3deg)",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "8px", background: "linear-gradient(to right, rgba(90,67,43,0.10), rgba(255,255,255,0))" }} />
            <div style={{ height: "100%", display: "grid", placeItems: "center", padding: "24px" }}>
              <textarea
                aria-label="Front of card message"
                value={frontMessage}
                onChange={(e) => setFrontMessage(e.target.value)}
                placeholder="Optional front message"
                maxLength={120}
                style={{ width: "100%", minHeight: "120px", padding: "12px", resize: "none", outline: "none", border: "1px dashed rgba(47,75,116,0.25)", borderRadius: "8px", background: "rgba(255,255,255,0.18)", fontFamily: "var(--font-handwriting)", fontSize: "clamp(1.35rem, 4vw, 1.75rem)", lineHeight: 1.35, textAlign: "center", color: "var(--mm-pen-blue)" }}
              />
            </div>
          </div>
        </div>

        <div>
          <p style={{ margin: "0 0 10px", fontFamily: "var(--font-sans)", fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(61,48,36,0.58)" }}>Open card — your message goes inside</p>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "670px",
              margin: "0 auto",
              aspectRatio: "10 / 7",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "#fffdf8",
              border: "1px solid rgba(88,68,48,0.16)",
              borderRadius: "4px",
              boxShadow: "var(--mm-shadow-paper)",
              overflow: "hidden",
              transform: "rotate(0.35deg)",
            }}
          >
            <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "1px", zIndex: 3, background: "rgba(78,59,40,0.12)", boxShadow: "-5px 0 10px rgba(75,55,35,0.05), 5px 0 10px rgba(75,55,35,0.04)" }} />
            <div style={{ position: "relative", background: "linear-gradient(95deg, #fbf7ed 0%, #fffdf8 80%)" }}>
              <div style={{ position: "absolute", inset: "22px", border: "1px solid rgba(61,48,36,0.045)", pointerEvents: "none" }} />
              <div className="hidden sm:block" style={{ position: "absolute", left: "28px", bottom: "24px", fontFamily: "var(--font-serif)", fontSize: "0.74rem", fontStyle: "italic", color: "rgba(93,83,72,0.33)" }}>
                left inside panel
              </div>
            </div>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", padding: "clamp(16px, 3vw, 28px)", background: "linear-gradient(90deg, #fffdf8 0%, #fcf7ec 100%)" }}>
              <textarea
                aria-label="Inside card message"
                value={insideMessage}
                onChange={(e) => setInsideMessage(e.target.value)}
                placeholder="Write the message you want me to handwrite…"
                style={{ flex: 1, width: "100%", minHeight: "165px", padding: "4px 4px 10px", resize: "none", outline: "none", border: "none", background: "transparent", fontFamily: "var(--font-handwriting)", fontSize: "clamp(1rem, 2.7vw, 1.28rem)", lineHeight: 1.55, color: "var(--mm-pen-blue)" }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "7px", borderTop: "1px solid rgba(47,75,116,0.10)", paddingTop: "9px" }}>
                <span style={{ fontFamily: "var(--font-handwriting)", fontSize: "1.1rem", color: "var(--mm-pen-blue)" }}>—</span>
                <input
                  aria-label="Signature"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Your signature"
                  style={{ width: "100%", padding: "3px 0", background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-handwriting)", fontSize: "clamp(1rem, 2.7vw, 1.25rem)", color: "var(--mm-pen-blue)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2" style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid rgba(67,51,38,0.10)", fontFamily: "var(--font-sans)", fontSize: "0.76rem", color: "rgba(61,48,36,0.66)" }}>
        <span>Folded cardstock</span><span>•</span><span>Handwritten by me</span><span>•</span><span>Blue ink</span><span>•</span><span>Front message optional</span>
      </div>
    </div>
  );
}

function EnvelopePreview({ recipient, returnAddress }: { recipient: string[]; returnAddress: string[] }) {
  return (
    <div style={{ border: "1px solid rgba(67,51,38,0.13)", background: "linear-gradient(145deg, #e8ded0 0%, #f2eadf 100%)", borderRadius: "14px", padding: "clamp(22px, 5vw, 42px)" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "620px",
          aspectRatio: "1.85 / 1",
          margin: "0 auto",
          background: "linear-gradient(125deg, #fbf7ed 0%, #f7f0e4 100%)",
          border: "1px solid rgba(91,70,49,0.20)",
          borderRadius: "5px",
          boxShadow: "var(--mm-shadow-paper)",
          overflow: "hidden",
          transform: "rotate(-0.45deg)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(30deg, transparent 49.7%, rgba(104,78,53,0.10) 50%, transparent 50.35%), linear-gradient(-30deg, transparent 49.7%, rgba(104,78,53,0.08) 50%, transparent 50.35%)", opacity: 0.55, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "16px", left: "18px", maxWidth: "42%", fontFamily: "var(--font-handwriting)", fontSize: "clamp(0.64rem, 1.8vw, 0.85rem)", lineHeight: 1.38, color: "var(--mm-pen-blue)" }}>
          {returnAddress.map((line, i) => <div key={i}>{line}</div>)}
        </div>
        <div style={{ position: "absolute", top: "14px", right: "16px", width: "clamp(42px, 10vw, 58px)", aspectRatio: "0.78 / 1", padding: "3px", background: "#fff", border: "1px solid rgba(61,48,36,0.18)", boxShadow: "0 2px 5px rgba(61,48,36,0.10)" }}>
          <img src="/forever-stamp.png" alt="Forever stamp" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
        </div>
        <div style={{ position: "absolute", left: "50%", top: "53%", transform: "translate(-45%, -50%)", width: "55%", fontFamily: "var(--font-handwriting)", fontSize: "clamp(0.86rem, 2.5vw, 1.15rem)", lineHeight: 1.42, color: "var(--mm-pen-blue)" }}>
          {recipient.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      </div>
      <p style={{ margin: "18px auto 0", maxWidth: "620px", textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "0.76rem", lineHeight: 1.5, color: "rgba(61,48,36,0.65)" }}>
        This preview shows placement. I hand-address the actual envelope when I prepare your card.
      </p>
    </div>
  );
}

export default function SendCardPreview() {
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const messageParam = params.get("message");
    const mailingDateParam = params.get("mailingDate");
    if (messageParam) setInsideMessage(decodeURIComponent(messageParam));
    if (mailingDateParam) setMailingDate(mailingDateParam);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");
    const sessionId = params.get("session_id");

    if (paymentStatus === "cancelled") {
      const stored = localStorage.getItem("mailingMemoriesPendingOrder");
      if (stored) {
        try {
          const pending = JSON.parse(stored);
          const order = pending?.order;
          if (order) {
            setFrontMessage(order.front_message || "");
            setInsideMessage(order.message_text || "");
            setSignatureName(order.signature_name || "");
            setRecipientName(order.recipient_name || "");
            setRecipientAddress1(order.address_line1 || "");
            setRecipientAddress2(order.address_line2 || "");
            setRecipientCity(order.city || "");
            setRecipientState(order.state_region || "");
            setRecipientZip(order.postal_code || "");
            setReturnName(order.return_name || "");
            setReturnAddress1(order.return_address_line1 || "");
            setReturnAddress2(order.return_address_line2 || "");
            setReturnCity(order.return_city || "");
            setReturnState(order.return_state || "");
            setReturnZip(order.return_postal_code || "");
            setContactEmail(order.sender_email || "");
            setMailingDate(order.requested_ship_date || "");
            setReviewConfirmed(true);
            setCurrentStep(3);
          }
        } catch {
          localStorage.removeItem("mailingMemoriesPendingOrder");
        }
      }
      setSubmitError("Payment was canceled. Your card was not submitted, and you were not charged.");
      window.history.replaceState({}, "", "/send");
      return;
    }

    if (paymentStatus !== "success" || !sessionId) return;

    async function finalizePaidOrder() {
      setCurrentStep(3);
      setIsSubmitting(true);
      setSubmitError("");
      try {
        const stored = localStorage.getItem("mailingMemoriesPendingOrder");
        if (!stored) throw new Error("Payment was received, but the card details could not be found in this browser. Please contact Mailing Memories with your payment email.");
        const pending = JSON.parse(stored);
        if (!pending?.order || !pending?.checkoutReference) throw new Error("The saved card information is incomplete. Please contact Mailing Memories.");

        const response = await fetch("/api/finalize-paid-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, checkoutReference: pending.checkoutReference, order: pending.order }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Payment succeeded, but the order could not be finalized.");

        sessionStorage.setItem("mailingMemoriesConfirmation", JSON.stringify({
          orderId: data?.order?.id || "",
          recipientName: pending.order.recipient_name || "",
          recipientCity: pending.order.city || "",
          recipientState: pending.order.state_region || "",
          mailingDate: pending.order.requested_ship_date || null,
          email: pending.order.sender_email || "",
          amountPaidCents: data?.amountPaidCents ?? 0,
        }));
        localStorage.removeItem("mailingMemoriesPendingOrder");
        setLocation("/order-confirmed");
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Payment succeeded, but the order could not be finalized.");
      } finally {
        setIsSubmitting(false);
      }
    }

    finalizePaidOrder();
  }, [setLocation]);

  const cardReady = insideMessage.trim().length > 0 && signatureName.trim().length > 0;
  const envelopeReady = Boolean(recipientName.trim() && recipientAddress1.trim() && recipientCity.trim() && recipientState.trim() && recipientZip.trim() && returnName.trim() && returnAddress1.trim() && returnCity.trim() && returnState.trim() && returnZip.trim());
  const reviewReady = Boolean(contactEmail.trim() && reviewConfirmed);

  const recipientLines = useMemo(() => [
    recipientName || "Recipient Name",
    recipientAddress1 || "123 Main Street",
    recipientAddress2 || "",
    recipientCity || recipientState || recipientZip ? `${recipientCity || "City"}, ${recipientState || "ST"} ${recipientZip || "00000"}` : "City, ST 00000",
  ].filter(Boolean), [recipientName, recipientAddress1, recipientAddress2, recipientCity, recipientState, recipientZip]);

  const returnLines = useMemo(() => [
    returnName || "Your Name",
    returnAddress1 || "Your return address",
    returnAddress2 || "",
    returnCity || returnState || returnZip ? `${returnCity || "City"}, ${returnState || "ST"} ${returnZip || "00000"}` : "City, ST 00000",
  ].filter(Boolean), [returnName, returnAddress1, returnAddress2, returnCity, returnState, returnZip]);

  async function handleCheckout() {
    if (!reviewReady || isSubmitting) return;
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const pendingOrder = {
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
      };

      const checkoutResponse = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactEmail }),
      });
      const checkoutData = await checkoutResponse.json();
      if (!checkoutResponse.ok) throw new Error(checkoutData?.error || "Secure payment could not be started. Please try again.");
      if (!checkoutData?.url || !checkoutData?.checkoutReference) throw new Error("Stripe did not return the information needed to continue.");

      localStorage.setItem("mailingMemoriesPendingOrder", JSON.stringify({ checkoutReference: checkoutData.checkoutReference, order: pendingOrder }));
      window.location.assign(checkoutData.url);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong while preparing secure payment.");
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell>
      <section style={{ background: "var(--mm-cream-soft)", padding: "44px 24px 16px" }}>
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p style={{ margin: "0 0 8px", fontFamily: "var(--font-sans)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mm-burgundy)" }}>Handwritten card service</p>
              <h1 style={{ margin: "0 0 9px", fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 500, lineHeight: 1.08, color: "var(--mm-forest)" }}>Create your card</h1>
              <p style={{ margin: 0, maxWidth: "640px", fontFamily: "var(--font-sans)", fontSize: "0.94rem", lineHeight: 1.7, color: "var(--mm-ink-soft)" }}>
                Type the words exactly as you want them. I’ll handwrite them on a real folded cardstock card, address the envelope, stamp it, and mail it.
              </p>
            </div>
            <div style={{ padding: "10px 14px", border: "1px solid rgba(36,51,41,0.13)", borderRadius: "8px", background: "#fffdf8", fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--mm-forest)", boxShadow: "0 6px 20px rgba(61,48,36,0.06)" }}>
              <strong>$15</strong> · postage included · Stripe checkout
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--mm-cream-soft)", padding: "24px 24px 76px" }}>
        <div className="max-w-[1120px] mx-auto">
          <Progress currentStep={currentStep} onStep={setCurrentStep} />

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.24 }}>
                <StepHeader eyebrow="Step 1" title="Write the card" body="The card below is your writing space. The front is optional. The inside message and your signature are required before you continue." />
                <CardWorkspace frontMessage={frontMessage} setFrontMessage={setFrontMessage} insideMessage={insideMessage} setInsideMessage={setInsideMessage} signatureName={signatureName} setSignatureName={setSignatureName} />
                <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginTop: "26px" }}>
                  <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: cardReady ? "var(--mm-forest)" : "var(--mm-ink-muted)" }}>
                    {cardReady ? "Card message ready." : "Add an inside message and signature to continue."}
                  </p>
                  <PrimaryButton disabled={!cardReady} onClick={() => setCurrentStep(2)}>Continue to envelope →</PrimaryButton>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="envelope" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.24 }}>
                <StepHeader eyebrow="Step 2" title="Address the envelope" body="Enter the recipient and return address. The preview updates as you type, using the same placement I’ll use when I hand-address the real envelope." />
                <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
                  <EnvelopePreview recipient={recipientLines} returnAddress={returnLines} />
                  <div style={{ padding: "22px", border: "1px solid var(--mm-line)", borderRadius: "12px", background: "rgba(255,253,248,0.7)", boxShadow: "0 12px 30px rgba(61,48,36,0.05)" }}>
                    <div style={{ marginBottom: "24px" }}>
                      <p style={{ margin: "0 0 12px", fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 600, color: "var(--mm-forest)" }}>Recipient</p>
                      <div className="flex flex-col gap-3">
                        <input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Full name" style={fieldStyle} />
                        <input value={recipientAddress1} onChange={(e) => setRecipientAddress1(e.target.value)} placeholder="Street address" style={fieldStyle} />
                        <input value={recipientAddress2} onChange={(e) => setRecipientAddress2(e.target.value)} placeholder="Apt, suite, etc. (optional)" style={fieldStyle} />
                        <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_0.7fr_0.8fr] gap-3">
                          <input value={recipientCity} onChange={(e) => setRecipientCity(e.target.value)} placeholder="City" style={fieldStyle} />
                          <select value={recipientState} onChange={(e) => setRecipientState(e.target.value)} style={fieldStyle}><option value="">State</option>{US_STATES.map((state) => <option key={state} value={state}>{state}</option>)}</select>
                          <input value={recipientZip} onChange={(e) => setRecipientZip(e.target.value)} placeholder="ZIP" style={fieldStyle} />
                        </div>
                      </div>
                    </div>

                    <div style={{ paddingTop: "22px", borderTop: "1px solid var(--mm-line)" }}>
                      <p style={{ margin: "0 0 12px", fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 600, color: "var(--mm-forest)" }}>Your return address</p>
                      <div className="flex flex-col gap-3">
                        <input value={returnName} onChange={(e) => setReturnName(e.target.value)} placeholder="Your name" style={fieldStyle} />
                        <input value={returnAddress1} onChange={(e) => setReturnAddress1(e.target.value)} placeholder="Street address" style={fieldStyle} />
                        <input value={returnAddress2} onChange={(e) => setReturnAddress2(e.target.value)} placeholder="Apt, suite, etc. (optional)" style={fieldStyle} />
                        <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_0.7fr_0.8fr] gap-3">
                          <input value={returnCity} onChange={(e) => setReturnCity(e.target.value)} placeholder="City" style={fieldStyle} />
                          <select value={returnState} onChange={(e) => setReturnState(e.target.value)} style={fieldStyle}><option value="">State</option>{US_STATES.map((state) => <option key={state} value={state}>{state}</option>)}</select>
                          <input value={returnZip} onChange={(e) => setReturnZip(e.target.value)} placeholder="ZIP" style={fieldStyle} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4" style={{ marginTop: "26px" }}>
                  <BackButton onClick={() => setCurrentStep(1)}>← Back to card</BackButton>
                  <PrimaryButton disabled={!envelopeReady} onClick={() => setCurrentStep(3)}>Continue to review →</PrimaryButton>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="review" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.24 }}>
                <StepHeader eyebrow="Step 3" title="One last look" body="Check the exact message and addresses before payment. Nothing is handwritten until Stripe confirms the $15 payment." />
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.72fr] gap-7 items-start">
                  <div className="flex flex-col gap-4">
                    <div style={{ padding: "22px", border: "1px solid var(--mm-line)", borderRadius: "10px", background: "#fffdf8" }}>
                      <p style={labelStyle}>Card</p>
                      {frontMessage && <p style={{ margin: "0 0 12px", fontFamily: "var(--font-handwriting)", fontSize: "1.2rem", color: "var(--mm-pen-blue)" }}>{frontMessage}</p>}
                      <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.88rem", lineHeight: 1.7, color: "var(--mm-ink-soft)", whiteSpace: "pre-wrap" }}>{insideMessage}</p>
                      <p style={{ margin: "10px 0 0", fontFamily: "var(--font-handwriting)", fontSize: "1rem", color: "var(--mm-pen-blue)" }}>— {signatureName}</p>
                    </div>
                    <div style={{ padding: "22px", border: "1px solid var(--mm-line)", borderRadius: "10px", background: "#fffdf8" }}>
                      <p style={labelStyle}>Envelope</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div><strong style={{ display: "block", marginBottom: "5px", fontFamily: "var(--font-sans)", fontSize: "0.76rem", color: "var(--mm-burgundy)" }}>Recipient</strong><p style={{ margin: 0, whiteSpace: "pre-line", fontFamily: "var(--font-sans)", fontSize: "0.84rem", lineHeight: 1.65, color: "var(--mm-ink-soft)" }}>{recipientLines.join("\n")}</p></div>
                        <div><strong style={{ display: "block", marginBottom: "5px", fontFamily: "var(--font-sans)", fontSize: "0.76rem", color: "var(--mm-burgundy)" }}>Return address</strong><p style={{ margin: 0, whiteSpace: "pre-line", fontFamily: "var(--font-sans)", fontSize: "0.84rem", lineHeight: 1.65, color: "var(--mm-ink-soft)" }}>{returnLines.join("\n")}</p></div>
                      </div>
                      {mailingDate && <p style={{ margin: "16px 0 0", paddingTop: "14px", borderTop: "1px solid var(--mm-line)", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--mm-forest)" }}><strong>Plan Ahead mailing date:</strong> {new Date(`${mailingDate}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>}
                    </div>
                  </div>

                  <div style={{ padding: "24px", border: "1px solid rgba(36,51,41,0.14)", borderRadius: "12px", background: "rgba(238,231,220,0.62)", boxShadow: "0 14px 32px rgba(61,48,36,0.06)" }}>
                    <div className="flex items-baseline justify-between gap-4" style={{ paddingBottom: "18px", borderBottom: "1px solid rgba(36,51,41,0.12)" }}>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--mm-forest)" }}>Handwritten card</span>
                      <strong style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", color: "var(--mm-forest)" }}>$15</strong>
                    </div>
                    <ul style={{ margin: "18px 0 22px", paddingLeft: "18px", fontFamily: "var(--font-sans)", fontSize: "0.8rem", lineHeight: 1.8, color: "var(--mm-ink-soft)" }}>
                      <li>Folded cardstock card</li>
                      <li>Handwritten and hand-addressed</li>
                      <li>Envelope and U.S. postage included</li>
                      <li>{mailingDate ? "Mailed on your selected date" : "Mailed within 1–2 business days"}</li>
                    </ul>

                    <label style={labelStyle}>Contact email</label>
                    <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="you@example.com" style={fieldStyle} />

                    <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "16px", fontFamily: "var(--font-sans)", fontSize: "0.78rem", lineHeight: 1.55, color: "var(--mm-ink-soft)" }}>
                      <input type="checkbox" checked={reviewConfirmed} onChange={(e) => setReviewConfirmed(e.target.checked)} style={{ marginTop: "3px" }} />
                      <span>I reviewed the message and mailing addresses and they are correct.</span>
                    </label>

                    {submitError && <div style={{ marginTop: "16px", padding: "11px 12px", border: "1px solid rgba(125,63,63,0.2)", borderRadius: "7px", background: "rgba(125,63,63,0.06)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", lineHeight: 1.55, color: "#713b3b" }}>{submitError}</div>}

                    <button
                      type="button"
                      disabled={!reviewReady || isSubmitting}
                      onClick={handleCheckout}
                      style={{ width: "100%", minHeight: "52px", marginTop: "20px", border: "none", borderRadius: "7px", background: !reviewReady || isSubmitting ? "rgba(36,51,41,0.28)" : "var(--mm-forest)", color: "#fffaf3", fontFamily: "var(--font-sans)", fontSize: "0.88rem", fontWeight: 700, cursor: !reviewReady || isSubmitting ? "not-allowed" : "pointer" }}
                    >
                      {isSubmitting ? "Preparing secure checkout…" : "Continue to secure Stripe checkout →"}
                    </button>
                    <p style={{ margin: "11px 0 0", textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "0.7rem", lineHeight: 1.5, color: "var(--mm-ink-muted)" }}>
                      Payment is processed by Stripe. Mailing Memories does not receive your card number.
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: "24px" }}><BackButton onClick={() => setCurrentStep(2)}>← Back to envelope</BackButton></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageShell>
  );
}
