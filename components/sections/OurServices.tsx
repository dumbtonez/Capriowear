// components/sections/OurServices.tsx
// Homepage section 11. Figma: desktop node 415:5449, mobile node 415:5484.
//
// Desktop: the eyebrow+heading stay fixed 56px from the top while the 5
// service cards scroll past on the right -- a plain CSS sticky sidebar
// (`ourServices.desktopSticky`), not a scroll listener. The right column's
// own stacked height is taller than the viewport, so the sticky column
// naturally stays pinned until the right column's bottom edge passes it.
//
// Mobile: a 5-card swipeable slider (native CSS scroll-snap, same technique
// as InsideFactory's carousel) with a dot-per-card pagination row. The dot
// count is 5 (one per real card), not the 4-dot static graphic Figma
// exports for this frame -- that asset is a generic placeholder, mismatched
// against this section's real item count.
//
// content/home.ts's `services.items` copy is reused as-is, not replaced with
// Figma's own placeholder body text (which even has two bodies that read
// swapped between two cards) -- the copy file is this project's copy source
// of truth, Figma is layout/spacing only here.
//
// Mobile carousel + dots is the shared CardCarousel (components/CardCarousel.tsx),
// also used by How It Works -- this file needs no client directive itself.
//
// Reused on /services (owner, 2026-09-07: "use as is, just check the
// spacing from the top in this page and use it") -- same cards, same
// copy, only the outer top/bottom spacing changes per page (Figma node
// 729:208 on Services: 160px/80px vs homepage's own 120px/120px). `pageVariant`
// picks between the two pre-built spacing recipes in `ourServices`; nothing
// else about the section differs between pages.
import { CapabilityCard } from "@/components/Card";
import { CardCarousel } from "@/components/CardCarousel";
import { SectionHeading } from "@/components/SectionHeading";
import { ourServices } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type OurServicesProps = {
  content: typeof home.services;
  pageVariant?: "home" | "services";
};

export function OurServices({ content, pageVariant = "home" }: OurServicesProps) {
  const desktopSection = pageVariant === "services" ? ourServices.desktopSectionServices : ourServices.desktopSection;
  const mobileSection = pageVariant === "services" ? ourServices.mobileSectionServices : ourServices.mobileSection;
  const eyebrowSize = pageVariant === "services" ? ourServices.eyebrowSizeServices : undefined;

  return (
    <section>
      {/* Desktop: sticky heading, scrolling card list */}
      <div className={desktopSection}>
        <div className={ourServices.desktopSticky}>
          <SectionHeading
            eyebrow={content.eyebrow}
            heading={content.h2}
            eyebrowTone="light"
            eyebrowSize={eyebrowSize}
            headingClassName={ourServices.desktopHeadingWidth}
          />
        </div>
        <div className={ourServices.desktopList}>
          {content.items.map((item) => (
            <div key={item.title} className={ourServices.desktopCardWidth}>
              <CapabilityCard
                title={item.title}
                body={item.body}
                mediaAspectClassName={ourServices.cardMediaRatio}
                mediaRadius="none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: centred heading, swipeable card slider */}
      <div className={mobileSection}>
        <SectionHeading
          eyebrow={content.eyebrow}
          heading={content.h2}
          eyebrowTone="light"
          eyebrowSize={eyebrowSize}
          headingClassName={ourServices.mobileHeadingWidth}
          align="center"
        />
        <CardCarousel items={content.items} cardMediaRatio={ourServices.cardMediaRatio} />
      </div>
    </section>
  );
}
