/**
 * MAILING MEMORIES — Messages Page
 * 
 * A curated browsing experience for finding the words you've been trying to say.
 * Six primary categories with progressive disclosure: opening lines and ready-to-lift phrases.
 * Clean hierarchy, generous spacing, strong scanability.
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { PageShell, FadeIn } from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Category Data ─── */
const CATEGORIES = [
  {
    id: "just-because",
    name: "Just Because / Thinking of You",
    description: "Easiest entry point. No occasion. Just because.",
    openingLines: [
      "You were in my mind today and I did not want to just let that pass.",
      "I was not thinking about anything in particular and then I was thinking about you. That is the whole reason for this.",
    ],
    phrases: [
      "You were just there in my mind. No reason. I thought I would say so.",
      "Nothing brought you to mind. And then there you were.",
      "You keep showing up in the background of my mind. I thought you should know.",
      "Something ordinary happened and you were suddenly in it. I wanted to tell you.",
      "There is a thing now that reliably makes me think of you. Every time.",
      "Something made me think of you and instead of just moving on I decided to say so.",
    ],
  },
  {
    id: "gratitude",
    name: "Gratitude & Appreciation",
    description: "Broad, useful, and highly sendable.",
    openingLines: [
      "I am not grateful for something you did. I am grateful for who you are when you do it.",
      "You did not have to be the kind of person you are. You just are. And I have been the beneficiary of that.",
    ],
    phrases: [
      "The quality that kept showing up in you — the one I keep trying to name — is this —",
      "Nothing required you to be the kind of person you are. You just are. I have benefited from that.",
      "Being around you lowers something. The temperature of a room. My own ambient worry.",
      "A door opened because of you that I could not have opened from my side.",
      "Before you brought this into my life I did not know it was missing. Now I cannot picture without it.",
      "You put your name behind mine before I had the standing to do it myself.",
    ],
  },
  {
    id: "friendship",
    name: "Friendship & Deep Relationship Notes",
    description: "Emotional depth. Beyond romance.",
    openingLines: [
      "We have been through enough versions of each other that I no longer need to explain the older ones.",
      "You were there for all of it. That means I do not have to explain any of it. That is one of the rarer things.",
    ],
    phrases: [
      "Most people in my life only know the current version. You have the whole archive.",
      "When I try to explain my history to people who were not there, I always wish I had you in the room.",
      "You met me when I was still guessing at myself. You stayed through the guessing.",
      "The ordinary Tuesday afternoons built more than the big occasions did.",
      "You saw a version of me I would rather forget and you did not make it the whole story.",
      "Some of my history now lives more clearly in you than in me.",
    ],
  },
  {
    id: "growth",
    name: "Pride, Growth & New Beginnings",
    description: "Life changes, encouragement, transitions.",
    openingLines: [
      "I can see the difference. It is not subtle anymore and I want to say something about it.",
      "Something in you has shifted. I do not think you can see it as clearly as I can from here.",
    ],
    phrases: [
      "The change is not subtle anymore. It shows in how you enter a room.",
      "You may be the last person to see what I am seeing. Let me describe it.",
      "The posture, the pace, the way you take up space — something has changed.",
      "That does not cost you what it used to. I watched it cost you for years.",
      "You are on the other side of something that had a real grip on you. I want to say that I see it.",
      "The situation did not get easier. You got better at it. Those are different things.",
    ],
  },
  {
    id: "hard-seasons",
    name: "Hard Seasons",
    description: "Shows seriousness and trust. Real emotional weight.",
    openingLines: [
      "I am not going to tell you it will pass. I am just going to stay close while it is here.",
      "This is genuinely hard. Not hard like most things are hard — hard in the particular way it has been for you.",
    ],
    phrases: [
      "I am not looking for an update. I am just staying close.",
      "What you are in is genuinely hard. I am not scaling that down.",
      "The fact that you are still moving through your days is more than it sounds like.",
      "You do not have to report progress to me. That is not what I am here for.",
      "The shape of this grief is particular and I am not going to flatten it.",
      "This loneliness is different and I know that. It is the inside kind.",
    ],
  },
  {
    id: "work",
    name: "Work & Professional Notes",
    description: "Differentiator. For the workplace and professional relationships.",
    openingLines: [
      "There is work you do that does not show up in any report. I want you to know I see it.",
      "You take care of things before they become problems. Most people never know what you prevented. I do.",
    ],
    phrases: [
      "The work you do that does not show up in any report — I have been paying attention to it.",
      "You anticipated it before it became a problem. That is not luck. That is a skill.",
      "The extra effort you bring is not in your job description. That is exactly why I want to name it.",
      "Something changes when you are in the room. I want to be specific about what that something is.",
      "When people are not sure what to do, they come to you. I have been watching that pattern.",
      "The people around you do their work better because of proximity to you. That is not common.",
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   CATEGORY CHIP FILTER
   ═══════════════════════════════════════════════════════ */
function CategoryChips({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        justifyContent: "center",
        marginBottom: "48px",
      }}
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          style={{
            padding: "10px 20px",
            borderRadius: "999px",
            border: activeId === cat.id ? "2px solid var(--mm-forest)" : "1px solid var(--mm-line-strong)",
            background: activeId === cat.id ? "var(--mm-forest)" : "transparent",
            color: activeId === cat.id ? "#f7f2eb" : "var(--mm-ink-soft)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (activeId !== cat.id) {
              e.currentTarget.style.borderColor = "var(--mm-ink-soft)";
              e.currentTarget.style.background = "rgba(29, 41, 33, 0.05)";
            }
          }}
          onMouseLeave={(e) => {
            if (activeId !== cat.id) {
              e.currentTarget.style.borderColor = "var(--mm-line-strong)";
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CATEGORY SECTION
   ═══════════════════════════════════════════════════════ */
function CategorySection({ category }: { category: typeof CATEGORIES[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <FadeIn>
      <div
        style={{
          paddingBottom: "48px",
          borderBottom: "1px solid var(--mm-line)",
        }}
      >
        {/* Category Header */}
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.8rem",
              fontWeight: 500,
              lineHeight: 1.2,
              color: "var(--mm-forest)",
              marginBottom: "8px",
            }}
          >
            {category.name}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--mm-ink-muted)",
              margin: 0,
            }}
          >
            {category.description}
          </p>
        </div>

        {/* Opening Lines */}
        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--mm-burgundy)",
              marginBottom: "16px",
              paddingBottom: "8px",
              borderBottom: "1px solid var(--mm-line)",
            }}
          >
            Opening Lines
          </h3>
          <div style={{ display: "grid", gap: "16px" }}>
            {category.openingLines.map((line, idx) => (
              <button
                key={idx}
                onClick={() => handlePhraseClick(line)}
                style={{
                  padding: "16px",
                  background: "var(--mm-cream-soft)",
                  borderLeft: "3px solid var(--mm-burgundy)",
                  border: "none",
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  color: "var(--mm-ink)",
                  fontStyle: "italic",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--mm-cream-deep)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--mm-cream-soft)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                "{line}"
              </button>
            ))}
          </div>
        </div>

        {/* Ready-to-Lift Phrases */}
        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--mm-burgundy)",
              marginBottom: "16px",
              paddingBottom: "8px",
              borderBottom: "1px solid var(--mm-line)",
            }}
          >
            Ready-to-Lift Phrases
          </h3>
          <div style={{ display: "grid", gap: "12px" }}>
            {category.phrases.slice(0, 2).map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => handlePhraseClick(phrase)}
                style={{
                  padding: "12px 16px",
                  background: "transparent",
                  border: "none",
                  borderLeft: "2px solid var(--mm-line-strong)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: "var(--mm-ink-soft)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--mm-ink)";
                  e.currentTarget.style.borderLeftColor = "var(--mm-forest)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--mm-ink-soft)";
                  e.currentTarget.style.borderLeftColor = "var(--mm-line-strong)";
                }}
              >
                "{phrase}"
              </button>
            ))}
          </div>
        </div>

        {/* Show More / Accordion */}
        {category.phrases.length > 2 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="more-phrases">
              <AccordionTrigger
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--mm-forest)",
                  textAlign: "left",
                  padding: "12px 0",
                }}
              >
                Show {category.phrases.length - 2} more phrases
              </AccordionTrigger>
              <AccordionContent
                style={{
                  paddingTop: "16px",
                  paddingBottom: "0",
                }}
              >
                <div style={{ display: "grid", gap: "12px" }}>
                  {category.phrases.slice(2).map((phrase, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePhraseClick(phrase)}
                      style={{
                        padding: "12px 16px",
                        background: "transparent",
                        border: "none",
                        borderLeft: "2px solid var(--mm-line-strong)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        color: "var(--mm-ink-soft)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--mm-ink)";
                        e.currentTarget.style.borderLeftColor = "var(--mm-forest)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--mm-ink-soft)";
                        e.currentTarget.style.borderLeftColor = "var(--mm-line-strong)";
                      }}
                    >
                      "{phrase}"
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* CTA */}
        <div style={{ marginTop: "24px" }}>
          <Link
            href="/send"
            className="no-underline inline-flex items-center justify-center transition-all duration-200"
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              border: "1px solid var(--mm-forest)",
              background: "transparent",
              color: "var(--mm-forest)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--mm-forest)";
              e.currentTarget.style.color = "#f7f2eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--mm-forest)";
            }}
          >
            Use This in a Letter
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════════════════
   MESSAGES PAGE
   ═══════════════════════════════════════════════════════ */
