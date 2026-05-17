import type { Point } from './types'

const API_BASE = import.meta.env.VITE_API_BASE ?? ''

/** Fetch the full points dataset. Cheap — single KV blob, edge-cached. */
export async function fetchPoints(): Promise<Point[]> {
  const res = await fetch(`${API_BASE}/api/points`)
  if (!res.ok) throw new Error(`Failed to load points: ${res.status}`)
  return res.json()
}

export async function fetchPoint(id: string): Promise<Point | null> {
  const res = await fetch(`${API_BASE}/api/points/${encodeURIComponent(id)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to load point: ${res.status}`)
  return res.json()
}

export async function submitSuggestion(payload: {
  name: string
  address: string
  county?: string
  notes?: string
  submitter_email?: string
}): Promise<{ ok: true; id: string }> {
  const res = await fetch(`${API_BASE}/api/suggest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Submission failed: ${res.status}`)
  return res.json()
}
