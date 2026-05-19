import { useCountry } from '@/lib/country-context'
import { COUNTRY_FLAG, COUNTRY_LABEL, type Country } from '@/lib/types'
import { cn } from '@/lib/utils'

const COUNTRIES: Country[] = ['IE', 'UK']

export function CountrySwitcher({ compact = false }: { compact?: boolean }) {
  const { country, setCountry } = useCountry()
  return (
    <div className="inline-flex items-center gap-0.5 p-0.5 rounded-full bg-cream-2 border border-line/60">
      {COUNTRIES.map(c => {
        const active = c === country
        return (
          <button
            key={c}
            type="button"
            onClick={() => setCountry(c)}
            aria-pressed={active}
            title={`Switch to ${COUNTRY_LABEL[c]}`}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
              active
                ? 'bg-cream text-ink shadow-sm'
                : 'text-muted hover:text-ink-2',
            )}
          >
            <span aria-hidden="true" className="text-sm leading-none">{COUNTRY_FLAG[c]}</span>
            {!compact && <span>{c}</span>}
          </button>
        )
      })}
    </div>
  )
}
