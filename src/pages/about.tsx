import { Link } from 'react-router-dom'
import {
  AlertCircle, Beaker, Sparkles, Building2, Truck, Users,
  ChevronRight, Flame, Recycle, ArrowRight,
} from 'lucide-react'
import { useCountry } from '@/lib/country-context'
import { COUNTRY_LABEL } from '@/lib/types'

export default function AboutPage() {
  const { country } = useCountry()
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pt-12 lg:pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-olive-2">
            The honest explainer
          </span>
          <h1 className="mt-3 font-serif text-[2.8rem] sm:text-5xl lg:text-[3.6rem] font-semibold tracking-tight leading-[1.02] text-ink">
            Why is it so hard to recycle <em className="not-italic text-olive" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}>cooking&nbsp;oil</em>?
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl mx-auto">
            There are two layers of "hard": the friction one citizen faces in their own kitchen,
            and the system above the kitchen that has never quite shown up. Most product writing
            stops at the first layer. The second one is the layer that actually matters.
          </p>
        </div>
      </section>

      {/* Section 1: Citizen friction */}
      <section className="w-full px-4 sm:px-8 py-14 sm:py-20 bg-cream-2/60 border-y border-line/40">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-olive-2">
              Layer 1, from the kitchen
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-[1.05]">
              The behaviour loop is five steps deep
            </h2>
            <p className="mt-3 text-base text-ink-2 leading-relaxed">
              Compare to glass recycling, which is one step (drop in the right bin). Each extra
              step roughly halves the completion rate. Five steps gets you to single-digit
              participation without forcing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberedCard n={1} title="The default mental model is wrong">
              People classify liquids as "down-the-sink" unless trained otherwise. Glass, paper
              and plastic each have a visible bin in the home. Oil has no equivalent default,
              so the workflow has to be actively invented every time.
            </NumberedCard>
            <NumberedCard n={2} title="The reward is invisible">
              A glass bottle clinks into a bin and you hear it land. A compost heap visibly grows.
              Pouring oil into a bottle and driving forty minutes to hand it over produces no
              haptic, no count, and no praise. The reinforcement loop is broken.
            </NumberedCard>
            <NumberedCard n={3} title="Acceptance varies site by site">
              Cork City refuses. Fingal accepts. Some councils don't publish a clear answer.
              Without a stable rule, the safe default is "probably won't work, just bin it."
            </NumberedCard>
            <NumberedCard n={4} title="Small quantities feel pointless">
              A litre a month feels too small to be worth a special trip. The maths agrees: drive
              twenty kilometres for one litre and the CO₂ from the drive cancels the saving from
              the recycling. People sense this intuitively.
            </NumberedCard>
            <NumberedCard n={5} title="Storage is a tax on counter space">
              Used oil needs a sealed container and lives somewhere visible until the trip
              happens. Renters and flat-dwellers literally don't have anywhere to put it.
            </NumberedCard>
            <NumberedCard n={6} title="Social proof is missing">
              Nobody asks "did you take the oil to the centre yet?" the way they ask about
              composting or fast fashion. There's no peer pressure either way, which means the
              behaviour stays optional and rare.
            </NumberedCard>
            <NumberedCard n={7} title="Diffusion of responsibility">
              Is this on you, the council, the food industry, or the government? When
              responsibility is unclear, no one feels acutely accountable, and the path of least
              resistance wins.
            </NumberedCard>
          </div>
        </div>
      </section>

      {/* Section 2: Systemic absence */}
      <section className="w-full px-4 sm:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-rust">
              Layer 2, from above the kitchen
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-[1.05]">
              No one with power has been motivated to fix it
            </h2>
            <p className="mt-3 text-base text-ink-2 leading-relaxed">
              The friction in the kitchen is real, but it's a symptom. Even a perfect UX won't
              fix this on its own. The system has to be re-pointed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <NumberedCard n={1} title="Economically uninteresting at household scale" tone="rust">
              A litre of used oil is worth roughly 50 cents to 1 euro as biodiesel feedstock. A
              tanker cannot afford to collect from individual homes. Commercial collectors
              (Frylite, Olleco, Bolton Biofuels) skim the valuable restaurant stream and leave
              the dispersed household stream alone. This is a market failure, not a moral one.
            </NumberedCard>
            <NumberedCard n={2} title="Biofuel obligations are met by imports" tone="rust">
              Ireland's RTFO and the UK equivalent are quietly satisfied with imported used
              cooking oil, much of it from China, much of it flagged for fraud. Because the
              obligation is met, there is no commercial demand for domestic household
              collection. The system literally doesn't need your oil.
            </NumberedCard>
            <NumberedCard n={3} title="Cooking oil sits in a regulatory hole" tone="rust">
              Not classified as hazardous (no urgency). Not packaging (Repak doesn't cover it).
              Not WEEE. It falls between every Producer Responsibility Initiative that exists
              in Ireland, so no scheme is required to deal with it.
            </NumberedCard>
            <NumberedCard n={4} title="No producer take-back obligation" tone="rust">
              The companies that put oil on supermarket shelves pay nothing toward its
              end-of-life. The plastic bottle, yes (via Repak). The oil inside, no.
            </NumberedCard>
            <NumberedCard n={5} title="No statutory mandate" tone="rust">
              EU directives don't require household UCO collection. Italy chose to mandate it
              in 1997 (the CONOE consortium). Spain just did, with Law 7/2022 making household
              collection legally required from January 2026. {COUNTRY_LABEL[country]} hasn't.
            </NumberedCard>
          </div>

          {/* Spain callout */}
          <div className="mt-10 rounded-3xl bg-olive p-7 sm:p-9 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
              <div className="flex-none flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cream">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-olive" fill="currentColor" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase text-amber-soft mb-2">
                  The peer precedent
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-cream leading-[1.05]">
                  Spain just made household cooking oil collection mandatory.
                </h3>
                <p className="mt-2 text-sm sm:text-base text-cream/85 leading-relaxed">
                  Law 7/2022 obliges every municipality to provide separate collection of
                  household used cooking oil from <strong>1 January 2026</strong>. Spain had no
                  pre-existing CONOE-style consortium. It just legislated. {COUNTRY_LABEL[country]} can do the same.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What could fix it */}
      <section className="w-full px-4 sm:px-8 py-14 sm:py-20 bg-cream-2/60 border-y border-line/40">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-olive-2">
              What would actually move the needle
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-[1.05]">
              Alternatives, sorted by leverage
            </h2>
            <p className="mt-3 text-base text-ink-2 leading-relaxed">
              Low-leverage interventions help individuals act. High-leverage interventions
              re-point the system so the individual act becomes routine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TierCard
              Icon={Users}
              tier="Tier 1"
              level="Behavioural"
              note="Cheap and local. Helps, but won't move the needle alone."
              items={[
                'Free branded sealed bottles distributed through supermarkets so storage stops being a chore.',
                'Aggregate trips. Pair UCO drop-off with textiles, WEEE and batteries on one visit to drop cost-per-step.',
                'Visible progress feedback: "your county recycled X litres this month." Add the missing reinforcement loop.',
                'Habit anchors. Council letters timed to school terms and big-cook periods like Christmas.',
              ]}
            />
            <TierCard
              Icon={Building2}
              tier="Tier 2"
              level="Municipal"
              note="Medium leverage. The single highest cost-effectiveness ratio sits here."
              items={[
                'Mandate every civic amenity site to accept household UCO and publish a machine-readable feed.',
                'Brighton-style kerbside collection: monthly UCO pickup from the doorstep on a known day.',
                'Bring banks at supermarkets, schools and transit hubs. Density beats centralisation (Italian model).',
                'App-driven pickup-on-request (German and Italian models). One tap, one slot.',
              ]}
            />
            <TierCard
              Icon={Recycle}
              tier="Tier 3"
              level="National policy"
              note="Highest leverage. The actual fix."
              items={
                country === 'UK'
                  ? [
                      'Add UCO to Environment Act 2021 EPR powers via DEFRA consultation and Statutory Instrument.',
                      'Mirror Spain Law 7/2022: require local authorities to provide household UCO collection from a fixed date.',
                      'Domestic floor on RTFO: fuel suppliers must source X% of biofuel obligation from UK-collected UCO.',
                      'Per-litre environmental contribution embedded in cooking-oil retail price, CONOE model. Funds collection.',
                    ]
                  : [
                      'Add UCO as Ireland\'s 7th Producer Responsibility Initiative under the Waste Management Act 1996. Same legal mechanism as Repak and WEEE Ireland.',
                      'Mirror Spain Law 7/2022: require every local authority to provide household UCO collection from a fixed date.',
                      'Domestic floor on the biofuels obligation (NORA / RTFO): fuel suppliers must source X% from Irish-collected UCO.',
                      'Per-litre environmental contribution embedded in cooking-oil retail price, CONOE model. Funds the scheme without taxpayer money.',
                    ]
              }
            />
            <TierCard
              Icon={Truck}
              tier="Tier 4"
              level="Industry and market"
              note="Useful complements. Won't work without Tiers 2 and 3 above."
              items={[
                'Compensation framing at household scale: "your 2 L is worth roughly €2 of biodiesel." Doesn\'t need to pay out, the framing is the lever.',
                'Retailers as drop-off points. Lidl, Tesco and SuperValu already host glass and battery banks; UCO bays cost little and add huge coverage.',
                'Restaurant partnerships. Your local takeaway accepts your household bottle when their collector calls. Free for everyone, no truck needed.',
                'Branded recycling-ready packaging on cooking-oil bottles, with a QR code linking to OilCycle or its successor.',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Section 4: How recycling actually works */}
      <section className="w-full px-4 sm:px-8 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-olive-2">
              The chemistry
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-[1.05]">
              How oil is actually recycled
            </h2>
            <p className="mt-3 text-base text-ink-2 leading-relaxed">
              Two industrial pathways do almost all of it. Neither is the bottleneck.
              The bottleneck is always the first mile from kitchen to tank.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PathwayCard
              tag="Pathway 1"
              name="Transesterification → FAME biodiesel"
              dominantIn="Italy, Germany, France, most of Europe"
              steps={[
                'Filter solids out of the oil (food bits, char).',
                'Dewater it.',
                'React with methanol and a catalyst (sodium or potassium hydroxide).',
                'Output: fatty-acid methyl esters (FAME) plus glycerol as a co-product.',
                'Blend at 7% (B7), 30% (B30), or sell pure (B100).',
              ]}
              yieldNote="Around 90% by volume."
            />
            <PathwayCard
              tag="Pathway 2"
              name="Hydrotreatment → renewable diesel (HVO)"
              dominantIn="Eni Porto Marghera (Italy), Neste (Rotterdam, Singapore)"
              steps={[
                'Same UCO feedstock as Pathway 1.',
                'React with hydrogen at high temperature and pressure with a catalyst.',
                'Output: paraffinic hydrocarbons indistinguishable from fossil diesel.',
                'Drops directly into existing diesel infrastructure, no blending wall.',
                'Commands a premium price over FAME.',
              ]}
              yieldNote="Higher-quality fuel, slightly lower volume yield."
            />
          </div>

          <div className="mt-6 rounded-3xl bg-cream-2/40 border border-line/60 p-6 text-sm sm:text-base text-ink-2 leading-relaxed">
            <p>
              Smaller-scale uses exist (soap saponification, polyols, niche bioplastics, animal
              feed where still permitted) but together they account for a tiny share of European
              UCO volume. The bottleneck is never the chemistry. It is always the first mile.
              Solve that and the rest of the supply chain happily takes care of itself, because
              biofuel processors are starved for feedstock and willing to pay for it.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Where OilCycle fits + how to prep */}
      <section className="w-full px-4 sm:px-8 py-14 sm:py-20 bg-cream-2/60 border-y border-line/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-olive-2">
              Where this site fits
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-[1.05]">
              The easy half of the answer
            </h2>
            <p className="mt-3 text-base text-ink-2 max-w-xl mx-auto leading-relaxed">
              OilCycle is the layer-1 fix: an honest, free map of every household-friendly
              drop-off in {COUNTRY_LABEL[country]}, so that step three of the five-step loop
              stops being a guess. The layer-2 fix is policy work and takes years. Both,
              eventually.
            </p>
          </div>

          <div className="rounded-3xl bg-cream border border-line/60 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-olive-soft">
                <Flame className="w-5 h-5 text-olive" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-ink">
                How to prep your oil before a drop-off
              </h3>
            </div>
            <ol className="flex flex-col gap-2 text-sm sm:text-base text-ink-2 list-decimal pl-5 leading-relaxed">
              <li>Let it cool fully before handling. Hot oil melts plastic.</li>
              <li>Strain food bits with a paper towel or coffee filter.</li>
              <li>Pour into a sealed plastic bottle (old milk jug, water bottle).</li>
              <li>Cap tightly, label "USED COOKING OIL", and store somewhere dry.</li>
              <li>Drop at a point listed on OilCycle. Most accept up to roughly 5 L per visit.</li>
            </ol>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-olive text-cream font-semibold hover:bg-olive-2 transition-colors"
            >
              Find a drop-off near you
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dispose"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-cream border border-line/80 text-ink-2 font-semibold hover:bg-cream-2 transition-colors"
            >
              What if I can't get to one?
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Sources + attribution */}
      <section className="w-full px-4 sm:px-8 py-12">
        <div className="max-w-3xl mx-auto rounded-3xl bg-olive-soft border border-olive/30 p-6 sm:p-7 text-sm text-ink-2 leading-relaxed">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-olive-2 flex-none mt-0.5" />
            <div>
              <p>
                OilCycle is independent, free, and not affiliated with any council or collector.
                Data comes from{' '}
                <a className="underline" href="https://mywaste.ie/" target="_blank" rel="noreferrer">MyWaste.ie</a>,{' '}
                <a className="underline" href="https://www.recyclenow.com/" target="_blank" rel="noreferrer">Recycle Now</a>,{' '}
                <a className="underline" href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">OpenStreetMap</a>,
                local council pages and you. Inspired by Italy's{' '}
                <a className="underline" href="https://junkerapp.it/en/" target="_blank" rel="noreferrer">Junker</a>.
              </p>
              <p className="mt-2">
                Research notes behind this page, including the legal mechanism for adding UCO as
                Ireland's 7th Producer Responsibility Initiative under the Waste Management Act
                1996, live with the project's source code.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function NumberedCard({
  n,
  title,
  children,
  tone = 'olive',
}: {
  n: number
  title: string
  children: React.ReactNode
  tone?: 'olive' | 'rust'
}) {
  const ring = tone === 'rust' ? 'bg-rust text-cream' : 'bg-olive text-cream'
  return (
    <article className="rounded-3xl bg-cream border border-line/60 p-5 sm:p-6 flex gap-4 shadow-sm">
      <span className={`flex-none w-8 h-8 rounded-full grid place-items-center text-sm font-bold ${ring}`}>
        {n}
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-ink tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-sm sm:text-[15px] text-ink-2 leading-relaxed">{children}</p>
      </div>
    </article>
  )
}

