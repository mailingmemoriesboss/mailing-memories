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
        a: "Mailing Memories is a thoughtful correspondence brand. The current live offer is a handwritten letter service that helps you send a real, personal message on paper."
      },
      {
        q: "What can I buy right now?",
        a: "Right now, you can order the handwritten letter service. For $15, we handwrite, stamp, and mail one full page on quality cardstock for you."
      },
      {
        q: "Who writes the letters?",
        a: "Every letter is handwritten by Mailing Memories to ensure a personal, human touch."
      },
      {
        q: "How long can my message be?",
        a: "The current service includes one full handwritten page on quality cardstock."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "Where do you ship?",
        a: "Currently, we mail letters within the United States only."
      },
      {
        q: "How quickly will my letter ship?",
        a: "Your letter will be handwritten and shipped within 1–2 business days of your order."
      },
      {
        q: "How long does delivery take?",
        a: "Delivery timing depends on USPS after your letter has been mailed."
      }
    ]
  },
  {
    category: "Help & Support",
    questions: [
      {
        q: "What if I’m not sure what to write?",
        a: "If you feel stuck on the wording, light help getting started is available to help you turn your intention into action."
      },
      {
        q: "Can I change or cancel my order?",
        a: "If you need help with an existing order, email hello@mailingmemories.com as soon as possible so we can review what stage it is in."
      },
      {
        q: "How can I contact support?",
        a: "You can reach us at hello@mailingmemories.com for any questions regarding your order."
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
              Everything you need to know about the current handwritten letter service.
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
      </section>
    </PageShell>
  );
}
