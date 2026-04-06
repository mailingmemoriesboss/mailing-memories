import { useState } from "react";
import { Link } from "wouter";
import { PageShell, FadeIn } from "@/components/Layout";

/**
 * SHOP — Hybrid storefront
 *
 * Goals:
 * - 3 featured decks first
 * - digital products visible sooner
 * - rest of decks in a thinner accordion list
 * - all physical decks described as curated 20-card decks
 * - no grouping system
 * - no extra routes required
 */

const IMAGES = {
  cardDeckSpread:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/card-deck-spread_9669e7f9.png",
  paperTexture:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663484498190/ifTVcC46pxwbsRUrB4cX6i/paper-texture-bg-TLD2xmpcBsfnmyqpjpBz6a.webp",
};

type FilterTab = "all" | "physical" | "digital" | "coming-soon";

type PhysicalDeck = {
  slug: string;
  name: string;
  who: string;
  price: "$30";
  featured?: boolean;
  bg: string;
  accent: string;
  text: string;
  summary: string;
  highlights: string[];
};

type DigitalProduct = {
  name: string;
  desc: string;
  price: string;
};

type ComingSoonProduct = {
  name: string;
  desc: string;
};

const PHYSICAL_DECKS: PhysicalDeck[] = [
  {
    slug: "in-the-hard-season",
    name: "In the Hard Season",
    who: "For the friend going through something difficult",
    price: "$30",
    featured: true,
    bg: "#E6EEF0",
    accent: "#455A64",
    text: "#263238",
    summary:
      "Honest, gentle language for grief, illness, burnout, and the seasons no standard card knows how to hold.",
    highlights: [
      "20 curated cards selected from the strongest original prompts",
      "Guided structure: Think, Fill, Start",
      "Phrase bank included for liftable language",
    ],
  },
  {
    slug: "the-caregiver",
    name: "The Caregiver",
    who: "For the person standing next to the patient",
    price: "$30",
    bg: "#F0F3EF",
    accent: "#6B7D6A",
    text: "#3C473B",
    summary:
      "Words for the person carrying invisible labor, anticipatory grief, and the quiet cost of showing up every day.",
    highlights: [
      "Built specifically for the caregiver, not the patient",
      "Acknowledges unseen work and emotional strain",
      "Designed to feel steady and deeply seen",
    ],
  },
  {
    slug: "letters-i-never-sent",
    name: "Letters I Never Sent",
    who: "For the unfinished business of the heart",
    price: "$30",
    bg: "#EBECEE",
    accent: "#2C3034",
    text: "#1A1D1F",
    summary:
      "A structured way to write toward the conversations that never happened, the apologies that linger, and the words still waiting for paper.",
    highlights: [
      "Ideal for unresolved feelings and unsent writing",
      "Useful for private reflection or eventual sending",
      "A deeper emotional deck for difficult material",
    ],
  },
  {
    slug: "the-long-friendship",
    name: "The Long Friendship",
    who: "For the friend who has the whole archive",
    price: "$30",
    featured: true,
    bg: "#F8EDE9",
    accent: "#A65F4D",
    text: "#5C352B",
    summary:
      "Prompts for the friend who has known your history, survived the chapters, and stayed through every version of you.",
    highlights: [
      "Built around shared history and staying power",
      "Encourages specific memories, not generic praise",
      "One of the strongest gift decks in the collection",
    ],
  },
  {
    slug: "love-that-isnt-romantic",
    name: "Love That Isn't Romantic",
    who: "For the love that doesn't have a category",
    price: "$30",
    bg: "#FDF4F4",
    accent: "#B08484",
    text: "#6B4F4F",
    summary:
      "Serious, usable language for the parent, sibling, friend, or chosen family member you love deeply.",
    highlights: [
      "Gives non-romantic love real emotional weight",
      "Strong for family, chosen family, and deep friendship",
      "Clear without becoming cheesy",
    ],
  },
  {
    slug: "gratitude",
    name: "Gratitude",
    who: "For the one who changed something in you",
    price: "$30",
    bg: "#FFF9EC",
    accent: "#B3824A",
    text: "#6B4F2C",
    summary:
      "A deeper thank-you deck focused on what someone’s character gave you, not just what they did.",
    highlights: [
      "Moves beyond standard thank-you language",
      "Works especially well for mentors and parents",
      "Evergreen, broad-use emotional deck",
    ],
  },
  {
    slug: "just-because",
    name: "Just Because",
    who: "For the person you've been meaning to reach out to",
    price: "$30",
    featured: true,
    bg: "#FFF8F8",
    accent: "#D1A7A7",
    text: "#8C6A6A",
    summary:
      "Low-pressure prompts for the ordinary Tuesday reach-out that matters more than people expect.",
    highlights: [
      "Most accessible deck in the collection",
      "Fastest path to writing something warm and real",
      "Strong starter deck and repeat-purchase candidate",
    ],
  },
  {
    slug: "admiration-character",
    name: "Admiration & Character",
    who: "For the person whose character deserves to be named out loud",
    price: "$30",
    bg: "#E8EDF2",
    accent: "#213040",
    text: "#15202B",
    summary:
      "A deck for naming integrity, steadiness, restraint, and the kind of character that earns real regard.",
    highlights: [
      "More serious than a compliment deck",
      "Best when tied to a specific example",
      "Excellent for mentors, leaders, and tribute occasions",
    ],
  },
  {
    slug: "growth-pride",
    name: "Growth & Pride",
    who: "For the person whose progress deserves to be recognized",
    price: "$30",
    bg: "#EFF2EE",
    accent: "#3A5235",
    text: "#243321",
    summary:
      "Language for the becoming, not just the achievement — the growth, effort, and visible change you have quietly watched.",
    highlights: [
      "Stronger than generic congratulations",
      "Works well for graduations and recovery arcs",
      "Focused on progress, not performance",
    ],
  },
  {
    slug: "new-beginnings",
    name: "New Beginnings",
    who: "For the person starting over",
    price: "$30",
    bg: "#F0F5F6",
    accent: "#749BA4",
    text: "#476166",
    summary:
      "A threshold deck for the moment before the leap — graduation, relocation, new work, retirement, or the chapter that starts after loss.",
    highlights: [
      "Writes toward the edge itself",
      "Grounded encouragement instead of hype",
      "Useful for change, transition, and uncertain momentum",
    ],
  },
  {
    slug: "the-milestone-nobody-celebrates",
    name: "The Milestone Nobody Celebrates",
    who: "For the quiet progress that still deserves acknowledgment",
    price: "$30",
    bg: "#F5F2F4",
    accent: "#927C8C",
    text: "#5B4D57",
    summary:
      "Prompts for the anniversaries and private thresholds that mattered most and passed without ceremony.",
    highlights: [
      "Names invisible milestones directly",
      "Good for recovery, private endurance, and self-validation",
      "One of the most distinct decks in the system",
    ],
  },
  {
    slug: "reflection-memory",
    name: "Reflection & Memory",
    who: "For honoring what still lives in memory",
    price: "$30",
    bg: "#FBF7EC",
    accent: "#997D3A",
    text: "#5E4D24",
    summary:
      "A reflective deck for writing toward the past with honesty instead of blur, nostalgia, or avoidance.",
    highlights: [
      "Strong journaling-adjacent deck",
      "Useful for private reflection or shared-history letters",
      "Thoughtful without becoming vague",
    ],
  },
  {
    slug: "enough",
    name: "Enough",
    who: "For the person who needs to hear 'right now, as you are'",
    price: "$30",
    bg: "#FFF8F5",
    accent: "#C2A388",
    text: "#7A6453",
    summary:
      "A self-compassion deck built around sufficiency, release, and permission for the person carrying too much.",
    highlights: [
      "Written for inward work, not performance",
      "Strong for burnout and self-mercy",
      "Designed for permission more than advice",
    ],
  },
  {
    slug: "legacy",
    name: "Legacy",
    who: "For the conversations people keep putting off",
    price: "$30",
    bg: "#EEEBF0",
    accent: "#4B3B52",
    text: "#2E2432",
    summary:
      "A deck for the long-view letter — the one meant for a parent, mentor, elder, or person whose life has shaped yours deeply.",
    highlights: [
      "Built for letters people keep and reread",
      "Excellent for milestone ages and tribute letters",
      "A slower, weightier deck with real gravity",
    ],
  },
  {
    slug: "the-workplace-set",
    name: "The Workplace Set",
    who: "For the colleague who made the hard days lighter",
    price: "$30",
    bg: "#F0F1F3",
    accent: "#6F748B",
    text: "#45485A",
    summary:
      "Thoughtful language for the work no one sees, the teammate others lean on, and the kind of recognition that feels human.",
    highlights: [
      "Translates appreciation into something more lasting than email",
      "Useful for managers, teams, and departures",
      "Professional without feeling cold",
    ],
  },
  {
    slug: "letters-from-little-ones",
    name: "Letters from Little Ones",
    who: "For the child who wants to say something real",
    price: "$30",
    bg: "#F2F8F5",
    accent: "#88B097",
    text: "#536B5C",
    summary:
      "Simple, concrete prompts that help children write honest letters adults will keep for years.",
    highlights: [
      "Kid-friendly without flattening the meaning",
      "Great for grandparents and keepsake moments",
      "Naturally giftable and family-centered",
    ],
  },
];

