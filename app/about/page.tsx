import type { Metadata } from 'next';
import TrackedLink from '@/components/TrackedLink';

export const metadata: Metadata = {
  title: 'About | LifeForgePrep',
  description: 'Learn why LifeForgePrep exists, who it helps, and how it bridges exam prep with practical life insurance understanding.'
};

const pillars = [
  {
    title: 'Mission',
    body: 'Help future advisors and everyday learners understand life insurance in a way that actually improves decisions.'
  },
  {
    title: 'Who it helps',
    body: 'Canadian LLQP students, U.S. insurance learners, beginner advisors, career changers, and consumers comparing coverage options.'
  },
  {
    title: 'What makes it different',
    body: 'LifeForgePrep combines study support, product knowledge, scenario thinking, and practical learning paths in one platform.'
  },
  {
    title: 'Future vision',
    body: 'Expand from exam prep into a fuller insurance learning and decision-support platform with smarter tools, better guidance, and clearer content paths.'
  }
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">About LifeForgePrep</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Bridging exam prep and practical insurance understanding</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            LifeForgePrep started around LLQP prep, but the larger goal is broader: help users understand products, think like advisors, and build confidence before real-world decisions or exam day.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-[#1F2A44]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Why LifeForgePrep exists</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              Most insurance education is fragmented. One source explains products, another explains rules, another gives practice questions, and almost none of it is tied together in a useful path. That slows decisions and weakens understanding.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              LifeForgePrep is designed to reduce that friction by putting guided learning, practice, and practical decision support in one place.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">How we think about quality</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              The standard is simple: content should be clear enough for beginners, practical enough for aspiring advisors, and structured enough to help exam candidates apply concepts instead of reciting them.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              That means plain language, strong internal links, useful comparisons, and no dead-end pages.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Start with the path that fits you</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLink href="/free-practice" eventName="hero_cta_click" eventPayload={{ cta: 'about_free_practice', location: 'about_page' }} className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]">
              Start Free Practice
            </TrackedLink>
            <TrackedLink href="/knowledge" eventName="knowledge_hub_click" eventPayload={{ location: 'about_page' }} className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
              Explore Knowledge Hub
            </TrackedLink>
            <TrackedLink href="/tools" eventName="calculator_usage" eventPayload={{ action: 'about_page_open_tools' }} className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
              Use the Tools
            </TrackedLink>
          </div>
        </section>
      </div>
    </main>
  );
}
