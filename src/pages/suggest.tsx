import { useState } from 'react'
import { submitSuggestion } from '@/lib/api'
import { Loader2, Check } from 'lucide-react'

export default function SuggestPage() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    county: '',
    notes: '',
    submitter_email: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.address.trim()) return
    setStatus('sending')
    setError(null)
    try {
      await submitSuggestion(form)
      setStatus('sent')
    } catch (e: any) {
      setStatus('error')
      setError(e?.message ?? 'Submission failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-olive grid place-items-center">
          <Check className="w-6 h-6 text-cream" />
        </div>
        <h1 className="text-2xl font-bold mt-4">Thanks for the tip</h1>
        <p className="text-ink-2 mt-2">
          We'll check the details and add it to the map. If you left an email, you'll
          hear back once it's live.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md w-full mx-auto p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Suggest a drop-off</h1>
        <p className="text-sm text-ink-2 mt-2">
          Know a civic amenity site, bring centre, or collector that takes household
          cooking oil? Add it here. Submissions are reviewed before going live.
        </p>
      </header>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Place name *">
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Ringsend Civic Amenity Site"
            className="input" />
        </Field>
        <Field label="Address *">
          <textarea required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
            placeholder="Full street address with Eircode if known"
            rows={3}
            className="input resize-none" />
        </Field>
        <Field label="County">
          <input value={form.county} onChange={e => setForm({ ...form, county: e.target.value })}
            placeholder="e.g. Dublin"
            className="input" />
        </Field>
        <Field label="Anything we should know?">
          <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
            placeholder="Charges, container limits, hours, etc."
            rows={3}
            className="input resize-none" />
        </Field>
        <Field label="Your email (optional — for follow-up)">
          <input type="email" value={form.submitter_email} onChange={e => setForm({ ...form, submitter_email: e.target.value })}
            placeholder="you@example.com"
            className="input" />
        </Field>

        {error && <p className="text-sm text-rust">{error}</p>}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="h-11 rounded-pill bg-olive text-cream font-semibold hover:bg-olive-2 disabled:opacity-60 inline-flex items-center justify-center gap-2"
        >
          {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Submit
        </button>
      </form>

      <style>{`
        .input {
          width: 100%;
          background: var(--color-cream);
          border: 1px solid var(--color-line);
          border-radius: 10px;
          padding: 0.6rem 0.8rem;
          font-size: 0.9rem;
          color: var(--color-ink);
        }
        .input:focus {
          outline: none;
          border-color: var(--color-olive);
          box-shadow: 0 0 0 3px rgb(31 107 58 / 0.2);
        }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted">{label}</span>
      {children}
    </label>
  )
}
