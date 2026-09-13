import { defineField, defineType } from "sanity";

export default defineType({
  name: "fabricRow",
  title: "Fabric row",
  type: "object",
  fields: [
    defineField({
      name: "fabric",
      title: "Fabric",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bestFor",
      title: "Best for",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "performance",
      title: "Performance",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "fabric", subtitle: "bestFor" },
  },
});
