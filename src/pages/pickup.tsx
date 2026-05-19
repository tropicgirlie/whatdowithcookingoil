import { Link } from 'react-router-dom'
import { Truck, Phone, Mail, ChevronRight } from 'lucide-react'

export default function PickupPage() {
  const subject = encodeURIComponent('OilCycle pickup waitlist')
  const body = encodeURIComponent(
    "Hi,\n\nI'd like household pickup of used cooking oil. My county is:\n\nRough quantity per month:\n\nThanks.",
  )

  return (
    <article className="max-w-2xl w-full mx-auto p-4 sm:p-6">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-2 flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5" /> Household pickup
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
          There's no household pickup in Ireland yet
        </h1>
        <p className="mt-3 text-ink-2 leading-relaxed">
          Every commercial collector in the country (Frylite, Olleco, Bolton Biofuels,
          Nature's Oils, Pure Oil) serves restaurants and food businesses only. None of them
          have a household-pickup offering, and there's no online booking anywhere.
        </p>
      </header>

      <section className="rounded-card border border-line/70 bg-cream-2/40 p-5">
        <h2 className="text-base font-semibold tracking-tight">What you can do now</h2>
        <ol className="mt-3 flex flex-col gap-3 text-ink-2 list-decimal pl-5 leading-relaxed">
          <li>
            Store cooled oil in a sealed plastic bottle and drop it at a civic amenity site
            that accepts cooking oil.{' '}
            <Link to="/" className="font-semibold text-olive hover:text-olive-2 inline-flex items-center gap-0.5">
              Find one near you <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </li>
          <li>
            If you only have a small residue (under 200 ml), wipe with kitchen paper and put
            the paper in your brown food-waste bin.{' '}
            <Link to="/dispose" className="font-semibold text-olive hover:text-olive-2 inline-flex items-center gap-0.5">
              How to dispose at home <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </li>
          <li>
            If you have a community kitchen, restaurant, takeaway, or food business near you,
            ask them which collector they use. Some are willing to take a household bottle as
            a favour when the lorry calls.
          </li>
        </ol>
      </section>

      <section className="mt-6 rounded-card border border-amber/30 bg-amber-soft p-5">
        <h2 className="text-base font-semibold tracking-tight text-ink">
          Want a household pickup to exist?
        </h2>
        <p className="mt-2 text-sm text-ink-2 leading-relaxed">
          We're tracking demand so we can approach councils and collectors with real numbers.
          Send a quick email with your county and how much oil you'd want collected. No
          account, no newsletter, no spam, just a counter.
        </p>
        <a
          href={`mailto:contact@oilcycle.ie?subject=${subject}&body=${body}`}
          className="mt-4 inline-flex items-center gap-2 h-11 px-5 rounded-pill bg-ink text-cream font-semibold hover:bg-ink-2 transition-colors"
        >
          <Mail className="w-4 h-4" /> Email the waitlist
        </a>
      </section>

      <section className="mt-8 text-sm text-ink-2 leading-relaxed">
        <h2 className="text-base font-semibold tracking-tight text-ink">
          What if I have a huge amount? (10+ litres)
        </h2>
        <p className="mt-2">
          If you've inherited oil from a closed restaurant, a school canteen, or a one-off
          event, ring a commercial collector directly. They sometimes do one-off pickups for
          a fee, even outside their normal route.
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-muted" />
            <a className="underline" href="tel:+35371916 1888">Frylite</a>
            <span className="text-muted">+353 71 916 1888</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-muted" />
            <span>Bolton Biofuels</span>
            <a className="underline" href="https://boltonbiofuels.com/uco-collections-ire/" target="_blank" rel="noreferrer">boltonbiofuels.com</a>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-muted" />
            <span>Nature's Oils</span>
            <a className="underline" href="https://www.naturesoils.ie/used-cooking-oil-collection/" target="_blank" rel="noreferrer">naturesoils.ie</a>
          </li>
        </ul>
        <p className="mt-3 text-xs text-muted">
          Expect them to say "we don't do residential" first. Mention the volume and ask if
          you can drop at their depot.
        </p>
      </section>
    </article>
  )
}
