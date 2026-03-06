import Image from 'next/image';
import { heroCopy, siteConfig } from '@/config/site';

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-20">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-900">
            Independent Study Resource
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {heroCopy.headline}
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">{heroCopy.subheadline}</p>
          <ul className="mt-6 space-y-2 text-sm text-slate-700 sm:text-base">
            {heroCopy.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-700" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-900"
            >
              {heroCopy.primaryCta} - {siteConfig.price}
            </a>
            <a
              href="#free-questions"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              {heroCopy.secondaryCta}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-500 sm:text-sm">
            <span className="rounded-full bg-slate-100 px-3 py-1">Independent study resource</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">Designed for busy learners</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">Instant PDF download</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-card">
          <Image
            src="/guide-preview.svg"
            width={640}
            height={420}
            alt="Preview card for LLQP Life Insurance Pass Guide"
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
