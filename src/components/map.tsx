import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import type { PointWithDistance } from '@/lib/types'

interface LocatorMapProps {
  centre: { lat: number; lng: number }
  points: PointWithDistance[]
  highlightId?: string
  onPick?: (id: string) => void
}

type MarkerIndex = globalThis.Map<string, maplibregl.Marker>

const STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
}

export function LocatorMap({ centre, points, highlightId, onPick }: LocatorMapProps) {
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markers = useRef<MarkerIndex>(new globalThis.Map())
  const youMarker = useRef<maplibregl.Marker | null>(null)

  // Initialise once.
  useEffect(() => {
    if (!container.current || map.current) return
    map.current = new maplibregl.Map({
      container: container.current,
      style: STYLE,
      center: [centre.lng, centre.lat],
      zoom: 11,
      attributionControl: { compact: true },
    })
    map.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
    return () => {
      map.current?.remove()
      map.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Centre marker for the user.
  useEffect(() => {
    if (!map.current) return
    map.current.flyTo({ center: [centre.lng, centre.lat], zoom: 11, duration: 600 })
    youMarker.current?.remove()
    const el = document.createElement('div')
    el.className = 'w-3 h-3 rounded-full bg-rust ring-4 ring-rust/30'
    youMarker.current = new maplibregl.Marker({ element: el })
      .setLngLat([centre.lng, centre.lat])
      .addTo(map.current)
  }, [centre.lat, centre.lng])

  // Sync point markers.
  useEffect(() => {
    if (!map.current) return
    const next = new Set(points.map(p => p.id))
    // Remove markers no longer in the list.
    for (const [id, m] of markers.current) {
      if (!next.has(id)) {
        m.remove()
        markers.current.delete(id)
      }
    }
    // Add/update.
    for (const p of points) {
      const isHi = p.id === highlightId
      const existing = markers.current.get(p.id)
      if (existing) {
        existing.getElement().classList.toggle('ring-amber/70', isHi)
        existing.setLngLat([p.lng, p.lat])
        continue
      }
      const el = document.createElement('button')
      el.className = `w-7 h-7 rounded-full grid place-items-center text-[10px] font-semibold border border-olive-2 bg-olive text-cream ring-4 ${
        isHi ? 'ring-amber/70' : 'ring-olive/20'
      } cursor-pointer hover:scale-110 transition-transform`
      el.title = p.name
      el.textContent = p.kind === 'commercial' ? '€' : '✓'
      el.addEventListener('click', () => onPick?.(p.id))
      const m = new maplibregl.Marker({ element: el })
        .setLngLat([p.lng, p.lat])
        .addTo(map.current!)
      markers.current.set(p.id, m)
    }
  }, [points, highlightId, onPick])

  return <div ref={container} className="w-full h-full rounded-card overflow-hidden" />
}
