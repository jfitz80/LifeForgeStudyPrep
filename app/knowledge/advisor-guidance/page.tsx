import type { Metadata } from 'next';
import Link from 'next/link';
import { ADVISOR_GUIDANCE_LINKS } from '@/lib/platform-seed';

export const metadata: Metadata = {
  title: 'Advisor Guidance | Knowledge Hub | LifeForgePrep',
  description: 'Practical guidance for beginner advisors learning client discovery, suitability, and recommendation logic.'
};

export default function AdvisorGuidancePage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Knowledge Hub</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Advisor Guidance</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            Learn how to ask stronger discovery questions, think through suitability, and connect product knowledge to real client situations.
          </p>
        </section>
        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ADVISOR_GUIDANCE_LINKS.map((guide) => (
            <article key={guide.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1F2A44]">{guide.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">{guide.description}</p>
              <Link href={guide.href} className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                Read guide
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
