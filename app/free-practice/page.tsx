import type { Metadata } from 'next';
import Link from 'next/link';
//import SiteHeader from '@/components/editorial/SiteHeader';
//import SiteFooter from '@/components/editorial/SiteFooter';
import QuestionProgressionSystem from '@/components/free-practice/QuestionProgressionSystem';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Free Practice | LifeForgePrep',
  description: 'Try a quick 5-question web preview for LLQP Life Insurance module concepts, then continue deeper practice in the LifeForgePrep app.'
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
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Try a quick 5-question web preview</h1>
            <p className="mx-auto mt-3 max-w-3xl text-slate-300">
              Pick a short web practice set that matches your focus - LLQP-style Life Insurance logic or broader life insurance fundamentals - and see where to improve next. For deeper practice, use the LifeForgePrep 5.0 app.
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

          <section className="mb-8 rounded-2xl border border-[#2FAF9E]/40 bg-[#13253A] p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6BC4B8]">Continue in the app</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Want deeper practice?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              The LifeForgePrep app now includes 15 free questions, Timed Exam mode, and a rebuilt question bank with stronger explanations.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Download the Free App
              </a>
              <Link
                href="/app/version-5"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 bg-transparent px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                See What&apos;s New in 5.0
              </Link>
            </div>
          </section>

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
