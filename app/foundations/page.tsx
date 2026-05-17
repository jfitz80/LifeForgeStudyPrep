import type { Metadata } from 'next';
import TrackedLink from '@/components/TrackedLink';

export const metadata: Metadata = {
  title: 'Insurance Foundations | LifeForgePrep',
  description:
    'Learn universal life insurance concepts, policy structures, underwriting basics, and advisor reasoning with LifeForgePrep.',
  alternates: {
    canonical: '/foundations'
  }
};

const modules = [
  {
    title: 'Life insurance purpose',
    text: 'Understand protection, income replacement, final expenses, and legacy planning as practical risk problems.',
    href: '/knowledge/life-insurance-basics'
  },
  {
    title: 'Policy structures',
    text: 'Compare term, whole life, universal life, simplified issue, and guaranteed issue coverage.',
    href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance'
  },
  {
    title: 'Underwriting basics',
    text: 'Learn how age, health, lifestyle, disclosure, and evidence influence insurability and pricing.',
    href: '/knowledge/policy-mechanics/how-underwriting-works'
  },
  {
    title: 'Ownership and beneficiaries',
    text: 'Separate policy control, insured life, beneficiary rights, and claims flow.',
    href: '/knowledge/policy-mechanics/beneficiary-designations-and-control'
  },
  {
    title: 'Taxation concepts',
    text: 'Review cash value, ACB, policy loans, withdrawals, and death-benefit tax assumptions.',
    href: '/knowledge/taxation/tax-treatment-of-death-benefits-and-cash-values'
  },
  {
    title: 'Advisor reasoning',
    text: 'Practise suitability thinking, client fact-finding, disclosure, and recommendation rationale.',
    href: '/knowledge/llqp-exam-prep/llqp-scenario-framework'
  }
] as const;

const outcomes = [
  'Recognize core life insurance terminology',
  'Compare policy types without relying on slogans',
  'Understand how underwriting affects applications',
  'Connect client needs to product structure',
  'Spot common assumptions around tax and beneficiaries'
] as const;

export default function FoundationsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2FAF9E]">Universal insurance education</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
            Insurance Foundations for Learners, Advisors, and Curious Consumers
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Build a practical understanding of life insurance concepts before moving into licensing content, product comparisons, or client-style scenarios.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/knowledge"
              eventName="knowledge_hub_click"
              eventPayload={{ source: 'foundations_hero' }}
              className="inline-flex justify-center rounded-xl bg-[#1F2A44] px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Explore Knowledge Hub
            </TrackedLink>
            <TrackedLink
              href="/free-practice"
              eventName="click_free_practice_cta"
              eventPayload={{ source: 'foundations_hero' }}
              className="inline-flex justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Try Practice Questions
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <article key={module.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <h2 className="text-xl font-bold text-[#1F2A44]">{module.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{module.text}</p>
              <TrackedLink
                href={module.href}
                eventName="knowledge_hub_click"
                eventPayload={{ source: 'foundations_module', module: module.title }}
                className="mt-5 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
              >
                Start learning
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2FAF9E]">Learning outcomes</p>
            <h2 className="mt-2 text-3xl font-bold text-[#1F2A44]">Build fluency before specialization</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Foundations content is intentionally broader than Canadian LLQP prep. Use it before, during, or after exam study to strengthen real insurance understanding.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-[#1F2A44]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
