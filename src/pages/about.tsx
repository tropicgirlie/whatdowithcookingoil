import { Link } from 'react-router-dom'
import { AlertCircle, Sparkles, ArrowRight, ChevronRight } from 'lucide-react'
import { useCountry } from '@/lib/country-context'
import { COUNTRY_LABEL } from '@/lib/types'

export default function AboutPage() {
  const { country } = useCountry()
  return (
    <article className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-olive-2 mb-4">
            The honest explainer
          </p>
          <h1 className="font-serif text-[2.6rem] sm:text-5xl lg:text-[3.6rem] font-semibold tracking-tight leading-[1.02] text-ink max-w-3xl">
            Why is it so hard to recycle{' '}
            <em
              className="not-italic text-olive"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}
            >
              cooking&nbsp;oil
            </em>
            ?
          </h1>
          <p className="mt-6 text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl">
            There are two layers of "hard": the friction one person feels in their own
            kitchen, and the system above the kitchen that has never quite shown up. Most
            product writing stops at the first layer. The second is the one that actually
            matters.
          </p>
        </div>
      </section>

      <Divider />

      {/* Layer 1, citizen friction */}
      <Block kicker="Layer 1, from the kitchen" tone="olive">
        <SectionHeading>
          The behaviour loop is five steps deep
        </SectionHeading>
        <Lede>
          Compare to glass recycling, which is one step (drop in the right bin). Each
          extra step roughly halves completion. Five steps gets you to single-digit
          participation without forcing.
        </Lede>

        <NumberedList>
          <NumberedItem n={1} title="The default mental model is wrong">
            People classify liquids as "down-the-sink" unless trained otherwise. Glass,
            paper and plastic each have a visible bin in the home. Oil has no equivalent
            default, so the workflow has to be invented every time.
          </NumberedItem>
          <NumberedItem n={2} title="The reward is invisible">
            A glass bottle clinks into a bin and you hear it land. A compost heap visibly
            grows. Pouring oil into a bottle and driving forty minutes to hand it over
            produces no haptic, no count, no praise. The reinforcement loop is broken.
          </NumberedItem>
          <NumberedItem n={3} title="Acceptance varies site by site">
            Cork City refuses. Fingal accepts. Some councils don't publish a clear
            answer. Without a stable rule, the safe default is "probably won't work,
            just bin it."
          </NumberedItem>
          <NumberedItem n={4} title="Small quantities feel pointless">
            A litre a month feels too small for a special trip. Drive twenty kilometres
            for one litre and the CO₂ from the drive cancels the saving from the
            recycling. People sense this intuitively.
          </NumberedItem>
          <NumberedItem n={5} title="Storage is a tax on counter space">
            Used oil needs a sealed container and lives somewhere visible until the trip
            happens. Renters and flat-dwellers literally don't have anywhere to put it.
          </NumberedItem>
          <NumberedItem n={6} title="Social proof is missing">
            Nobody asks "did you take the oil to the centre yet?" the way they ask about
            composting or fast fashion. There's no peer pressure either way, so the
            behaviour stays optional and rare.
          </NumberedItem>
          <NumberedItem n={7} title="Diffusion of responsibility">
            Is this on you, the council, the food industry, or the government? When
            responsibility is unclear, no one feels accountable and the path of least
            resistance wins.
          </NumberedItem>
        </NumberedList>
      </Block>

      <Divider />

      {/* Layer 2, systemic absence */}
      <Block kicker="Layer 2, from above the kitchen" tone="rust">
        <SectionHeading>
          <em className="not-italic text-rust">No one with power</em> has been motivated to fix it
        </SectionHeading>
        <Lede>
          The friction in the kitchen is real, but it is a symptom. Even a perfect UX
          will not fix this on its own. The system has to be re-pointed.
        </Lede>

        <NumberedList>
          <NumberedItem n={1} title="Economically uninteresting at household scale" tone="rust">
            A litre of used oil is worth roughly 50 cents to 1 euro as biodiesel
            feedstock. A tanker cannot afford to collect from individual homes.
            Commercial collectors (Frylite, Olleco, Bolton Biofuels) skim the valuable
            restaurant stream and leave the dispersed household stream alone. Market
            failure, not a moral one.
          </NumberedItem>
          <NumberedItem n={2} title="Biofuel obligations are met by imports" tone="rust">
            Ireland's RTFO and the UK equivalent are quietly satisfied with imported
            used cooking oil, much of it from China, much of it flagged for fraud.
            Because the obligation is met, there is no commercial demand for domestic
            household collection. The system does not need your oil.
          </NumberedItem>
          <NumberedItem n={3} title="Cooking oil sits in a regulatory hole" tone="rust">
            Not classified as hazardous (no urgency). Not packaging (Repak doesn't
            cover it). Not WEEE. It falls between every Producer Responsibility
            Initiative that exists in Ireland, so no scheme is required to deal with it.
          </NumberedItem>
          <NumberedItem n={4} title="No producer take-back obligation" tone="rust">
            The companies that put oil on supermarket shelves pay nothing toward its
            end-of-life. The plastic bottle, yes (via Repak). The oil inside, no.
          </NumberedItem>
          <NumberedItem n={5} title="No statutory mandate" tone="rust">
            EU directives don't require household UCO collection. Italy chose to
            mandate it in 1997 (the CONOE consortium). Spain just did, with Law 7/2022
            making household collection legally required from January 2026.{' '}
            {COUNTRY_LABEL[country]} hasn't.
          </NumberedItem>
        </NumberedList>
      </Block>

      {/* Spain callout: deliberate accent */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl bg-olive text-cream p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-cream flex-none">
              <Sparkles className="w-6 h-6 text-olive" fill="currentColor" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-amber-soft mb-2">
                The peer precedent
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.05] text-cream">
                Spain just made household cooking oil collection mandatory.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-cream/85 leading-relaxed">
                Law 7/2022 obliges every municipality to provide separate collection of
                household used cooking oil from <strong>1 January 2026</strong>. No
                pre-existing CONOE-style consortium needed. They just legislated.{' '}
                {COUNTRY_LABEL[country]} can do the same.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Alternatives, sorted by leverage */}
      <Block kicker="What would actually move the needle" tone="olive">
        <SectionHeading>
          Alternatives, sorted by <em className="not-italic text-olive">leverage</em>
        </SectionHeading>
        <Lede>
          Low-leverage interventions help individuals act. High-leverage interventions
          re-point the system so the act becomes routine.
        </Lede>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12 mt-8">
          <Tier
            tier="Tier 1"
            level="Behavioural"
            note="Cheap and local. Helps. Won't move the needle alone."
            items={[
              'Free branded sealed bottles distributed through supermarkets so storage stops being a chore.',
              'Aggregate trips. Pair UCO drop-off with textiles, WEEE and batteries on one visit to drop cost-per-step.',
              'Visible progress feedback: "your county recycled X litres this month."',
              'Habit anchors. Council letters timed to school terms and Christmas batch-cooking.',
            ]}
          />
          <Tier
            tier="Tier 2"
            level="Municipal"
            note="Medium leverage. Best cost-effectiveness ratio sits here."
            items={[
              'Mandate every civic amenity site to accept household UCO and publish a machine-readable feed.',
              'Brighton-style kerbside collection: monthly UCO pickup from the doorstep on a known day.',
              'Bring banks at supermarkets, schools and transit hubs. Density beats centralisation (Italian model).',
              'App-driven pickup-on-request (German and Italian models). One tap, one slot.',
            ]}
          />
          <Tier
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
                    "Add UCO as Ireland's 7th Producer Responsibility Initiative under the Waste Management Act 1996. Same legal mechanism as Repak and WEEE Ireland.",
                    'Mirror Spain Law 7/2022: require every local authority to provide household UCO collection from a fixed date.',
                    'Domestic floor on the biofuels obligation (NORA / RTFO): fuel suppliers must source X% from Irish-collected UCO.',
                    'Per-litre environmental contribution embedded in cooking-oil retail price, CONOE model. Funds the scheme without taxpayer money.',
                  ]
            }
          />
          <Tier
            tier="Tier 4"
            level="Industry and market"
            note="Useful complements. Won't work without Tiers 2 and 3 above."
            items={[
              'Compensation framing at household scale: "your 2 L is worth roughly €2 of biodiesel." The framing itself is the lever.',
              'Retailers as drop-off points. Lidl, Tesco and SuperValu already host glass and battery banks; UCO bays cost little and add huge coverage.',
              'Restaurant partnerships. Your local takeaway accepts your household bottle when their collector calls. Free for everyone, no truck needed.',
              'Branded recycling-ready packaging on cooking-oil bottles, with a QR code linking to OilCycle or its successor.',
            ]}
          />
        </div>
      </Block>

      <Divider />

      {/* Chemistry */}
      <Block kicker="The chemistry" tone="olive">
        <SectionHeading>How oil is actually recycled</SectionHeading>
        <Lede>
          Two industrial pathways do almost all of it. Neither is the bottleneck.
          The bottleneck is always the first mile, kitchen to tank.
        </Lede>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12 mt-8">
          <Pathway
            tag="Pathway 1"
            name="Transesterification, FAME biodiesel"
            dominantIn="Italy, Germany, France, most of Europe"
            steps={[
              'Filter solids out (food bits, char).',
              'Dewater it.',
              'React with methanol and a catalyst (sodium or potassium hydroxide).',
              'Output: fatty-acid methyl esters (FAME) plus glycerol as a co-product.',
              'Blend at 7% (B7), 30% (B30), or sell pure (B100).',
            ]}
            yieldNote="Around 90% by volume."
          />
          <Pathway
            tag="Pathway 2"
            name="Hydrotreatment, renewable diesel (HVO)"
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

        <p className="mt-10 text-base text-ink-2 leading-relaxed max-w-3xl">
          Smaller-scale uses exist (soap saponification, polyols, niche bioplastics,
          animal feed where still permitted) but together they account for a tiny share
          of European UCO volume. The bottleneck is never the chemistry. It is always
          the first mile. Solve that and the rest of the supply chain takes care of
          itself, because biofuel processors are starved for feedstock and willing to
          pay for it.
        </p>
      </Block>

      <Divider />

      {/* Where this site fits */}
      <Block kicker="Where this site fits" tone="olive">
        <SectionHeading>The easy half of the answer</SectionHeading>
        <p className="mt-3 text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl">
          OilCycle is the layer-1 fix: an honest, free map of every household-friendly
          drop-off in {COUNTRY_LABEL[country]}, so step three of the five-step loop
          stops being a guess. The layer-2 fix is policy work and takes years. Both,
          eventually.
        </p>

        <div className="mt-8 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-olive-2 mb-3">
            How to prep your oil
          </p>
          <ol className="flex flex-col gap-2 text-base text-ink-2 list-decimal pl-5 leading-relaxed marker:text-olive marker:font-semibold">
            <li>Let it cool fully before handling. Hot oil melts plastic.</li>
            <li>Strain food bits with a paper towel or coffee filter.</li>
            <li>Pour into a sealed plastic bottle (old milk jug, water bottle).</li>
            <li>Cap tightly, label "USED COOKING OIL", store somewhere dry.</li>
            <li>Drop at a point listed on OilCycle. Most accept up to roughly 5 L per visit.</li>
          </ol>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-olive text-cream font-semibold hover:bg-olive-2 transition-colors"
          >
            Find a drop-off near you
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/dispose"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-ink-2 font-semibold hover:bg-cream-2 transition-colors"
          >
            What if I can't get to one?
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </Block>

      <Divider />

      {/* Sources */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 items-start text-sm text-muted leading-relaxed max-w-3xl">
            <AlertCircle className="w-4 h-4 text-olive-2 flex-none mt-0.5" />
            <div>
              <p>
                OilCycle is independent, free, and not affiliated with any council or
                collector. Data comes from{' '}
                <a className="underline text-ink-2" href="https://mywaste.ie/" target="_blank" rel="noreferrer">MyWaste.ie</a>,{' '}
                <a className="underline text-ink-2" href="https://www.recyclenow.com/" target="_blank" rel="noreferrer">Recycle Now</a>,{' '}
                <a className="underline text-ink-2" href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">OpenStreetMap</a>,
                local council pages and you. Inspired by Italy's{' '}
                <a className="underline text-ink-2" href="https://junkerapp.it/en/" target="_blank" rel="noreferrer">Junker</a>.
              </p>
              <p className="mt-2">
                Research notes behind this page, including the legal mechanism for
                adding UCO as Ireland's 7th Producer Responsibility Initiative under
                the Waste Management Act 1996, live with the project's source code.
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

function Divider() {
  return (
    <div className="px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto"><div className="rule" /></div>
    </div>
  )
}

function Block({
  kicker,
  tone,
  children,
}: {
  kicker: string
  tone: 'olive' | 'rust'
  children: React.ReactNode
}) {
  const kickerColor = tone === 'rust' ? 'text-rust' : 'text-olive-2'
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <p className={`text-[11px] font-semibold tracking-[0.18em] uppercase mb-3 ${kickerColor}`}>
          {kicker}
        </p>
        {children}
      </div>
    </section>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-ink leading-[1.05] max-w-3xl">
      {children}
    </h2>
  )
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl">{children}</p>
  )
}

