import type { Metadata } from 'next';
import Link from 'next/link';
//import SiteHeader from '@/components/editorial/SiteHeader';
//import SiteFooter from '@/components/editorial/SiteFooter';
import QuestionProgressionSystem from '@/components/free-practice/QuestionProgressionSystem';

export const metadata: Metadata = {
  title: 'Free Practice | LifeForgePrep',
  description: 'Try a 5-question exam-style practice set for LLQP Life Insurance module concepts.'
};

const testedOn = [
  'Policy taxation (ACB, withdrawals, loans)',
  'Underwriting decisions and ratings',
  'Beneficiary and ownership structures',
  'Group insurance logic',
  'Scenario-based questions'
] as const;

export default function FreePracticePage() {
  return (
    <>
      
      <main className="min-h-screen bg-[#0B1323] py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <header className="mb-6 rounded-2xl border border-slate-700 bg-[#111A2D] px-6 py-10 text-center shadow-sm sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6BC4B8]">Free Practice</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Try 5 LLQP Life Insurance module practice questions</h1>
            <p className="mx-auto mt-3 max-w-3xl text-slate-300">
              Pick a 5-question set that matches your focus — LLQP-style Life Insurance logic or broader life insurance fundamentals — and see where to improve next.
            </p>

            <ul className="mx-auto mt-5 grid max-w-2xl gap-2 text-left text-sm text-slate-200 sm:grid-cols-3">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>Taxation traps (ACB, policy loans)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>Underwriting decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>Scenario-based questions</span>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="#free-practice-quiz"
                className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Start Quick Test (5 Questions)
              </Link>
              <p className="mt-3 text-sm text-slate-400">
                Most learners find the free set harder than expected — especially the taxation, suitability, and policy concept questions.
              </p>
            </div>
          </header>

          <section className="mb-8 rounded-2xl border border-slate-700 bg-[#111A2D] p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-white">What the 5-question set tests</h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
              {testedOn.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <QuestionProgressionSystem />
        </div>
      </main>
      
    </>
  );
}
