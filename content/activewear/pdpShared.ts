// content/activewear/pdpShared.ts
// PDP content reused, unchanged, on every style page -- written once here
// rather than copied into each category's own content file. Owner spec,
// 2026-09-01: "Shared, reused-on-every-PDP content ... lives in ONE shared
// place ... not copied into each style."
//
// FAQ merge order (both here and on the PLP, app/activewear/[category]/
// page.tsx): [categoryEntityFaq(category), ...styleCard.faqs or
// category.faqs, ...pdpFaqOperational] -- entity question first, then the
// style's/category's own questions, then this operational block last (PLP
// only renders the entity question + its own faqs, no operational block --
// see that page's own comment). Same array feeds both the visible Faq
// render and faqSchema() wherever it's used, so the two can never drift
// apart.
import { companyIdentity } from "../site";
import type { Category, FaqEntry, PdpSpecHighlight } from "./types";

// The PLP/PDP entity FAQ answer, built per category rather than stored as
// one constant (owner spec, 2026-09-01: "The full 3-sentence category
// intro ... is NOT stored as a constant, it is built per category from
// that category's content and must END with companyIdentity pulled from
// site.ts unchanged"). Category noun (`menuLabel`) and up to 4 real
// example styles (from the category's own `styleCards` -- genuinely that
// category's content, not invented) swap per category; the closing
// sentence is companyIdentity, imported and appended verbatim, never
// retyped. Replaces what used to be a single hand-typed entity FaqEntry
// duplicated (with slightly different wording each time) in both
// content/activewear/leggings.ts's own `faqs` array and this file's old
// `pdpFaqEntity` export.
export function categoryEntityFaq(
  category: Pick<
    Category,
    | "menuLabel"
    | "styleCards"
    | "manufacturerNoun"
    | "productNounPlural"
    | "entityExampleStyles"
    | "entityFabrics"
    | "audienceClause"
  >,
): FaqEntry {
  // Four optional overrides on `Category` itself (owner spec, 2026-09-02,
  // Sports Bras category), read straight off the same object every call
  // site already passes -- no change needed at either call site
  // (app/activewear/[category]/page.tsx, app/activewear/[category]/
  // [style]/page.tsx) to support this. Two real gaps the old single
  // `menuLabel.toLowerCase()` noun and a literal joined `cardTitle` list
  // couldn't cover on their own, found live building Sports Bras:
  //
  // 1. English plural-to-singular isn't mechanical -- "leggings" reads
  //    fine as both the category noun and "custom leggings manufacturer"
  //    (same word either way), but "Sports Bras" needs "sports bra"
  //    (singular) in "a custom sports bra manufacturer" and "sports bras"
  //    (plural) in "private label sports bras" -- two different words the
  //    old single shared noun couldn't produce at once.
  // 2. The owner's own requested example phrasing ("high-impact,
  //    medium-support, and light-support styles in nylon or recycled
  //    polyester blends") is a categorical description, not the first 4
  //    `cardTitle`s joined with commas -- Sports Bras' own card titles are
  //    the long PDP-style form ("Custom High-Impact Racerback Sports
  //    Bra"), so joining 4 of them verbatim would read as a redundantly
  //    repeated, keyword-stuffed list, not natural sentence copy.
  //
  // `manufacturerNoun`/`productNounPlural` both fall back to
  // `menuLabel.toLowerCase()` (Leggings' own exact prior behavior --
  // lowercased regardless of how it's stored, so a title-cased override
  // like "Sports Bra" never produces a mid-sentence capital).
  // `entityExampleStyles` falls back to the joined first-4-`cardTitle`s
  // list, same as before. `entityFabrics` has no fallback text at all --
  // omitted, its own " in [fabrics]" clause drops from the sentence
  // entirely, since Leggings' prior sentence shape never had one; a
  // category that doesn't set any of these four fields (Leggings today)
  // renders byte-identical output to before this function existed.
  const manufacturerNoun = (category.manufacturerNoun ?? category.menuLabel).toLowerCase();
  const productNounPlural = (category.productNounPlural ?? category.menuLabel).toLowerCase();
  const exampleStyles =
    category.entityExampleStyles ??
    `styles like ${category.styleCards
      .slice(0, 4)
      .map((card) => card.cardTitle)
      .join(", ")}`;
  const fabricsClause = category.entityFabrics ? ` in ${category.entityFabrics}` : "";
  const audienceClause = category.audienceClause ?? "for activewear brands and teamwear suppliers worldwide";
  return {
    q: "What does Capriowear manufacture?",
    a: `Capriowear is a custom ${manufacturerNoun} manufacturer ${audienceClause}. We produce private label ${productNounPlural} from fabric to packaging, including ${exampleStyles}${fabricsClause}, with low minimums and full customization. ${companyIdentity}`,
  };
}

