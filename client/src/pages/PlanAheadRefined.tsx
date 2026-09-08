import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { FadeIn, PageShell } from "@/components/Layout";

const STARTER_PHRASES = [
  "You were in my mind today and I did not want to just let that pass.",
  "I do not say this enough, so I am writing it instead.",
  "The world is easier to be in because people like you exist in it.",
  "Most of what we have built together happened in ordinary moments that did not announce themselves as important.",
  "I can see the difference. It is not subtle anymore and I want to say something about it.",
  "I am not going to tell you it will pass. I am just going to stay close while it is here.",
];

function toInputDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function PlanAheadRefined() {
  const [, setLocation] = useLocation();
  const [selectedDate, setSelectedDate] = useState("");
  const [showStarters, setShowStarters] = useState(false);

  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return toInputDate(date);
  }, []);

  const formattedDate = selectedDate
    ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";

  const openSend = (message?: string) => {
    if (!selectedDate) return;
    const params = new URLSearchParams({ mailingDate: selectedDate });
    if (message) params.set("message", message);
    setLocation(`/send?${params.toString()}`);
  };

  return (
    <PageShell>
      <section className="mm-refined-hero" style={{ padding: "clamp(58px, 8vw, 96px) 24px 54px" }}>
        <div className="max-w-[880px] mx-auto text-center">
          <FadeIn><p className="mm-eyebrow" style={{ margin: "0 0 12px" }}>Plan Ahead · same $15 card</p></FadeIn>
          <FadeIn delay={0.05}><h1 className="mm-display" style={{ margin: "0 auto 18px", maxWidth: "820px", fontSize: "clamp(3rem, 7vw, 5.2rem)", lineHeight: 0.96, color: "var(--mm-forest)" }}>Set it now so the date doesn’t slip past.</h1></FadeIn>
          <FadeIn delay={0.1}><p style={{ margin: "0 auto", maxWidth: "680px", fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1.78, color: "var(--mm-ink-soft)" }}>Prepare the card while you are thinking about it — for a birthday, Mother’s Day, anniversary, or another date you do not want to forget. Choose the future date you want me to hand it to USPS. There is no scheduling fee.</p></FadeIn>
        </div>
      </section>

      <section style={{ padding: "0 24px clamp(70px, 8vw, 100px)", background: "var(--mm-cream-soft)" }}>
        <div className="max-w-[880px] mx-auto">
          <FadeIn>
            <div className="mm-paper-panel" style={{ padding: "clamp(24px, 5vw, 42px)", borderRadius: "12px" }}>
              <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
                <div className="mm-sage-panel" style={{ padding: "30px", borderRadius: "10px" }}>
                  <p className="mm-eyebrow" style={{ margin: "0 0 14px" }}>1 · Pick the mailing date</p>
                  <label htmlFor="mailing-date" style={{ display: "block", marginBottom: "8px", fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 700, color: "var(--mm-forest)" }}>When should I hand it to USPS?</label>
                  <input id="mailing-date" type="date" min={minDate} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ width: "100%", minHeight: "50px", padding: "10px 12px", border: "1px solid var(--mm-line-strong)", borderRadius: "7px", background: "#fffefb", color: "var(--mm-ink)", fontFamily: "var(--font-sans)", fontSize: "0.92rem" }} />
                  <p style={{ margin: "12px 0 0", fontFamily: "var(--font-sans)", fontSize: "0.76rem", lineHeight: 1.55, color: "var(--mm-ink-muted)" }}>The earliest selectable date is three days from today. USPS controls delivery after handoff, so a specific arrival date is not guaranteed.</p>
                </div>

                <div>
                  <p className="mm-eyebrow" style={{ margin: "0 0 12px" }}>The convenience</p>
                  <h2 className="mm-display" style={{ margin: "0 0 14px", fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1, color: "var(--mm-forest)" }}>{selectedDate ? `Mail it ${formattedDate}.` : "Do the thinking now. Let the date wait."}</h2>
                  <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "0.92rem", lineHeight: 1.72, color: "var(--mm-ink-soft)" }}>Once you choose the mailing date, you can write your own message or start from a line and finish it in the same visual card editor used for regular orders.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {selectedDate && (
            <FadeIn delay={0.08}>
              <div style={{ marginTop: "18px" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button type="button" onClick={() => openSend()} className="mm-paper-panel" style={{ padding: "28px", borderRadius: "10px", textAlign: "left", cursor: "pointer" }}>
                    <p className="mm-eyebrow" style={{ margin: "0 0 12px" }}>2 · Write it yourself</p>
                    <h3 className="mm-display" style={{ margin: "0 0 10px", fontSize: "2rem", color: "var(--mm-forest)" }}>I know what I want to say.</h3>
                    <p style={{ margin: "0 0 18px", fontFamily: "var(--font-sans)", fontSize: "0.86rem", lineHeight: 1.65, color: "var(--mm-ink-soft)" }}>Open the card editor with your mailing date already saved.</p>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", fontWeight: 700, color: "var(--mm-forest)" }}>Write my card →</span>
                  </button>

                  <button type="button" onClick={() => setShowStarters((value) => !value)} className="mm-sage-panel" style={{ padding: "28px", borderRadius: "10px", textAlign: "left", cursor: "pointer" }}>
                    <p className="mm-eyebrow" style={{ margin: "0 0 12px" }}>2 · Start with a line</p>
                    <h3 className="mm-display" style={{ margin: "0 0 10px", fontSize: "2rem", color: "var(--mm-forest)" }}>I need a little help beginning.</h3>
                    <p style={{ margin: "0 0 18px", fontFamily: "var(--font-sans)", fontSize: "0.86rem", lineHeight: 1.65, color: "var(--mm-ink-soft)" }}>Choose a starter and it will open inside your card so you can change or continue it.</p>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", fontWeight: 700, color: "var(--mm-forest)" }}>{showStarters ? "Hide starters ↑" : "Show starters ↓"}</span>
                  </button>
                </div>

                {showStarters && (
                  <div className="mm-paper-panel" style={{ marginTop: "16px", padding: "24px", borderRadius: "10px" }}>
                    <p className="mm-eyebrow" style={{ margin: "0 0 16px" }}>Choose one to put in the card</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {STARTER_PHRASES.map((phrase) => (
                        <button key={phrase} type="button" onClick={() => openSend(phrase)} style={{ padding: "18px", border: "1px solid var(--mm-line)", borderRadius: "8px", background: "var(--mm-cream-soft)", textAlign: "left", fontFamily: "var(--font-serif)", fontSize: "1.18rem", lineHeight: 1.35, color: "var(--mm-forest)", cursor: "pointer" }}>{phrase}<span style={{ display: "block", marginTop: "13px", fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, color: "var(--mm-burgundy)" }}>Use this in my card →</span></button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </PageShell>
  );
}
