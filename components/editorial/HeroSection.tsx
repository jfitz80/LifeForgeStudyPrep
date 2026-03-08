import { siteConfig } from '@/config/site';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-20">
        <div className="lg:col-span-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Life Insurance Education & Industry Insight</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your trusted source for life insurance news, knowledge, and industry insight.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Clear, practical life insurance intelligence for consumers, licensing candidates, and professionals who want to stay informed without the noise.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Buy Exam Prep - {siteConfig.launchPriceDisplay}
            </a>
            <a
              href="#news-digest"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Read Latest Digest
            </a>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Exam Prep Offer</p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">Life Insurance Exam Aid</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Scenario-based practice and clear explanations designed to help you prepare faster and more confidently.
            </p>
            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              Get instant access →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
