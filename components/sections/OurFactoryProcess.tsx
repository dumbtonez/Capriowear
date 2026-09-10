// components/sections/OurFactoryProcess.tsx
// /our-factory page, section 5, "the Journey section" -- Figma desktop
// node 857:2090 ("Content"), "What We Make": intro heading, then 7 process
// stations in the real Figma row pairing (owner's SEO/AEO/GEO pass,
// 2026-09-08 -- see content/our-factory.ts's own `process` comment for the
// full reordering rationale, including a since-removed 8th "breather"
// image that read as a stray extra box against the real design).
//
// Heading levels (owner brief, 2026-09-08, do not skip levels):
//   - Section intro = <h2> ("From fabric to shipped, in one building").
//   - Each station's own headline = <h3> (e.g. "Cut and sewn, seam by
//     seam"). The "01 Fabric" step number + name above it is an eyebrow
//     label, a <p>, never a heading -- it does not participate in the
//     h2 -> h3 outline at all.
//
// Crawlable copy: every station's headline + body renders as real text in
// the initial markup (no JS-injected content) -- TextReveal/RevealBox
// below only toggle a CSS class post-hydration for the fade/rise entrance,
// the words themselves are already in the server-rendered HTML either way.
//
// Images use ParallaxMedia (components/ParallaxMedia.tsx), a one-time
// zoom-and-settle reveal (owner brief: "parallax animation ... as shown"
// on wmf-coffeemachines.com's "For full taste, in a fast pace" gallery --
// see that component's own header comment for how its reference DOM was
// inspected to confirm this is what that site actually does) -- enhancement
// only: the sitewide reduced-motion rule collapses the transition while the
// image and its alt text stay exactly as they are, and next/image's own
// default lazy-loading (no `priority` set anywhere here) already defers
// every one of these below-the-fold images. Real alt text on all 7 images
// comes straight from content, never generic ("image1"-style) or empty.
//
// Station text blocks are plain, static markup -- no reveal/rise motion
// (owner, 2026-09-08: "no need to add the text level moving animation"),
// deliberately unlike Hero/OurFactoryIntro. Only the images animate here.
//
// Desktop-only layout for now (owner: desktop ready, mobile handled
// separately, keep it responsive-safe) -- see `ourFactoryProcess` in
// components/ui/styles.ts for the exact spacing notes and the mobile
// fallback (single stacked column, each item's fixed width dropping to
// `w-full`).
import { Eyebrow } from "@/components/Eyebrow";
import { ParallaxMedia } from "@/components/ParallaxMedia";
import { TextReveal } from "@/components/TextReveal";
import { ourFactoryProcess } from "@/components/ui/styles";
import type { ourFactory } from "@/content/our-factory";

export type OurFactoryProcessProps = {
  content: typeof ourFactory.process;
};

type ProcessRow = (typeof ourFactory.process)["rows"][number];
type ProcessItem = ProcessRow["items"][number];

function Item({ item }: { item: ProcessItem }) {
  return (
    <div className={`${ourFactoryProcess.item} ${ourFactoryProcess.itemWidth[item.width]}`}>
      <ParallaxMedia
        label={item.imageAlt}
        image={item.image}
        ratio={item.ratio}
        showLabel={false}
        className={ourFactoryProcess.itemMediaMobile}
      />
      <div className={ourFactoryProcess.textCol}>
        <div className={ourFactoryProcess.labelGroup}>
          <p className={ourFactoryProcess.label}>
            {item.number} {item.name}
          </p>
          <h3 className={ourFactoryProcess.title}>{item.title}</h3>
        </div>
        <p className={ourFactoryProcess.body}>{item.body}</p>
      </div>
    </div>
  );
}

function Row({ row }: { row: ProcessRow }) {
  return (
    <div className={ourFactoryProcess.row}>
      {row.items.map((item) => (
        <Item key={item.number} item={item} />
      ))}
    </div>
  );
}

export function OurFactoryProcess({ content }: OurFactoryProcessProps) {
  return (
    <section className={ourFactoryProcess.section}>
      <div className={ourFactoryProcess.inner}>
        <div className={ourFactoryProcess.headingRowGroup}>
          <div className={ourFactoryProcess.headingGroup}>
            <Eyebrow tone="light">
              {content.eyebrow}
            </Eyebrow>
            <TextReveal as="h2" text={content.heading} className="text-h1 text-text" />
          </div>
          <Row row={content.rows[0]} />
        </div>

        {content.rows.slice(1).map((row, rowIndex) => (
          <Row key={rowIndex} row={row} />
        ))}
      </div>
    </section>
  );
}
