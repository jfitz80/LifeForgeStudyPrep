import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';

export const metadata: Metadata = {
  title: 'US State Licensing Prep | Coming Soon | LifeForgePrep',
  description: 'US state licensing exam prep is in development. Join the waitlist for launch updates.'
};

export default function UsExamPrepComingSoonPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">United States</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
              State Licensing Exam Prep
            </h1>
            <p className="mt-4 text-lg leading-8 text-[#4A5568]">Coming soon.</p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#4A5568]">
              We are building a US-focused exam prep track with state-specific frameworks, scenario training, and practical study workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#newsletter-signup"
                className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Join Launch Updates
              </Link>
              <Link
                href="/exam-prep"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
              >
                View LLQP Prep
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
