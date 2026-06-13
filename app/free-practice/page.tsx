import type { Metadata } from 'next';
import Link from 'next/link';
//import SiteHeader from '@/components/editorial/SiteHeader';
//import SiteFooter from '@/components/editorial/SiteFooter';
import QuestionProgressionSystem from '@/components/free-practice/QuestionProgressionSystem';

export const metadata: Metadata = {
  title: 'Free Life Insurance Practice Questions | LifeForgePrep',
  description:
    'Try 15 free life insurance practice questions with clear explanations covering core insurance concepts, policy provisions, underwriting, beneficiaries, annuities, and more.'
};

const testedOn = [
  'Risk transfer and insurable interest',
  'Policyowner, insured, and beneficiary roles',
  'Term and permanent insurance basics',
  'Underwriting and adverse selection',
  'Annuities, cash value, and policy provisions'
] as const;

export default function FreePracticePage() {
  return (
    <>
      
      <main className="min-h-screen bg-[#0B1323] py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <header className="mb-6 rounded-2xl border border-slate-700 bg-[#111A2D] px-6 py-10 text-center shadow-sm sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6BC4B8]">Free Practice</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Try 15 Free Life Insurance Practice Questions</h1>
            <p className="mx-auto mt-3 max-w-3xl text-slate-300">
              Practise core life insurance concepts with clear explanations that teach the reasoning behind each answer.
            </p>

            <ul className="mx-auto mt-5 grid max-w-2xl gap-2 text-left text-sm text-slate-200 sm:grid-cols-3">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>Scenario-based questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>Common exam-style traps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>Clear explanations</span>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="#free-practice-quiz"
                data-cta="start-free-practice"
                data-location="free-practice-hero"
                data-campaign="freemium-funnel"
                className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Start Free Practice
              </Link>
              <p className="mt-3 text-sm text-slate-400">15 free questions • start learning</p>
            </div>
          </header>

          <section className="mb-8 rounded-2xl border border-slate-700 bg-[#111A2D] p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-white">What the free practice tests</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Your free session introduces policy concepts, suitability reasoning, underwriting logic, beneficiary and ownership issues, annuities, cash value basics, and product-fit scenarios.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
              {testedOn.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8 rounded-2xl border border-slate-700 bg-[#111A2D] p-5 text-sm leading-7 text-slate-300">
            LifeForgePrep is an independent study tool. It is not a state-approved pre-licensing course, official LLQP course, regulator, exam provider, or licensing body. Use it alongside your approved course materials.
          </section>

          <QuestionProgressionSystem />
        </div>
      </main>
      
    </>
  );
}