// The closing CTA's own subline (Figma node 579:5710, base copy "Share
// your tech pack, sketch or a reference legging. We'll come back within
// 24 hours with next steps.") -- owner spec, 2026-09-04: every category
// now swaps its own noun into "a reference [X]" (`Category.ctaReferenceNoun`/
// `CuratedCollection.ctaReferenceNoun`) rather than every page rendering
// the same literal "legging" verbatim (the prior standing rule,
// 2026-09-02, is superseded by this one -- see the decision log entry of
// this same date). `referenceNoun` undefined (Running Wear only) drops
// the "[X]" clause entirely rather than falling back to any word --
// "Share your tech pack, sketch or a reference. We'll come back within 24
// hours with next steps.", the owner's own exact given form for that one
// page. Called identically from the PLP (app/activewear/[category]/
// page.tsx), the PDP (app/activewear/[category]/[style]/page.tsx, which
// always uses its OWN category's noun, never the individual style name),
// and Running Wear's own page (app/activewear/running-wear/page.tsx).
export function buildCtaSubline(referenceNoun?: string): string {
  const referenceClause = referenceNoun ? ` a reference ${referenceNoun}` : " a reference";
  return `Share your tech pack, sketch or${referenceClause}. We'll come back within 24 hours with next steps.`;
}

