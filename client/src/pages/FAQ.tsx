import { Link } from "wouter";
import { PageShell, FadeIn } from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    category: "The Service",
    questions: [
      {
        q: "What is Mailing Memories?",
        a: "Mailing Memories is a thoughtful correspondence brand. The current live offer is a handwritten card service that helps you send a real, personal message on paper."
      },
      {
        q: "What can I buy right now?",
        a: "Right now, you can order a handwritten card for $15. We handwrite your message on a folded cardstock card, place it in a clean white envelope, stamp it, and mail it anywhere in the United States."
      },
      {
        q: "Who writes the cards?",
        a: "Every card is handwritten by Mailing Memories for a personal, human result."
      },
      {
        q: "How long can my message be?",
        a: "The current service includes one full handwritten card. The send page will guide you through the message and signature before checkout."
      },
      {
        q: "What if I’m not sure what to write?",
        a: "Use Find Your Words for free starter wording and selectable phrases, or use the light writing help built into the service."
      }
    ]
  },
  {
    category: "Mailing & Timing",
    questions: [
      {
        q: "Where do you mail cards?",
        a: "Currently, Mailing Memories mails within the United States only."
      },
      {
        q: "How quickly will my card be mailed?",
        a: "Standard orders are handwritten and mailed within 1–2 business days. If you choose Plan Ahead, we mail on the future mailing date you select instead."
      },
      {
        q: "How does Plan Ahead work?",
        a: "Plan Ahead is included at no extra charge. You can choose a USPS mailing date at least 3 days in advance. The selected date is the planned mailing date, not a guaranteed delivery date."
      },
      {
        q: "How long does delivery take?",
        a: "Delivery timing is controlled by USPS after the card has been mailed, so Mailing Memories does not guarantee an arrival date."
      }
    ]
  },
  {
    category: "Changes, Cancellations & Delivery Issues",
    questions: [
      {
        q: "Can I change or cancel my order?",
        a: "Contact us as soon as possible. An order may be canceled before it has been handed to USPS. Once the card has been mailed, it can no longer be canceled."
      },
      {
        q: "What if Mailing Memories makes a mistake?",
        a: "If we make a handwriting, addressing, or fulfillment mistake, contact us so we can review it and make the order right under our current remake or resend policy."
      },
      {
        q: "What if USPS appears to lose the card?",
        a: "If a correctly addressed card appears to be lost in the mail, Mailing Memories may provide one goodwill remake and re-mail after reviewing the situation."
      },
      {
        q: "What if a correctly addressed card is returned to sender?",
        a: "If the address supplied was correct and the card is returned by USPS, Mailing Memories may provide one goodwill resend after reviewing the return."
      },
      {
        q: "How can I contact support?",
        a: "Email hello@mailingmemories.com with your order details and the issue you need help with."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <PageShell>
      <section
        className="mx-auto w-full max-w-[800px]"
        style={{ padding: "80px 24px 120px" }}
      >
        <FadeIn>
          <div className="mb-12 text-center">
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
                lineHeight: 1.1,
                color: "var(--mm-forest)",
                marginBottom: "16px",
              }}
            >
              Frequently Asked Questions
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                color: "var(--mm-ink-muted)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Everything you need to know about the current handwritten card service.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-12">
          {faqData.map((section, sIdx) => (
            <FadeIn key={sIdx} delay={0.1 * (sIdx + 1)}>
              <div className="mb-8">
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--mm-burgundy)",
                    marginBottom: "24px",
                    paddingBottom: "12px",
                    borderBottom: "1px solid var(--mm-line)",
                  }}
                >
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((item, qIdx) => (
                    <AccordionItem key={qIdx} value={`item-${sIdx}-${qIdx}`}>
                      <AccordionTrigger
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.25rem",
                          color: "var(--mm-forest)",
                          textAlign: "left",
                        }}
                      >
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "1rem",
                          lineHeight: 1.6,
                          color: "var(--mm-ink-soft)",
                          paddingTop: "8px",
                          paddingBottom: "16px",
                        }}
                      >
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <div
            style={{
              marginTop: "20px",
              paddingTop: "28px",
              borderTop: "1px solid var(--mm-line)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.92rem",
              lineHeight: 1.7,
              color: "var(--mm-ink-soft)",
            }}
          >
            For the full current cancellation, remake/resend, USPS, and privacy standards, see our{" "}
            <Link href="/policies" style={{ color: "var(--mm-forest)", fontWeight: 600 }}>
              Customer & Privacy Policies
            </Link>.
          </div>
        </FadeIn>
      </section>
    </PageShell>
  );
}
