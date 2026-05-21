import type { Metadata } from 'next';
import Link from 'next/link';
import AdvisorScenarioWorkbench from '@/components/advisor/AdvisorScenarioWorkbench';

export const metadata: Metadata = {
  title: 'Advisor Mode | LifeForgePrep',
  description: 'Practice real client scenarios, recommendations, and product-fit thinking with interactive advisor-style exercises.'
};

export default function AdvisorModePage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Advisor Mode</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Learn how an advisor thinks</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            Practice real-world client scenarios, recommendations, and product fit. Work through what the client is protecting, what matters most, and what should be clarified before any recommendation is made.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/free-practice" className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]">
              Try 15 Free Questions
            </Link>
            <Link href="/knowledge/advisor-guidance" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
              Read Advisor Guidance
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              'What is the client trying to protect?',
              'What matters most: affordability, permanence, guaranteed acceptance, or simplicity?',
              'Which product type is most suitable?',
              'What should the advisor clarify before recommending?'
            ].map((step, index) => (
              <article key={step} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Step {index + 1}</p>
                <p className="mt-2 text-sm leading-7 text-[#1F2A44]">{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <AdvisorScenarioWorkbench />
        </section>
      </div>
    </main>
  );
}
