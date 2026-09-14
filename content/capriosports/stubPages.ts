// content/capriosports/stubPages.ts
// Phase 1 scaffolding for the Capriosports parent-site pages that don't
// collide with a Capriowear redirect (see next.config.ts's redirects() and
// docs/05-plan.md's decision log for the four that do: /services,
// /our-factory, /privacy-policy, /request-a-sample -- those keep their
// redirect to Capriowear's real pages and get no stub here). Every string
// below is placeholder copy, same discipline as content/gear/**'s own
// stub content -- real copy is a later phase.
//
// The homepage (/) got its real content build 2026-09-15 -- see
// content/capriosports/home.ts instead; capriosportsHomeStub was removed
// from here the same day.
export type StubPageContent = {
  h1: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
};

export const contactStub: StubPageContent = {
  h1: "Contact (placeholder)",
  body: "Placeholder contact page -- real copy is a later phase.",
  metaTitle: "Contact Capriosports",
  metaDescription: "Placeholder meta description -- real copy is a later phase.",
};

export const termsStub: StubPageContent = {
  h1: "Terms (placeholder)",
  body: "Placeholder terms page -- real copy is a later phase.",
  metaTitle: "Terms | Capriosports",
  metaDescription: "Placeholder meta description -- real copy is a later phase.",
};

export const responsibleManufacturingStub: StubPageContent = {
  h1: "Responsible Manufacturing (placeholder)",
  body: "Placeholder responsible manufacturing page -- real copy is a later phase.",
  metaTitle: "Responsible Manufacturing | Capriosports",
  metaDescription: "Placeholder meta description -- real copy is a later phase.",
};

export const ourPeopleStub: StubPageContent = {
  h1: "Our People (placeholder)",
  body: "Placeholder our people page -- real copy is a later phase.",
  metaTitle: "Our People | Capriosports",
  metaDescription: "Placeholder meta description -- real copy is a later phase.",
};

export const whoWeAreStub: StubPageContent = {
  h1: "Who We Are (placeholder)",
  body: "Placeholder who we are page -- real copy is a later phase.",
  metaTitle: "Who We Are | Capriosports",
  metaDescription: "Placeholder meta description -- real copy is a later phase.",
};
