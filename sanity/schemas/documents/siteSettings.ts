// sanity/schemas/documents/siteSettings.ts
// A true singleton -- see sanity/structure.ts for the desk item that hides
// create/delete and skips the list view. companyIdentity stays in
// content/site.ts, deliberately not duplicated here.
import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "defaultHeroFacts",
      title: "Default hero facts",
      type: "array",
      of: [{ type: "keyFact" }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "customizationAreas",
      title: "Customization areas",
      type: "array",
      of: [{ type: "labelValue" }],
      validation: (Rule) => Rule.length(6),
    }),
    defineField({
      name: "customizationMethods",
      title: "Customization methods",
      type: "array",
      of: [{ type: "customizationMethod" }],
    }),
    defineField({
      name: "sharedFaqs",
      title: "Shared FAQs",
      type: "array",
      of: [{ type: "faqItem" }],
      description: "The shared operations questions reused on every PDP.",
    }),
    defineField({
      name: "complianceBar",
      title: "Compliance bar",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.length(5),
    }),
    defineField({
      name: "finalCtaHeading",
      title: "Final CTA heading",
      type: "string",
      initialValue: "Let's build your custom collection.",
    }),
    defineField({
      name: "finalCtaSublineTemplate",
      title: "Final CTA subline template",
      type: "text",
      rows: 2,
      description: "Use [noun] as the placeholder, it is filled from the category's ctaReferenceNoun.",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Open Graph image",
      type: "pageImage",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "labelValue" }],
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer blurb",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
