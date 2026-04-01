import type { Metadata } from 'next';
//import SiteHeader from '@/components/editorial/SiteHeader';
//import SiteFooter from '@/components/editorial/SiteFooter';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Exam Prep | LifeForgePrep',
  description: 'Pass the LLQP with exam-style practice, scenario training, and focused strategy.'
};

const chapters = [
  'Foundations of Life Insurance',
  'Policy Types and Contract Structure',
  'Underwriting and Risk Classification',
  'Taxation and Suitability Analysis',
  'Claims, Beneficiaries, and Policy Servicing',
  'LLQP Scenario Drills and Review'
] as const;

const testedOn = [
  'Scenario-based suitability decisions',
  'Policy feature comparisons and recommendations',
  'Beneficiary and ownership interpretation',
  'Tax and policy value treatment questions',
  'Calculation and premium reasoning items'
] as const;

const failureTraps = [
  'Reading too fast and missing qualifiers in scenario wording',
  'Choosing product features before confirming suitability',
  'Confusing ownership rights with beneficiary rights',
  'Misapplying tax assumptions across different policy transactions'
] as const;

const productFeatures = [
  '80+ exam-style questions',
  'Scenario-based practice',
  'Calculation drills',
  'Mock exam sets',
  'Clear explanations'
] as const;

export default function ExamPrepPage() {
  return (
    <>
      
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">LLQP Exam Prep</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Exam Prep</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
              Pass the LLQP with real exam-style practice and proven strategies.
            </p>
          </header>

          <section className="mt-8 rounded-2xl border border-[#D4E6E2] bg-[#EEF9F6] p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Not ready to commit yet?</h2>
            <p className="mt-2 text-sm leading-7 text-[#315A55]">
              Try a few free questions first and see how the platform works.
            </p>
            <a
              href="/free-practice"
              className="mt-4 inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Start Free Practice
            </a>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1F2A44]">Life Insurance Module</h2>
              <p className="mt-2 text-sm text-[#4A5568]">Preview curriculum chapters below.</p>
              <ul className="mt-4 space-y-2 text-sm text-[#4A5568]">
                {chapters.map((chapter) => (
                  <li key={chapter} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    {chapter}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1F2A44]">What You’ll Be Tested On</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
                {testedOn.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-8 rounded-2xl border border-[#F4D4D4] bg-[#FFF6F6] p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#7D1E1E]">Why Most People Fail</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6B2B2B]">
              {failureTraps.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#B03A3A]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 rounded-2xl border border-[#D4E6E2] bg-[#F2FBF8] p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1E887B]">Premium Prep Product</p>
            <h2 className="mt-2 text-3xl font-bold text-[#1F2A44]">LLQP Exam Prep Guide</h2>

            <ul className="mt-5 grid gap-3 text-sm leading-7 text-[#315A55] sm:grid-cols-2">
              {productFeatures.map((feature) => (
                <li key={feature} className="rounded-lg border border-[#D5ECE7] bg-white/70 px-3 py-2">
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center rounded-lg bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Get Instant Access
            </a>
          </section>
        </div>
      </main>
      
    </>
  );
}
