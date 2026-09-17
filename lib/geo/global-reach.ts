// lib/geo/global-reach.ts
// Visual route params for the homepage "Global Reach" section
// (components/sections/GlobalReach.tsx): per-route curve bow, ship
// timing, and arrival-label offset. Geographic facts (Sialkot + the 8
// destinations' lon/lat) live in lib/geo/markets.ts; this module adds
// the layout/animation tuning on top and projects everything via
// lib/geo/projection.ts.
//
// Bow direction (owner feedback, 2026-09-17): the original build gave
// each route in the Germany/France/UK and Canada/US/Mexico clusters an
// alternating-sign bow (a "scattered" look for well-separated routes),
// but for destinations this close together it makes curves cross each
// other near Sialkot instead of fanning cleanly. Each cluster now uses a
// single consistent bow sign with graduated magnitude instead -- nested
// arcs that stay visually parallel rather than crossing. Brazil and
// Australia are far enough from every other destination that their
// original independent bow signs carry no crossing risk and are
// unchanged.
//
// Node "dodge" (owner feedback, 2026-09-17, second pass): even after
// recropping the projection tighter, Germany/France/UK's real
// coordinates still project only ~12-14px apart in the section's
// viewBox -- closer together than the arrival-ring animation's own max
// 30px radius, so their rings/ship icons/"RECEIVED" labels are
// physically guaranteed to collide at that true-geography distance, no
// amount of curve/label tuning fixes that on its own. `nodeOffset` nudges
// just these 6 clustered destinations' rendered anchor point apart by a
// modest, hand-tuned amount (~30-40px, well under 12 degrees at this
// projection's scale) -- the same "dodge nearby markers" technique any
// geo-labeling library uses for a cluttered point map. The route curve,
// ship destination, and arrival delight all key off this same dodged
// point, so line/ship/label stay visually consistent with each other;
// only the isolated Brazil/Australia/Sialkot points render at their true
// projected coordinates (no collision risk, no dodge needed).
import { MARKETS, SIALKOT } from "./markets";
import { projectPoint } from "./projection";

export type GlobalReachDestination = {
  code: string;
  name: string;
  lon: number;
  lat: number;
  /** Perpendicular bow offset (px) applied to the route's curve control point. Sign sets direction, magnitude sets how pronounced the arc reads. */
  bow: number;
  /** Ship loop duration (seconds) -- roughly scaled by real distance from Sialkot, 4.5s (closest) to 7s (farthest, Brazil). */
  duration: number;
  /** Stagger (seconds) before this route's draw-in animation starts. */
  drawDelay: number;
  /** Manual pixel dodge applied to this destination's projected point -- see the module header comment. `{dx: 0, dy: 0}` for isolated destinations. */
  nodeOffset: { dx: number; dy: number };
  /**
   * Arrival-delight label/mark offset (px) from the destination node,
   * hand-tuned per cluster member so two nearby nodes' "RECEIVED" labels
   * never land in the same place even if their arrival cycles overlap in
   * time. Isolated destinations (Brazil, Australia) keep a small default
   * offset with no collision risk.
   */
  labelOffset: { dx: number; dy: number };
};

const MARKET_VISUALS: Record<string, Omit<GlobalReachDestination, "code" | "name" | "lon" | "lat">> = {
  de: { bow: -30, duration: 4.5, drawDelay: 0, nodeOffset: { dx: 40, dy: 8 }, labelOffset: { dx: 16, dy: -12 } },
  fr: { bow: -45, duration: 4.6, drawDelay: 0.15, nodeOffset: { dx: -5, dy: 45 }, labelOffset: { dx: 16, dy: 16 } },
  uk: { bow: -60, duration: 4.7, drawDelay: 0.3, nodeOffset: { dx: -35, dy: -28 }, labelOffset: { dx: 16, dy: -16 } },
  ca: { bow: -70, duration: 6, drawDelay: 0.45, nodeOffset: { dx: -15, dy: -20 }, labelOffset: { dx: -16, dy: -14 } },
  us: { bow: -95, duration: 5.6, drawDelay: 0.6, nodeOffset: { dx: 25, dy: 10 }, labelOffset: { dx: -16, dy: 16 } },
  mx: { bow: -120, duration: 6.2, drawDelay: 0.75, nodeOffset: { dx: -20, dy: 25 }, labelOffset: { dx: 16, dy: 16 } },
  br: { bow: 65, duration: 7, drawDelay: 0.9, nodeOffset: { dx: 0, dy: 0 }, labelOffset: { dx: 16, dy: -12 } },
  au: { bow: -50, duration: 6.5, drawDelay: 1.05, nodeOffset: { dx: 0, dy: 0 }, labelOffset: { dx: 16, dy: -12 } },
};

// Order matches the locked legend order in content/capriosports/home.ts.
export const GLOBAL_REACH_DESTINATIONS: GlobalReachDestination[] = MARKETS.map((market) => ({
  ...market,
  ...MARKET_VISUALS[market.code],
}));

const DRAW_DURATION = 1.8;
/** Flow layer fades in once its route's draw-in finishes; ships reveal at the same moment. */
const FLOW_FADE_DELAY_PAD = 0.1;

export type GlobalReachRoute = GlobalReachDestination & {
  origin: { x: number; y: number };
  point: { x: number; y: number };
  control: { x: number; y: number };
  pathId: string;
  pathData: string;
  flowDelay: number;
  shipBegin: number;
};

export function getGlobalReachRoutes(): GlobalReachRoute[] {
  const origin = projectPoint(SIALKOT.lon, SIALKOT.lat);

  return GLOBAL_REACH_DESTINATIONS.map((destination) => {
    const projected = projectPoint(destination.lon, destination.lat);
    const point = {
      x: projected.x + destination.nodeOffset.dx,
      y: projected.y + destination.nodeOffset.dy,
    };

    const midX = (origin.x + point.x) / 2;
    const midY = (origin.y + point.y) / 2;
    const dx = point.x - origin.x;
    const dy = point.y - origin.y;
    const length = Math.hypot(dx, dy) || 1;
    // Unit vector perpendicular to the Sialkot->destination line.
    const nx = -dy / length;
    const ny = dx / length;

    const control = {
      x: midX + nx * destination.bow,
      y: midY + ny * destination.bow,
    };

    const pathData = `M${origin.x},${origin.y} Q${control.x},${control.y} ${point.x},${point.y}`;
    const flowDelay = destination.drawDelay + DRAW_DURATION;

    return {
      ...destination,
      origin,
      point,
      control,
      pathId: `gr-route-${destination.code}`,
      pathData,
      flowDelay,
      shipBegin: flowDelay + FLOW_FADE_DELAY_PAD,
    };
  });
}

export const GLOBAL_REACH_DRAW_DURATION = DRAW_DURATION;
