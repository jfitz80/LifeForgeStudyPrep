import Link from 'next/link';
import { heroCopy, siteConfig } from '@/config/site';
import ShieldEmblem from '@/components/brand/ShieldEmblem';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white via-white to-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:pb-16 lg:pt-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <ShieldEmblem className="h-11 w-11" />
            <span className="text-[42px] font-bold tracking-tight leading-none">
              <span className="text-[#1F2A44]">LifeForge</span>
              <span className="text-[#2FAF9E]">Prep</span>
            </span>
          </Link>

          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{siteConfig.brandName}</p>
          <p className="mt-2 text-sm font-medium text-slate-600">{siteConfig.tagline}</p>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {heroCopy.headline}
          </h1>

          <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg">{heroCopy.subheadline}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card lg:p-7">
          <ShieldEmblem className="mx-auto h-auto w-[280px] drop-shadow-sm sm:w-[340px]" />
        </div>
      </div>
    </section>
  );
}
