import { defineField, defineType } from "sanity";

export default defineType({
  name: "trustBlock",
  title: "Trust block",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "TESTED BEFORE BULK",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lead",
      title: "Lead",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "points",
      title: "Points",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(4).max(5),
    }),
  ],
  preview: {
    select: { title: "heading" },
  },
});
