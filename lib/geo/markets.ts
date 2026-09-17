// lib/geo/markets.ts
// Plain geographic facts for the homepage "Global Reach" section --
// Sialkot's origin coordinates and each of the 8 destination markets'
// lon/lat (owner brief, never hand-placed). Kept separate from
// lib/geo/global-reach.ts's own visual params (bow, duration, label
// offsets) so lib/geo/projection.ts can import just the coordinates to
// compute a real content bounding box, without a circular import between
// projection.ts and global-reach.ts.
export const SIALKOT = { lon: 74.5, lat: 32.5 };

export type Market = {
  code: string;
  name: string;
  lon: number;
  lat: number;
};

// Order matches the locked legend order in content/capriosports/home.ts.
export const MARKETS: Market[] = [
  { code: "de", name: "Germany", lon: 10, lat: 51 },
  { code: "fr", name: "France", lon: 2, lat: 46 },
  { code: "uk", name: "United Kingdom", lon: -2, lat: 54 },
  { code: "ca", name: "Canada", lon: -95, lat: 58 },
  { code: "us", name: "United States", lon: -74, lat: 40.7 },
  { code: "mx", name: "Mexico", lon: -99.1, lat: 19.4 },
  { code: "br", name: "Brazil", lon: -47.9, lat: -15.8 },
  { code: "au", name: "Australia", lon: 149.1, lat: -35.3 },
];
