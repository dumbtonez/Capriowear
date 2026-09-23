// content/getStarted.ts
// The one "How do I get started?" Q&A, used verbatim on every page that asks
// it (owner, 2026-09-23): every Capriowear PLP and PDP, Teamwear, Gear, the
// Capriowear homepage, Services and the Activewear hub. Same question, same
// instruction to the buyer everywhere, never reworded per page or category.
//
// Lives in its own module, importing nothing but types, so every content file
// (content/home.ts included) can use it without an import cycle --
// content/activewear/pdpShared.ts imports content/home.ts, so the constant
// couldn't live there and also be used by home.ts.
import type { FaqEntry } from "./activewear/types";

// The sample-request page: the header's "Request a Sample" CTA
// (`home.nav.cta.href`) and this answer's link both read it from here, so
// the two can never point to different places.
export const REQUEST_A_SAMPLE_HREF = "/capriowear/request-a-sample";

export const faqGetStarted: FaqEntry = {
  q: "How do I get started?",
  a: "Send your tech pack, sketch, or a reference garment through our contact form. We come back within 24 hours with next steps.",
  link: { text: "through our contact form", href: REQUEST_A_SAMPLE_HREF },
};