function TierCard({
  Icon,
  tier,
  level,
  note,
  items,
}: {
  Icon: typeof Users
  tier: string
  level: string
  note: string
  items: string[]
}) {
  return (
    <article className="rounded-3xl bg-cream border border-line/60 p-6 sm:p-7 flex flex-col gap-4 shadow-sm">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-olive-soft">
            <Icon className="w-5 h-5 text-olive" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-olive-2">{tier}</p>
            <h3 className="text-lg sm:text-xl font-bold text-ink tracking-tight">{level}</h3>
          </div>
        </div>
      </header>
      <p className="text-xs sm:text-sm text-muted italic leading-snug">{note}</p>
      <ul className="flex flex-col gap-2.5 text-sm text-ink-2 leading-relaxed">
        {items.map(item => (
          <li key={item} className="flex gap-2">
            <span className="text-olive-2 flex-none mt-0.5">›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function PathwayCard({
  tag,
  name,
  dominantIn,
  steps,
  yieldNote,
}: {
  tag: string
  name: string
  dominantIn: string
  steps: string[]
  yieldNote: string
}) {
  return (
    <article className="rounded-3xl bg-cream border border-line/60 p-6 sm:p-7 flex flex-col gap-4 shadow-sm">
      <header className="flex items-center gap-3">
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-amber-soft">
          <Beaker className="w-5 h-5 text-amber-2" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-amber-2">{tag}</p>
          <h3 className="text-lg sm:text-xl font-bold text-ink tracking-tight leading-tight">{name}</h3>
        </div>
      </header>
      <p className="text-xs sm:text-sm text-muted">Dominant in: {dominantIn}</p>
      <ol className="flex flex-col gap-2 text-sm text-ink-2 list-decimal pl-5 leading-relaxed">
        {steps.map(step => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="text-xs sm:text-sm text-muted italic">{yieldNote}</p>
    </article>
  )
}
