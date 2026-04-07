import { PageShell } from "@/components/Layout";
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
        a: "Mailing Memories is a thoughtful correspondence brand that helps people say what they mean through handwritten letters, guided tools, and simple support when they do not know where to start."
      },
      {
        q: "What can I buy right now?",
        a: "Right now, the main live offer is a handwritten letter service. For $15, we will handwrite, stamp, and mail one full page on quality cardstock for you."
      },
      {
        q: "Who writes the letters?",
        a: "Every letter is handwritten by Mailing Memories to ensure a personal, human touch."
      },
      {
        q: "How long can my message be?",
        a: "The service covers one full handwritten page. [Placeholder: Specify character or word limit here]."
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
        a: "[Placeholder: Add typical USPS delivery timeframe estimate here]."
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
        a: "[Placeholder: Define cancellation/edit policy before the letter is written]."
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
            Everything you need to know about our current service and brand.
          </p>
        </div>

        <div className="space-y-12">
          {faqData.map((section, idx) => (
            <div key={idx}>
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--mm-ink-muted)",
                  marginBottom: "24px",
                  borderBottom: "1px solid var(--mm-line)",
                  paddingBottom: "12px",
                }}
              >
                {section.category}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((item, qIdx) => (
                  <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                    <AccordionTrigger 
                      className="text-lg font-medium text-mm-ink hover:no-underline py-5"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-mm-ink-muted leading-relaxed pb-6"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "1rem" }}
                    >
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div 
          className="mt-20 p-8 rounded-2xl bg-mm-parchment/30 border border-mm-line text-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <h3 className="text-mm-ink font-semibold mb-2">Still have questions?</h3>
          <p className="text-mm-ink-muted mb-6 text-sm">
            We’re here to help you follow through on what you mean to say.
          </p>
          <a
            href="mailto:hello@mailingmemories.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-mm-forest text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Contact Support
          </a>
        </div>
      </section>
    </PageShell>
  );
}
