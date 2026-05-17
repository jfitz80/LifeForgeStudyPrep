import TrackedLink from '@/components/TrackedLink';
import { siteConfig } from '@/config/site';

const benefits = [
  {
    title: '15 free practice questions',
    text: 'Start with a focused preview before deciding whether to unlock more practice.'
  },
  {
    title: 'Full question bank available by one-time unlock',
    text: 'Use the app for expanded question access without a recurring subscription.'
  },
  {
    title: 'Exam-style multiple choice questions',
    text: 'Practice the kind of applied reasoning that life insurance study questions often require.'
  },
  {
    title: 'Detailed explanations',
    text: 'Review why an answer works so concepts become easier to apply later.'
  },
  {
    title: 'Harder answer choices',
    text: 'Closer distractors help you slow down, compare details, and avoid common traps.'
  },
  {
    title: 'Mobile-friendly practice',
    text: 'Study in short sessions on your phone when you have a few minutes.'
  },
  {
    title: 'Optional PDF study guide',
    text: 'Use plain-English summaries for review outside the app question flow.'
  }
] as const;

const studySteps = [
  'Start with the free questions',
  'Review key concepts',
  'Practice exam-style questions',
  'Study the explanations',
  'Repeat difficult topics until confident'
] as const;

const studyPlan = [
  { label: 'Week 1', title: 'Learn the basics', text: 'Review terminology, policy purpose, ownership, and core product structures.' },
  { label: 'Week 2', title: 'Practice core questions', text: 'Work through foundational multiple-choice questions and review every explanation.' },
  { label: 'Week 3', title: 'Review weak areas', text: 'Return to taxation, underwriting, beneficiaries, or product comparisons where needed.' },
  { label: 'Week 4', title: 'Take full practice sets', text: 'Use longer sessions to practise pacing and scenario reasoning.' },
  { label: 'Final Review', title: 'Repeat difficult questions', text: 'Revisit missed concepts until the reasoning feels natural.' }
] as const;

const topics = [
  'Life insurance basics',
  'Term insurance',
  'Whole life insurance',
  'Universal life insurance',
  'Policy ownership and beneficiaries',
  'Underwriting concepts',
  'Premiums and cash values',
  'Taxation basics',
  'Retirement and estate planning concepts'
] as const;

const whoFor = [
  'New life insurance learners',
  'People reviewing core concepts',
  'Candidates who want extra practice',
  'Users who prefer mobile study',
  'Users who want a simple, structured study path'
] as const;

type ProductEducationSectionsProps = {
  context: 'exam-prep' | 'app';
};

function ProductCtas({ context }: ProductEducationSectionsProps) {
  if (context === 'app') {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={siteConfig.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
        >
          Download the Free App
        </a>
        <TrackedLink
          href="/free-practice"
          eventName="click_free_practice_cta"
          eventPayload={{ source: `${context}_product_sections` }}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
        >
          Try Web Practice
        </TrackedLink>
        <a
          href={siteConfig.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
        >
          Download the Study Guide
        </a>
        <a
          href={siteConfig.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Unlock the Full Question Bank
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <TrackedLink
        href="/free-practice"
        eventName="click_free_practice_cta"
        eventPayload={{ source: `${context}_product_sections` }}
        className="inline-flex items-center justify-center rounded-xl bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
      >
        Start Free Practice
      </TrackedLink>
      <a
        href={siteConfig.checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
      >
        Download the Study Guide
      </a>
      <TrackedLink
        href="/app"
        eventName="click_app_cta"
        eventPayload={{ source: `${context}_product_sections` }}
        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
      >
        Get the App
      </TrackedLink>
      <a
        href={siteConfig.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-xl bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Unlock the Full Question Bank
      </a>
    </div>
  );
}

export default function ProductEducationSections({ context }: ProductEducationSectionsProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Product overview</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44]">What You Get With LifeForgePrep</h2>
          <p className="mt-3 text-sm leading-7 text-[#4A5568]">
            A structured study system for practicing key life insurance concepts at your own pace, with clear explanations and a simple path from preview to deeper review.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-[#1F2A44]">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#4A5568]">{benefit.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <ProductCtas context={context} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Study path</p>
          <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">How to Use LifeForgePrep</h2>
          <ol className="mt-5 space-y-3">
            {studySteps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-2xl border border-slate-200 bg-[#F9FAFB] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2FAF9E] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm font-semibold text-[#1F2A44]">{step}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-3xl border border-[#CFEAE4] bg-[#F1FBF8] p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Four-week rhythm</p>
          <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Suggested Study Plan</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {studyPlan.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#2FAF9E]">{item.label}</p>
                <h3 className="mt-1 text-base font-bold text-[#1F2A44]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4A5568]">{item.text}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Content map</p>
        <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Topics Covered</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <article key={topic} className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-4">
              <p className="text-sm font-semibold text-[#1F2A44]">{topic}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Access levels</p>
        <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Free Preview vs Full Access</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5">
            <h3 className="text-xl font-bold text-[#1F2A44]">Free Preview</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#4A5568]">
              <li>15 practice questions</li>
              <li>Basic practice experience</li>
              <li>Try before you buy</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-[#CFEAE4] bg-[#F1FBF8] p-5">
            <h3 className="text-xl font-bold text-[#1F2A44]">Full Access</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#315A55]">
              <li>Full question bank</li>
              <li>Harder exam-style questions</li>
              <li>Detailed explanations</li>
              <li>One-time purchase</li>
              <li>Future question updates</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Review outside the app</p>
          <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Study Guide PDF</h2>
          <p className="mt-3 text-sm leading-7 text-[#4A5568]">
            The optional PDF study guide is designed to support review away from the app. Use it for key concepts, plain-English explanations, topic summaries, and quick refreshers alongside the app question bank.
          </p>
          <a
            href={siteConfig.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-xl bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
          >
            Download the Study Guide
          </a>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Fit check</p>
          <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Who This Is For</h2>
          <div className="mt-5 grid gap-3">
            {whoFor.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-[#F9FAFB] px-4 py-3 text-sm font-semibold text-[#1F2A44]">
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
