// sanity/schemas/objects/keyFact.ts
// icon uses the same fixed key set as content/activewear/types.ts's own
// PDP icon spec-highlights row, so a future render layer maps the same
// keys to the same lucide icons everywhere.
import { defineField, defineType } from "sanity";

const ICON_OPTIONS = ["package", "calendarDays", "arrowDownAZ", "ship"];

export default defineType({
  name: "keyFact",
  title: "Key fact",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "icon" },
  },
});
