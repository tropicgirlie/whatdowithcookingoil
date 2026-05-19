import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LocatorMap } from '@/components/map'
import { PointCard } from '@/components/point-card'
import { FilterChips, EMPTY_FILTERS, type Filters } from '@/components/filter-chips'
import { fetchPoints } from '@/lib/api'
import { rankByDistance } from '@/lib/distance'
import type { Point, PointWithDistance } from '@/lib/types'
import { COUNTRY_CENTRE, COUNTRY_LABEL } from '@/lib/types'
import { useCountry } from '@/lib/country-context'
import { Loader2 } from 'lucide-react'

export default function ResultsPage() {
  const [sp] = useSearchParams()
  const { country } = useCountry()
  const centre = COUNTRY_CENTRE[country]
  const lat = parseFloat(sp.get('lat') ?? String(centre.lat))
  const lng = parseFloat(sp.get('lng') ?? String(centre.lng))

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

  const countryFiltered = useMemo(() => all?.filter(p => p.country === country) ?? null, [all, country])

  const visible: PointWithDistance[] = useMemo(() => {
    if (!countryFiltered) return []
    const ranked = rankByDistance(countryFiltered, lat, lng, { radiusMeters: 25_000, minResults: 5 })
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
  }, [countryFiltered, lat, lng, filters])

  const usingFallback = useMemo(() => {
    if (!countryFiltered) return false
    const strict = rankByDistance(countryFiltered, lat, lng).filter(p => {
      if (filters.freeOnly && p.fee !== 'free') return false
      if (filters.householdOnly && !p.accepts_household_quantity) return false
      if (filters.kinds.size && !filters.kinds.has(p.kind)) return false
      return true
    })
    return (filters.freeOnly || filters.householdOnly || filters.kinds.size > 0) && strict.length < 3
  }, [countryFiltered, lat, lng, filters])

  return (
    <div className="flex-1 grid lg:grid-cols-[minmax(0,420px)_1fr] gap-4 p-4 max-w-7xl w-full mx-auto">
      <section className="flex flex-col gap-3 min-h-0">
        <header>
          <h2 className="text-lg font-semibold">Near you in {COUNTRY_LABEL[country]}</h2>
          <p className="text-xs text-muted">
            {visible.length
              ? `${visible.length} drop-off ${visible.length === 1 ? 'point' : 'points'}`
              : countryFiltered
                ? `No data yet in ${COUNTRY_LABEL[country]} near here. Help us by suggesting one.`
                : 'Loading…'}
          </p>
        </header>

        <FilterChips value={filters} onChange={setFilters} />

        {usingFallback && (
          <p className="text-xs text-amber-2 bg-amber-soft border border-amber/40 rounded-card px-3 py-2">
            Showing nearest points. Not all match every filter you picked.
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
