import { Flame, Container, Recycle, Factory, Bus } from 'lucide-react'

const stages = [
  { Icon: Flame, label: 'Cool it down' },
  { Icon: Container, label: 'Bottle and store' },
  { Icon: Recycle, label: 'Drop at a centre' },
  { Icon: Factory, label: 'Filter and refine' },
  { Icon: Bus, label: 'Powers buses' },
]

const PATH_D = 'M 8 50 C 80 12, 152 88, 224 50 S 368 12, 440 50 S 584 88, 656 50'

export function RecycleJourney() {
  return (
    <div className="recycle-journey w-full max-w-3xl mx-auto">
      <style>{`
        .recycle-journey { --travel: 9s; }

        .recycle-journey .station {
          animation: rj-scale var(--travel) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
          transform-origin: center top;
        }
        .recycle-journey .station-1 { animation-delay: 0.9s; }
        .recycle-journey .station-2 { animation-delay: 2.7s; }
        .recycle-journey .station-3 { animation-delay: 4.5s; }
        .recycle-journey .station-4 { animation-delay: 6.3s; }
        .recycle-journey .station-5 { animation-delay: 8.1s; }
        @keyframes rj-scale {
          0%   { transform: scale(1); }
          2%   { transform: scale(1.16); }
          7%   { transform: scale(1); }
          100% { transform: scale(1); }
        }

        .recycle-journey .icon-wrap {
          animation: rj-tint var(--travel) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
        }
        .recycle-journey .station-1 .icon-wrap { animation-delay: 0.9s; }
        .recycle-journey .station-2 .icon-wrap { animation-delay: 2.7s; }
        .recycle-journey .station-3 .icon-wrap { animation-delay: 4.5s; }
        .recycle-journey .station-4 .icon-wrap { animation-delay: 6.3s; }
        .recycle-journey .station-5 .icon-wrap { animation-delay: 8.1s; }
        @keyframes rj-tint {
          0%   { background-color: var(--color-cream); border-color: rgba(31,107,58,0.25); box-shadow: 0 0 0 rgba(217,169,11,0); }
          2%   { background-color: var(--color-amber-soft); border-color: var(--color-amber-2); box-shadow: 0 0 18px rgba(217,169,11,0.55); }
          15%  { background-color: var(--color-olive-soft); border-color: rgba(31,107,58,0.4); box-shadow: 0 0 0 rgba(217,169,11,0); }
          100% { background-color: var(--color-cream); border-color: rgba(31,107,58,0.25); box-shadow: 0 0 0 rgba(217,169,11,0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .recycle-journey .station,
          .recycle-journey .icon-wrap,
          .recycle-journey svg .drop { animation: none !important; }
          .recycle-journey svg .drop { display: none; }
        }
      `}</style>

      <div className="relative">
        <svg
          viewBox="0 0 664 100"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-[22px] sm:top-[28px] w-full h-[60px] pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <path
            id="rj-path"
            d={PATH_D}
            fill="none"
            stroke="var(--color-olive)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            opacity="0.45"
          />

          <circle r="6" fill="var(--color-amber)" className="drop">
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              keyTimes="0;0.05;0.95;1"
              keySplines="0.4 0 0.2 1; 0 0 1 1; 0.4 0 0.2 1"
              calcMode="spline"
            >
              <mpath href="#rj-path" />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.05;0.95;1"
              dur="9s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        <div className="relative grid grid-cols-5 gap-1 sm:gap-2 pt-1">
          {stages.map(({ Icon, label }, i) => (
            <div key={label} className={`station station-${i + 1} flex flex-col items-center gap-2`}>
              <div
                className="icon-wrap w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 grid place-items-center"
                style={{ backgroundColor: 'var(--color-cream)', borderColor: 'rgba(31,107,58,0.25)' }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-olive-2" />
              </div>
              <p className="text-[10px] sm:text-xs font-medium text-ink-2 text-center leading-tight max-w-[88px]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm text-ink-2">
        <Stat value="1 L" label="your oil" />
        <Arrow />
        <Stat value="≈ 0.9 L" label="biodiesel" />
        <Arrow />
        <Stat value="≈ 12 km" label="bus travel" />
        <Arrow />
        <Stat value="2.5 kg" label="CO₂ avoided" highlight />
      </div>
    </div>
  )
}

function Stat({ value, label, highlight }: { value: string; label: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={highlight ? 'font-bold text-olive-2 text-sm sm:text-base' : 'font-semibold text-ink'}
      >
        {value}
      </span>
      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted">{label}</span>
    </div>
  )
}

function Arrow() {
  return (
    <span aria-hidden="true" className="text-olive/40 text-base">
      ›
    </span>
  )
}
