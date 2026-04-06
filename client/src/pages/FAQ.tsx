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
        q: "What is the Mailing Memories handwritten letter service?",
        a: "We provide a thoughtful way to send a personal message. We hand-write your message on quality cardstock, place it in a clean white envelope, and mail it with a stamp on your behalf."
      },
      {
        q: "How much does a handwritten letter cost?",
        a: "Each letter is $15, which includes the materials, the handwriting service, and domestic postage."
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
        a: "We offer light help to get you started if you feel stuck on the wording of your message."
      },
      {
        q: "Can I change or cancel my order?",
        a: "[Placeholder: Define cancellation/edit policy before the letter is written]."
      },
      {
        q: "How can I contact support?",
        a: "[Placeholder: Add support email address or contact form link]."
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
            Everything you need to know about our handwritten letter service.
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
            We’re here to help you send the perfect message.
          </p>
          <a
            href="mailto:[Placeholder: support email]"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-mm-forest text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Contact Support
          </a>
        </div>
      </section>
    </PageShell>
  );
}
