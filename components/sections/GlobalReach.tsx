// components/sections/GlobalReach.tsx
// "Global Reach" -- animated shipping-routes map, the homepage section
// directly between Our Services and Why Caprio (see app/page.tsx's own
// placement comment): the direct visual follow-through on Our Services'
// "Logistics and Fulfillment: Worldwide shipping, DDP, from Sialkot,
// Pakistan" bullet. Visual direction ported from the owner-approved
// prototype, docs/audits/shipping-routes-reference.html (route draw-in,
// flowing dash, ship motion-path, arrival-delight technique) -- rebuilt
// with real `d3-geo`/`topojson-client`/`world-atlas` land data instead of
// the prototype's own fixed-pixel path, since this section computes its
// own projection (lib/geo/projection.ts) rather than hardcoding one.
//
// A Server Component: the land path and every route's projected
// coordinates/curve are computed here at render time (lib/geo/*), so
// d3-geo/topojson-client never reach the client bundle -- only the
// resulting static SVG markup does. `GlobalReachStage` (client) is the
// only JS this section ships, gating every animation behind a scroll-
// into-view class.
//
// Typography: Figtree only, the site's existing type system (owner
// decision, 2026-09-17) -- the prototype's Big Shoulders Display/IBM
// Plex fonts were its own placeholder direction, not adopted.
import { GlobalReachStage } from "@/components/GlobalReachStage";
import { SectionHeading } from "@/components/SectionHeading";
import { globalReach } from "@/components/ui/styles";
import type { capriosportsHome } from "@/content/capriosports/home";
import { getGlobalReachRoutes } from "@/lib/geo/global-reach";
import { SIALKOT } from "@/lib/geo/markets";
import { getLandPathData, GLOBAL_REACH_VIEWBOX, projectPoint } from "@/lib/geo/projection";

export type GlobalReachProps = {
  content: typeof capriosportsHome.globalReach;
};

