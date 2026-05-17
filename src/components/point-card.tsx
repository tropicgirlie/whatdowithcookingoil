import { Link } from 'react-router-dom'
import type { PointWithDistance } from '@/lib/types'
import { KIND_LABEL } from '@/lib/types'
import { formatDistance } from '@/lib/distance'
import { cn } from '@/lib/utils'
import { MapPin, Euro, Sparkles } from 'lucide-react'

interface Props {
  point: PointWithDistance
  active?: boolean
  onHover?: (id: string | undefined) => void
}

export function PointCard({ point, active, onHover }: Props) {
  return (
    <Link
      to={`/places/${point.id}`}
      onMouseEnter={() => onHover?.(point.id)}
      onMouseLeave={() => onHover?.(undefined)}
      className={cn(
        'block rounded-card border bg-cream-2/40 p-4 transition-colors hover:border-olive/60',
        active ? 'border-olive bg-olive-soft' : 'border-line/60',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-ink truncate">{point.name}</h3>
          <p className="text-xs text-muted mt-0.5">{KIND_LABEL[point.kind]}</p>
        </div>
        <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-pill bg-olive text-cream">
          {formatDistance(point.distance_m)}
        </span>
      </div>

      <p className="text-sm text-ink-2 mt-2 line-clamp-2 flex items-start gap-1.5">
        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted" />
        <span>{point.address}</span>
      </p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {point.fee === 'free' && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-pill bg-olive-soft text-olive-2">Free</span>
        )}
        {point.fee === 'paid' && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-pill bg-amber-soft text-amber-2 flex items-center gap-1">
            <Euro className="w-3 h-3" /> Paid
          </span>
        )}
        {point.accepts_household_quantity && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-pill bg-cream-2 text-ink-2">Household OK</span>
        )}
        {point.last_verified_at && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-pill bg-cream-2 text-muted flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Verified
          </span>
        )}
      </div>
    </Link>
  )
}
