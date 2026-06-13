import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Canadian LLQP Life Insurance Practice Questions | LifeForgePrep',
  description:
    'Practice Canadian LLQP life insurance concepts with scenario-based questions, clear explanations, and focused review tools.'
};

const topics = [
  'Policy provisions',
  'Underwriting and disclosure',
  'Beneficiaries and ownership',
  'Insurance products',
  'Advisor reasoning',
  'Scenario-based practice'
] as const;

export default function CanadaLlqpPracticePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Canadian learners</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
            Canadian LLQP Life Insurance Practice
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#4A5568] sm:text-lg">
            Practise life insurance concepts relevant to Canadian LLQP study, including policy provisions, underwriting, beneficiaries, insurance products, and scenario-based reasoning.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/free-practice"
              data-cta="try-free-practice"
              data-location="canada-llqp-practice"
              data-campaign="freemium-funnel"
              className="inline-flex items-center rounded-xl bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Try 15 Free Questions
            </Link>
            <Link
              href="/app"
              data-cta="download-free-app"
              data-location="canada-llqp-practice"
              data-campaign="freemium-funnel"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Download Free App
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <article key={topic} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#1F2A44]">{topic}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-[#4A5568] shadow-sm">
          LifeForgePrep is an independent study tool and is not affiliated with any provincial regulator, licensing body, course provider, insurer, or exam administrator. Use it alongside your approved LLQP course materials.
        </section>
      </div>
    </main>
  );
}
