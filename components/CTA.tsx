import { siteConfig } from '@/config/site';

export default function CTA() {
  return (
    <section className="bg-slate-900 py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Unlock deeper life insurance practice
        </h2>
        <p className="mt-3 text-slate-300">
          Practise harder scenarios, timed drills, clear explanations, and exam-style traps. Built to supplement your official LLQP course material.
        </p>
        <p className="mt-4 text-sm text-slate-300">
          <span className="mr-3 text-slate-500 line-through">{siteConfig.regularPriceDisplay}</span>
          <span className="text-lg font-semibold text-white">{siteConfig.launchPriceDisplay} launch price</span>
        </p>
        <a
          href={siteConfig.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Unlock Full Practice - {siteConfig.launchPriceDisplay}
        </a>
      </div>
    </section>
  );
}
