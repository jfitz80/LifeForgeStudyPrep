import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import StudyCTA from '@/components/StudyCTA';
import TrackedLink from '@/components/TrackedLink';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Life Insurance Exam Practice & Study Support | LifeForgePrep',
  description:
    'Scenario-based life insurance practice, clear explanations, timed drills, and optional study resources for learners using approved course materials.'
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
  ['Questions', '15 free questions', 'Full scenario-based practice bank'],
  ['Explanations', 'Introductory explanations', 'Deeper reasoning and review context'],
  ['Timed mode', 'Preview / limited access', 'Included'],
  ['Advanced scenarios', 'Preview only', 'Included'],
  ['Topic progression', 'Limited', 'Included'],
  ['Best for', 'Trying the platform', 'Serious study and review']
] as const;

export default function ExamPrepPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Exam Prep</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Start with the free app.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            Try 15 free questions, review explanations, and see how LifeForgePrep teaches the reasoning behind the answer.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink
              href="/app"
              eventName="download_app_cta_click"
              eventPayload={{ cta: 'download_free_app', location: 'exam_prep_hero' }}
              data-cta="download-free-app"
              data-location="exam-prep-hero"
              data-campaign="freemium-funnel"
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Download Free App
            </TrackedLink>
            <TrackedLink
              href="/free-practice"
              eventName="hero_cta_click"
              eventPayload={{ cta: 'exam_prep_try_free', location: 'exam_prep_hero' }}
              data-cta="try-free-practice"
              data-location="exam-prep-hero"
              data-campaign="freemium-funnel"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Try 15 Free Questions
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
          <h2 className="text-2xl font-bold text-[#1F2A44]">Free Practice vs Full Practice Unlock</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-sm">
              <thead>
                <tr className="text-left text-[#1F2A44]">
                  <th className="px-4 py-2 font-semibold">Feature</th>
                  <th className="px-4 py-2 font-semibold">Free Practice</th>
                  <th className="px-4 py-2 font-semibold">Full Practice Unlock</th>
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
          <h2 className="text-3xl font-bold text-[#1F2A44]">Prefer a PDF study resource?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#315A55]">
            The optional PDF guide is available for learners who want a separate review document alongside app-based practice.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="optional-pdf-guide"
              data-location="exam-prep-secondary"
              data-campaign="pdf-secondary-offer"
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              View Optional PDF Guide
            </a>
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
            title="Study on the go with the LifeForgePrep app."
            body="Download the free app, try 15 practice questions, review explanations, and unlock deeper scenario-based practice when you’re ready."
            primaryLabel="Download Free App"
            primaryHref="/app"
            secondaryLabel="Try 15 Free Questions"
            secondaryHref="/free-practice"
            location="exam-prep-app-cta"
            campaign="freemium-funnel"
          />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-[#4A5568]">
          LifeForgePrep is an independent study and practice tool. It is not affiliated with any regulator, licensing body, course provider, insurer, or official exam administrator. Use it alongside your approved course materials. No pass guarantee is provided.
        </div>

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