function NumberedList({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 mt-10">{children}</div>
  )
}

function NumberedItem({
  n,
  title,
  tone = 'olive',
  children,
}: {
  n: number
  title: string
  tone?: 'olive' | 'rust'
  children: React.ReactNode
}) {
  const color = tone === 'rust' ? 'text-rust' : 'text-olive'
  return (
    <div className="flex gap-5">
      <span className={`font-serif text-5xl sm:text-6xl font-semibold leading-none flex-none w-12 ${color}`}>
        {n}
      </span>
      <div className="flex flex-col gap-2 pt-1">
        <h3 className="text-base sm:text-lg font-semibold text-ink tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-sm sm:text-[15px] text-ink-2 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function Tier({
  tier,
  level,
  note,
  items,
}: {
  tier: string
  level: string
  note: string
  items: string[]
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-olive-2">{tier}</span>
        <h3 className="font-serif text-2xl sm:text-[1.7rem] font-semibold tracking-tight text-ink leading-none">
          {level}
        </h3>
      </div>
      <p className="text-sm text-muted italic leading-snug max-w-md">{note}</p>
      <ul className="flex flex-col gap-2.5 text-sm sm:text-[15px] text-ink-2 leading-relaxed mt-2">
        {items.map(item => (
          <li key={item} className="flex gap-2.5">
            <span className="text-olive-2 flex-none">›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Pathway({
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
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-amber-2">{tag}</span>
      </div>
      <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-ink leading-snug">
        {name}
      </h3>
      <p className="text-xs sm:text-sm text-muted italic">Dominant in: {dominantIn}</p>
      <ol className="flex flex-col gap-2 text-sm sm:text-[15px] text-ink-2 list-decimal pl-5 leading-relaxed marker:text-olive-2 marker:font-semibold mt-2">
        {steps.map(step => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="text-xs sm:text-sm text-muted italic mt-1">{yieldNote}</p>
    </div>
  )
}
