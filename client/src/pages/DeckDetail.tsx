import { Link, useRoute } from "wouter";
import { PageShell, FadeIn, PenStroke } from "@/components/Layout";
import { PHYSICAL_DECKS, getDeckBySlug, type DeckRecord } from "@/data/decks";

function DetailChip({
  text,
  color,
  border,
}: {
  text: string;
  color: string;
  border: string;
}) {
  return (
    <span
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        color,
        padding: "6px 10px",
        border: `1px solid ${border}`,
        background: "rgba(255,255,255,0.45)",
      }}
    >
      {text}
    </span>
  );
}

function RelatedDeckCard({ deck }: { deck: DeckRecord }) {
  return (
    <Link
      href={`/shop/${deck.slug}`}
      className="block no-underline"
      style={{ height: "100%" }}
    >
      <div
        style={{
          height: "100%",
          background: deck.bg,
          border: "1px solid rgba(61, 43, 31, 0.08)",
          boxShadow: "0 10px 24px rgba(61, 43, 31, 0.05)",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "8px", background: deck.accent }} />

        <div
          style={{
            padding: "18px 18px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            minHeight: "180px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontSize: "1.08rem",
              fontWeight: 600,
              lineHeight: 1.12,
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
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: deck.accent,
            }}
          >
            {deck.who}
          </p>

          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "0.84rem",
              lineHeight: 1.58,
              color: deck.text,
              opacity: 0.86,
              flex: 1,
            }}
          >
            {deck.promise}
          </p>

          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: deck.text,
            }}
          >
            View deck →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function DeckDetail() {
  const [, params] = useRoute("/shop/:slug");
  const deck = params?.slug ? getDeckBySlug(params.slug) : undefined;

  if (!deck) {
    return (
      <PageShell>
        <section
          style={{
            padding: "clamp(48px, 6vw, 88px) 24px",
            background: "var(--mm-cream)",
          }}
        >
          <div className="max-w-[860px] mx-auto text-center">
            <FadeIn>
              <p
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--mm-burgundy)",
                }}
              >
                Deck not found
              </p>
            </FadeIn>

            <FadeIn delay={0.04}>
              <h1
                style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 500,
                  lineHeight: 1.08,
                  color: "var(--mm-forest)",
                }}
              >
                That deck page does not exist yet.
              </h1>
            </FadeIn>

            <FadeIn delay={0.08}>
              <p
                style={{
                  margin: "0 auto 24px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.94rem",
                  lineHeight: 1.7,
                  color: "var(--mm-ink-soft)",
                  maxWidth: "540px",
                }}
              >
                Go back to the collection and choose one of the live deck pages.
              </p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Link
                href="/shop"
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
                Back to shop
              </Link>
            </FadeIn>
          </div>
        </section>
      </PageShell>
    );
  }

  const relatedDecks = deck.related
    .map((slug) => getDeckBySlug(slug))
    .filter(Boolean) as DeckRecord[];

  const canBuyNow = Boolean(deck.purchaseUrl);

  return (
    <PageShell>
      <section
        style={{
          padding: "clamp(32px, 4vw, 52px) 24px clamp(40px, 5vw, 68px)",
          background: deck.bg,
          borderBottom: "1px solid rgba(61, 43, 31, 0.08)",
        }}
      >
        <div className="max-w-[1240px] mx-auto">
          <FadeIn>
            <div
              className="flex flex-wrap items-center gap-3"
              style={{ marginBottom: "14px" }}
            >
              <Link
                href="/shop"
                className="no-underline"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: deck.accent,
                }}
              >
                Shop
              </Link>

              <span
                style={{
                  width: "14px",
                  height: "1px",
                  background: deck.accent,
                  opacity: 0.4,
                }}
              />

              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: deck.accent,
                }}
              >
                {deck.heroKicker}
              </span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <FadeIn delay={0.04}>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: deck.accent,
                  }}
                >
                  Guided Card Deck
                </p>
              </FadeIn>

              <FadeIn delay={0.08}>
                <h1
                  style={{
                    margin: "0 0 12px",
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    fontWeight: 500,
                    lineHeight: 1.02,
                    letterSpacing: "-0.03em",
                    color: deck.text,
                  }}
                >
                  {deck.name}
                </h1>
              </FadeIn>

              <FadeIn delay={0.12}>
                <p
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: deck.accent,
                  }}
                >
                  {deck.who}
                </p>
              </FadeIn>

              <FadeIn delay={0.16}>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.98rem",
                    lineHeight: 1.72,
                    color: deck.text,
                    opacity: 0.92,
                    maxWidth: "640px",
                  }}
                >
                  {deck.promise}
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p
                  style={{
                    margin: "0 0 22px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    lineHeight: 1.72,
                    color: deck.text,
                    opacity: 0.82,
                    maxWidth: "640px",
                  }}
                >
                  {deck.description}
                </p>
              </FadeIn>

              <FadeIn delay={0.24}>
                <div
                  className="flex flex-wrap gap-8"
                  style={{ marginBottom: "22px" }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0 0 4px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: deck.accent,
                      }}
                    >
                      Format
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.15rem",
                        color: deck.text,
                      }}
                    >
                      30 guided cards
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        margin: "0 0 4px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: deck.accent,
                      }}
                    >
                      Price
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.15rem",
                        color: deck.text,
                      }}
                    >
                      {deck.price}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        margin: "0 0 4px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: deck.accent,
                      }}
                    >
                      Writing system
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.15rem",
                        color: deck.text,
                      }}
                    >
                      Think · Fill · Start
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.28}>
                <div className="flex flex-wrap gap-3">
                  {canBuyNow ? (
                    <a
                      href={deck.purchaseUrl}
                      className="no-underline inline-flex items-center justify-center"
                      style={{
                        minHeight: "48px",
                        padding: "0 22px",
                        borderRadius: "999px",
                        background: deck.accent,
                        color: "#f8f5ef",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Buy physical deck
                    </a>
                  ) : (
                    <button
                      disabled
                      className="border-none"
                      style={{
                        minHeight: "48px",
                        padding: "0 22px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.62)",
                        color: deck.text,
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        border: `1px solid ${deck.accent}33`,
                        cursor: "default",
                      }}
                    >
                      Physical checkout coming soon
                    </button>
                  )}

                  <Link
                    href="/send"
                    className="no-underline inline-flex items-center justify-center"
                    style={{
                      minHeight: "48px",
                      padding: "0 22px",
                      borderRadius: "999px",
                      border: `1px solid ${deck.accent}`,
                      color: deck.text,
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Need words sooner? Send a Letter
                  </Link>
                </div>
              </FadeIn>

              {!canBuyNow && (
                <FadeIn delay={0.32}>
                  <p
                    style={{
                      margin: "12px 0 0",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      lineHeight: 1.58,
                      color: deck.text,
                      opacity: 0.72,
                      maxWidth: "560px",
                    }}
                  >
                    This page is ready for checkout. When you add a Stripe link later,
                    the primary button will go live automatically.
                  </p>
                </FadeIn>
              )}
            </div>

            <div className="lg:col-span-5">
              <FadeIn delay={0.18}>
                <div
                  style={{
                    position: "relative",
                    minHeight: "420px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: "34px 0 0 40px",
                      background: "#faf7f2",
                      border: "1px solid rgba(61, 43, 31, 0.08)",
                      boxShadow: "0 28px 60px rgba(61, 43, 31, 0.12)",
                    }}
                  >
                    <div style={{ height: "12px", background: deck.accent }} />
                    <div
                      style={{
                        padding: "26px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: deck.accent,
                        }}
                      >
                        Card back
                      </p>

                      {["Before You Write", "Think", "Fill", "Start", "Phrase Bank"].map(
                        (item, index) => (
                          <div
                            key={item}
                            style={{
                              padding: "10px 12px",
                              border: `1px solid ${deck.accent}22`,
                              background:
                                index === 0 ? `${deck.bg}` : "rgba(255,255,255,0.7)",
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: deck.text,
                              }}
                            >
                              {item}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      width: "78%",
                      background: deck.bg,
                      border: "1px solid rgba(61, 43, 31, 0.08)",
                      boxShadow: "0 24px 50px rgba(61, 43, 31, 0.12)",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ height: "12px", background: deck.accent }} />

                    <div
                      style={{
                        padding: "28px 24px 32px",
                        minHeight: "300px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: "0 0 10px",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: deck.accent,
                          }}
                        >
                          Card front
                        </p>

                        <h2
                          style={{
                            margin: "0 0 10px",
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.9rem",
                            fontWeight: 600,
                            lineHeight: 1.04,
                            color: deck.text,
                          }}
                        >
                          {deck.name}
                        </h2>

                        <p
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.88rem",
                            lineHeight: 1.68,
                            color: deck.text,
                            opacity: 0.85,
                          }}
                        >
                          {deck.who}
                        </p>
                      </div>

                      <div
                        style={{
                          paddingTop: "16px",
                          borderTop: `1px solid ${deck.accent}22`,
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.74rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: deck.accent,
                          }}
                        >
                          30 cards · guided writing system
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(40px, 5vw, 64px) 24px",
          background: "var(--mm-cream)",
        }}
      >
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <FadeIn>
                <SectionHeading
                  title="Why this deck exists"
                  description={deck.description}
                />
              </FadeIn>

              <FadeIn delay={0.05}>
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  style={{ marginTop: "18px" }}
                >
                  {deck.highlights.map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: "18px 18px",
                        background: "#fffdf9",
                        border: "1px solid var(--mm-line)",
                        boxShadow: "0 8px 20px rgba(61, 43, 31, 0.04)",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.84rem",
                          lineHeight: 1.65,
                          color: "var(--mm-ink-soft)",
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5">
              <FadeIn delay={0.08}>
                <div
                  style={{
                    padding: "24px 24px",
                    background: "#fffdf9",
                    border: "1px solid var(--mm-line)",
                    boxShadow: "0 8px 20px rgba(61, 43, 31, 0.04)",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.64rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: deck.accent,
                    }}
                  >
                    Best for
                  </p>

                  <div className="flex flex-wrap gap-8">
                    {deck.idealFor.map((item) => (
                      <DetailChip
                        key={item}
                        text={item}
                        color={deck.text}
                        border={`${deck.accent}22`}
                      />
                    ))}
                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <PenStroke color="var(--mm-line-strong)" />
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <p
                      style={{
                        margin: "0 0 8px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.64rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: deck.accent,
                      }}
                    >
                      Inside every deck
                    </p>

                    <div className="flex flex-col gap-10">
                      {[
                        "30 cards built around one emotional lane",
                        "A structured path that reduces blank-page friction",
                        "Liftable language that still leaves room for your own voice",
                      ].map((line) => (
                        <p
                          key={line}
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.86rem",
                            lineHeight: 1.62,
                            color: "var(--mm-ink-soft)",
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "0 24px clamp(44px, 6vw, 76px)",
          background: "var(--mm-cream)",
        }}
      >
        <div className="max-w-[1240px] mx-auto">
          <FadeIn>
            <SectionHeading
              title="How the writing experience works"
              description="The deck does not write for you. It gets you moving, gives you usable language, and keeps the final message sounding like you."
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginTop: "18px" }}>
            {[
              {
                title: "1. Choose the angle",
                body: "Pick the card that fits the relationship or moment you are trying to name.",
              },
              {
                title: "2. Use the structure",
                body: "Think, Fill, and Start break the message into manageable pieces so you are not staring at a blank page.",
              },
              {
                title: "3. Finish in your own voice",
                body: "The phrase bank gives you liftable language without forcing a script or flattening the feeling.",
              },
            ].map((step, index) => (
              <FadeIn key={step.title} delay={0.05 + index * 0.04}>
                <div
                  style={{
                    height: "100%",
                    padding: "22px 22px",
                    background: "#fffdf9",
                    border: "1px solid var(--mm-line)",
                    boxShadow: "0 8px 20px rgba(61, 43, 31, 0.04)",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--mm-forest)",
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.88rem",
                      lineHeight: 1.66,
                      color: "var(--mm-ink-soft)",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
                  Purchase path
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
                  This page is ready for real checkout.
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
                  The detail page is already structured to sell the deck cleanly. If
                  the product link is not live yet, the page stays honest and still
                  routes shoppers to the done-for-you letter service.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-4">
              <FadeIn delay={0.12}>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  {canBuyNow ? (
                    <a
                      href={deck.purchaseUrl}
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
                      Buy physical deck
                    </a>
                  ) : (
                    <button
                      disabled
                      className="border-none"
                      style={{
                        minHeight: "48px",
                        padding: "0 22px",
                        borderRadius: "999px",
                        background: "rgba(245, 241, 234, 0.18)",
                        color: "#f5f1ea",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        cursor: "default",
                      }}
                    >
                      Physical checkout coming soon
                    </button>
                  )}

                  <Link
                    href="/send"
                    className="no-underline inline-flex items-center justify-center"
                    style={{
                      minHeight: "48px",
                      padding: "0 22px",
                      borderRadius: "999px",
                      border: "1px solid rgba(245, 241, 234, 0.26)",
                      color: "#f5f1ea",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Send a Letter instead
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "0 24px clamp(48px, 6vw, 80px)",
          background: "var(--mm-cream)",
        }}
      >
        <div className="max-w-[1240px] mx-auto">
          <FadeIn>
            <SectionHeading
              title="Pairs well with"
              description="If this deck is close but not exact, these are the next most natural directions."
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" style={{ marginTop: "18px" }}>
            {relatedDecks.map((relatedDeck, index) => (
              <FadeIn key={relatedDeck.slug} delay={0.05 + index * 0.04}>
                <RelatedDeckCard deck={relatedDeck} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
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
    </div>
  );
                        }
