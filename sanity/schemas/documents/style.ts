// sanity/schemas/documents/style.ts
// Covers /activewear/[category]/[style] and /teamwear/[sport]/[style].
import { defineField, defineType } from "sanity";

import { SlugReadOnlyInput } from "../../components/SlugReadOnlyInput";

export default defineType({
  name: "style",
  title: "Style",
  type: "document",
  groups: [
    { name: "identity", title: "Identity" },
    { name: "card", title: "Card" },
    { name: "header", title: "Product header" },
    { name: "specs", title: "Specifications" },
    { name: "inherited", title: "Inherited blocks" },
    { name: "faq", title: "FAQ, video, SEO" },
  ],
  fields: [
    // Identity and routing
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "identity",
      description: "Style name only, the card and H1 add the word Custom.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "identity",
      to: [{ type: "category" }],
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
    }),
    defineField({
      name: "styleCode",
      title: "Style code",
      type: "string",
      group: "identity",
      description: "Form: CAP-LEG-01.",
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
    defineField({
      name: "isHero",
      title: "Is hero style",
      type: "boolean",
      group: "identity",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      group: "identity",
    }),
    defineField({
      name: "gender",
      title: "Gender",
      type: "string",
      group: "identity",
      options: { list: ["women", "men", "unisex"] },
      validation: (Rule) => Rule.required(),
    }),

    // Card
    defineField({
      name: "cardImage",
      title: "Card image",
      type: "pageImage",
      group: "card",
    }),
    defineField({
      name: "cardSpecLine",
      title: "Card spec line",
      type: "string",
      group: "card",
      description: "One distinguishing spec line, no MOQ, no price.",
      validation: (Rule) => Rule.required(),
    }),

    // Product header
    defineField({
      name: "h1",
      title: "H1",
      type: "string",
      group: "header",
      description: "Form: Custom [Style] Manufacturer.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "header",
      of: [{ type: "pageImage" }],
      validation: (Rule) => Rule.min(3).max(5),
    }),
    defineField({
      name: "descriptionLine",
      title: "Description line",
      type: "text",
      rows: 2,
      group: "header",
      description: "Fact dense, one line.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "keyFacts",
      title: "Key facts",
      type: "array",
      group: "header",
      of: [{ type: "keyFact" }],
      validation: (Rule) => Rule.length(4),
    }),
    defineField({
      name: "fabricChips",
      title: "Fabric chips",
      type: "array",
      group: "header",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "customizationChips",
      title: "Customization chips",
      type: "array",
      group: "header",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "relatedStyles",
      title: "Related styles",
      type: "array",
      group: "header",
      of: [{ type: "reference", to: [{ type: "style" }] }],
      validation: (Rule) => Rule.min(3).max(4),
    }),

    // Specifications
    defineField({
      name: "specRows",
      title: "Spec rows",
      type: "array",
      group: "specs",
      of: [{ type: "specRow" }],
      description: "Product spec only, no MOQ, sizes, sample times or shipping.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specNote",
      title: "Spec note",
      type: "string",
      group: "specs",
      initialValue: "This is a standard build, but fully customizable to your brief.",
    }),
    defineField({
      name: "schemaMaterial",
      title: "Schema material",
      type: "string",
      group: "specs",
      description: "What Product schema emits as material, leave empty to fall back to the Fabric spec row.",
    }),

    // Inherited blocks
    defineField({
      name: "customizationMethodsOverride",
      title: "Customization methods override",
      type: "array",
      group: "inherited",
      of: [{ type: "customizationMethod" }],
      description: "Leave empty to inherit the shared method set.",
    }),
    defineField({
      name: "trustBlockOverride",
      title: "Trust block override",
      type: "trustBlock",
      group: "inherited",
      description: "Leave empty to inherit the parent category's trust block, which is the normal case.",
    }),

    // FAQ, video, SEO
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      of: [{ type: "faqItem" }],
      description: "Style specific questions only, render order is fixed in code: entity question, these, then shared operations.",
      validation: (Rule) => Rule.min(2).max(3),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "videoClip",
      group: "faq",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "faq",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", status: "status", categoryTitle: "category.title" },
    prepare: ({ title, status, categoryTitle }) => ({
      title,
      subtitle: [status, categoryTitle].filter(Boolean).join(" · "),
    }),
  },
});
