import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'

export default function DisposePage() {
  return (
    <article className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-olive-2 mb-4">
            For Irish households
          </p>
          <h1 className="font-serif text-[2.4rem] sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.02] text-ink max-w-3xl">
            What can I do with my{' '}
            <em
              className="not-italic text-olive"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}
            >
              used&nbsp;cooking&nbsp;oil
            </em>
            ?
          </h1>
          <p className="mt-6 text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl">
            Honest answers for the 0.5 to 2 litres a typical household goes through each
            month. No greenwashing, no hobby projects dressed up as solutions.
          </p>
        </div>
      </section>

      <Divider />

      {/* Short answer */}
      <Block kicker="The short answer">
        <SectionHeading>Three steps, in order</SectionHeading>
        <ol className="mt-8 flex flex-col gap-6 max-w-2xl">
          <NumberedStep n={1} title="Reuse it 2 to 3 times">
            Strain hot oil through muslin or a coffee filter, store in a sealed jar
            somewhere dark. Bin it when it goes dark brown, foamy, smells acrid, or
            smokes below normal temperature.
          </NumberedStep>
          <NumberedStep n={2} title="Wipe small residues into the brown bin">
            Under 200 ml left in a pan? Wipe it up with kitchen paper and put the paper
            in your brown food-waste bin. This is the official MyWaste.ie advice.
          </NumberedStep>
          <NumberedStep n={3} title="Drop 1 to 2 litres at a verified centre">
            Once you've stored up a bottle, cool fully, decant into a sealed plastic
            bottle, and drop it at a civic amenity site that accepts cooking oil. Not
            every site does, so check first.
          </NumberedStep>
        </ol>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-olive text-cream font-semibold hover:bg-olive-2 transition-colors"
        >
          Find a drop-off near you <ArrowRight className="w-4 h-4" />
        </Link>
      </Block>

      <Divider />

      {/* Don'ts */}
      <Block kicker="The hard no list" tone="rust">
        <SectionHeading>
          What absolutely <em className="not-italic text-rust">not</em> to do
        </SectionHeading>
        <ul className="mt-8 flex flex-col gap-5 max-w-2xl text-base text-ink-2 leading-relaxed">
          <Dont title="Don't pour it down the sink or toilet">
            Causes fatbergs. Dublin spends roughly half a million euro a year clearing
            fat-related sewer blockages.
          </Dont>
          <Dont title="Don't pour it on soil or the garden">
            It coats the soil, kills microfauna, repels water and attracts vermin.
          </Dont>
          <Dont title="Don't put liquid oil in your home compost or brown bin">
            It goes anaerobic, smells, and draws rats. Oil-soaked kitchen paper is fine,
            free liquid is not.
          </Dont>
          <Dont title="Don't feed it to wildlife or pets">
            RSPB warns explicitly: rancid oil ruins bird feathers and risks salmonella.
            For dogs and cats, fatty leftovers can trigger pancreatitis.
          </Dont>
          <Dont title="Don't burn it in a fire pit or barbecue">
            Flare-ups, and PM2.5 air pollution that defeats the point of recycling it.
          </Dont>
        </ul>
      </Block>

      <Divider />

      {/* When is oil done */}
      <Block kicker="When to bin it">
        <SectionHeading>How do I know when oil is done?</SectionHeading>
        <p className="mt-4 text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl">
          Any one of these is a bin-it signal.
        </p>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-base text-ink-2 max-w-3xl">
          {[
            'Dark brown colour',
            'Persistent foam on top',
            'Acrid or rancid smell',
            'Smokes below normal frying temp',
            'Syrupy or sticky texture',
            'Cooked strong-flavoured food (fish, garlic)',
          ].map(s => (
            <li key={s} className="flex gap-2">
              <span className="text-olive-2 flex-none">›</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Divider />

      {/* DIY options */}
      <Block kicker="DIY options worth knowing">
        <SectionHeading>
          The honest take on each
        </SectionHeading>
        <p className="mt-4 text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl">
          People often ask about these. Verdict up front, detail behind the click.
        </p>

        <div className="mt-8 max-w-3xl flex flex-col">
          <Diy title="Home soap-making" verdict="Possible, but a hobby, not a waste plan.">
            One litre of used oil gives you roughly 7 to 9 bars of soap. The catch:
            cold-process soap requires sodium hydroxide (lye), which causes severe
            chemical burns and toxic fumes if mishandled. Used-oil bars tend to be soft,
            faintly smell of the fryer, and fail to "trace" on a first attempt. Suitable
            for committed hobbyists with proper PPE, a kitchen scale, and a saponification
            calculator. Not a realistic monthly disposal route.
          </Diy>
          <Diy title="Making your own biodiesel" verdict="Effectively blocked by Irish law.">
            In Ireland you need Revenue authorisation as a warehousekeeper to produce
            biofuel, with a limited "exempt producer" status under 2,500 L per year that
            still requires notification. Using untaxed home biodiesel as motor fuel is
            not permitted. On top of that, the process uses methanol and sodium
            methoxide, both acutely toxic and flammable, and a hobby processor costs
            several hundred euro plus ventilation. Treat this as fantasy unless you are
            already an enthusiast.
          </Diy>
          <Diy title="Composting cooking oil" verdict="No for liquid, yes for oil-soaked paper.">
            Free liquid oil coats compost material, blocks airflow, makes the pile
            anaerobic, and attracts rats and flies. A small amount of oil-soaked kitchen
            paper is tolerable in a well-managed hot heap (above 55°C, turned regularly).
            Bokashi can ferment trace fats but an excess liquid layer kills the culture.
            Oily paper towels, fine. Liquid oil, no.
          </Diy>
          <Diy title="Feeding it to birds or pets" verdict="Don't.">
            RSPB explicitly warns against cooking-pan fats for birds. Used oil goes
            rancid quickly (salmonella risk), smears feathers and destroys waterproofing,
            and the polyunsaturates don't replace the saturated fats birds need. For
            dogs and cats, fatty leftovers can trigger pancreatitis. Suet cakes from the
            shop are a different product, but check the label for palm oil if that's a
            concern.
          </Diy>
        </div>
      </Block>

      <Divider />

      {/* Heads-up about CA sites */}
      <Block kicker="Before you drive over" tone="rust">
        <SectionHeading>
          Acceptance varies <em className="not-italic text-rust">site by site</em>
        </SectionHeading>
        <p className="mt-4 text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl">
          Cork City's Kinsale Road centre doesn't take cooking oil. Dublin, Fingal,
          Limerick and Galway centres do, with their own volume caps and ID
          requirements. That's why this site exists, so you don't drive across town
          to be turned away.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-olive text-cream font-semibold hover:bg-olive-2 transition-colors"
        >
          Find a verified drop-off <ArrowRight className="w-4 h-4" />
        </Link>
      </Block>

      <Divider />

      {/* Sources */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-muted leading-relaxed max-w-3xl">
            Sources:{' '}
            <a className="underline text-ink-2" href="https://mywaste.ie/what-to-do-with-different-types-of-waste/item/cooking-oil/" target="_blank" rel="noreferrer">MyWaste.ie cooking oil guidance</a>,{' '}
            <a className="underline text-ink-2" href="https://www.water.ie/help/blockages/think-before-you-pour" target="_blank" rel="noreferrer">Uisce Éireann "Think Before You Pour"</a>,{' '}
            <a className="underline text-ink-2" href="https://www.revenue.ie/en/companies-and-charities/excise-and-licences/mineral-oil-tax/liquid-substitute-fuels/index.aspx" target="_blank" rel="noreferrer">Revenue, liquid substitute fuels</a>,{' '}
            <a className="underline text-ink-2" href="https://www.epa.ie/our-services/monitoring--assessment/waste/hazardous-waste/" target="_blank" rel="noreferrer">EPA hazardous waste</a>,{' '}
            <a className="underline text-ink-2" href="https://www.ucd.ie/research/impact/casestudies/fightingfatbergsavoidingsewerblockages/" target="_blank" rel="noreferrer">UCD fatberg case study</a>.
          </p>
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
  tone = 'olive',
  children,
}: {
  kicker: string
  tone?: 'olive' | 'rust'
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

function NumberedStep({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: React.ReactNode
}) {
  return (
    <li className="flex gap-5">
      <span className="font-serif text-5xl sm:text-6xl font-semibold leading-none flex-none w-12 text-olive">
        {n}
      </span>
      <div className="flex flex-col gap-2 pt-1">
        <h3 className="text-base sm:text-lg font-semibold text-ink tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-sm sm:text-[15px] text-ink-2 leading-relaxed">{children}</p>
      </div>
    </li>
  )
}

function Dont({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="font-serif text-2xl font-semibold text-rust leading-none flex-none w-6 pt-0.5" aria-hidden="true">×</span>
      <div className="flex flex-col gap-1">
        <p className="text-base sm:text-lg font-semibold text-ink leading-snug">{title}</p>
        <p className="text-sm sm:text-[15px] text-ink-2 leading-relaxed">{children}</p>
      </div>
    </li>
  )
}

function Diy({
  title,
  verdict,
  children,
}: {
  title: string
  verdict: string
  children: React.ReactNode
}) {
  return (
    <details className="group py-5 border-t border-line/60 last:border-b">
      <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-serif text-xl sm:text-2xl font-semibold text-ink tracking-tight leading-snug">
            {title}
          </p>
          <p className="text-sm text-muted italic">Verdict: {verdict}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted transition-transform group-open:rotate-90 mt-2 flex-none" />
      </summary>
      <p className="mt-4 text-sm sm:text-[15px] text-ink-2 leading-relaxed max-w-3xl">{children}</p>
    </details>
  )
}
