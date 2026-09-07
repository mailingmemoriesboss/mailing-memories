import { PageShell, FadeIn } from "@/components/Layout";

const sections = [
  {
    title: "Ordering and payment",
    body: [
      "The current Mailing Memories service is a $15 handwritten card. Orders are placed through the integrated /send flow.",
      "Stripe handles checkout. An order enters production only after payment is verified and the paid order is available in the active order system.",
    ],
  },
  {
    title: "Cancellation",
    body: [
      "You may request cancellation before your card has been handed to USPS.",
      "Once the card has been mailed or handed to USPS, the order can no longer be canceled.",
    ],
  },
  {
    title: "If Mailing Memories makes a mistake",
    body: [
      "If Mailing Memories causes a fulfillment error — such as copying the wrong address or name, handwriting the wrong message, using the wrong card, or otherwise producing the order incorrectly — we will provide one free correction, remake, and re-mail as needed. You will not be charged a second time for that correction.",
    ],
  },
  {
    title: "If the information supplied with the order is incorrect",
    body: [
      "If the card was produced correctly from the information supplied with the order, but that information contained an incorrect name, address, message, or other detail, a replacement normally requires a new $15 order and payment.",
    ],
  },
  {
    title: "Returned mail",
    body: [
      "If Mailing Memories made the addressing error, we will correct and resend the card at no additional charge.",
      "If the address supplied with the order was incorrect or incomplete, a replacement or resend normally requires a new payment.",
      "If a correctly addressed card is returned by USPS for another reason, Mailing Memories may provide one complimentary resend as goodwill.",
    ],
  },
  {
    title: "USPS delays and apparent loss",
    body: [
      "Mailing Memories does not guarantee a recipient delivery date after USPS handoff.",
      "If a correctly addressed card appears genuinely lost after a reasonable waiting period and has not been returned, Mailing Memories may provide one complimentary remake and re-mail as goodwill.",
      "Ordinary card delivery is not represented as tracked, insured, or guaranteed.",
    ],
  },
  {
    title: "Plan Ahead",
    body: [
      "Plan Ahead is included with the normal $15 card service at no additional scheduling fee.",
      "You may choose a mailing date at least 3 days in advance. The selected date is the date Mailing Memories intends to hand the card to USPS; it is not a guaranteed recipient delivery date.",
    ],
  },
  {
    title: "Privacy and sensitive order data",
    body: [
      "Mailing Memories uses message text, recipient address details, customer contact information, and return-address details to prepare, fulfill, and support your order.",
      "The default retention period for sensitive order content is 30 days after the order is marked mailed or closed. After that period, message text and recipient/return-address details are removed or anonymized unless an active customer issue requires temporary continued retention.",
      "Only the minimum non-message business and transaction records needed for bookkeeping, payment reconciliation, fraud prevention, or legal and tax obligations are retained beyond that sensitive-data window.",
      "Customer message or address content is not placed into marketing datasets.",
    ],
  },
];

export default function Policies() {
  return (
    <PageShell>
      <section
        className="mx-auto w-full max-w-[820px]"
        style={{ padding: "80px 24px 120px" }}
      >
        <FadeIn>
          <div style={{ marginBottom: "44px" }}>
            <p
              style={{
                margin: "0 0 10px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--mm-burgundy)",
              }}
            >
              Effective September 7, 2026
            </p>
            <h1
              style={{
                margin: "0 0 16px",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
                lineHeight: 1.08,
                color: "var(--mm-forest)",
              }}
            >
              Customer & Privacy Policies
            </h1>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--mm-ink-soft)",
              }}
            >
              These policies summarize the current operating standards for the live Mailing Memories handwritten card service.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gap: "34px" }}>
          {sections.map((section, index) => (
            <FadeIn key={section.title} delay={Math.min(index * 0.03, 0.18)}>
              <section
                style={{
                  borderTop: "1px solid var(--mm-line)",
                  paddingTop: "24px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 12px",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.5rem",
                    color: "var(--mm-forest)",
                  }}
                >
                  {section.title}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    style={{
                      margin: "0 0 12px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.96rem",
                      lineHeight: 1.75,
                      color: "var(--mm-ink-soft)",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15}>
          <div
            style={{
              marginTop: "46px",
              padding: "22px",
              border: "1px solid var(--mm-line)",
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "0.92rem",
                lineHeight: 1.7,
                color: "var(--mm-ink-soft)",
              }}
            >
              Questions about an order or these policies can be sent to <strong>hello@mailingmemories.com</strong>.
            </p>
          </div>
        </FadeIn>
      </section>
    </PageShell>
  );
}
