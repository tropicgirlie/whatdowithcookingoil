export default function AboutPage() {
  return (
    <article className="max-w-2xl w-full mx-auto p-4 sm:p-6 prose-styles">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-olive-2">Why this matters</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
          Cooking oil belongs in a bottle, not the drain
        </h1>
      </header>

      <section className="flex flex-col gap-4 text-ink-2 leading-relaxed">
        <p>
          Each year, Irish Water spends millions clearing <strong>fatbergs</strong> — congealed
          masses of cooking fat, wet wipes and food waste that block sewers. A single
          household pouring oil down the sink contributes more than people realise:
          even 250 ml of oil can coat the inside of a sewer pipe for metres.
        </p>
        <p>
          Used cooking oil is also <strong>a fuel</strong>. Collectors like Frylite, Pure Oil
          and Nature's Oils turn it into biodiesel that powers buses and trucks. Diverting
          a litre of oil from the bin to a recycler avoids around <strong>3 kg of CO₂</strong>.
        </p>
        <p>
          The catch: there's no one place to find out where to take it. MyWaste.ie has
          generic advice, councils publish lists in PDFs, and commercial collectors only
          serve restaurants. OilCycle is the index of every household-friendly drop-off
          in Ireland — built so people who care can act in under 30 seconds.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">How to prep your oil</h2>
        <ol className="mt-3 flex flex-col gap-2 text-ink-2 list-decimal pl-5">
          <li>Let it cool fully before handling. Hot oil melts plastic.</li>
          <li>Strain food bits with a paper towel or coffee filter.</li>
          <li>Pour into a sealed plastic bottle (old milk jug, water bottle).</li>
          <li>Cap tightly, label "USED COOKING OIL", and store somewhere dry.</li>
          <li>Drop off at a point listed on OilCycle. Most accept up to ~5 L per visit.</li>
        </ol>
      </section>

      <section className="mt-10 bg-olive-soft border border-olive/30 rounded-card p-5 text-sm text-ink-2">
        <p>
          OilCycle is independent, free, and not affiliated with any council or collector.
          Data comes from <a className="underline" href="https://mywaste.ie/" target="_blank" rel="noreferrer">MyWaste.ie</a>,
          <a className="underline ml-1" href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">OpenStreetMap</a>,
          local council pages and you. Inspired by Italy's
          <a className="underline ml-1" href="https://junkerapp.it/en/" target="_blank" rel="noreferrer">Junker</a> and
          the UK's <a className="underline" href="https://www.recyclenow.com/" target="_blank" rel="noreferrer">Recycle Now</a>.
        </p>
      </section>
    </article>
  )
}
