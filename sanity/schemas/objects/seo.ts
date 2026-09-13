// sanity/schemas/objects/seo.ts
// Canonical is NOT a field here -- it is generated from the slug at render
// time, never stored.
import { defineField, defineType } from "sanity";

import { makeCharCounterInput } from "../../components/CharCounterInput";

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: `Aim for the "Custom [Product] Manufacturer" form. Warns past ${TITLE_LIMIT} characters.`,
      validation: (Rule) => [
        Rule.required(),
        Rule.max(TITLE_LIMIT).warning(`Longer than ${TITLE_LIMIT} characters may get truncated in search results.`),
      ],
      components: { input: makeCharCounterInput(TITLE_LIMIT) },
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Put the essentials in the first 155 characters.",
      validation: (Rule) => [
        Rule.required(),
        Rule.max(DESCRIPTION_LIMIT).warning(
          `Longer than ${DESCRIPTION_LIMIT} characters may get truncated in search results.`,
        ),
      ],
      components: { input: makeCharCounterInput(DESCRIPTION_LIMIT) },
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "pageImage",
    }),
    defineField({
      name: "noindex",
      title: "Noindex this page",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
