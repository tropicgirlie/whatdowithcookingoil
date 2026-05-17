import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LocatorMap } from '@/components/map'
import { PointCard } from '@/components/point-card'
import { FilterChips, EMPTY_FILTERS, type Filters } from '@/components/filter-chips'
import { fetchPoints } from '@/lib/api'
import { rankByDistance } from '@/lib/distance'
import type { Point, PointWithDistance } from '@/lib/types'
import { Loader2 } from 'lucide-react'

export default function ResultsPage() {
  const [sp] = useSearchParams()
  const lat = parseFloat(sp.get('lat') ?? '53.3498')
  const lng = parseFloat(sp.get('lng') ?? '-6.2603')

  const [all, setAll] = useState<Point[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [hoverId, setHoverId] = useState<string | undefined>()

  useEffect(() => {
    let alive = true
    fetchPoints()
      .then(p => { if (alive) setAll(p) })
      .catch(e => { if (alive) setError(e.message ?? 'Failed to load') })
    return () => { alive = false }
  }, [])

  const visible: PointWithDistance[] = useMemo(() => {
    if (!all) return []
    const ranked = rankByDistance(all, lat, lng, { radiusMeters: 25_000, minResults: 5 })
    const matches = (p: PointWithDistance) => {
      if (filters.freeOnly && p.fee !== 'free') return false
      if (filters.householdOnly && !p.accepts_household_quantity) return false
      if (filters.kinds.size && !filters.kinds.has(p.kind)) return false
      return true
    }
    const strict = ranked.filter(matches)
    if (strict.length >= 3) return strict
    // Soft-match fallback per memory: never empty when data exists.
    return ranked.slice(0, 5)
  }, [all, lat, lng, filters])

  const usingFallback = useMemo(() => {
    if (!all) return false
    const strict = rankByDistance(all, lat, lng).filter(p => {
      if (filters.freeOnly && p.fee !== 'free') return false
      if (filters.householdOnly && !p.accepts_household_quantity) return false
      if (filters.kinds.size && !filters.kinds.has(p.kind)) return false
      return true
    })
    return (filters.freeOnly || filters.householdOnly || filters.kinds.size > 0) && strict.length < 3
  }, [all, lat, lng, filters])

  return (
    <div className="flex-1 grid lg:grid-cols-[minmax(0,420px)_1fr] gap-4 p-4 max-w-7xl w-full mx-auto">
      <section className="flex flex-col gap-3 min-h-0">
        <header>
          <h2 className="text-lg font-semibold">Near you</h2>
          <p className="text-xs text-muted">
            {visible.length
              ? `${visible.length} drop-off ${visible.length === 1 ? 'point' : 'points'}`
              : all
                ? 'No data in this area yet — help us by suggesting one.'
                : 'Loading…'}
          </p>
        </header>

        <FilterChips value={filters} onChange={setFilters} />

        {usingFallback && (
          <p className="text-xs text-amber-2 bg-amber-soft border border-amber/40 rounded-card px-3 py-2">
            Showing nearest points — not all match every filter you picked.
          </p>
        )}

        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2">
          {error && <p className="text-sm text-rust">{error}</p>}
          {!all && !error && (
            <div className="flex items-center gap-2 text-sm text-muted py-8 justify-center">
              <Loader2 className="w-4 h-4 animate-spin" /> Fetching dataset…
            </div>
          )}
          {visible.map(p => (
            <PointCard
              key={p.id}
              point={p}
              active={hoverId === p.id}
              onHover={setHoverId}
            />
          ))}
        </div>
      </section>

      <section className="rounded-card overflow-hidden border border-line/60 min-h-[400px] lg:min-h-0 lg:h-[calc(100vh-7rem)] sticky top-16">
        <LocatorMap centre={{ lat, lng }} points={visible} highlightId={hoverId} onPick={setHoverId} />
      </section>
    </div>
  )
}
