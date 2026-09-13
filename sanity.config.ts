// sanity.config.ts
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "Capriowear",

  projectId: projectId || "",
  dataset,

  basePath: "/studio",

  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,

    templates: (templates) =>
      templates.filter((template) => template.schemaType !== "siteSettings"),
  },

  document: {
    // siteSettings is a true singleton: no duplicate, no delete, no create
    // (the one document is provisioned once, edited forever after).
    actions: (input, context) =>
      context.schemaType === "siteSettings"
        ? input.filter(({ action }) => action && !["delete", "duplicate", "unpublish"].includes(action))
        : input,
  },
});
