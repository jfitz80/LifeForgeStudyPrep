import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPARISON_GUIDES } from '@/lib/platform-seed';

export const metadata: Metadata = {
  title: 'Product Comparisons | Knowledge Hub | LifeForgePrep',
  description: 'Compare life insurance and annuity structures in plain language with practical tradeoff guidance.'
};

export default function ProductComparisonsPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Knowledge Hub</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Product Comparisons</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            Compare product structures the way learners and advisors actually need to: by tradeoff, suitability, cost pressure, and long-term fit.
          </p>
        </section>
        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {COMPARISON_GUIDES.map((guide) => (
            <article key={guide.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1F2A44]">{guide.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">{guide.description}</p>
              <Link href={guide.href} className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                Open comparison
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
