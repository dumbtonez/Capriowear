// sanity/structure.ts
// Desk order: Site Settings (singleton) first, then Categories grouped by
// group (activewear, teamwear), then Styles grouped by their category.
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      S.divider(),

      S.listItem()
        .title("Categories")
        .child(
          S.list()
            .title("Categories")
            .items([
              S.listItem()
                .title("Activewear")
                .child(
                  S.documentList()
                    .title("Activewear categories")
                    .schemaType("category")
                    .filter('_type == "category" && group == $group')
                    .params({ group: "activewear" }),
                ),
              S.listItem()
                .title("Teamwear")
                .child(
                  S.documentList()
                    .title("Teamwear categories")
                    .schemaType("category")
                    .filter('_type == "category" && group == $group')
                    .params({ group: "teamwear" }),
                ),
            ]),
        ),

      S.listItem()
        .title("Styles")
        .child(async (id, context) => {
          const client = context.structureContext.getClient({ apiVersion: "2025-01-01" });
          const categories: { _id: string; title: string }[] = await client.fetch(
            '*[_type == "category"] | order(group asc, sortOrder asc, title asc){_id, title}',
          );

          return S.list()
            .title("Styles by category")
            .items(
              categories.map((category) =>
                S.listItem()
                  .title(category.title)
                  .child(
                    S.documentList()
                      .title(category.title)
                      .schemaType("style")
                      .filter('_type == "style" && category._ref == $categoryId')
                      .params({ categoryId: category._id }),
                  ),
              ),
            );
        }),

      S.divider(),

      // Everything else (any future document type), same default list Sanity
      // ships, minus the two document types already surfaced above.
      ...S.documentTypeListItems().filter(
        (listItem) => !["category", "style", "siteSettings"].includes(listItem.getId() ?? ""),
      ),
    ]);
