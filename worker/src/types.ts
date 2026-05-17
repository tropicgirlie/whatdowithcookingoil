/** Mirrors src/lib/types.ts on the frontend. Keep in sync. */

export type PointKind = 'civic' | 'bring_bank' | 'commercial' | 'community'
export type PointFee = 'free' | 'paid' | 'unknown'
export type PointSource = 'mywaste' | 'osm' | 'council' | 'commercial' | 'user'

export interface Point {
  id: string
  name: string
  kind: PointKind
  address: string
  county: string
  eircode?: string
  lat: number
  lng: number
  accepts_oil: boolean
  accepts_household_quantity: boolean
  max_litres?: number
  fee: PointFee
  fee_notes?: string
  hours?: Record<string, string> | { by_appointment: true }
  phone?: string
  website?: string
  notes?: string
  source: PointSource
  source_url?: string
  last_verified_at?: string
  photo_url?: string
}

export interface PendingSubmission {
  id: string
  payload: Partial<Point>
  submitter_email?: string
  status: 'pending' | 'approved' | 'rejected' | 'merged'
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
}

export type Bindings = {
  OILCYCLE: KVNamespace
  FRONTEND_URL?: string
  ADMIN_PASSWORD?: string
}
