import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Locate, Search, Loader2, Droplet, GlassWater, Truck, ChevronRight,
  AlertCircle, Megaphone, Mail, Users, ExternalLink, Quote,
} from 'lucide-react'
import { geocodeQuery, looksLikeEircode, looksLikeUkPostcode, postcodeLabel } from '@/lib/geocode'
import { cn } from '@/lib/utils'
import { RecycleJourney } from '@/components/recycle-journey'
import { useCountry } from '@/lib/country-context'
import { COUNTRY_LABEL } from '@/lib/types'
import seedPoints from '@/../data/points.v1.json'

const COUNT_BY_COUNTRY = (seedPoints as Array<{ country: string }>).reduce<Record<string, number>>(
  (acc, p) => {
    acc[p.country] = (acc[p.country] ?? 0) + 1
    return acc
  },
  {},
)

export default function HomePage() {
  const navigate = useNavigate()
  const { country } = useCountry()
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState<'idle' | 'geolocate' | 'geocode'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [highlightSearch, setHighlightSearch] = useState(false)

  function focusSearch() {
    setHighlightSearch(true)
    window.setTimeout(() => setHighlightSearch(false), 1600)
  }

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
    const hit = await geocodeQuery(q, country)
    setBusy('idle')
    if (!hit) {
      const looksLikePostcode = country === 'UK' ? looksLikeUkPostcode(q) : looksLikeEircode(q)
      const label = country === 'UK' ? 'postcode' : 'Eircode'
      setError(
        looksLikePostcode
          ? `We couldn't place that ${label}. Try the full address.`
          : `We couldn't find that location. Try a ${label} or full address.`,
      )
      return
    }
    go(hit.lat, hit.lng)
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero: editorial masthead with search-first prominence */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16 pb-10">
        <div className="max-w-5xl mx-auto">
          {/* Masthead strip: small kicker + tiny photo medallion + count */}
          <div className="flex items-center justify-between gap-4 pb-5 border-b border-line/60 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src="/hero-kitchen.jpg"
                alt="A bottle of oil on a sunlit wooden counter, surrounded by plants"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-cream ring-offset-2 ring-offset-olive-soft/40 flex-none"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-olive-2">
                  The honest locator · {COUNTRY_LABEL[country]}
                </span>
                <span className="text-xs sm:text-sm text-muted italic">
                  {COUNT_BY_COUNTRY[country] ?? 0} drop-off points indexed, with sources
                </span>
              </div>
            </div>
            <span
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-soft text-amber-2 text-[11px] font-semibold tracking-wider uppercase rotate-[-1.5deg] shadow-sm border border-amber/30"
              aria-hidden="true"
            >
              <Droplet className="w-3 h-3" fill="currentColor" /> v0.2
            </span>
          </div>

          {/* Headline + search, search is the main event */}
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start">
            <div className="flex flex-col gap-4">
              <h1 className="font-serif text-[2.6rem] sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.02] tracking-tight text-ink">
                Where do I take my{' '}
                <em className="not-italic text-olive" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}>
                  used&nbsp;cooking&nbsp;oil
                </em>?
              </h1>
              <p className="text-base sm:text-lg text-ink-2 leading-relaxed max-w-lg">
                Some councils accept it. Some don't. Cork City says no, Fingal says yes,
                most don't say anything at all. We've checked, so you don't drive across
                town to be turned away.
              </p>
            </div>

            <div
              className={cn(
                'flex flex-col gap-3 p-5 sm:p-6 bg-cream border border-line/60 rounded-2xl transition-shadow',
                highlightSearch && 'ring-2 ring-olive ring-offset-2 ring-offset-cream',
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                Find a drop-off
              </p>
              <button
                type="button"
                disabled={busy !== 'idle'}
                onClick={handleUseLocation}
                className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-olive text-cream font-semibold hover:bg-olive-2 disabled:opacity-60 disabled:cursor-progress transition-colors"
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
                  placeholder={postcodeLabel(country)}
                  className="w-full h-12 rounded-full border border-line/80 bg-cream pl-11 pr-28 text-sm placeholder:text-muted focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20"
                />
                <button
                  type="submit"
                  disabled={busy !== 'idle' || !query.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink-2 disabled:opacity-50"
                >
                  {busy === 'geocode' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
                </button>
              </form>

              {error && <p className="text-sm text-rust">{error}</p>}

              <p className="text-[11px] text-muted leading-relaxed italic">
                Pouring oil down the drain causes{' '}
                <a className="underline not-italic" href="https://en.wikipedia.org/wiki/Fatberg" target="_blank" rel="noreferrer">fatbergs</a>{' '}
                {country === 'UK'
                  ? 'and breaks section 111 of the Water Industry Act 1991.'
                  : 'and is illegal under the Waste Management Act.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intent picker, now a quieter secondary band */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pb-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Or pick what fits you
            </p>
            <span className="hidden sm:block text-xs text-muted italic">three honest paths</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/dispose"
              className="group rounded-2xl border border-line/70 bg-cream p-4 flex flex-col gap-2 hover:border-olive/40 hover:bg-olive-soft/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-full bg-cream-2 grid place-items-center">
                  <Droplet className="w-4 h-4 text-olive" fill="currentColor" />
                </span>
                <ChevronRight className="w-4 h-4 text-muted group-hover:text-olive-2 transition-colors" />
              </div>
              <p className="font-semibold text-sm text-ink mt-2">One jar from cooking</p>
              <p className="text-xs text-muted leading-snug">Wipe and bin. Safe, allowed.</p>
            </Link>

            <button
              type="button"
              onClick={focusSearch}
              className="group rounded-2xl border-2 border-olive/40 bg-olive-soft p-4 flex flex-col gap-2 text-left hover:bg-olive-soft/80 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-full bg-olive grid place-items-center">
                  <GlassWater className="w-4 h-4 text-cream" />
                </span>
                <ChevronRight className="w-4 h-4 text-olive-2" />
              </div>
              <p className="font-semibold text-sm text-ink mt-2">Several bottles saved up</p>
              <p className="text-xs text-ink-2 leading-snug">Use the search above.</p>
            </button>

            <Link
              to="/pickup"
              className="group rounded-2xl border border-line/70 bg-cream p-4 flex flex-col gap-2 hover:border-amber/40 hover:bg-amber-soft/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-full bg-amber-soft grid place-items-center">
                  <Truck className="w-4 h-4 text-amber-2" />
                </span>
                <ChevronRight className="w-4 h-4 text-muted group-hover:text-amber-2 transition-colors" />
              </div>
              <p className="font-semibold text-sm text-ink mt-2">I'd prefer pickup</p>
              <p className="text-xs text-muted leading-snug">Honest status in Ireland.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Journey + biodiesel stats */}
      <div className="px-4 sm:px-8 lg:px-12"><div className="max-w-5xl mx-auto"><div className="rule" /></div></div>
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-olive-2 mb-3">
              How it should work
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-ink leading-[1.05]">
              From your pan to the road
            </h2>
            <p className="mt-3 text-base sm:text-lg text-ink-2 max-w-xl leading-relaxed">
              In countries with proper infrastructure, a litre of cooking oil dropped at
              a centre comes back as biodiesel powering buses and lorries.
            </p>
          </div>
          <RecycleJourney />
          <p className="mt-6 text-[11px] text-muted max-w-lg leading-relaxed italic">
            Estimates based on 90% UCO-to-biodiesel conversion (transesterification yield),
            average bus fuel economy of 3 km/L (B100), and 2.5 kg CO₂e displaced per litre
            of fossil diesel substituted.
          </p>
        </div>
      </section>

      {/* Numbers band */}
      <div className="px-4 sm:px-8 lg:px-12"><div className="max-w-5xl mx-auto"><div className="rule" /></div></div>
      <section className="w-full px-4 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="max-w-5xl mx-auto flex flex-wrap items-start justify-around gap-8 sm:gap-10">
          {country === 'UK' ? (
            <>
              <Stat value="~350" caption="HWRCs run by UK councils" tone="olive" />
              <span className="hidden sm:block w-px h-14 bg-line/80 self-center" />
              <Stat value="0" caption="national household pickup services" tone="rust" />
              <span className="hidden sm:block w-px h-14 bg-line/80 self-center" />
              <Stat value="5+" caption="commercial collectors, B2B only" tone="ink" />
            </>
          ) : (
            <>
              <Stat value="~100" caption="civic amenity sites in Ireland" tone="olive" />
              <span className="hidden sm:block w-px h-14 bg-line/80 self-center" />
              <Stat value="0" caption="household pickup services" tone="rust" />
              <span className="hidden sm:block w-px h-14 bg-line/80 self-center" />
              <Stat value="5+" caption="commercial collectors, B2B only" tone="ink" />
            </>
          )}
        </div>
      </section>

      {/* Reality check */}
      <div className="px-4 sm:px-8 lg:px-12"><div className="max-w-5xl mx-auto"><div className="rule" /></div></div>
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rust mb-3">
              {country === 'UK' ? 'The reality in the UK' : 'The reality in Ireland'}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-ink leading-[1.05] max-w-2xl">
              {country === 'UK'
                ? <>Better than Ireland, but <em className="not-italic text-rust">the journey isn't joined up</em></>
                : <>That journey mostly stops <em className="not-italic text-rust">at the first step</em></>}
            </h2>
          </div>
          <div className="flex gap-5 items-start">
            <div className="w-10 h-10 rounded-full bg-amber-soft grid place-items-center flex-none mt-1">
              <AlertCircle className="w-5 h-5 text-rust" />
            </div>
            <div className="flex flex-col gap-3 text-base sm:text-lg text-ink-2 leading-relaxed">
              {country === 'UK' ? (
                <>
                  <p>
                    The UK has <a className="underline" href="https://www.recyclenow.com/recycling-locator" target="_blank" rel="noreferrer">Recycle Now</a>,
                    a national postcode locator covering household waste recycling centres from over{' '}
                    <strong className="text-ink">350 local authorities</strong>. That's a real head-start on
                    Ireland. But cooking oil acceptance still varies HWRC by HWRC, and there is{' '}
                    <strong className="text-ink">no statutory duty</strong> on councils to take it.
                  </p>
                  <p>
                    A handful of councils, including <strong className="text-ink">Brighton &amp; Hove</strong>,
                    run kerbside collection of household cooking oil. Most do not. Commercial collectors
                    (Olleco, Living Fuels, Convert2Green) serve restaurants and food businesses only.
                    There is <strong className="text-ink">no national household pickup service</strong> in the UK.
                  </p>
                  <p>
                    The clean biodiesel story above describes how it works at scale in Italy, Germany and
                    France. The UK has the data infrastructure but lacks the universal mandate, so households
                    are left to figure it out themselves.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Around <strong className="text-ink">100 civic amenity sites</strong> exist nationally,
                    but acceptance of cooking oil varies site by site. Cork City's main centre at Kinsale Road
                    refuses it. There is <strong className="text-ink">no statutory obligation</strong> on
                    councils to take household oil.
                  </p>
                  <p>
                    Every commercial collector in the country (Frylite, Olleco, Bolton Biofuels, Nature's Oils,
                    Pure Oil) serves restaurants and food businesses only. There is{' '}
                    <strong className="text-ink">no household pickup service</strong> operating anywhere in Ireland.
                  </p>
                  <p>
                    The clean biodiesel story above describes how it works in Italy, Germany and France.
                    In Ireland, most kitchen oil quietly ends up in general waste, or worse, down the sink.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Country cards */}
      <div className="px-4 sm:px-8 lg:px-12"><div className="max-w-5xl mx-auto"><div className="rule" /></div></div>
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-olive-2 mb-3">
              What good looks like
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-[1.05] max-w-2xl">
              Three countries that <em className="not-italic text-olive">built the infrastructure</em>
            </h3>
            <p className="mt-3 text-base text-ink-2 max-w-xl leading-relaxed">
              Each one solved a different piece of the puzzle. Ireland can borrow from all of them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CountryCard
              flag="🇮🇹"
              country="Italy"
              stat="Mandatory"
              statLabel="by national law"
              points={[
                'CONOE national consortium runs UCO collection under D.Lgs. 152/06.',
                'Drop-off bins in most comuni, surfaced inside the Junker app.',
                'Junker reaches 3,500+ municipalities and around 30 million users.',
              ]}
            />
            <CountryCard
              flag="🇩🇪"
              country="Germany"
              stat="Paid"
              statLabel="per kg of clean oil"
              points={[
                'ReFood, BRAL and Berlin Recycling run dense city networks.',
                'Household drop-off at Wertstoffhof, commercial pickup on routes.',
                'Operators compensate businesses per kilogram collected.',
              ]}
            />
            <CountryCard
              flag="🇫🇷"
              country="France"
              stat="Traceable"
              statLabel="kitchen to fuel plant"
              points={[
                'Allo à l\'huile (SARIA) runs around 19 regional depots nationally.',
                'Olivert in Île-de-France is a social-economy circular network.',
                'Full chain-of-custody is required for biofuel certification.',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Voices from kitchens (country-aware) */}
      <div className="px-4 sm:px-8 lg:px-12"><div className="max-w-5xl mx-auto"><div className="rule" /></div></div>
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-olive-2 mb-3">
              {country === 'UK' ? 'Voices from UK kitchens' : 'Voices from Irish kitchens'}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-[1.05]">
              {country === 'UK' ? 'Same gap, different country' : 'What people actually do today'}
            </h2>
            <p className="mt-3 text-base text-ink-2 max-w-xl leading-relaxed">
              When the infrastructure is patchy, this is what families resort to. None of it is their fault.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {country === 'UK' ? (
              <>
                <VoiceCard
                  quote="I rent a flat in Hackney with no garden. There's no kerbside for cooking oil and the HWRC is a thirty-minute bus ride away. Honestly, it goes down the sink most weeks."
                  initials="EW"
                  name="Ellie, Hackney"
                  subtitle="Renting, no car"
                />
                <VoiceCard
                  quote="Brighton actually picks up cooking oil from the doorstep on Tuesdays. It's the only reason I bother saving it up. None of my friends in other cities can do this."
                  initials="TM"
                  name="Tom, Brighton"
                  subtitle="Cooks every night"
                />
                <VoiceCard
                  quote="Tyseley has a slot for cooking oil but the council website doesn't say. I had to ring three times to confirm before I drove over."
                  initials="PS"
                  name="Priya, Birmingham"
                  subtitle="Two kids, big batch cook"
                />
              </>
            ) : (
              <>
                <VoiceCard
                  quote="I pour it into the soil at the bottom of the garden. I know it's not great, but I have nowhere else to put it."
                  initials="AM"
                  name="Aoife, Lucan"
                  subtitle="Mother of two"
                />
                <VoiceCard
                  quote="My local centre in Cork doesn't take it. So it goes in the black bin in a sealed jar. That can't be the answer in 2026."
                  initials="NB"
                  name="Niamh, Cork city"
                  subtitle="Teacher, gardener"
                />
                <VoiceCard
                  quote="Honestly I poured it down the sink for years. I didn't know about fatbergs until my plumber explained it after the third blockage."
                  initials="SF"
                  name="Síle, Galway"
                  subtitle="Renting, no garden"
                />
              </>
            )}
          </div>
          <p className="mt-6 text-[11px] text-muted text-center leading-relaxed">
            Illustrative composites built from the patterns we've seen.
            Real interview quotes coming soon. <Link to="/suggest" className="underline">Share yours.</Link>
          </p>
        </div>
      </section>

      {/* CTA panel, the deliberate accent block */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pt-8 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto rounded-2xl bg-olive p-8 sm:p-12">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber/20 text-amber-soft text-[11px] font-semibold uppercase tracking-[0.18em] mb-4">
              <Megaphone className="w-3.5 h-3.5" /> Push for change
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-cream leading-[1.05]">
              {country === 'UK' ? 'The UK can copy what works.' : 'Ireland can copy what works.'}
              <br />
              <em className="not-italic text-amber-soft">Help us ask.</em>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-cream/85 leading-relaxed">
              Three concrete things one person can do today to move the needle. None of them
              cost money, none take more than ten minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ActionCard
              Icon={Users}
              label="Find your TD"
              description="Email your local rep and ask for a statutory duty on councils to accept household UCO."
              href="https://www.oireachtas.ie/en/members/"
              external
            />
            <ActionCard
              Icon={Mail}
              label="Email the Department"
              description="Send a short note to the Department of the Environment using our pre-filled template."
              href={`mailto:info@decc.gov.ie?subject=${encodeURIComponent('Household used cooking oil collection in Ireland')}&body=${encodeURIComponent(
                "Dear Department of the Environment,\n\nI'm writing to ask what the Department is doing about household used cooking oil collection in Ireland. Italy, Germany and France have national systems for this; Ireland does not. There is no statutory obligation on councils to accept it at civic amenity sites, and no household pickup service exists in the country.\n\nPlease consider:\n  1. A statutory obligation for councils to accept household UCO at every civic amenity site.\n  2. A national register of drop-off points, equivalent to the Italian CONOE model.\n  3. Support for the development of a household-scale pickup service.\n\nThank you for your time.\n\n"
              )}`}
              external
            />
            <ActionCard
              Icon={Truck}
              label="Track the demand"
              description="Add your county and household oil volume so we can approach councils with real numbers."
              to="/pickup"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function Stat({ value, caption, tone }: { value: string; caption: string; tone: 'olive' | 'rust' | 'ink' }) {
  const colorClass = tone === 'olive' ? 'text-olive' : tone === 'rust' ? 'text-rust' : 'text-ink'
  return (
    <div className="flex flex-col items-center gap-1.5 min-w-[120px]">
      <span className={cn('text-4xl sm:text-5xl font-bold tracking-tight', colorClass)}>{value}</span>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted text-center max-w-[160px] leading-snug">
        {caption}
      </span>
    </div>
  )
}

interface CountryCardProps {
  flag: string
  country: string
  stat: string
  statLabel: string
  points: string[]
}

function CountryCard({ flag, country, stat, statLabel, points }: CountryCardProps) {
  return (
    <article className="pl-5 border-l border-olive-soft flex flex-col gap-4">
      <header className="flex items-start justify-between gap-2">
        <div>
          <p className="text-2xl" aria-hidden="true">{flag}</p>
          <h4 className="font-serif text-2xl font-semibold text-ink mt-2 tracking-tight leading-none">{country}</h4>
        </div>
        <div className="text-right">
          <p className="font-serif text-lg font-semibold text-olive-2 leading-none">{stat}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted mt-1">{statLabel}</p>
        </div>
      </header>
      <ul className="flex flex-col gap-2 text-[13px] sm:text-sm text-ink-2 leading-relaxed">
        {points.map(p => (
          <li key={p} className="flex gap-2">
            <span className="text-olive-2 flex-none">›</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

interface VoiceCardProps {
  quote: string
  /** Kept for backwards compat after the chrome was stripped. Unused. */
  initials?: string
  name: string
  subtitle: string
}

function VoiceCard({ quote, name, subtitle }: VoiceCardProps) {
  return (
    <article className="flex flex-col gap-4">
      <Quote className="w-6 h-6 text-amber" fill="currentColor" />
      <p className="font-serif text-lg sm:text-xl text-ink leading-snug" style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50, "WONK" 0' }}>
        "{quote}"
      </p>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-ink leading-tight">{name}</span>
        <span className="text-xs text-muted italic">{subtitle}</span>
      </div>
    </article>
  )
}

interface ActionCardProps {
  Icon: typeof Users
  label: string
  description: string
  href?: string
  to?: string
  external?: boolean
}

function ActionCard({ Icon, label, description, href, to, external }: ActionCardProps) {
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="w-10 h-10 rounded-full bg-amber/20 grid place-items-center">
          <Icon className="w-4 h-4 text-amber-soft" />
        </span>
        {external ? (
          <ExternalLink className="w-3.5 h-3.5 text-cream/60" />
        ) : (
          <ChevronRight className="w-4 h-4 text-cream/60" />
        )}
      </div>
      <p className="font-semibold text-cream mt-3 text-base">{label}</p>
      <p className="text-xs sm:text-[13px] text-cream/80 leading-snug mt-1">{description}</p>
    </>
  )
  const className =
    'group rounded-2xl bg-olive-2 hover:bg-ink transition-colors p-4 sm:p-5 text-left block'
  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={className}>
      {inner}
    </a>
  )
}
