import type { PointKind } from '@/lib/types'
import { cn } from '@/lib/utils'

export interface Filters {
  freeOnly: boolean
  householdOnly: boolean
  kinds: Set<PointKind>
}

export const EMPTY_FILTERS: Filters = {
  freeOnly: false,
  householdOnly: false,
  kinds: new Set(),
}

interface Props {
  value: Filters
  onChange: (next: Filters) => void
}

const KIND_CHIPS: Array<{ id: PointKind; label: string }> = [
  { id: 'civic', label: 'Civic amenity' },
  { id: 'bring_bank', label: 'Bring centre' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'community', label: 'Community' },
]

export function FilterChips({ value, onChange }: Props) {
  const toggleKind = (k: PointKind) => {
    const next = new Set(value.kinds)
    next.has(k) ? next.delete(k) : next.add(k)
    onChange({ ...value, kinds: next })
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Chip active={value.freeOnly} onClick={() => onChange({ ...value, freeOnly: !value.freeOnly })}>
        Free only
      </Chip>
      <Chip active={value.householdOnly} onClick={() => onChange({ ...value, householdOnly: !value.householdOnly })}>
        Household quantities
      </Chip>
      <span className="w-px h-5 bg-line/80 mx-1" />
      {KIND_CHIPS.map(c => (
        <Chip key={c.id} active={value.kinds.has(c.id)} onClick={() => toggleKind(c.id)}>
          {c.label}
        </Chip>
      ))}
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-xs font-medium px-3 py-1.5 rounded-pill border transition-colors',
        active
          ? 'border-olive bg-olive text-cream'
          : 'border-line/80 bg-cream hover:bg-cream-2 text-ink-2',
      )}
    >
      {children}
    </button>
  )
}
