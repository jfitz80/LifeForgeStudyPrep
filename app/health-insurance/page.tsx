import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';

export const metadata: Metadata = {
  title: 'Health & Insurance | LifeForgePrep',
  description:
    'Relatable health and life insurance explainers that connect everyday lifestyle factors to underwriting and exam-relevant concepts.'
};

const featured = {
  title: 'Can Lifestyle Changes Improve Your Life Insurance Risk?',
  href: '/health-insurance/can-lifestyle-changes-improve-your-life-insurance-risk',
  summary:
    'A practical guide to how healthier habits may influence underwriting outcomes, risk classes, and long-term planning conversations.'
};

export default function HealthInsurancePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <header className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Health & Insurance</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Health & Insurance</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4A5568]">
              Understand how real-life health changes connect to life insurance risk, underwriting decisions, and practical planning choices.
              This section is written for both everyday readers and LLQP exam candidates.
            </p>
          </header>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2FAF9E]">Featured Article</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">{featured.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">{featured.summary}</p>
            <Link
              href={featured.href}
              className="mt-5 inline-flex items-center rounded-lg bg-[#2FAF9E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Read article
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
