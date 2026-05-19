/** Shared between the React app and the Worker. Keep in sync with worker/src/types.ts. */

export type PointKind = 'civic' | 'bring_bank' | 'commercial' | 'community'
export type PointFee = 'free' | 'paid' | 'unknown'
export type PointSource = 'mywaste' | 'osm' | 'council' | 'commercial' | 'user' | 'recyclenow'
export type PointConfidence =
  | 'phone_verified'
  | 'council_verified'
  | 'community_submitted'
  | 'unverified'

export type Country = 'IE' | 'UK'

export const COUNTRY_LABEL: Record<Country, string> = {
  IE: 'Ireland',
  UK: 'United Kingdom',
}

export const COUNTRY_FLAG: Record<Country, string> = {
  IE: '🇮🇪',
  UK: '🇬🇧',
}

export const COUNTRY_CENTRE: Record<Country, { lat: number; lng: number }> = {
  IE: { lat: 53.3498, lng: -6.2603 },
  UK: { lat: 51.5074, lng: -0.1278 },
}

export interface Point {
  id: string
  name: string
  kind: PointKind
  country: Country
  address: string
  county: string
  eircode?: string
  postcode?: string
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
  confidence: PointConfidence
}

export interface PointWithDistance extends Point {
  /** Metres from the user's reference location. */
  distance_m: number
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

export const KIND_LABEL: Record<PointKind, string> = {
  civic: 'Civic amenity site',
  bring_bank: 'Bring centre',
  commercial: 'Commercial collector',
  community: 'Community drop-off',
}

export const CONFIDENCE_LABEL: Record<PointConfidence, string> = {
  phone_verified: 'Phone-verified by us',
  council_verified: 'Verified by council page',
  community_submitted: 'Community submitted',
  unverified: 'Needs confirmation',
}

export const CONFIDENCE_DESCRIPTION: Record<PointConfidence, string> = {
  phone_verified: 'We called this site to confirm cooking-oil acceptance, fees and hours.',
  council_verified: 'Details taken from the official council page. Worth a quick call before travelling far.',
  community_submitted: 'A user told us about this place. We haven\'t verified it yet.',
  unverified: 'Listed but not confirmed. Please call ahead.',
}
