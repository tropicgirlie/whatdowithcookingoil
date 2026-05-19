import { ShieldCheck, BadgeCheck, Users, HelpCircle } from 'lucide-react'
import type { PointConfidence } from '@/lib/types'
import { CONFIDENCE_LABEL } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  confidence: PointConfidence
  size?: 'sm' | 'md'
  withLabel?: boolean
}

const styles: Record<PointConfidence, { wrap: string; Icon: typeof ShieldCheck }> = {
  phone_verified: {
    wrap: 'bg-olive text-cream',
    Icon: ShieldCheck,
  },
  council_verified: {
    wrap: 'bg-olive-soft text-olive-2 border border-olive/20',
    Icon: BadgeCheck,
  },
  community_submitted: {
    wrap: 'bg-amber-soft text-amber-2 border border-amber/30',
    Icon: Users,
  },
  unverified: {
    wrap: 'bg-cream-2 text-muted border border-line/60',
    Icon: HelpCircle,
  },
}

export function ConfidenceBadge({ confidence, size = 'sm', withLabel = true }: Props) {
  const { wrap, Icon } = styles[confidence]
  const sizeClass = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
  const iconClass = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-pill',
        sizeClass,
        wrap,
      )}
      title={CONFIDENCE_LABEL[confidence]}
    >
      <Icon className={iconClass} />
      {withLabel && <span>{CONFIDENCE_LABEL[confidence]}</span>}
    </span>
  )
}
