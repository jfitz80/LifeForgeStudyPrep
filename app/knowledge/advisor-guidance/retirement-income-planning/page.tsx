import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Retirement Income Planning | Knowledge Hub | LifeForgePrep',
  description: 'A simple guide to how retirement income planning works and where annuities may fit among other income sources.'
};

export default function RetirementIncomePlanningPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Advisor Guidance</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Retirement Income Planning</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            Retirement income planning is about building a stream of cash flow that can support spending needs over time, not just building an account balance.
          </p>
        </section>
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">What matters most</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
            <li>How much income is needed each month.</li>
            <li>Which sources are guaranteed and which are market-dependent.</li>
            <li>Whether income should continue for life, for a fixed period, or for a surviving spouse.</li>
            <li>How much liquidity should remain outside of guaranteed income products.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/knowledge/annuities/how-annuities-work" className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]">
              Read How Annuities Work
            </Link>
            <Link href="/knowledge/advisor-guidance" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
              Back to Advisor Guidance
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
