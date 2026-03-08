import Image from 'next/image';
import { heroCopy, siteConfig } from '@/config/site';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white via-white to-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:pb-16 lg:pt-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{siteConfig.brandName}</p>
          <p className="mt-2 text-sm font-medium text-slate-600">{siteConfig.tagline}</p>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {heroCopy.headline}
          </h1>

          <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg">{heroCopy.subheadline}</p>

          <ul className="mt-6 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 sm:text-base">
            {heroCopy.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-700" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#question-most-wrong"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-700/20 transition hover:bg-brand-900"
            >
              {heroCopy.primaryCta}
            </a>
            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              {heroCopy.secondaryCta}
            </a>
          </div>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-slate-400 line-through">{siteConfig.regularPriceDisplay}</span>
            <span className="text-lg font-bold text-slate-900">{siteConfig.launchPriceDisplay} launch price</span>
          </div>

          <p className="mt-3 text-sm text-slate-500">Independent exam prep resource. Instant digital access.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card lg:p-7">
          <Image
            src="/guide-preview.svg"
            width={640}
            height={420}
            alt="Preview card for LifeForge Insurance Prep question bank"
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