export function GlobalReach({ content }: GlobalReachProps) {
  const routes = getGlobalReachRoutes();
  const origin = projectPoint(SIALKOT.lon, SIALKOT.lat);
  const landPath = getLandPathData();
  const { width, height } = GLOBAL_REACH_VIEWBOX;

  const ariaLabel = `Animated map showing shipping routes from Sialkot, Pakistan to ${routes
    .map((route) => route.name)
    .join(", ")
    .replace(/, ([^,]*)$/, ", and $1")}`;

  return (
    <div className={globalReach.sectionDarkBg}>
      <section className={globalReach.section}>
        <div className={globalReach.textGroup}>
          <div className={globalReach.headingGap}>
            <SectionHeading eyebrow={content.eyebrow} heading={content.h2} eyebrowTone="dark" />
          </div>
          <p className={globalReach.lead}>{content.lead}</p>
        </div>

        <GlobalReachStage className={globalReach.stage}>
          <svg
            className={globalReach.map}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={ariaLabel}
          >
            <defs>
              <linearGradient id="gr-land-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="color-mix(in srgb, var(--color-steel) 70%, white)" />
                <stop offset="100%" stopColor="color-mix(in srgb, var(--color-steel) 55%, black)" />
              </linearGradient>
              <radialGradient id="gr-origin-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-copper)" stopOpacity="0.32" />
                <stop offset="100%" stopColor="var(--color-copper)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="gr-hull-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="55%" stopColor="#eef1f3" />
                <stop offset="100%" stopColor="#a9b5bd" />
              </linearGradient>
              <linearGradient id="gr-cabin-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#c3cbd1" />
              </linearGradient>
              <radialGradient id="gr-ship-shadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="gr-wake-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#eef1f3" stopOpacity="0" />
                <stop offset="100%" stopColor="#eef1f3" stopOpacity="0.55" />
              </linearGradient>

              {/* Ship icon, centered on its own anchor point so the route
                  line runs through the hull's middle, not one edge --
                  the prototype's own real bug, verified fixed by eye. */}
              <symbol id="gr-ship-icon" overflow="visible">
                <ellipse cx="-2" cy="6" rx="12" ry="2.4" fill="url(#gr-ship-shadow)" />
                <path
                  d="M-12,-3 L8,-3 L14,0 L8,3 L-12,3 Z"
                  fill="url(#gr-hull-gradient)"
                  stroke="rgba(11,15,20,.45)"
                  strokeWidth={0.5}
                />
                <path d="M-12,-3 L8,-3 L14,0 L-12,0 Z" fill="#ffffff" opacity={0.14} />
                <path
                  d="M-10.5,-3 L-10.5,-7.6 L-3,-7.6 L-3,-3 Z"
                  fill="url(#gr-cabin-gradient)"
                  stroke="rgba(11,15,20,.4)"
                  strokeWidth={0.4}
                />
                <path d="M-10.5,-3 L-10.5,-7.6 L-6.7,-7.6 L-6.7,-3 Z" fill="#ffffff" opacity={0.13} />
                <rect x={-9.3} y={-6.7} width={1.5} height={1.3} fill="#dfeaee" opacity={0.85} />
                <rect x={-6.9} y={-6.7} width={1.5} height={1.3} fill="#dfeaee" opacity={0.85} />
                <rect
                  x={-1.2}
                  y={-5.1}
                  width={2.7}
                  height={2.1}
                  fill="var(--color-copper-dim)"
                  stroke="rgba(11,15,20,.35)"
                  strokeWidth={0.3}
                />
                <rect
                  x={1.8}
                  y={-5.6}
                  width={2.7}
                  height={2.6}
                  fill="var(--color-copper)"
                  stroke="rgba(11,15,20,.35)"
                  strokeWidth={0.3}
                />
                <rect
                  x={4.8}
                  y={-5.1}
                  width={2.4}
                  height={2.1}
                  fill="var(--color-copper-dim)"
                  stroke="rgba(11,15,20,.35)"
                  strokeWidth={0.3}
                />
              </symbol>
            </defs>

            <g>
              <path d={landPath} fill="url(#gr-land-gradient)" stroke="rgba(11,15,20,.55)" strokeWidth={0.6} strokeLinejoin="round" />
              <circle cx={origin.x} cy={origin.y} r={120} fill="url(#gr-origin-glow)" />
            </g>

            <g>
              {routes.map((route) => (
                <path key={route.pathId} id={route.pathId} className="gr-route-line" d={route.pathData} style={{ animationDelay: `${route.drawDelay}s` }} />
              ))}
              {routes.map((route) => (
                <path key={`${route.pathId}-flow`} className="gr-route-flow" d={route.pathData} style={{ animationDelay: `${route.flowDelay}s, ${route.flowDelay}s` }} />
              ))}
            </g>

            <g>
              {routes.map((route) => (
                <g key={`${route.pathId}-ship`} className="gr-ship" transform="scale(1.15)" style={{ animationDelay: `${route.shipBegin}s` }}>
                  <path className="gr-ship-wake" d="M-13,1.6 C-24,2.6 -38,2.1 -54,0 C-38,-2.1 -24,-2.6 -13,-1.6 Z" />
                  <use href="#gr-ship-icon" />
                  <animateMotion dur={`${route.duration}s`} begin={`${route.shipBegin}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${route.pathId}`} />
                  </animateMotion>
                </g>
              ))}
            </g>

            <g>
              <circle cx={origin.x} cy={origin.y} r={5} fill="none" stroke="var(--color-copper)" className="gr-node-pulse" />
              <circle cx={origin.x} cy={origin.y} r={5} fill="var(--color-copper)" />
              {/* Backing scrim so a ship passing behind the origin label
                  (every route launches from this point) stays legible --
                  owner feedback, 2026-09-17. Offset further from the node
                  than before (16px, was 12px) to sit clearer of the
                  routes' shared launch point. */}
              <rect x={origin.x + 12} y={origin.y - 16} width={86} height={30} rx={4} fill="var(--color-ink)" opacity={0.72} />
              <text x={origin.x + 16} y={origin.y - 4} className={globalReach.originLabel}>
                SIALKOT, PK
              </text>
              <text x={origin.x + 16} y={origin.y + 10} className={globalReach.originLabelDim}>
                Origin
              </text>
            </g>

            {routes.map((route) => {
              const arriveDelay = route.shipBegin;
              // Arrival label/mark are nudged by this route's own
              // `labelOffset` (lib/geo/global-reach.ts) instead of a
              // fixed direction for every node, so cluster neighbors
              // (Germany/France/UK, Canada/US/Mexico) never land their
              // "RECEIVED" label or diamond mark in the same place, even
              // if their arrival cycles overlap in time. Text-anchor
              // flips with the offset's horizontal direction so the
              // label always reads away from the node, never off-canvas
              // toward it.
              const { dx, dy } = route.labelOffset;
              const markX = route.point.x + dx * 0.4;
              const markY = route.point.y + dy * 0.4 - 4;
              const labelX = route.point.x + dx;
              const labelY = route.point.y + dy;
              const anchor = dx < 0 ? "end" : "start";
              return (
                <g key={`${route.pathId}-node`}>
                  <circle cx={route.point.x} cy={route.point.y} r={3.5} fill="var(--color-paper)" />
                  <circle
                    cx={route.point.x}
                    cy={route.point.y}
                    r={4}
                    className="gr-arrive-ring"
                    style={{ animationDuration: `${route.duration}s`, animationDelay: `${arriveDelay}s` }}
                  />
                  <circle
                    cx={route.point.x}
                    cy={route.point.y}
                    r={4}
                    className="gr-arrive-ring gr-arrive-ring-echo"
                    style={{ animationDuration: `${route.duration}s`, animationDelay: `${arriveDelay}s` }}
                  />
                  <circle
                    cx={route.point.x}
                    cy={route.point.y}
                    r={3.5}
                    className="gr-arrive-flash"
                    style={{ animationDuration: `${route.duration}s`, animationDelay: `${arriveDelay}s` }}
                  />
                  <path
                    d={`M${markX},${markY - 3} L${markX + 3},${markY} L${markX},${markY + 3} L${markX - 3},${markY} Z`}
                    className="gr-arrive-mark"
                    style={{ animationDuration: `${route.duration}s`, animationDelay: `${arriveDelay}s` }}
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={anchor}
                    className="gr-arrive-label"
                    style={{ animationDuration: `${route.duration}s`, animationDelay: `${arriveDelay}s` }}
                  >
                    RECEIVED
                  </text>
                </g>
              );
            })}
          </svg>
        </GlobalReachStage>

        <div className={globalReach.legend}>
          {content.legend.map((name) => (
            <div key={name} className={globalReach.legendItem}>
              <span className={globalReach.legendSwatch} aria-hidden="true" />
              <span className={globalReach.legendName}>{name}</span>
            </div>
          ))}
        </div>

        <div className={globalReach.footline}>
          {content.stats.map((stat) => (
            <span key={stat.label} className={globalReach.footlineStat}>
              {stat.value ? <span className={globalReach.footlineStatValue}>{stat.value}</span> : null}
              {stat.value ? " " : ""}
              {stat.label}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
