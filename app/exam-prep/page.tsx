import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import TrackedLink from '@/components/TrackedLink';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Exam Prep | LifeForgePrep',
  description: 'LLQP Life Insurance module practice guide with scenario-based questions, explanations, and practical advisor reasoning.'
};

const included = [
  '80+ LLQP Life Insurance module practice questions',
  'Scenario-based suitability questions',
  'Taxation, ACB, policy loan, beneficiary, underwriting, claims, and product-structure concepts',
  'Full answer explanations',
  'Mock exam-style review sets',
  'Calculation-focused practice',
  'Designed as a supplement to your official LLQP course',
  'Instant digital access'
] as const;

const idealFor = [
  'Canadian LLQP candidates studying the Life Insurance module',
  'Learners who want practical product-fit logic',
  'Users who benefit from structured explanations and review paths',
  'Candidates who want extra practice alongside official course material'
] as const;

const comparisonRows = [
  ['Number of questions', '5 quick questions', '80+ structured questions'],
  ['Explanations', 'Short explanations', 'Deeper reasoning and review context'],
  ['Advanced scenarios', 'Preview only', 'Included'],
  ['Product comparison content', 'Light exposure', 'Integrated throughout'],
  ['Advisor-oriented questions', 'Some', 'Core focus'],
  ['Study support', 'Free entry point', 'Structured prep path']
] as const;

const sampleOptions = [
  'A. The death benefit is always unaffected',
  'B. A policy loan may create tax consequences if it exceeds the policy’s adjusted cost basis',
  'C. Withdrawals are never taxable',
  'D. The policy automatically becomes paid-up'
] as const;

export default function ExamPrepPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">LLQP Life Insurance Module</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Structured Life Insurance module prep for users who need reasoning, not just recall</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            LifeForge Prep currently focuses on the LLQP Life Insurance module, with scenario-based practice questions, explanations, calculation drills, and exam-style traps. It is designed to supplement your official course material — not replace it.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
            Format: instant digital access to a focused Life Insurance practice guide and question bank.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Get the Life Insurance Practice Guide - {siteConfig.launchPriceDisplay}
            </a>
            <TrackedLink
              href="/free-practice"
              eventName="hero_cta_click"
              eventPayload={{ cta: 'exam_prep_try_free', location: 'exam_prep_hero' }}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Try 5 Free Questions
            </TrackedLink>
          </div>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">What’s included</h2>
          <p className="mt-2 text-sm leading-7 text-[#4A5568]">
            A focused digital practice resource for the LLQP Life Insurance module, not a replacement for your official course.
          </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
              {included.map((item) => (
                <li key={item} className="flex gap-2"><span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Who it’s for</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
              {idealFor.map((item) => (
                <li key={item} className="flex gap-2"><span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-[#D8ECE8] bg-[#F2FBF8] p-4">
              <p className="text-sm font-semibold text-[#1F2A44]">Practical advisor angle</p>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                The strongest candidates do not just know policy terms. They can defend a recommendation, identify underwriting constraints, and spot where a scenario is testing suitability rather than product trivia.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Sample question with explanation</h2>
          <article className="mt-5 rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Policy loan and ACB trap</p>
            <h3 className="mt-2 text-lg font-bold leading-7 text-[#1F2A44]">
              A client owns a permanent life insurance policy with cash value. They want to access funds without cancelling the policy. Which issue should the advisor explain first?
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#4A5568]">
              {sampleOptions.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl border border-[#D8ECE8] bg-[#F2FBF8] p-4">
              <p className="text-sm font-semibold text-[#1F2A44]">Correct answer: B</p>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                Accessing cash value can affect taxation, policy performance, and the eventual death benefit. A policy loan or withdrawal is not automatically tax-free in every situation, so the advisor should explain the possible tax and policy consequences before the client proceeds.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Topics covered</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {['Taxation, ACB, and policy loans', 'Beneficiaries, ownership, and claims', 'Underwriting, suitability, and product structure'].map((item) => (
              <article key={item} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
                <p className="text-sm font-semibold text-[#1F2A44]">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Free Practice vs Paid Exam Prep</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-sm">
              <thead>
                <tr className="text-left text-[#1F2A44]">
                  <th className="px-4 py-2 font-semibold">Feature</th>
                  <th className="px-4 py-2 font-semibold">Free Practice</th>
                  <th className="px-4 py-2 font-semibold">Life Insurance Practice Guide</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([feature, free, paid]) => (
                  <tr key={feature}>
                    <td className="rounded-l-xl bg-[#F9FAFB] px-4 py-3 font-semibold text-[#1F2A44]">{feature}</td>
                    <td className="bg-white px-4 py-3 text-[#4A5568]">{free}</td>
                    <td className="rounded-r-xl bg-[#F2FBF8] px-4 py-3 text-[#1F2A44]">{paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#D4E6E2] bg-[#EEF9F6] p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-[#1F2A44]">Not ready to buy yet?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#315A55]">
            Start with the free set or request the free question pack. Use that to see whether the platform’s style of reasoning fits how you learn best.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLink
              href="/free-practice"
              eventName="free_practice_start"
              eventPayload={{ location: 'exam_prep_not_ready' }}
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Try 5 Free Questions
            </TrackedLink>
            <TrackedLink
              href="/knowledge"
              eventName="knowledge_hub_click"
              eventPayload={{ location: 'exam_prep_not_ready' }}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Explore Knowledge Hub
            </TrackedLink>
          </div>
        </section>

        <div className="mt-8">
          <LeadForm
            sectionId="exam-prep-lead"
            heading="Get the free question pack before you decide"
            description="Enter your email to receive free exam-style Life Insurance module questions and a comparison cheat sheet so you can evaluate the platform before purchasing."
            submitLabel="Send Free Pack"
            interest="exam-prep"
            source="exam-prep-page"
          />
        </div>
      </div>
    </main>
  );
}
