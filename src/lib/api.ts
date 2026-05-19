import type { Point } from './types'
import seedPoints from '@/../data/points.v1.json'

/**
 * Read-only data layer for the static build.
 *
 * For v0.1 OilCycle ships as a pure static site: points come from the bundled
 * data/points.v1.json. No backend. When/if a Worker is added later, swap these
 * implementations to fetch from `/api/points` first and fall back to the seed.
 *
 * Submissions go through a mailto on /suggest, so there's no submit endpoint
 * to wire up yet.
 */

export async function fetchPoints(): Promise<Point[]> {
  return seedPoints as Point[]
}

export async function fetchPoint(id: string): Promise<Point | null> {
  return (seedPoints as Point[]).find(p => p.id === id) ?? null
}
