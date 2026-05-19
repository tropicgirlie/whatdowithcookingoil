/**
 * Seed OilCycle's points.v1.json with Ireland used-cooking-oil drop-offs
 * tagged on OpenStreetMap via the Overpass API.
 *
 * Tag pattern: amenity=recycling + recycling:cooking_oil=yes
 *
 * Usage:
 *   tsx scripts/seed_osm_ie.ts          # dry run (prints what would be added)
 *   tsx scripts/seed_osm_ie.ts --write  # merges new points into data/points.v1.json
 *
 * Attribution: data is OpenStreetMap contributors, licensed ODbL.
 * https://www.openstreetmap.org/copyright
 */

import fs from 'node:fs'
import path from 'node:path'

const OVERPASS = 'https://overpass-api.de/api/interpreter'

const QUERY = `
[out:json][timeout:90];
area["ISO3166-1"="IE"]->.searchArea;
(
  node["amenity"="recycling"]["recycling:cooking_oil"="yes"](area.searchArea);
  way["amenity"="recycling"]["recycling:cooking_oil"="yes"](area.searchArea);
  relation["amenity"="recycling"]["recycling:cooking_oil"="yes"](area.searchArea);
);
out center tags;
`

interface OverpassElement {
  type: 'node' | 'way' | 'relation'
  id: number
  lat?: number
  lon?: number
  center?: { lat: number; lon: number }
  tags?: Record<string, string>
}

interface SeedPoint {
  id: string
  name: string
  kind: 'bring_bank' | 'civic' | 'commercial' | 'community'
  country: 'IE' | 'UK'
  address: string
  county: string
  eircode?: string
  lat: number
  lng: number
  accepts_oil: boolean
  accepts_household_quantity: boolean
  fee: 'free' | 'paid' | 'unknown'
  fee_notes?: string
  notes?: string
  source: 'osm'
  source_url: string
  last_verified_at: string
  confidence: 'community_submitted'
}

function inferKind(tags: Record<string, string>): SeedPoint['kind'] {
  const type = tags['recycling_type']
  if (type === 'centre') return 'civic'
  if (type === 'container') return 'bring_bank'
  if (tags.operator?.toLowerCase().includes('council')) return 'civic'
  return 'bring_bank'
}

function buildAddress(tags: Record<string, string>): string {
  const parts = [
    tags['addr:housenumber'] && tags['addr:street']
      ? `${tags['addr:housenumber']} ${tags['addr:street']}`
      : tags['addr:street'],
    tags['addr:suburb'] ?? tags['addr:city'] ?? tags['addr:town'] ?? tags['addr:village'],
  ].filter(Boolean)
  return parts.join(', ') || 'See map'
}

function inferCounty(tags: Record<string, string>): string {
  return (
    tags['addr:county'] ??
    tags['addr:state'] ??
    tags['is_in:county'] ??
    ''
  )
}

function inferName(tags: Record<string, string>): string {
  return (
    tags.name ??
    tags['name:en'] ??
    tags.operator ??
    (tags.recycling_type === 'centre' ? 'Recycling centre' : 'Bring bank')
  )
}

async function main() {
  console.log('Querying Overpass for Ireland UCO points...')
  const res = await fetch(OVERPASS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'OilCycle-seed-script/0.1 (https://github.com/tropicgirlie/oilcycle)',
    },
    body: `data=${encodeURIComponent(QUERY)}`,
  })
  if (!res.ok) {
    console.error(`Overpass error: ${res.status} ${res.statusText}`)
    const body = await res.text()
    console.error(body.slice(0, 500))
    process.exit(1)
  }
  const json = (await res.json()) as { elements: OverpassElement[] }
  console.log(`Got ${json.elements.length} OSM elements.\n`)

  const dataPath = path.resolve('data/points.v1.json')
  const existingRaw = fs.readFileSync(dataPath, 'utf-8')
  const existing = JSON.parse(existingRaw) as Array<{ id: string; lat: number; lng: number; country: string }>
  const existingIds = new Set(existing.map(p => p.id))
  const existingCoords = new Set(existing.map(p => `${p.lat.toFixed(4)},${p.lng.toFixed(4)}`))

  const today = new Date().toISOString().slice(0, 10)
  const newPoints: SeedPoint[] = []
  let skippedDup = 0
  let skippedNoCoords = 0

  for (const el of json.elements) {
    const lat = el.lat ?? el.center?.lat
    const lon = el.lon ?? el.center?.lon
    if (lat === undefined || lon === undefined) {
      skippedNoCoords++
      continue
    }
    const tags = el.tags ?? {}
    const id = `ie-osm-${el.type[0]}${el.id}`
    if (existingIds.has(id)) {
      skippedDup++
      continue
    }
    const coordKey = `${lat.toFixed(4)},${lon.toFixed(4)}`
    if (existingCoords.has(coordKey)) {
      skippedDup++
      continue
    }

    const fee = tags.fee === 'no' ? 'free' : tags.fee === 'yes' ? 'paid' : 'unknown'
    const point: SeedPoint = {
      id,
      name: inferName(tags),
      kind: inferKind(tags),
      country: 'IE',
      address: buildAddress(tags),
      county: inferCounty(tags),
      ...(tags['addr:postcode'] ? { eircode: tags['addr:postcode'] } : {}),
      lat,
      lng: lon,
      accepts_oil: true,
      accepts_household_quantity: true,
      fee,
      ...(tags['opening_hours']
        ? { notes: `Hours per OSM: ${tags['opening_hours']}. Confirm before travelling.` }
        : { notes: 'Hours not listed on OSM. Confirm before travelling.' }),
      source: 'osm',
      source_url: `https://www.openstreetmap.org/${el.type}/${el.id}`,
      last_verified_at: today,
      confidence: 'community_submitted',
    }
    newPoints.push(point)
  }

  console.log(`Skipped duplicates: ${skippedDup}`)
  console.log(`Skipped missing coords: ${skippedNoCoords}`)
  console.log(`New points to add: ${newPoints.length}\n`)

  for (const p of newPoints) {
    const county = p.county ? ` (${p.county})` : ''
    console.log(`  ${p.id}  ${p.name}${county}  ${p.lat.toFixed(4)},${p.lng.toFixed(4)}`)
  }

  if (process.argv.includes('--write') && newPoints.length > 0) {
    const merged = [...existing, ...newPoints]
    fs.writeFileSync(dataPath, JSON.stringify(merged, null, 2) + '\n')
    console.log(`\nWrote ${merged.length} total points to ${dataPath}`)
  } else if (newPoints.length > 0) {
    console.log('\nDry run. Pass --write to merge these into data/points.v1.json.')
  } else {
    console.log('\nNothing new to write.')
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
