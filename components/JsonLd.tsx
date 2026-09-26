// components/JsonLd.tsx
// Renders a single schema.org JSON-LD <script> tag. `data` always comes
// from lib/schema.ts's builder functions -- this component has no
// knowledge of schema shape, it only serializes what it's given.
export type JsonLdProps = {
  data: object;
};

// `<` is escaped as \u003c (audit 2026-09, C-12): a string containing
// "</script>" would otherwise close this tag and inject HTML. Harmless while
// every value is repo-authored, required once Sanity text flows in. JSON
// parsers read \u003c back as "<", so the structured data is unchanged.
// U+2028/U+2029 are escaped too (valid in JSON, line breaks in JS).
function serialize(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
