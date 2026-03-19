import Link from 'next/link';

const modules = [
  {
    title: 'Life Insurance',
    description: 'Core life policy concepts, needs analysis, and recommendations.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
      </svg>
    )
  },
  {
    title: 'Accident & Sickness',
    description: 'Income protection and health-related advisory fundamentals.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v16" />
        <path d="M4 12h16" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    )
  },
  {
    title: 'Segregated Funds',
    description: 'Investment-linked insurance products and client suitability factors.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19h16" />
        <path d="M7 15V9" />
        <path d="M12 15V6" />
        <path d="M17 15v-4" />
      </svg>
    )
  },
  {
    title: 'Ethics & Professional Practice',
    description: 'Conduct, disclosure, and advisor responsibilities in client recommendations.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 5 7v5c0 5 3.5 7.5 7 9 3.5-1.5 7-4 7-9V7z" />
        <path d="m9.5 12.5 1.5 1.5 3.5-3.5" />
      </svg>
    )
  }
] as const;

const struggleReasons = [
  'Memorizing isolated terms instead of understanding how concepts connect in real client scenarios',
  'Skipping exam-style practice and underestimating how questions are structured under time pressure',
  'Ignoring scenario-based questions where suitability, ethics, and product mechanics intersect'
] as const;

const whoNeeds = [
  'New insurance agents',
  'Career changers entering financial services',
  'Bank employees moving into advisory roles'
] as const;

export default function WhatIsLlqpSection() {
  return (
    <section className="bg-[#F5F7FA] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">LLQP Guide</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">
            What Is the LLQP? (And How to Pass It First Time)
          </h2>

          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-[#1F2A44]">Intro Explanation</h3>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                The LLQP stands for the Life Licence Qualification Program. It is the required certification path for becoming a licensed life insurance advisor in Canada.
              </p>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                If you want to sell life insurance, critical illness insurance, or segregated funds, you generally need to pass the LLQP.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1F2A44]">Why It Matters</h3>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                The LLQP exists to ensure advisors can explain how products work, perform client needs analysis, understand taxation and policy structures, and uphold ethical responsibilities in recommendations.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-[#1F2A44]">Exam Structure</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => (
                <article key={module.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1F2A44]">{module.icon}</div>
                  <h4 className="text-sm font-semibold text-[#1F2A44]">{module.title}</h4>
                  <p className="mt-2 text-xs leading-6 text-[#4A5568]">{module.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-xl border border-[#F6D7D7] bg-[#FFF7F7] p-5">
              <h3 className="text-lg font-semibold text-[#7D1E1E]">Difficulty and Common Mistakes</h3>
              <p className="mt-2 text-sm leading-7 text-[#6B2B2B]">
                Many candidates underestimate the LLQP. The exam rewards applied understanding more than memorization alone.
              </p>
              <ul className="mt-3 space-y-2">
                {struggleReasons.map((reason) => (
                  <li key={reason} className="flex gap-2 text-sm leading-7 text-[#6B2B2B]">
                    <span className="mt-[11px] h-1.5 w-1.5 rounded-full bg-[#B03A3A]" aria-hidden="true" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-[#D4E8E3] bg-[#F2FBF8] p-5">
              <h3 className="text-lg font-semibold text-[#1F2A44]">Who Needs the LLQP?</h3>
              <ul className="mt-3 space-y-2">
                {whoNeeds.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-7 text-[#315A55]">
                    <span className="mt-[11px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <article className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-[#1F2A44]">How LifeForge Helps You Prepare</h3>
            <p className="mt-2 text-sm leading-7 text-[#4A5568]">
              Our prep resources are designed to reflect real exam difficulty, highlight common traps, and build confidence through structured practice.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/free-practice"
                className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Try a Free LLQP Practice Exam
              </Link>
              <Link href="/exam-prep" className="text-sm font-semibold text-[#1F2A44] underline-offset-2 hover:underline">
                Explore Full Exam Prep
              </Link>
            </div>
          </article>

          <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-6 text-slate-500">
            Not in Canada? If you’re exploring how to become a licensed life insurance advisor in the U.S., licensing is handled differently by state, but many of the core concepts are similar.
          </p>
        </div>
      </div>
    </section>
  );
}
