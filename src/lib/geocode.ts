/** Address / Eircode → lat/lng via OSM Nominatim. Free, rate-limited.
 *  For Ireland we biasthe search with countrycodes=ie. */

const NOMINATIM = 'https://nominatim.openstreetmap.org/search'

export interface GeocodeResult {
  lat: number
  lng: number
  display: string
}

export async function geocodeQuery(query: string): Promise<GeocodeResult | null> {
  const url = `${NOMINATIM}?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=ie&addressdetails=0`
  const res = await fetch(url, {
    headers: {
      // Nominatim asks for a UA. Be polite.
      'Accept-Language': 'en',
    },
  })
  if (!res.ok) return null
  const arr = (await res.json()) as Array<{ lat: string; lon: string; display_name: string }>
  if (!arr.length) return null
  return {
    lat: parseFloat(arr[0].lat),
    lng: parseFloat(arr[0].lon),
    display: arr[0].display_name,
  }
}

/** Detects an Eircode-shape input (rough — D02 XW06, D02XW06, A65 F4E2 etc.). */
export function looksLikeEircode(s: string): boolean {
  return /^[a-z]\d{2}\s?[a-z0-9]{4}$/i.test(s.trim())
}