// The PDP's icon spec-highlights list (Figma node 634:5393 desktop /
// 638:2547 mobile, "Content", 2026-09-01) -- same standing facts as
// `pdpFaqOperational` above (MOQ, sample lead time, DDP), plus sizing
// range, rendered as a compact icon row instead of a Q&A. Shared, not
// per-style: every PDP shows the same 4 facts, same "one shared place"
// pattern this file already establishes.
export const pdpSpecHighlights: PdpSpecHighlight[] = [
  { icon: "package", text: "MOQ from 50 pieces" },
  { icon: "calendarDays", text: "Samples in 10 to 14 days" },
  { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
  { icon: "ship", text: "DDP to 20+ countries" },
];

// The PDP's "Customization" pill group (Figma node 634:5034 desktop /
// 645:2905 mobile, second "Content" block, 2026-09-01) -- generic
// manufacturing-capability tags, identical for every style on every PDP
// (unlike the neighbouring "Fabric options" group, which is category-
// specific -- see `Category.fabricPills`'s own comment).
// "Custom fabric" and "Custom Color & design" added first (owner,
// 2026-09-10) ahead of the original 4 pills.
export const pdpCustomizationPills: string[] = [
  "Custom fabric",
  "Custom color & design",
  "Your fit",
  "Your branding",
  "Custom labels",
  "Custom packaging",
];

// The PDP's "How We Customize" carousel (Figma node 634:5153 desktop /
// 643:2714 mobile, "Content"/"Steps", 2026-09-01) -- eyebrow + heading over
// a horizontally scrollable row of 5 capability steps. Shared, not
// per-style: every PDP shows the same customization process. Reuses the
// exact same components/mechanism as the homepage's `HowItWorks` section
// (owner: "already built the same component on homepage") --
// `CapabilityCard` + `useDesktopChevronScroller`/`DesktopChevron` for
// desktop, `CardCarousel` for mobile -- not a new bespoke carousel.
//
// Steps sourced from the "full content" reference frame (627:3995), which
// has 5 real, distinct steps -- the desktop frame linked directly
// (634:5153) has a stray 6th "Step" that's a duplicate copy of "Trims and
// finish" (same title/body as step 4), and the mobile frame (643:2714)
// mixes in 3 titles from the homepage's own How It Works content
// ("Bulk Production", "Quality Control", "Packaging & Shipping") instead
// of this section's own copy -- both read as Figma file mistakes (a
// stray duplicate layer, a copy-pasted frame that wasn't fully edited),
// not intentional per-breakpoint content, so this single list is shared
// at both breakpoints instead of reproducing either error.
export const pdpCustomizationSteps = {
  eyebrow: "HOW WE CUSTOMIZE",
  // Explicit line break (owner request, 2026-09-01: put "in-house, no
  // outsourcing" on its own second line) -- natural wrap at this
  // heading's own 812px max-width doesn't reliably land there on its own,
  // same "\n" + `whitespace-pre-line` technique already used for
  // FabricOptions' own 2-line heading. Desktop only -- rendered via
  // `productCustomizeSteps.desktopHeadingWidth`'s own `whitespace-pre-line`.
  heading: "Your brand, applied\nin-house, no outsourcing",
  // Mobile's own break point, deliberately different from desktop's above
  // (owner, 2026-09-01: "keep the in- in the first line" -- i.e. don't
  // orphan "in-" onto the second line the way desktop's break does).
  // Rendered via `productCustomizeSteps.mobileHeadingWidth`'s own
  // `whitespace-pre-line`.
  mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
  // Fabric moved first (owner, 2026-09-10: "make fabric as first card") --
  // was 3rd.
  steps: [
    { title: "Fabric and material", body: "Any blend and weight, sourced to your reference" },
    { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG" },
    { title: "Branding", body: "Silicone, heat transfer, embroidery" },
    { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
};

// The PDP's "Specifications" datasheet heading + subline (Figma node
// 634:5092, "Content", 2026-09-02) -- shared across every PDP; only the
// row data (`StyleCard.specifications`) differs per style. Mobile's own
// frame reads slightly different wording ("but can be fully customizable"
// vs. desktop's "but fully customizable") -- same kind of per-breakpoint
// copy slip already documented on `pdpCustomizationSteps` above (a stray
// duplicate layer, a copy-pasted frame not fully edited), so one shared
// string is used at both breakpoints instead of reproducing the mismatch.
export const pdpSpecificationsCopy = {
  heading: "Specifications",
  subline: "This is a standard build, but fully customizable to your brief",
};

export const pdpFaqOperational: FaqEntry[] = [
  {
    q: "What is the minimum order quantity, and can I mix sizes?",
    a: "MOQ starts at 50 pieces per style. You can grade that across a full size run rather than ordering 50 of one size, and we can quote lower or higher runs depending on the style and fabric.",
  },
  {
    q: "How long do samples take?",
    a: "Samples ship in 10 to 14 days from a confirmed tech pack or reference sample. We send photos and measurements for your sign-off before cutting bulk.",
  },
  {
    q: "Do you ship worldwide, and who handles duties?",
    a: "Yes. We ship DDP to over 20 countries, meaning duties and import taxes are included in your landed cost quote rather than billed separately on arrival.",
  },
  {
    q: "Will you sign an NDA before I share my designs?",
    a: "Yes. We sign NDAs on request before you send tech packs, patterns, or reference samples, and your designs are never shared with or produced for other brands.",
  },
  {
    q: "How do I get started?",
    a: "Send your tech pack, sketch, or a reference garment through our contact form. We come back within 24 hours with next steps, including a quote and sample timeline.",
  },
];
