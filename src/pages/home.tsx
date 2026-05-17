import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Locate, Search, Loader2 } from 'lucide-react'
import { geocodeQuery, looksLikeEircode } from '@/lib/geocode'

export default function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState<'idle' | 'geolocate' | 'geocode'>('idle')
  const [error, setError] = useState<string | null>(null)

  function go(lat: number, lng: number) {
    navigate(`/near?lat=${lat.toFixed(5)}&lng=${lng.toFixed(5)}`)
  }

  async function handleUseLocation() {
    setError(null)
    if (!('geolocation' in navigator)) {
      setError("This browser doesn't support location. Try typing an Eircode instead.")
      return
    }
    setBusy('geolocate')
    navigator.geolocation.getCurrentPosition(
      pos => go(pos.coords.latitude, pos.coords.longitude),
      err => {
        setBusy('idle')
        setError(err.code === 1
          ? 'Location permission denied. Use the Eircode box below instead.'
          : 'Couldn\'t get your location. Try the Eircode box below.')
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 60_000 },
    )
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setError(null)
    setBusy('geocode')
    const hit = await geocodeQuery(q)
    setBusy('idle')
    if (!hit) {
      setError(
        looksLikeEircode(q)
          ? "We couldn't place that Eircode. Try the full address."
          : "We couldn't find that location. Try an Eircode or full address.",
      )
      return
    }
    go(hit.lat, hit.lng)
  }

  return (
    <div className="flex-1 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-olive-2 mb-4">
          For Ireland · v0.1
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center max-w-2xl leading-tight">
          Where do I take my <span className="text-olive">used cooking oil</span>?
        </h1>
        <p className="mt-4 max-w-xl text-center text-ink-2">
          Free locator for civic amenity sites, bring centres and commercial collectors
          that accept household oil. No account, works offline once loaded.
        </p>

        <div className="mt-8 w-full max-w-md flex flex-col gap-3">
          <button
            type="button"
            disabled={busy !== 'idle'}
            onClick={handleUseLocation}
            className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-pill bg-olive text-cream font-semibold hover:bg-olive-2 disabled:opacity-60 disabled:cursor-progress transition-colors"
          >
            {busy === 'geolocate' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Locate className="w-4 h-4" />}
            Use my location
          </button>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="flex-1 h-px bg-line/80" />
            <span>or</span>
            <span className="flex-1 h-px bg-line/80" />
          </div>

          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Eircode (D02 XW06) or address"
              className="w-full h-12 rounded-pill border border-line/80 bg-cream pl-11 pr-28 text-sm placeholder:text-muted focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20"
            />
            <button
              type="submit"
              disabled={busy !== 'idle' || !query.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 rounded-pill bg-ink text-cream text-xs font-semibold hover:bg-ink-2 disabled:opacity-50"
            >
              {busy === 'geocode' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </button>
          </form>

          {error && (
            <p className="text-sm text-rust">{error}</p>
          )}
        </div>

        <p className="mt-10 text-xs text-muted max-w-md text-center">
          Pouring oil down the drain causes <a className="underline" href="https://en.wikipedia.org/wiki/Fatberg" target="_blank" rel="noreferrer">fatbergs</a> and
          is illegal in Ireland under the Waste Management Act.
        </p>
      </section>
    </div>
  )
}
