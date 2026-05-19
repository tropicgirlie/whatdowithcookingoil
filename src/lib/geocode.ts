/** Address / postcode → lat/lng. Country-aware.
 *  Ireland: Nominatim with countrycodes=ie.
 *  UK: postcodes.io for fast postcode lookup, Nominatim as fallback for free-text. */

import type { Country } from './types'

const NOMINATIM = 'https://nominatim.openstreetmap.org/search'
const POSTCODES_IO = 'https://api.postcodes.io/postcodes'

export interface GeocodeResult {
  lat: number
  lng: number
  display: string
}

export async function geocodeQuery(query: string, country: Country = 'IE'): Promise<GeocodeResult | null> {
  const q = query.trim()
  if (!q) return null

  if (country === 'UK' && looksLikeUkPostcode(q)) {
    const hit = await lookupUkPostcode(q)
    if (hit) return hit
  }

  const countrycodes = country === 'UK' ? 'gb' : 'ie'
  const url = `${NOMINATIM}?q=${encodeURIComponent(q)}&format=json&limit=1&countrycodes=${countrycodes}&addressdetails=0`
  const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
  if (!res.ok) return null
  const arr = (await res.json()) as Array<{ lat: string; lon: string; display_name: string }>
  if (!arr.length) return null
  return {
    lat: parseFloat(arr[0].lat),
    lng: parseFloat(arr[0].lon),
    display: arr[0].display_name,
  }
}

async function lookupUkPostcode(postcode: string): Promise<GeocodeResult | null> {
  const url = `${POSTCODES_IO}/${encodeURIComponent(postcode.replace(/\s+/g, ''))}`
  const res = await fetch(url)
  if (!res.ok) return null
  const json = (await res.json()) as { result?: { latitude: number; longitude: number; postcode: string; admin_district: string } }
  if (!json.result) return null
  return {
    lat: json.result.latitude,
    lng: json.result.longitude,
    display: `${json.result.postcode}, ${json.result.admin_district}`,
  }
}

/** Detects an Eircode-shape input (rough match for D02 XW06, D02XW06, A65 F4E2 etc.). */
export function looksLikeEircode(s: string): boolean {
  return /^[a-z]\d{2}\s?[a-z0-9]{4}$/i.test(s.trim())
}

/** Detects a UK postcode (e.g. SW1A 1AA, M22 4SY, EH11 4BY). */
export function looksLikeUkPostcode(s: string): boolean {
  return /^[a-z]{1,2}\d[a-z\d]?\s?\d[a-z]{2}$/i.test(s.trim())
}

export function postcodeLabel(country: Country): string {
  return country === 'UK' ? 'Postcode (SW1A 1AA) or address' : 'Eircode (D02 XW06) or address'
}
