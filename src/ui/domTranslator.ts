/**
 * DOM-based text translation engine.
 *
 * Walks text nodes and common text-bearing attributes, replacing exact-match
 * English strings with their translated equivalents using a MutationObserver
 * to handle dynamically rendered content.
 */

const TRANSLATABLE_ATTRIBUTES = [
  "title",
  "aria-label",
  "aria-description",
  "aria-placeholder",
  "placeholder",
  "alt",
] as const;

const TRANSLATABLE_INPUT_TYPES = new Set(["button", "submit", "reset"]);

function translateText(value: string | null | undefined, dict: Record<string, string>): string | null | undefined {
  const original = value?.trim();
  if (!original || dict[original] === undefined || !value) return value;
  return value.replace(original, dict[original]);
}

function translateElement(element: Element, dict: Record<string, string>): void {
  for (const attribute of TRANSLATABLE_ATTRIBUTES) {
    const value = element.getAttribute(attribute);
    const translated = translateText(value, dict);
    if (translated !== value && translated !== undefined && translated !== null) {
      element.setAttribute(attribute, translated);
    }
  }

  if (
    element instanceof HTMLInputElement &&
    TRANSLATABLE_INPUT_TYPES.has(element.type)
  ) {
    const translated = translateText(element.value, dict);
    if (translated !== element.value && translated !== undefined && translated !== null) {
      element.value = translated;
    }
  }
}

function translateNode(node: Node, dict: Record<string, string>): void {
  if (node.nodeType === Node.TEXT_NODE) {
    const translated = translateText(node.textContent, dict);
    if (translated !== node.textContent && translated !== undefined && translated !== null) {
      node.textContent = translated;
    }
  } else {
    if (node.nodeType === Node.ELEMENT_NODE) {
      translateElement(node as Element, dict);
    }
    Array.from(node.childNodes).forEach((child) => translateNode(child, dict));
  }
}

/**
 * Starts the translation engine. Translates the current DOM immediately, then
 * watches for new nodes via MutationObserver.
 *
 * @returns A cleanup function that disconnects the observer.
 */
export function startTranslation(
  dict: Record<string, string>
): () => void {
  // Translate existing DOM
  translateNode(document.body, dict);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        Array.from(mutation.addedNodes).forEach((node) => translateNode(node, dict));
      }
      // Note: characterData observation is intentionally omitted. React updates
      // text by replacing nodes (childList), not via direct characterData writes.
      // Watching characterData causes an infinite loop: our replacement fires a
      // new characterData mutation, React reconciles back to English, we fire
      // again — freezing the page on any live-updating view (e.g. Routines).
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
}
