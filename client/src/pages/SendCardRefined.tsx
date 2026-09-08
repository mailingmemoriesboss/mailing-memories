import { useEffect } from "react";
import SendCardPreview from "./SendCardPreview";

/**
 * Small compatibility layer around the proven SendCardPreview checkout flow.
 *
 * The physical card signature is optional. The underlying paid-order schema
 * still needs a sender identity, so when no card signature is supplied we use
 * the return-address name for sender_name while preserving an empty
 * signature_name. This keeps fulfillment data valid without forcing words onto
 * the customer's card.
 */
function SignatureOptionalEnhancer() {
  useEffect(() => {
    const originalSetItem = Storage.prototype.setItem;

    Storage.prototype.setItem = function patchedSetItem(key: string, value: string) {
      if (key === "mailingMemoriesPendingOrder") {
        try {
          const pending = JSON.parse(value);
          const order = pending?.order;
          if (order && !String(order.signature_name || "").trim()) {
            order.signature_name = "";
            order.sender_name = String(order.return_name || order.sender_name || "").trim();
            value = JSON.stringify(pending);
          }
        } catch {
          // Preserve the original value if this is not the expected payload.
        }
      }
      return originalSetItem.call(this, key, value);
    };

    const syncSignatureUI = () => {
      const inside = document.querySelector<HTMLTextAreaElement>('textarea[aria-label="Inside card message"]');
      const signature = document.querySelector<HTMLInputElement>('input[aria-label="Signature"]');

      if (signature) {
        signature.placeholder = "Signature (optional)";
        const dash = signature.previousElementSibling as HTMLElement | null;
        if (dash) dash.style.visibility = signature.value.trim() ? "visible" : "hidden";
      }

      if (inside) {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("button"));
        const continueButton = buttons.find((button) => button.textContent?.includes("Continue to envelope"));
        const hasMessage = inside.value.trim().length > 0;
        if (continueButton) {
          continueButton.disabled = !hasMessage;
          continueButton.style.background = hasMessage ? "var(--mm-forest)" : "rgba(36,51,41,0.28)";
          continueButton.style.cursor = hasMessage ? "pointer" : "not-allowed";
        }

        const statusText = Array.from(document.querySelectorAll<HTMLParagraphElement>("p")).find((node) =>
          node.textContent?.includes("Add an inside message and signature to continue")
        );
        if (statusText) {
          statusText.textContent = hasMessage
            ? "Card message ready. Add a signature only if you want one."
            : "Add an inside message to continue. Signature is optional.";
          statusText.style.color = hasMessage ? "var(--mm-forest)" : "var(--mm-ink-muted)";
        }

        const stepBody = Array.from(document.querySelectorAll<HTMLParagraphElement>("p")).find((node) =>
          node.textContent?.includes("The inside message and your signature are required")
        );
        if (stepBody) {
          stepBody.textContent = "The card below is your writing space. The front and signature are optional. Add the inside message you want me to handwrite, then continue to the envelope.";
        }
      }

      // The existing review layout always renders a signature line. Hide it
      // when the customer intentionally leaves the signature blank.
      const reviewSignature = Array.from(document.querySelectorAll<HTMLParagraphElement>("p")).find((node) =>
        node.textContent?.trim() === "—"
      );
      if (reviewSignature) reviewSignature.style.display = "none";
    };

    const observer = new MutationObserver(syncSignatureUI);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("input", syncSignatureUI, true);
    syncSignatureUI();

    return () => {
      observer.disconnect();
      document.removeEventListener("input", syncSignatureUI, true);
      Storage.prototype.setItem = originalSetItem;
    };
  }, []);

  return null;
}

export default function SendCardRefined() {
  return (
    <>
      <SendCardPreview />
      <SignatureOptionalEnhancer />
    </>
  );
}
