// components/JsonLd.tsx
// Renders a single schema.org JSON-LD <script> tag. `data` always comes
// from lib/schema.ts's builder functions -- this component has no
// knowledge of schema shape, it only serializes what it's given.
export type JsonLdProps = {
  data: object;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
