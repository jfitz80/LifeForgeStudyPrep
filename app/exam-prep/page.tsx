import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import StudyCTA from '@/components/StudyCTA';
import TrackedLink from '@/components/TrackedLink';
import ProductEducationSections from '@/components/product/ProductEducationSections';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Life Insurance Exam Practice & Scenario-Based Study | LifeForgePrep',
  description:
    'Practise life insurance exam-style questions with clear explanations, timed drills, and scenario-based learning. Built as an independent companion study tool for insurance learners.'
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
            Don&apos;t just memorize life insurance terms. Learn how to reason through exam-style questions. LifeForgePrep currently focuses on the LLQP Life Insurance module with scenario-based practice questions, explanations, calculation drills, and exam-style traps. It is designed to supplement your official course material - not replace it.
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
              Unlock Full Practice - {siteConfig.launchPriceDisplay}
            </a>
            <TrackedLink
              href="/free-practice"
              eventName="hero_cta_click"
              eventPayload={{ cta: 'exam_prep_try_free', location: 'exam_prep_hero' }}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Try 15 Free Questions
            </TrackedLink>
            <TrackedLink
              href="/app"
              eventName="click_app_cta"
              eventPayload={{ cta: 'exam_prep_get_app', location: 'exam_prep_hero' }}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Get the App
            </TrackedLink>
          </div>
        </header>

        <div className="mt-8">
          <ProductEducationSections context="exam-prep" />
        </div>

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
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Exam trap challenge</p>
              <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Can You Beat the Exam Trap?</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                Many life insurance questions look easy until two answers both seem correct. LifeForgePrep helps you practise the judgment behind the answer.
              </p>
              <TrackedLink
                href="/free-practice"
                eventName="click_free_practice_cta"
                eventPayload={{ source: 'exam_prep_trap_section', campaign: 'exam_trap' }}
                data-cta="try-free-practice"
                data-location="exam-prep-exam-trap"
                data-campaign="exam-trap"
                className="mt-5 inline-flex rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Try 15 Free Questions
              </TrackedLink>
            </div>
            <article className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
              <h3 className="text-lg font-bold leading-7 text-[#1F2A44]">
                A client wants affordable coverage while their mortgage is highest and their children are financially dependent. Which product is usually the better starting point?
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-[#4A5568]">
                {['A. Whole life insurance', 'B. Term life insurance', 'C. Universal life insurance', 'D. Segregated fund contract'].map((option) => (
                  <li key={option} className="rounded-lg border border-slate-200 bg-white px-3 py-2">{option}</li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl border border-[#D8ECE8] bg-[#F2FBF8] p-4 text-sm leading-7 text-[#315A55]">
                The trap is assuming permanent coverage is always better. If the need is temporary, high-coverage, and affordability-sensitive, term insurance is often the more suitable starting point.
              </p>
            </article>
          </div>
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
              Try 15 Free Questions
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
          <StudyCTA
            title="Built for learners who want to understand the why."
            body="LifeForgePrep is designed for people studying life insurance concepts who want more than flashcards. Practise realistic scenarios, review explanations, and train yourself to spot the trap in the question."
            primaryLabel="Start Free Practice"
            primaryHref="/free-practice"
            secondaryLabel="Unlock Full Practice"
            secondaryHref="/app"
            location="exam-prep-marketing"
            campaign="exam-trap"
          />
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-[#4A5568] shadow-sm">
          <p>
            <span className="font-semibold text-[#1F2A44]">Independent study tool.</span> LifeForgePrep is an independent study and practice tool. It is not affiliated with any regulator, licensing body, course provider, insurer, or official exam administrator. Use it alongside your approved course materials. No pass guarantee is provided.
          </p>
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
