import { useState } from 'react'
import { Mail, Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCountry } from '@/lib/country-context'
import { COUNTRY_LABEL } from '@/lib/types'

export default function SuggestPage() {
  const { country } = useCountry()
  const [form, setForm] = useState({
    name: '',
    address: '',
    county: '',
    notes: '',
    submitter_email: '',
  })
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.address.trim()) return

    const lines = [
      `Place: ${form.name.trim()}`,
      `Address: ${form.address.trim()}`,
      form.county.trim() && `${country === 'UK' ? 'Region' : 'County'}: ${form.county.trim()}`,
      form.notes.trim() && `Notes: ${form.notes.trim()}`,
      form.submitter_email.trim() && `From: ${form.submitter_email.trim()}`,
      '',
      `Country: ${COUNTRY_LABEL[country]}`,
      `Submitted via oilcycle.vercel.app/suggest`,
    ].filter(Boolean).join('\n')

    const subject = encodeURIComponent(`OilCycle suggestion: ${form.name.trim()}`)
    const body = encodeURIComponent(lines)
    window.location.href = `mailto:contact@oilcycle.ie?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20">
        <div className="max-w-md mx-auto text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-olive grid place-items-center">
          <Check className="w-6 h-6 text-cream" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold mt-5 tracking-tight leading-tight">Thanks for the tip</h1>
        <p className="text-ink-2 mt-3 leading-relaxed">
          Your email client should have opened with the details pre-filled. Hit send and
          we'll review it before adding it to the map. If nothing opened, you can send the
          same message manually to{' '}
          <a className="underline text-olive" href="mailto:contact@oilcycle.ie">
            contact@oilcycle.ie
          </a>.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-olive text-cream font-semibold hover:bg-olive-2 transition-colors"
        >
          Back to the map <ArrowRight className="w-4 h-4" />
        </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-20">
      <div className="max-w-md mx-auto">
      <header className="mb-8">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-olive-2 mb-3">
          Tip us off
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05]">Suggest a drop-off</h1>
        <p className="text-sm sm:text-base text-ink-2 mt-2 leading-relaxed">
          Know a civic amenity site, bring centre or collector that takes household cooking oil?
          Tell us and we'll add it to the map after a quick check.
        </p>
        <p className="mt-4 flex gap-2 items-start text-xs text-muted leading-relaxed italic">
          <Mail className="w-3.5 h-3.5 text-olive-2 mt-0.5 flex-none not-italic" />
          <span>
            Hitting submit opens your email client with the details pre-filled,
            addressed to{' '}
            <a className="underline not-italic" href="mailto:contact@oilcycle.ie">contact@oilcycle.ie</a>.
            We review before publishing.
          </span>
        </p>
      </header>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Place name *">
          <input
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Ringsend Civic Amenity Site"
            className="input"
          />
        </Field>
        <Field label="Address *">
          <textarea
            required
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            placeholder={country === 'UK' ? 'Full street address with postcode if known' : 'Full street address with Eircode if known'}
            rows={3}
            className="input resize-none"
          />
        </Field>
        <Field label={country === 'UK' ? 'Region or city' : 'County'}>
          <input
            value={form.county}
            onChange={e => setForm({ ...form, county: e.target.value })}
            placeholder={country === 'UK' ? 'e.g. Greater Manchester' : 'e.g. Dublin'}
            className="input"
          />
        </Field>
        <Field label="Anything we should know?">
          <textarea
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            placeholder="Charges, container limits, hours, etc."
            rows={3}
            className="input resize-none"
          />
        </Field>
        <Field label="Your email (optional, for follow-up)">
          <input
            type="email"
            value={form.submitter_email}
            onChange={e => setForm({ ...form, submitter_email: e.target.value })}
            placeholder="you@example.com"
            className="input"
          />
        </Field>

        <button
          type="submit"
          className="h-12 rounded-full bg-olive text-cream font-semibold hover:bg-olive-2 inline-flex items-center justify-center gap-2 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Open email to submit
        </button>
      </form>

      <style>{`
        .input {
          width: 100%;
          background: var(--color-cream);
          border: 1px solid var(--color-line);
          border-radius: 12px;
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
          color: var(--color-ink);
        }
        .input:focus {
          outline: none;
          border-color: var(--color-olive);
          box-shadow: 0 0 0 3px rgb(61 91 70 / 0.2);
        }
      `}</style>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
      {children}
    </label>
  )
}
