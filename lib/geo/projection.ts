// lib/geo/projection.ts
// Server-only geo projection for the homepage "Global Reach" section
// (components/sections/GlobalReach.tsx). Builds a single Mercator
// projection fit to the real content bounding box -- Sialkot plus all 8
// destination markets (lib/geo/markets.ts), with modest fixed-degree
// padding -- rather than a fixed world-sized window, so the map fills
// its panel instead of leaving a large empty band of open ocean/
// Antarctica below content that doesn't reach that far south (owner
// feedback, 2026-09-17: the original fixed lon -140..160/lat -45..78
// window left most of the bottom of the canvas empty). Projects the
// real `world-atlas` land-110m coastline data through the same
// projection. Runs at render time in a Server Component, so d3-geo/
// topojson-client never reach the client bundle -- only the resulting
// static SVG path/point data does.
import { geoMercator, geoPath } from "d3-geo";
import type { GeometryCollection, Topology } from "topojson-specification";
import { feature } from "topojson-client";
import landTopology from "world-atlas/land-110m.json";

import { MARKETS, SIALKOT } from "./markets";

// 1000x415 -- re-tuned to the tightened content bounding box's own aspect
// ratio (~2.53:1, third pass) so the map fills the panel rather than
// leaving vertical letterboxing.
export const GLOBAL_REACH_VIEWBOX = { width: 1000, height: 415 } as const;

const FRAME_PADDING = 16;
// Modest fixed-degree padding around the real content bbox -- enough
// breathing room that no node sits at the very edge, not a window sized
// for a much larger, mostly-empty world view. Tightened again (owner
// feedback, 2026-09-17, third pass: the map still read as small/flat
// with avoidable empty margin at the frame edges) from 14/10 to 9/6.
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

const projection = geoMercator().fitExtent(
  [
    [FRAME_PADDING, FRAME_PADDING],
    [GLOBAL_REACH_VIEWBOX.width - FRAME_PADDING, GLOBAL_REACH_VIEWBOX.height - FRAME_PADDING],
  ],
  {
    type: "Polygon",
    coordinates: [
      [
        [FRAME_BOUNDS.west, FRAME_BOUNDS.north],
        [FRAME_BOUNDS.east, FRAME_BOUNDS.north],
        [FRAME_BOUNDS.east, FRAME_BOUNDS.south],
        [FRAME_BOUNDS.west, FRAME_BOUNDS.south],
        [FRAME_BOUNDS.west, FRAME_BOUNDS.north],
      ],
    ],
  },
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
