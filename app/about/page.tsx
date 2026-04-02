import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | LifeForgePrep',
  description: 'Learn the mission, standards, and long-term vision behind LifeForge.'
};

const offerings = [
  {
    title: 'Beginner Guides',
    body: 'Clear foundations for people new to life insurance decisions.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h7a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H4z" />
        <path d="M20 5h-7a3 3 0 0 0-3 3v11a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  {
    title: 'Deep Dive Content',
    body: 'Detailed explainers on policy structure, taxation, and planning tradeoffs.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 3" />
      </svg>
    )
  },
  {
    title: 'Scenario Learning',
    body: 'Practical case-style guidance to improve decision quality and confidence.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19h16" />
        <path d="M7 15V9" />
        <path d="M12 15V6" />
        <path d="M17 15v-3" />
      </svg>
    )
  },
  {
    title: 'LLQP Prep',
    body: 'Structured support for licensing candidates preparing for exam scenarios.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="m9.5 12.5 1.7 1.7 3.4-3.4" />
      </svg>
    )
  },
  {
    title: 'Daily News Brief',
    body: 'Signal-focused market updates to help professionals sort through noise.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    )
  }
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">About LifeForge</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
              Making Life Insurance Finally Make Sense
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
              LifeForge exists to make life insurance understandable, practical, and useful for real decisions. We translate technical topics into clear guidance for consumers, advisors, and LLQP candidates.
            </p>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1F2A44]">The Problem</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                Life insurance is often explained in fragmented language: product terms in one place, tax notes in another, and real-world suitability buried in fine print.
              </p>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                That creates confusion, delayed decisions, and costly mistakes for families and professionals alike.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1F2A44]">Our Solution</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                LifeForge is a knowledge-first platform that combines educational depth with practical clarity. We focus on how products actually work, how decisions are made, and what matters in claims and planning.
              </p>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                Every resource is designed to reduce noise and improve judgment.
              </p>
            </article>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">What Makes LifeForge Different</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#4A5568]">
              We are built around real industry context and practical interpretation, not sales funnels. LifeForge does not optimize for product promotion. We optimize for understanding, suitability, and decision quality.
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">What We Offer</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {offerings.map((item) => (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1F2A44]">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#1F2A44]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4A5568]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1F2A44]">Founder</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                I’m John, and I built LifeForge to close the gap between industry complexity and practical understanding. The objective is simple: help people make better life insurance decisions using clear, responsible education.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1F2A44]">Our Vision</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                We are building a trusted knowledge authority for life insurance: a place where users can move from beginner to confident decision-maker with structured guidance, current insights, and exam-ready clarity.
              </p>
            </article>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Start Exploring</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">Explore foundational knowledge or jump directly into structured study resources.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/knowledge"
                className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Explore Knowledge Hub
              </Link>
              <Link
                href="/exam-prep"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
              >
                View Study Guides
              </Link>
            </div>
          </section>
        </div>
      </main>
  );
}