export default function Messages() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState("just-because");
  const activeData = CATEGORIES.find((c) => c.id === activeCategory);

  const handlePhraseClick = (phrase: string) => {
    const encodedPhrase = encodeURIComponent(phrase);
    setLocation(`/send?message=${encodedPhrase}`);
  };

  return (
    <PageShell>
      <section style={{ padding: "80px 24px 120px" }}>
        <div className="mx-auto w-full max-w-[900px]">
          {/* Hero Section */}
          <FadeIn>
            <div style={{ marginBottom: "64px", textAlign: "center" }}>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: "var(--mm-forest)",
                  marginBottom: "16px",
                }}
              >
                Find the Words You've Been Trying to Say
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "var(--mm-ink-soft)",
                  maxWidth: "700px",
                  margin: "0 auto",
                }}
              >
                Message help for meaningful mail. Browse opening lines and ready-to-lift phrases from real people writing real letters.
              </p>
            </div>
          </FadeIn>

          {/* Category Navigation */}
          <FadeIn delay={0.1}>
            <CategoryChips activeId={activeCategory} onSelect={setActiveCategory} />
          </FadeIn>

          {/* Active Category Section */}
          {activeData && (
            <FadeIn delay={0.2}>
              <CategorySection category={activeData} />
            </FadeIn>
          )}

          {/* Bridge to Action */}
          <FadeIn delay={0.3}>
            <div
              style={{
                marginTop: "64px",
                paddingTop: "48px",
                borderTop: "1px solid var(--mm-line)",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.6rem",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: "var(--mm-forest)",
                  marginBottom: "16px",
                }}
              >
                Ready to Send?
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "var(--mm-ink-soft)",
                  marginBottom: "24px",
                }}
              >
                Use any of these phrases in a handwritten letter. We'll write, address, stamp, and mail it for you.
              </p>
              <Link
                href="/send"
                className="no-underline inline-flex items-center justify-center transition-all duration-200"
                style={{
                  minHeight: "56px",
                  padding: "0 36px",
                  borderRadius: "999px",
                  background: "var(--mm-forest)",
                  color: "#f7f2eb",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  boxShadow: "0 12px 32px rgba(29, 41, 33, 0.15)",
                }}
              >
                Start Your Message
              </Link>
            </div>
          </FadeIn>

          {/* Clarifying Note */}
          <FadeIn delay={0.4}>
            <div
              style={{
                marginTop: "64px",
                paddingTop: "48px",
                borderTop: "1px solid var(--mm-line)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "var(--mm-ink-muted)",
                textAlign: "center",
              }}
            >
              <p>
                <strong>What's live right now:</strong> The handwritten letter service. For $15, we handwrite, address, stamp, and mail one full page on quality cardstock. Light help getting started is available to guide you as you write.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
}