const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    name: "Digital Deck Downloads",
    desc: "Printable PDF versions of the guided decks using the same curated 20-card format.",
    price: "$18",
  },
  {
    name: "The Writing Guide",
    desc: "A companion guide for tone, structure, and how to say what you actually mean.",
    price: "$12",
  },
];

const COMING_SOON: ComingSoonProduct[] = [
  {
    name: "Complete Box Set",
    desc: "All 16 decks gathered into one keepsake collection.",
  },
  {
    name: "Companion Books",
    desc: "Extended guides with deeper prompts, essays, and longer writing paths.",
  },
  {
    name: "Gift Bundles",
    desc: "Curated pairings for specific life moments and relationships.",
  },
];

const featuredDecks = PHYSICAL_DECKS.filter((deck) => deck.featured);

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div style={{ marginBottom: "22px" }}>
      {eyebrow && (
        <p
          style={{
            margin: "0 0 8px",
            fontFamily: "var(--font-sans)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--mm-burgundy)",
          }}
        >
          {eyebrow}
        </p>
      )}

      <h2
        style={{
          margin: "0 0 8px",
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
          fontWeight: 500,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: "var(--mm-forest)",
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            lineHeight: 1.68,
            color: "var(--mm-ink-soft)",
            maxWidth: "760px",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function FeaturedDeckCard({ deck }: { deck: PhysicalDeck }) {
  return (
    <div
      style={{
        height: "100%",
        background: deck.bg,
        border: "1px solid rgba(61, 43, 31, 0.08)",
        boxShadow: "0 16px 36px rgba(61, 43, 31, 0.07)",
        overflow: "hidden",
      }}
    >
      <div style={{ height: "10px", background: deck.accent }} />

      <div
        style={{
          padding: "24px 24px 20px",
          minHeight: "250px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          className="flex items-start justify-between gap-3"
          style={{ alignItems: "flex-start" }}
        >
          <div>
            <h3
              style={{
                margin: "0 0 8px",
                fontFamily: "var(--font-serif)",
                fontSize: "1.3rem",
                fontWeight: 600,
                lineHeight: 1.08,
                color: deck.text,
              }}
            >
              {deck.name}
            </h3>

            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: deck.accent,
              }}
            >
              {deck.who}
            </p>
          </div>

          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: deck.text,
              flexShrink: 0,
            }}
          >
            {deck.price}
          </span>
        </div>

        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            lineHeight: 1.66,
            color: deck.text,
            opacity: 0.88,
            flex: 1,
          }}
        >
          {deck.summary}
        </p>

        <div
          style={{
            paddingTop: "12px",
            borderTop: `1px solid ${deck.accent}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.66rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: deck.accent,
            }}
          >
            Curated 20-card deck
          </span>

          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.66rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: deck.text,
            }}
          >
            Featured
          </span>
        </div>
      </div>
    </div>
  );
}

function DeckAccordionRow({
  deck,
  isOpen,
  onToggle,
}: {
  deck: PhysicalDeck;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--mm-line)",
        background: isOpen ? "rgba(255,255,255,0.48)" : "transparent",
      }}
    >
      <button
        onClick={onToggle}
        className="border-none w-full text-left"
        style={{
          padding: "18px 0",
          background: "transparent",
          display: "grid",
          gridTemplateColumns: "8px minmax(0, 1fr) auto auto",
          alignItems: "center",
          columnGap: "16px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "52px",
            background: deck.accent,
            display: "block",
          }}
        />

        <div style={{ minWidth: 0 }}>
          <p
            style={{
              margin: "0 0 5px",
              fontFamily: "var(--font-serif)",
              fontSize: "1.15rem",
              fontWeight: 600,
              lineHeight: 1.08,
              color: deck.text,
            }}
          >
            {deck.name}
          </p>

          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              lineHeight: 1.55,
              color: "var(--mm-ink-soft)",
            }}
          >
            {deck.who}
          </p>
        </div>

        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.05rem",
            fontWeight: 600,
            color: deck.text,
            whiteSpace: "nowrap",
            paddingLeft: "12px",
          }}
        >
          {deck.price}
        </span>

        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: deck.accent,
            paddingLeft: "12px",
            whiteSpace: "nowrap",
          }}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            padding: "0 0 20px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              padding: "18px 18px 16px",
              background: deck.bg,
              border: `1px solid ${deck.accent}22`,
            }}
          >
            <p
              style={{
                margin: "0 0 14px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                lineHeight: 1.68,
                color: deck.text,
              }}
            >
              {deck.summary}
            </p>

            <div
              className="flex flex-wrap gap-8"
              style={{ marginBottom: "16px" }}
            >
              {deck.highlights.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    color: deck.text,
                    padding: "6px 10px",
                    border: `1px solid ${deck.accent}22`,
                    background: "rgba(255,255,255,0.36)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                disabled
                className="border-none"
                style={{
                  minHeight: "42px",
                  padding: "0 18px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.75)",
                  color: deck.text,
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: `1px solid ${deck.accent}33`,
                  cursor: "default",
                }}
              >
                Physical checkout coming soon
              </button>

              <Link
                href="/send"
                className="no-underline inline-flex items-center justify-center"
                style={{
                  minHeight: "42px",
                  padding: "0 18px",
                  borderRadius: "999px",
                  border: `1px solid ${deck.accent}`,
                  color: deck.text,
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Use live writing flow
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DigitalCard({ product }: { product: DigitalProduct }) {
  return (
    <div
      style={{
        padding: "28px 28px 24px",
        background: "rgba(255,255,255,0.68)",
        border: "1px solid var(--mm-line)",
        boxShadow: "0 12px 26px rgba(61, 43, 31, 0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        minHeight: "220px",
      }}
    >
      <div
        className="flex items-start justify-between gap-4"
        style={{ alignItems: "flex-start" }}
      >
        <div>
          <h3
            style={{
              margin: "0 0 8px",
              fontFamily: "var(--font-serif)",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "var(--mm-forest)",
            }}
          >
            {product.name}
          </h3>

          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "0.88rem",
              lineHeight: 1.68,
              color: "var(--mm-ink-soft)",
            }}
          >
            {product.desc}
          </p>
        </div>

        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.35rem",
            fontWeight: 600,
            color: "var(--mm-forest)",
            flexShrink: 0,
          }}
        >
          {product.price}
        </span>
      </div>

      <div style={{ marginTop: "auto" }}>
        <button
          disabled
          className="border-none"
          style={{
            minHeight: "42px",
            padding: "0 18px",
            borderRadius: "999px",
            background: "rgba(29, 41, 33, 0.14)",
            color: "var(--mm-forest)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "default",
          }}
        >
          Checkout link coming soon
        </button>
      </div>
    </div>
  );
}

function ComingSoonCard({ item }: { item: ComingSoonProduct }) {
  return (
    <div
      style={{
        padding: "28px 28px",
        background: "var(--mm-cream)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: "1px solid var(--mm-line)",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-serif)",
          fontSize: "1.2rem",
          fontWeight: 600,
          color: "var(--mm-forest)",
        }}
      >
        {item.name}
      </h3>

      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "0.85rem",
          lineHeight: 1.62,
          color: "var(--mm-ink-muted)",
        }}
      >
        {item.desc}
      </p>

      <div style={{ marginTop: "8px" }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--mm-burgundy)",
            padding: "4px 8px",
            border: "1px solid var(--mm-burgundy)",
            opacity: 0.62,
          }}
        >
          Planned next
        </span>
      </div>
    </div>
  );
}

export default function Shop() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "Everything" },
    { id: "physical", label: "Card Decks" },
    { id: "digital", label: "Digital" },
    { id: "coming-soon", label: "Coming Soon" },
  ];

  return (
    <PageShell>
      <section
        style={{
          padding: "clamp(32px, 4vw, 52px) 24px clamp(28px, 3vw, 40px)",
          background: "var(--mm-cream)",
        }}
      >
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <FadeIn>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--mm-burgundy)",
                  }}
                >
                  The Collection
                </p>
              </FadeIn>

              <FadeIn delay={0.05}>
                <h1
                  style={{
                    margin: "0 0 12px",
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    fontWeight: 500,
                    lineHeight: 1.04,
                    letterSpacing: "-0.03em",
                    color: "var(--mm-forest)",
                  }}
                >
                  Start with three.
                  <br />
                  Browse the rest lightly.
                </h1>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p
                  style={{
                    margin: "0 0 20px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.94rem",
                    lineHeight: 1.68,
                    color: "var(--mm-ink-soft)",
                    maxWidth: "580px",
                  }}
                >
                  Each physical deck is a curated <strong>20-card deck</strong>,
                  selected from the strongest original prompts. The first three are
                  featured. The rest stay accessible in a thinner expandable list so
                  the page does not feel heavy.
                </p>
              </FadeIn>

              <FadeIn delay={0.14}>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#featured-decks"
                    className="no-underline inline-flex items-center justify-center"
                    style={{
                      minHeight: "46px",
                      padding: "0 20px",
                      borderRadius: "999px",
                      background: "var(--mm-forest)",
                      color: "#f5f1ea",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Browse Decks
                  </a>

                  <a
                    href="#digital-products"
                    className="no-underline inline-flex items-center justify-center"
                    style={{
                      minHeight: "46px",
                      padding: "0 20px",
                      borderRadius: "999px",
                      border: "1px solid var(--mm-forest)",
                      color: "var(--mm-forest)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    See Digital
                  </a>

                  <Link
                    href="/send"
                    className="no-underline inline-flex items-center justify-center"
                    style={{
                      minHeight: "46px",
                      padding: "0 20px",
                      borderRadius: "999px",
                      border: "1px solid var(--mm-line-strong)",
                      color: "var(--mm-ink-soft)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Need it mailed for you?
                  </Link>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5">
              <FadeIn delay={0.18}>
                <div
                  style={{
                    position: "relative",
                    minHeight: "380px",
                    overflow: "hidden",
                    border: "1px solid rgba(61, 43, 31, 0.08)",
                    boxShadow: "0 22px 56px rgba(61, 43, 31, 0.12)",
                    backgroundImage: `linear-gradient(rgba(245,241,234,0.3), rgba(245,241,234,0.12)), url("${IMAGES.cardDeckSpread}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: "auto 18px 18px 18px",
                      padding: "16px 18px",
                      background: "rgba(250, 247, 242, 0.88)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(61, 43, 31, 0.08)",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 6px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--mm-burgundy)",
                      }}
                    >
                      Physical collection
                    </p>

                    <p
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.86rem",
                        lineHeight: 1.6,
                        color: "var(--mm-ink-soft)",
                      }}
                    >
                      16 themed decks. 20 curated cards per deck. Premium tonal
                      hierarchy carried across the collection.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "0 24px 24px",
          background: "var(--mm-cream)",
        }}
      >
        <div className="max-w-[1240px] mx-auto">
          <FadeIn>
            <div
              className="flex items-center gap-1 flex-wrap"
              style={{
                padding: "4px",
                background: "rgba(255,255,255,0.52)",
                border: "1px solid var(--mm-line)",
                display: "inline-flex",
                boxShadow: "0 4px 10px rgba(61, 43, 31, 0.03)",
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="bg-transparent border-none transition-all duration-200"
                  style={{
                    padding: "9px 18px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color:
                      activeTab === tab.id
                        ? "var(--mm-forest)"
                        : "var(--mm-ink-muted)",
                    background:
                      activeTab === tab.id
                        ? "rgba(255,255,255,0.96)"
                        : "transparent",
                    boxShadow:
                      activeTab === tab.id ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {(activeTab === "all" || activeTab === "physical") && (
        <section
          id="featured-decks"
          style={{
            padding: "0 24px clamp(32px, 4vw, 48px)",
            background: "var(--mm-cream)",
          }}
        >
          <div className="max-w-[1240px] mx-auto">
            <FadeIn>
              <SectionTitle
                eyebrow="Featured Decks"
                title="Three strong places to begin."
                description="These carry the premium card treatment. The rest stay lighter below so the page scans faster."
              />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredDecks.map((deck, index) => (
                <FadeIn key={deck.slug} delay={0.05 + index * 0.04}>
                  <FeaturedDeckCard deck={deck} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {(activeTab === "all" || activeTab === "digital") && (
        <section
          id="digital-products"
          style={{
            padding: "clamp(36px, 5vw, 56px) 24px",
            background: `url("${IMAGES.paperTexture}")`,
            backgroundColor: "var(--mm-cream-soft)",
            backgroundSize: "420px 420px",
          }}
        >
          <div className="max-w-[1240px] mx-auto">
            <FadeIn>
              <SectionTitle
                eyebrow="Digital"
                title="Digital products show up sooner now."
                description="That is intentional. The rest of the deck collection is still here — just displayed more lightly below."
              />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DIGITAL_PRODUCTS.map((product, index) => (
                <FadeIn key={product.name} delay={0.05 + index * 0.04}>
                  <DigitalCard product={product} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {(activeTab === "all" || activeTab === "physical") && (
        <section
          style={{
            padding: "clamp(36px, 5vw, 56px) 24px",
            background: "var(--mm-cream)",
          }}
        >
          <div className="max-w-[1240px] mx-auto">
            <FadeIn>
              <SectionTitle
                eyebrow="All Decks"
                title="The rest of the collection"
                description="These rows are intentionally thinner. Open one only when you want more detail."
              />
            </FadeIn>

            <div
              style={{
                borderBottom: "1px solid var(--mm-line)",
              }}
            >
              {PHYSICAL_DECKS.map((deck, index) => (
                <FadeIn key={deck.slug} delay={0.02 * index}>
                  <DeckAccordionRow
                    deck={deck}
                    isOpen={openSlug === deck.slug}
                    onToggle={() =>
                      setOpenSlug((prev) => (prev === deck.slug ? null : deck.slug))
                    }
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {(activeTab === "all" || activeTab === "coming-soon") && (
        <section
          style={{
            padding: "clamp(36px, 5vw, 56px) 24px",
            background: "var(--mm-cream)",
          }}
        >
          <div className="max-w-[1240px] mx-auto">
            <FadeIn>
              <SectionTitle
                eyebrow="Coming Soon"
                title="Future products"
                description="Still visible, but not fighting the live offers."
              />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {COMING_SOON.map((item, index) => (
                <FadeIn key={item.name} delay={0.05 + index * 0.04}>
                  <ComingSoonCard item={item} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        style={{
          padding: "clamp(44px, 6vw, 76px) 24px",
          background: "var(--mm-walnut)",
        }}
      >
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <FadeIn>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(245, 241, 234, 0.44)",
                  }}
                >
                  Need the mailing handled too?
                </p>
              </FadeIn>

              <FadeIn delay={0.04}>
                <h2
                  style={{
                    margin: "0 0 14px",
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    fontWeight: 500,
                    lineHeight: 1.1,
                    color: "rgba(245, 241, 234, 0.92)",
                  }}
                >
                  Use the live writing flow instead.
                </h2>
              </FadeIn>

              <FadeIn delay={0.08}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                    color: "rgba(245, 241, 234, 0.62)",
                    maxWidth: "560px",
                  }}
                >
                  If you do not want to browse decks, go straight into the writing
                  flow, build the card, address the envelope, and save the order.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-4">
              <FadeIn delay={0.12}>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link
                    href="/send"
                    className="no-underline inline-flex items-center justify-center"
                    style={{
                      minHeight: "48px",
                      padding: "0 22px",
                      borderRadius: "999px",
                      background: "#f5f1ea",
                      color: "var(--mm-walnut)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Send a Letter
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
