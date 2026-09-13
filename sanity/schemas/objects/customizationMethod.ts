import { defineField, defineType } from "sanity";

export default defineType({
  name: "customizationMethod",
  title: "Customization method",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
