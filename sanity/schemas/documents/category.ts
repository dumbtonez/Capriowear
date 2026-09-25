// sanity/schemas/documents/category.ts
// Covers both /activewear/[category] and /teamwear/[sport] (PLPs).
import { defineField, defineType } from "sanity";

import { SlugReadOnlyInput } from "../../components/SlugReadOnlyInput";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  groups: [
    { name: "identity", title: "Identity" },
    { name: "hero", title: "Hero" },
    { name: "listing", title: "Listing" },
    { name: "overview", title: "Overview" },
    { name: "customization", title: "Customization" },
    { name: "trust", title: "Trust" },
    { name: "fabric", title: "Fabric" },
    { name: "entityFaq", title: "Entity FAQ" },
    { name: "faq", title: "FAQ, related, CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Identity and routing
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      group: "identity",
      options: { list: ["activewear", "teamwear"] },
      description: "Drives the route prefix.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "navGroup",
      title: "Nav group",
      type: "string",
      group: "identity",
      options: {
        list: ["Tops", "Bottoms", "Outerwear & Suits", "One-Pieces", "Base Layers", "Sport"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      options: { source: "title" },
      components: { input: SlugReadOnlyInput },
      description: "Renaming a live URL throws away its ranking, add the old slug to previousSlugs instead.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "previousSlugs",
      title: "Previous slugs",
      type: "array",
      group: "identity",
      of: [{ type: "string" }],
      description: "Never delete an entry, these drive 301 redirects.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      group: "identity",
    }),
    defineField({
      name: "styleCodePrefix",
      title: "Style code prefix",
      type: "string",
      group: "identity",
      description: "For example, LEG, SOC.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "identity",
      options: { list: ["draft", "live"] },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),

    // Hero
    defineField({
      name: "h1",
      title: "H1",
      type: "string",
      group: "hero",
      description: "Form: Custom [Category] Manufacturer.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubline",
      title: "Hero subline",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroFacts",
      title: "Hero facts",
      type: "array",
      group: "hero",
      of: [{ type: "keyFact" }],
      validation: (Rule) => Rule.max(4),
      description: "Leave empty to inherit the site default fact strip.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "pageImage",
      group: "hero",
    }),

    // Listing
    defineField({
      name: "listingHeading",
      title: "Listing heading",
      type: "string",
      group: "listing",
    }),
    defineField({
      name: "listingSubline",
      title: "Listing subline",
      type: "string",
      group: "listing",
      initialValue: "Every style, made to your brand spec",
    }),
    defineField({
      name: "defaultGender",
      title: "Default gender",
      type: "string",
      group: "listing",
      options: { list: ["all", "women", "men"] },
      initialValue: "all",
    }),

    // Overview
    defineField({
      name: "overviewEyebrow",
      title: "Overview eyebrow",
      type: "string",
      group: "overview",
    }),
    defineField({
      name: "overviewHeading",
      title: "Overview heading",
      type: "string",
      group: "overview",
    }),
    defineField({
      name: "overviewLead",
      title: "Overview lead",
      type: "text",
      rows: 3,
      group: "overview",
    }),
    defineField({
      name: "overviewDifferentiators",
      title: "Overview differentiators",
      type: "array",
      group: "overview",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(2),
    }),

    // Customization strip
    defineField({
      name: "customizationAreasOverride",
      title: "Customization areas override",
      type: "array",
      group: "customization",
      of: [{ type: "labelValue" }],
      validation: (Rule) => Rule.max(6),
      description: "Leave empty to inherit the site level six areas, this is almost always empty.",
    }),

    // Trust
    defineField({
      name: "trustBlock",
      title: "Trust block",
      type: "trustBlock",
      group: "trust",
      description: "Category specific, also inherited by this category's PDPs.",
      validation: (Rule) => Rule.required(),
    }),

    // Fabric
    defineField({
      name: "fabricHeading",
      title: "Fabric heading",
      type: "string",
      group: "fabric",
      initialValue: "The fabrics behind the big brands",
    }),
    defineField({
      name: "fabricRows",
      title: "Fabric rows",
      type: "array",
      group: "fabric",
      of: [{ type: "fabricRow" }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "fabricNote",
      title: "Fabric note",
      type: "text",
      rows: 2,
      group: "fabric",
    }),
    defineField({
      name: "supplementaryBlockType",
      title: "Supplementary block type",
      type: "string",
      group: "fabric",
      options: { list: ["none", "gsmTiers", "decorationMethods"] },
      initialValue: "none",
    }),
    defineField({
      name: "supplementaryBlockHeading",
      title: "Supplementary block heading",
      type: "string",
      group: "fabric",
    }),
    defineField({
      name: "supplementaryBlockRows",
      title: "Supplementary block rows",
      type: "array",
      group: "fabric",
      of: [{ type: "specRow" }],
      hidden: ({ document }) => document?.supplementaryBlockType === "none",
    }),

    // Entity FAQ generator
    defineField({
      name: "manufacturerNoun",
      title: "Manufacturer noun",
      type: "string",
      group: "entityFaq",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productNounPlural",
      title: "Product noun plural",
      type: "string",
      group: "entityFaq",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "entityExampleStyles",
      title: "Entity example styles",
      type: "string",
      group: "entityFaq",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "entityFabrics",
      title: "Entity fabrics",
      type: "string",
      group: "entityFaq",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "audienceClause",
      title: "Audience clause",
      type: "string",
      group: "entityFaq",
    }),
    defineField({
      name: "entityAnswerOverride",
      title: "Entity answer override",
      type: "text",
      rows: 3,
      group: "entityFaq",
      description: "Leave empty to generate the entity answer from the fields above plus the stored identity line.",
    }),

    // FAQ, related, CTA
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      of: [{ type: "faqItem" }],
      validation: (Rule) => Rule.max(8),
      description: "Category specific questions only, the entity question and the shared operations questions are added automatically.",
    }),
    defineField({
      name: "relatedCategories",
      title: "Related categories",
      type: "array",
      group: "faq",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.min(3).max(4),
    }),
    defineField({
      name: "ctaReferenceNoun",
      title: "CTA reference noun",
      type: "string",
      group: "faq",
      description:
        "The swapping noun in the final CTA, for example: a reference legging. Leave empty to render 'a reference'.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", status: "status", group: "group" },
    prepare: ({ title, status, group }) => ({
      title,
      subtitle: [status, group].filter(Boolean).join(" · "),
    }),
  },
});
