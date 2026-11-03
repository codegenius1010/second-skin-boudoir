import Image from 'next/image'
import { CTAButton } from './cta-button'
import { blackFridayPromo, isPromoActive, offerHeadline } from './config'

export function BFHero() {
  const active = isPromoActive()

  return (
    <section id="hero" className="relative overflow-hidden bg-bfBlack">
      <div className="mx-auto grid max-w-7xl lg:min-h-[90vh] lg:grid-cols-2">
        <div className="relative order-1 h-[48vh] min-h-[320px] lg:h-auto lg:min-h-[90vh]">
          <Image
            src="/images/boudoir/LW-206.jpg"
            alt="Elegant Second Skin Boudoir portrait session"
            fill
            priority
            className="object-cover object-[70%_30%]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bfBlack via-bfBlack/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-bfBlack/50" />
        </div>

        <div className="relative z-10 order-2 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:py-0">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-bfGold">{blackFridayPromo.eyebrow}</p>

          <h1 className="mt-5 font-bf-serif text-4xl leading-[1.05] text-bfIvory sm:text-5xl lg:text-6xl">
            {blackFridayPromo.headline}
          </h1>

          <div className="mt-8 border-y border-bfGold/30 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-bfTaupe">
              {active ? blackFridayPromo.offerName : 'This Offer Has Ended'}
            </p>
            <p className="mt-2 font-bf-serif text-3xl text-bfGold sm:text-4xl">
              {active ? offerHeadline() : 'Thank You For Your Interest'}
            </p>
          </div>

          <p className="mt-6 max-w-md font-bf-serif-italic text-lg italic leading-8 text-bfIvory/75">
            {blackFridayPromo.supportingCopy}
          </p>

          <div className="mt-9">
            <CTAButton href="#offer" eventLabel="hero-primary">
              {active ? 'Claim Your 50% Offer' : 'Join the Waitlist'}
            </CTAButton>
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-bfTaupe">
            {active ? 'Limited-Time Early Black Friday Offer' : 'Offer no longer available'}
          </p>
        </div>
      </div>
    </section>
  )
}
