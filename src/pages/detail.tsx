import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchPoint } from '@/lib/api'
import type { Point } from '@/lib/types'
import { KIND_LABEL, CONFIDENCE_DESCRIPTION } from '@/lib/types'
import { ArrowLeft, ExternalLink, Phone, Globe, Loader2, Navigation } from 'lucide-react'
import { ConfidenceBadge } from '@/components/confidence-badge'

export default function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [point, setPoint] = useState<Point | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    fetchPoint(id).then(setPoint).catch(e => setError(e.message ?? 'Error'))
  }, [id])

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="text-rust">{error}</p>
      </div>
    )
  }

  if (!point) {
    return (
      <div className="flex items-center gap-2 text-muted py-12 justify-center">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading…
      </div>
    )
  }

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`

  return (
    <article className="max-w-2xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-5">
      <button onClick={() => navigate(-1)} className="self-start inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <header>
        <p className="text-xs font-medium uppercase tracking-wider text-olive-2">{KIND_LABEL[point.kind]}</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">{point.name}</h1>
        <p className="text-ink-2 mt-2">{point.address}</p>
        <div className="mt-3 flex flex-col gap-1.5">
          <ConfidenceBadge confidence={point.confidence} size="md" />
          <p className="text-xs text-muted">{CONFIDENCE_DESCRIPTION[point.confidence]}</p>
        </div>
      </header>

      <a
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 h-11 rounded-pill bg-olive text-cream font-semibold hover:bg-olive-2 transition-colors"
      >
        <Navigation className="w-4 h-4" /> Get directions
      </a>

      <dl className="grid grid-cols-2 gap-4 text-sm">
        <Field label="Fee">
          {point.fee === 'free' ? 'Free' : point.fee === 'paid' ? 'Paid' : 'Unknown'}
          {point.fee_notes && <span className="block text-xs text-muted mt-0.5">{point.fee_notes}</span>}
        </Field>
        <Field label="Accepts household quantities">
          {point.accepts_household_quantity ? 'Yes' : 'No (bulk only)'}
        </Field>
        {point.max_litres && <Field label="Max litres / visit">{point.max_litres}</Field>}
        {point.county && <Field label="County">{point.county}</Field>}
      </dl>

      {point.hours && !('by_appointment' in point.hours) && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-2">Opening hours</h2>
          <ul className="text-sm grid grid-cols-2 gap-x-4 gap-y-1">
            {Object.entries(point.hours).map(([day, h]) => (
              <li key={day} className="flex justify-between">
                <span className="text-ink-2 capitalize">{day}</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {point.hours && 'by_appointment' in point.hours && (
        <p className="text-sm bg-cream-2/60 border border-line/60 rounded-card px-3 py-2">
          By appointment only. Call ahead.
        </p>
      )}

      {point.notes && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-2">Notes</h2>
          <p className="text-sm text-ink-2">{point.notes}</p>
        </section>
      )}

      <section className="rounded-card bg-cream-2/60 border border-line/60 p-4">
        <p className="text-sm font-semibold text-ink">Before you go</p>
        <p className="mt-1 text-sm text-ink-2 leading-relaxed">
          Let oil cool fully. Decant into a sealed plastic bottle. Don't mix with water,
          food scraps or other chemicals. If this listing isn't council-verified, ring ahead
          before driving over.
        </p>
      </section>

      <section className="flex flex-wrap gap-2 text-sm">
        {point.phone && (
          <a href={`tel:${point.phone}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-cream-2 hover:bg-line/60">
            <Phone className="w-3.5 h-3.5" /> {point.phone}
          </a>
        )}
        {point.website && (
          <a href={point.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-cream-2 hover:bg-line/60">
            <Globe className="w-3.5 h-3.5" /> Website
          </a>
        )}
        {point.source_url && (
          <a href={point.source_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-muted hover:text-ink">
            <ExternalLink className="w-3.5 h-3.5" /> Source: {point.source}
          </a>
        )}
      </section>

      <p className="text-xs text-muted">
        Something wrong with this listing? <Link to="/suggest" className="underline">Report it</Link>.
      </p>
    </article>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-0.5 text-ink">{children}</dd>
    </div>
  )
}
