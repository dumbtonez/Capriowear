// sanity/schemas/objects/videoClip.ts
// The video player is not built yet. Filling this in will not make a video
// appear.
import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoClip",
  title: "Video clip",
  type: "object",
  description: "The video player is not built yet. Filling this in will not make a video appear.",
  fields: [
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      options: { list: ["bunny"] },
      initialValue: "bunny",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "videoId",
      title: "Video ID",
      type: "string",
    }),
    defineField({
      name: "posterImage",
      title: "Poster image",
      type: "pageImage",
    }),
    defineField({
      name: "durationSeconds",
      title: "Duration, seconds",
      type: "number",
    }),
    defineField({
      name: "placement",
      title: "Placement",
      type: "string",
      options: { list: ["card", "pdp", "both"] },
    }),
  ],
});
