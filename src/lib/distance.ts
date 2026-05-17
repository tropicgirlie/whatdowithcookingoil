import type { Point, PointWithDistance } from './types'

const EARTH_RADIUS_M = 6_371_000

/** Great-circle distance in metres between two lat/lng pairs. */
export function haversine(
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number,
): number {
  const toRad = (d: number) => (d * Math.PI) / 180
  const φ1 = toRad(aLat)
  const φ2 = toRad(bLat)
  const Δφ = toRad(bLat - aLat)
  const Δλ = toRad(bLng - aLng)
  const h =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h))
}

/**
 * Sort points by distance from the reference location and (optionally) cap by
 * radius. Always returns the closest N anyway when nothing is within radius —
 * never produce an empty list when there's data in the dataset (filter-empty-
 * state policy).
 */
export function rankByDistance(
  points: Point[],
  lat: number,
  lng: number,
  opts: { radiusMeters?: number; minResults?: number } = {},
): PointWithDistance[] {
  const ranked: PointWithDistance[] = points.map(p => ({
    ...p,
    distance_m: haversine(lat, lng, p.lat, p.lng),
  }))
  ranked.sort((a, b) => a.distance_m - b.distance_m)

  if (opts.radiusMeters) {
    const within = ranked.filter(p => p.distance_m <= opts.radiusMeters!)
    const minResults = opts.minResults ?? 5
    if (within.length >= minResults) return within
    // Soft-match fallback: return at least minResults nearest, even past radius.
    return ranked.slice(0, minResults)
  }

  return ranked
}

/** Format metres as a short user-facing string. */
export function formatDistance(metres: number): string {
  if (metres < 1000) return `${Math.round(metres)} m`
  if (metres < 10_000) return `${(metres / 1000).toFixed(1)} km`
  return `${Math.round(metres / 1000)} km`
}
