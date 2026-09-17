// lib/geo/projection.ts
// Server-only geo projection for the homepage "Global Reach" section
// (components/sections/GlobalReach.tsx). Builds a single Mercator
// projection fit to the real content bounding box -- Sialkot plus all 8
// destination markets (lib/geo/markets.ts), with modest fixed-degree
// padding -- rather than a fixed world-sized window, so the map fills
// its panel instead of leaving a large empty band of open ocean/
// Antarctica below content that doesn't reach that far south. Projects
// the real `world-atlas` land-110m coastline data through the same
// projection. Runs at render time in a Server Component, so d3-geo/
// topojson-client never reach the client bundle -- only the resulting
// static SVG path/point data does.
//
// The viewBox height is derived from the frame's own true projected
// aspect ratio (below), not hand-picked -- see that ratio's own comment
// for why a fixed guessed height reintroduces letterboxing.
import { geoMercator, geoPath } from "d3-geo";
import type { GeometryCollection, Topology } from "topojson-specification";
import { feature } from "topojson-client";
import landTopology from "world-atlas/land-110m.json";

import { MARKETS, SIALKOT } from "./markets";

const FRAME_PADDING = 16;
// Modest fixed-degree padding around the real content bbox -- enough
// breathing room that no node sits at the very edge, not a window sized
// for a much larger, mostly-empty world view.
const LON_PADDING_DEG = 9;
const LAT_PADDING_DEG = 6;

const contentLons = [SIALKOT.lon, ...MARKETS.map((m) => m.lon)];
const contentLats = [SIALKOT.lat, ...MARKETS.map((m) => m.lat)];

const FRAME_BOUNDS = {
  west: Math.min(...contentLons) - LON_PADDING_DEG,
  east: Math.max(...contentLons) + LON_PADDING_DEG,
  north: Math.max(...contentLats) + LAT_PADDING_DEG,
  south: Math.min(...contentLats) - LAT_PADDING_DEG,
};

// GeoJSON's right-hand rule requires an exterior ring to wind
// counter-clockwise (west,south -> east,south -> east,north -> west,north
// -> close). An earlier version of this file wound it the other way
// (north -> east -> south -> west), which is backwards -- d3's
// antimeridian preclip then treated the polygon as its complement (the
// rest of the sphere) for `fitExtent`'s own internal `path.bounds()`
// call, silently fitting the WRONG region. The visible symptom (found by
// the owner, confirmed with a temporary debug rect compared against the
// rendered land path's real `getBBox()`) was the projected content
// filling only ~40% of the viewBox's width while filling ~100% of its
// height: `fitExtent` had picked a scale/translate sized for a
// differently-shaped (near-square) region instead of this frame's real,
// much wider one.
const framePolygon = {
  type: "Polygon" as const,
  coordinates: [
    [
      [FRAME_BOUNDS.west, FRAME_BOUNDS.south],
      [FRAME_BOUNDS.east, FRAME_BOUNDS.south],
      [FRAME_BOUNDS.east, FRAME_BOUNDS.north],
      [FRAME_BOUNDS.west, FRAME_BOUNDS.north],
      [FRAME_BOUNDS.west, FRAME_BOUNDS.south],
    ],
  ],
};

// The frame's true projected aspect ratio, measured by directly
// projecting its 4 corners through an unscaled Mercator projection
// (immune to the winding/preclip issue above, since a bare point
// projection does no polygon clipping at all) -- not approximated from
// raw lon/lat degree spans, which is a materially different (and wrong)
// number under Mercator's non-linear latitude scaling. The viewBox
// height is derived from this ratio (fixed width 1000) so `fitExtent`'s
// single uniform scale fills both axes with no leftover margin on
// either side, by construction, rather than a separately hand-picked
// height that happens to approximately match.
const measuringProjection = geoMercator().scale(1).translate([0, 0]);
const frameCorners = framePolygon.coordinates[0]
  .slice(0, 4)
  .map(([lon, lat]) => measuringProjection([lon, lat]) as [number, number]);
const frameRawWidth = Math.max(...frameCorners.map((c) => c[0])) - Math.min(...frameCorners.map((c) => c[0]));
const frameRawHeight = Math.max(...frameCorners.map((c) => c[1])) - Math.min(...frameCorners.map((c) => c[1]));
const FRAME_ASPECT = frameRawWidth / frameRawHeight;

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = Math.round((VIEWBOX_WIDTH - 2 * FRAME_PADDING) / FRAME_ASPECT + 2 * FRAME_PADDING);

export const GLOBAL_REACH_VIEWBOX = { width: VIEWBOX_WIDTH, height: VIEWBOX_HEIGHT } as const;

const projection = geoMercator().fitExtent(
  [
    [FRAME_PADDING, FRAME_PADDING],
    [GLOBAL_REACH_VIEWBOX.width - FRAME_PADDING, GLOBAL_REACH_VIEWBOX.height - FRAME_PADDING],
  ],
  framePolygon,
);

const path = geoPath(projection);

/** Projects a [lon, lat] pair to `{x, y}` in the section's SVG viewBox. */
export function projectPoint(lon: number, lat: number): { x: number; y: number } {
  const projected = projection([lon, lat]);
  if (!projected) {
    throw new Error(`Point [${lon}, ${lat}] could not be projected`);
  }
  return { x: projected[0], y: projected[1] };
}

/** A single `<path>` `d` string covering every landmass in the frame. */
export function getLandPathData(): string {
  const topology = landTopology as unknown as Topology;
  const land = feature(topology, topology.objects.land as GeometryCollection);
  return path(land) ?? "";
}
