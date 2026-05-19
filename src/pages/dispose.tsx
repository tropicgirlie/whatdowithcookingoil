import { Link } from 'react-router-dom'
import { Recycle, Ban, AlertTriangle, ChevronRight } from 'lucide-react'

export default function DisposePage() {
  return (
    <article className="max-w-2xl w-full mx-auto p-4 sm:p-6 prose-styles">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-olive-2">For Irish households</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
          What can I do with my used cooking oil?
        </h1>
        <p className="mt-3 text-ink-2 leading-relaxed">
          Honest answers for the 0.5 to 2 litres a typical household goes through each month.
          No greenwashing, no hobby projects dressed up as solutions.
        </p>
      </header>

      <section className="bg-olive-soft border border-olive/30 rounded-card p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-olive-2 flex items-center gap-2">
          <Recycle className="w-3.5 h-3.5" /> The short answer
        </p>
        <ol className="mt-3 flex flex-col gap-3 text-ink-2 list-decimal pl-5 leading-relaxed">
          <li>
            <strong>Reuse it 2 to 3 times.</strong> Strain hot oil through muslin or a coffee filter,
            store in a sealed jar somewhere dark. Bin it when it goes dark brown, foamy, smells acrid,
            or smokes below normal temperature.
          </li>
          <li>
            <strong>Wipe small residues (under 200 ml) with kitchen paper</strong> and put the paper in
            your brown food-waste bin. This is the official MyWaste.ie advice.
          </li>
          <li>
            <strong>For 1 to 2 litres stored up:</strong> cool fully, decant into a sealed plastic
            bottle, and drop it at a civic amenity site that accepts cooking oil. Not every site does,
            so check first.
          </li>
        </ol>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-olive hover:text-olive-2"
        >
          Find a drop-off near you <ChevronRight className="w-4 h-4" />
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <Ban className="w-4 h-4 text-rust" /> What absolutely not to do
        </h2>
        <ul className="mt-3 flex flex-col gap-3 text-ink-2 leading-relaxed">
          <li>
            <strong>Don't pour it down the sink or toilet.</strong> Causes fatbergs. Dublin spends
            roughly half a million euro a year clearing fat-related sewer blockages.
          </li>
          <li>
            <strong>Don't pour it on soil or the garden.</strong> It coats the soil, kills
            microfauna, repels water and attracts vermin.
          </li>
          <li>
            <strong>Don't put liquid oil in your home compost or brown bin.</strong> It goes
            anaerobic, smells, and draws rats. Oil-soaked kitchen paper is fine, free liquid is not.
          </li>
          <li>
            <strong>Don't feed it to wildlife or pets.</strong> RSPB warns explicitly: rancid oil
            ruins bird feathers and risks salmonella. For dogs and cats, fatty leftovers can trigger
            pancreatitis.
          </li>
          <li>
            <strong>Don't burn it in a fire pit or barbecue.</strong> Flare-ups, and PM2.5 air
            pollution that defeats the point of recycling it.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">How do I know when oil is "done"?</h2>
        <p className="mt-3 text-ink-2 leading-relaxed">
          Any one of these is a bin-it signal:
        </p>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <li className="rounded-card border border-line/80 bg-cream-2/40 px-3 py-2">Dark brown colour</li>
          <li className="rounded-card border border-line/80 bg-cream-2/40 px-3 py-2">Persistent foam on top</li>
          <li className="rounded-card border border-line/80 bg-cream-2/40 px-3 py-2">Acrid or rancid smell</li>
          <li className="rounded-card border border-line/80 bg-cream-2/40 px-3 py-2">Smokes below normal frying temp</li>
          <li className="rounded-card border border-line/80 bg-cream-2/40 px-3 py-2">Syrupy or sticky texture</li>
          <li className="rounded-card border border-line/80 bg-cream-2/40 px-3 py-2">Cooked strong-flavoured food (fish, garlic)</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">DIY options worth knowing about</h2>
        <p className="mt-3 text-ink-2 leading-relaxed">
          People often ask about these. Here's the honest take on each, with the verdict up front.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <details className="group rounded-card border border-line/80 bg-cream-2/30 open:bg-cream-2/60">
            <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">Home soap-making</p>
                <p className="text-xs text-muted mt-0.5">Verdict: possible, but a hobby, not a waste plan.</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted transition-transform group-open:rotate-90" />
            </summary>
            <div className="px-4 pb-4 text-sm text-ink-2 leading-relaxed">
              One litre of used oil gives you roughly 7 to 9 bars of soap. The catch: cold-process
              soap requires sodium hydroxide (lye), which causes severe chemical burns and toxic
              fumes if mishandled. Used-oil bars tend to be soft, faintly smell of the fryer, and
              fail to "trace" on a first attempt. Suitable for committed hobbyists with proper PPE,
              a kitchen scale, and a saponification calculator. Not a realistic monthly disposal route.
            </div>
          </details>

          <details className="group rounded-card border border-line/80 bg-cream-2/30 open:bg-cream-2/60">
            <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">Making your own biodiesel</p>
                <p className="text-xs text-muted mt-0.5">Verdict: effectively blocked by Irish law.</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted transition-transform group-open:rotate-90" />
            </summary>
            <div className="px-4 pb-4 text-sm text-ink-2 leading-relaxed">
              In Ireland you need Revenue authorisation as a warehousekeeper to produce biofuel, with
              a limited "exempt producer" status under 2,500 L per year that still requires notification.
              Using untaxed home biodiesel as motor fuel is not permitted. On top of that, the process
              uses methanol and sodium methoxide, both acutely toxic and flammable, and a hobby
              processor costs several hundred euro plus ventilation. Treat this as fantasy unless you
              are already an enthusiast.
            </div>
          </details>

          <details className="group rounded-card border border-line/80 bg-cream-2/30 open:bg-cream-2/60">
            <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">Composting cooking oil</p>
                <p className="text-xs text-muted mt-0.5">Verdict: no for liquid, yes for oil-soaked paper.</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted transition-transform group-open:rotate-90" />
            </summary>
            <div className="px-4 pb-4 text-sm text-ink-2 leading-relaxed">
              Free liquid oil coats compost material, blocks airflow, makes the pile anaerobic, and
              attracts rats and flies. A small amount of oil-soaked kitchen paper is tolerable in a
              well-managed hot heap (above 55°C, turned regularly). Bokashi can ferment trace fats but
              an excess liquid layer kills the culture. Bottom line: oily paper towels, fine. Liquid
              oil, no.
            </div>
          </details>

          <details className="group rounded-card border border-line/80 bg-cream-2/30 open:bg-cream-2/60">
            <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">Feeding it to birds or pets</p>
                <p className="text-xs text-muted mt-0.5">Verdict: don't.</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted transition-transform group-open:rotate-90" />
            </summary>
            <div className="px-4 pb-4 text-sm text-ink-2 leading-relaxed">
              RSPB explicitly warns against cooking-pan fats for birds. Used oil goes rancid quickly
              (salmonella risk), smears feathers and destroys waterproofing, and the polyunsaturates
              don't replace the saturated fats birds need. For dogs and cats, fatty leftovers can
              trigger pancreatitis. Suet cakes from the shop are a different product, but check the
              label for palm oil if that's a concern.
            </div>
          </details>
        </div>
      </section>

      <section className="mt-10 bg-amber-soft border border-amber/40 rounded-card p-5 flex gap-3 items-start">
        <AlertTriangle className="w-5 h-5 text-amber-2 mt-0.5 flex-none" />
        <div className="text-sm text-ink-2 leading-relaxed">
          <p className="font-semibold text-ink">A heads-up about civic amenity sites</p>
          <p className="mt-1">
            Acceptance of used cooking oil varies by site. Cork City's Kinsale Road centre, for
            example, doesn't take it; Dublin, Fingal, Limerick and Galway centres do, with their own
            volume caps and ID requirements. That's why this site exists, so you don't drive across
            town to be turned away.
          </p>
          <Link
            to="/"
            className="mt-3 inline-flex items-center gap-1 font-semibold text-olive hover:text-olive-2"
          >
            Find a verified drop-off <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="mt-10 text-xs text-muted leading-relaxed">
        <p>
          Sources: <a className="underline" href="https://mywaste.ie/what-to-do-with-different-types-of-waste/item/cooking-oil/" target="_blank" rel="noreferrer">MyWaste.ie cooking oil guidance</a>,
          <a className="underline ml-1" href="https://www.water.ie/help/blockages/think-before-you-pour" target="_blank" rel="noreferrer">Uisce Éireann "Think Before You Pour"</a>,
          <a className="underline ml-1" href="https://www.revenue.ie/en/companies-and-charities/excise-and-licences/mineral-oil-tax/liquid-substitute-fuels/index.aspx" target="_blank" rel="noreferrer">Revenue, liquid substitute fuels</a>,
          <a className="underline ml-1" href="https://www.epa.ie/our-services/monitoring--assessment/waste/hazardous-waste/" target="_blank" rel="noreferrer">EPA hazardous waste</a>,
          <a className="underline ml-1" href="https://www.ucd.ie/research/impact/casestudies/fightingfatbergsavoidingsewerblockages/" target="_blank" rel="noreferrer">UCD fatberg case study</a>.
        </p>
      </section>
    </article>
  )
}
