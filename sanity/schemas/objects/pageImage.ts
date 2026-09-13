// sanity/schemas/objects/pageImage.ts
// Reused everywhere an image needs alt text. alt is required by validation
// so an image cannot be saved without it.
import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "asset",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image, keyword aware. Never leave this generic like image1.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "alt", media: "asset" },
  },
});
