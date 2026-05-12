import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';
import { commonExamTraps, weeklyContent } from '@/data/weeklyContent';

export const metadata: Metadata = {
  title: 'Life Insurance Exam Traps | LifeForgePrep',
  description:
    'Learn the common life insurance exam traps that cause candidates to lose marks, with plain-English explanations.'
};

export default function ExamTrapsPage() {
  const currentTrap = weeklyContent.examTrap;

  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Updated weekly</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Life Insurance Exam Traps</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Plain-English explanations of common LLQP Life Insurance module traps, with links back to the concepts worth reviewing.
          </p>
        </header>

        <section className="mt-8 rounded-3xl border border-[#CFEAE4] bg-[#F1FBF8] p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1E887B]">Current trap</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
              Exam connection: {currentTrap.examConnection}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-[#1F2A44]">{currentTrap.title}</h2>
          <p className="mt-3 text-lg font-semibold text-slate-900">{currentTrap.trap}</p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700">{currentTrap.explanation}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/knowledge/taxation/tax-treatment-of-death-benefits-and-cash-values"
              eventName="click_exam_trap"
              eventPayload={{ source: 'exam_traps_page', trap: currentTrap.trap }}
              className="rounded-xl bg-[#2FAF9E] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#26988a]"
            >
              Review the concept
            </TrackedLink>
            <TrackedLink
              href="/exam-prep"
              eventName="click_exam_prep_cta"
              eventPayload={{ source: 'exam_traps_page' }}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-[#1F2A44] hover:bg-slate-50"
            >
              Get the Life Insurance Module Guide
            </TrackedLink>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1F2A44]">Common trap archive</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use these as quick checklists before practice sessions or mock exam review.
              </p>
            </div>
            <Link href="/free-practice" className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
              Try free practice
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {commonExamTraps.map((trap) => (
              <article key={trap.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-[#1F2A44]">{trap.title}</h3>
                <div className="mt-4 grid gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why people get it wrong</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{trap.whyWrong}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Correct way to think about it</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{trap.correctThinking}</p>
                  </div>
                </div>
                <TrackedLink
                  href={trap.relatedHref}
                  eventName="click_recently_updated_guide"
                  eventPayload={{ source: 'exam_traps_archive', trap: trap.title }}
                  className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
                >
                  Related study link
                </TrackedLink>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
