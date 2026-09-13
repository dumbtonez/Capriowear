import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 3,
      description: "Answer first, self contained.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "question" },
  },
});
