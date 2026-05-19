import { Link } from 'react-router-dom'
import { Truck, Phone, Mail, ChevronRight, Globe } from 'lucide-react'

export default function PickupPage() {
  const subject = encodeURIComponent('OilCycle pickup waitlist')
  const body = encodeURIComponent(
    "Hi,\n\nI'd like household pickup of used cooking oil. My county is:\n\nRough quantity per month:\n\nThanks.",
  )

  return (
    <article className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-amber-2 flex items-center gap-2 mb-4">
            <Truck className="w-3.5 h-3.5" /> Household pickup
          </p>
          <h1 className="font-serif text-[2.4rem] sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.02] text-ink max-w-3xl">
            There's no household pickup{' '}
            <em
              className="not-italic text-rust"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}
            >
              in Ireland yet
            </em>
            .
          </h1>
          <p className="mt-6 text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl">
            Every commercial collector in the country (Frylite, Olleco, Bolton Biofuels,
            Nature's Oils, Pure Oil) serves restaurants and food businesses only. None
            offer household pickup, and there's no online booking anywhere.
          </p>
        </div>
      </section>

      <Divider />

      {/* What you can do now */}
      <Block kicker="What you can do now">
        <SectionHeading>Three honest paths</SectionHeading>
        <ol className="mt-8 flex flex-col gap-6 max-w-2xl">
          <Step n={1}>
            Store cooled oil in a sealed plastic bottle and drop it at a civic amenity
            site that accepts cooking oil.{' '}
            <Link to="/" className="underline font-semibold text-olive hover:text-olive-2">
              Find one near you.
            </Link>
          </Step>
          <Step n={2}>
            If you only have a small residue (under 200 ml), wipe with kitchen paper and
            put the paper in your brown food-waste bin.{' '}
            <Link to="/dispose" className="underline font-semibold text-olive hover:text-olive-2">
              How to dispose at home.
            </Link>
          </Step>
          <Step n={3}>
            If you have a community kitchen, restaurant, takeaway or food business near
            you, ask which collector they use. Some are willing to take a household
            bottle as a favour when the lorry calls.
          </Step>
        </ol>
      </Block>

      <Divider />

      {/* Want it to exist */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl bg-olive text-cream p-7 sm:p-10 max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-amber-soft mb-3">
              Want this to exist
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05]">
              Join the waitlist
            </h2>
            <p className="mt-3 text-sm sm:text-base text-cream/85 leading-relaxed">
              We're tracking demand so we can approach councils and collectors with real
              numbers. Send a quick email with your county and how much oil you'd want
              collected. No account, no newsletter, no spam, just a counter.
            </p>
            <a
              href={`mailto:contact@oilcycle.ie?subject=${subject}&body=${body}`}
              className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-cream text-ink font-semibold hover:bg-amber-soft transition-colors"
            >
              <Mail className="w-4 h-4" /> Email the waitlist
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* Huge amount */}
      <Block kicker="Bigger volumes">
        <SectionHeading>
          What if I have <em className="not-italic text-olive">10 + litres</em>?
        </SectionHeading>
        <p className="mt-4 text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl">
          If you've inherited oil from a closed restaurant, a school canteen or a one-off
          event, ring a commercial collector directly. They sometimes do one-off
          pickups for a fee, even outside their normal route.
        </p>

        <ul className="mt-8 flex flex-col gap-5 max-w-2xl">
          <Collector
            name="Frylite"
            phone="+353 71 916 1888"
            phoneHref="tel:+35371916 1888"
          />
          <Collector
            name="Bolton Biofuels"
            site="boltonbiofuels.com"
            siteHref="https://boltonbiofuels.com/uco-collections-ire/"
          />
          <Collector
            name="Nature's Oils"
            site="naturesoils.ie"
            siteHref="https://www.naturesoils.ie/used-cooking-oil-collection/"
          />
        </ul>

        <p className="mt-6 text-sm text-muted italic max-w-2xl leading-relaxed">
          Expect them to say "we don't do residential" first. Mention the volume and ask
          if you can drop at their depot.
        </p>
      </Block>
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

function Block({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3 text-olive-2">
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

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-5">
      <span className="font-serif text-5xl sm:text-6xl font-semibold leading-none flex-none w-12 text-olive">
        {n}
      </span>
      <p className="text-base sm:text-lg text-ink-2 leading-relaxed pt-1">{children}</p>
    </li>
  )
}

function Collector({
  name,
  phone,
  phoneHref,
  site,
  siteHref,
}: {
  name: string
  phone?: string
  phoneHref?: string
  site?: string
  siteHref?: string
}) {
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 border-t border-line/60 last:border-b">
      <span className="font-serif text-lg font-semibold text-ink min-w-[150px]">{name}</span>
      {phone && phoneHref && (
        <a href={phoneHref} className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-olive-2 transition-colors">
          <Phone className="w-3.5 h-3.5 text-muted" /> {phone}
        </a>
      )}
      {site && siteHref && (
        <a href={siteHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-ink-2 underline hover:text-olive-2 transition-colors">
          <Globe className="w-3.5 h-3.5 text-muted" /> {site}
        </a>
      )}
      <ChevronRight className="w-4 h-4 text-muted ml-auto" />
    </li>
  )
}
