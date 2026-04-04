import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import TrackedLink from '@/components/TrackedLink';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Exam Prep | LifeForgePrep',
  description: 'Structured LLQP exam prep with scenario-based practice, explanations, and practical advisor reasoning.'
};

const included = [
  '80+ exam-style questions',
  'Scenario-based reasoning drills',
  'Clear answer explanations',
  'Product comparison logic',
  'Advisor-oriented prompts',
  'Focused LLQP study support'
] as const;

const idealFor = [
  'Canadian LLQP candidates who need more than memorization',
  'Learners who want practical product-fit logic',
  'Users who benefit from structured explanations and review paths'
] as const;

const samplePreview = [
  'A client needs affordable protection for a 20-year mortgage and young children. Which product direction fits best?',
  'An underwriting decision turns on smoking status, health disclosure, and budget sensitivity. What should be clarified first?',
  'A question compares guaranteed issue against underwritten coverage. Which tradeoff actually matters most?' 
] as const;

const comparisonRows = [
  ['Number of questions', '5 quick questions', '80+ structured questions'],
  ['Explanations', 'Short explanations', 'Deeper reasoning and review context'],
  ['Advanced scenarios', 'Preview only', 'Included'],
  ['Product comparison content', 'Light exposure', 'Integrated throughout'],
  ['Advisor-oriented questions', 'Some', 'Core focus'],
  ['Study support', 'Free entry point', 'Structured prep path']
] as const;

export default function ExamPrepPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">LLQP Exam Prep</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Structured prep for users who need reasoning, not just recall</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            LifeForgePrep Exam Prep is built for Canadian LLQP candidates who want stronger judgment on product choice, underwriting, suitability, and scenario-based exam logic.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Buy Exam Prep - {siteConfig.launchPriceDisplay}
            </a>
            <TrackedLink
              href="/free-practice"
              eventName="hero_cta_click"
              eventPayload={{ cta: 'exam_prep_try_free', location: 'exam_prep_hero' }}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Start Free Practice
            </TrackedLink>
          </div>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">What’s included</h2>
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
          <h2 className="text-2xl font-bold text-[#1F2A44]">Sample question preview</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {samplePreview.map((item, index) => (
              <article key={item} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Preview {index + 1}</p>
                <p className="mt-2 text-sm leading-7 text-[#1F2A44]">{item}</p>
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
                  <th className="px-4 py-2 font-semibold">Paid Exam Prep</th>
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
              Start Free Practice
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
            description="Enter your email to receive free exam-style questions and a comparison cheat sheet so you can evaluate the platform before purchasing."
            submitLabel="Send Free Pack"
            interest="exam-prep"
            source="exam-prep-page"
          />
        </div>
      </div>
    </main>
  );
}
