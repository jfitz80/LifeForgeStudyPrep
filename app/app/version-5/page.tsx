import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'LifeForgePrep 5.0 | Timed Exam Mode and Rebuilt Question Bank',
  description:
    'Explore LifeForgePrep 5.0 with a rebuilt life insurance question bank, stronger explanations, improved difficulty progression, better topic tagging, and new Timed Exam mode.',
  alternates: {
    canonical: '/app/version-5'
  },
  openGraph: {
    title: 'LifeForgePrep 5.0: Rebuilt Questions + Timed Exam Mode',
    description:
      'Explore the rebuilt LifeForgePrep app experience with stronger explanations, scenario-based questions, topic tagging, and Timed Exam mode.'
  }
};

const changes = [
  'Rebuilt question bank with stronger answer explanations',
  'Improved Easy, Medium, and Hard difficulty progression',
  'Better topic tagging for focused study sessions',
  'More scenario-based questions with closer distractors',
  'New Timed Exam mode for pacing and focus',
  'Expanded focus on needs analysis, suitability, calculations, beneficiaries, riders, and estate liquidity'
] as const;

const topics = [
  'Needs analysis',
  'Suitability',
  'Calculations',
  'Beneficiaries',
  'Riders',
  'Estate liquidity',
  'Underwriting',
  'Policy ownership',
  'Taxation basics'
] as const;

const audiences = [
  'Learners who want more structured life insurance practice',
  'LLQP Life Insurance candidates supplementing official course material',
  'New advisors building scenario reasoning',
  'People who want mobile practice with feedback and explanations',
  'Users who want short web preview questions plus deeper app practice'
] as const;

const disclaimer =
  'LifeForgePrep is an independent study tool and is not affiliated with, endorsed by, or approved by any licensing body, regulator, insurer, or official exam provider.';

function ReleaseCtas({ source }: { source: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={siteConfig.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-xl bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#26988a]"
      >
        Download the App
      </a>
      <Link
        href="/free-practice"
        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#1F2A44] shadow-sm transition hover:bg-slate-50"
      >
        Try Free Practice Online
      </Link>
      <span className="sr-only">{source}</span>
    </div>
  );
}

export default function VersionFivePage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2FAF9E]">LifeForgePrep 5.0 release</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
                LifeForgePrep 5.0: Rebuilt Questions + Timed Exam Mode
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#4A5568]">
                Version 5.0 sharpens the app around the way learners actually practise: stronger explanations, improved difficulty progression, better topic tagging, more scenario-based questions, and timed sessions for exam-style focus.
              </p>
              <div className="mt-7">
                <ReleaseCtas source="hero" />
              </div>
            </div>

            <aside className="rounded-3xl border border-[#CFEAE4] bg-[#F1FBF8] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1E887B]">Release focus</p>
              <div className="mt-5 space-y-3">
                {['Rebuilt bank', 'Timed Exam mode', 'Topic tagging', 'Scenario reasoning'].map((item) => (
                  <div key={item} className="rounded-2xl border border-[#CFEAE4] bg-white px-4 py-3 text-sm font-semibold text-[#1F2A44]">
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">What changed</p>
          <h2 className="mt-2 text-3xl font-bold text-[#1F2A44]">What changed in 5.0</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {changes.map((item) => (
              <article key={item} className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5 text-sm font-semibold leading-6 text-[#1F2A44]">
                {item}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Question bank</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Why the question bank was rebuilt</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              The 5.0 question bank was rebuilt to make practice feel more applied and less like simple definition recall. Stronger explanations help learners understand why an answer works, why close distractors are wrong, and which concept a question is really testing.
            </p>
          </article>

          <article className="rounded-3xl border border-[#CFEAE4] bg-[#F1FBF8] p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Timed Exam mode</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">How Timed Exam mode helps</h2>
            <p className="mt-3 text-sm leading-7 text-[#315A55]">
              Timed mode helps learners practise pacing, attention, and exam-style decision-making. It is especially useful once the core concepts are familiar and the next step is answering accurately under pressure.
            </p>
          </article>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Content focus</p>
          <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Topics covered</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span key={topic} className="rounded-full border border-slate-200 bg-[#F9FAFB] px-3 py-2 text-sm font-semibold text-[#1F2A44]">
                {topic}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Fit check</p>
          <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Who this update is for</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {audiences.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-[#F9FAFB] px-4 py-3 text-sm leading-6 text-[#4A5568]">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-[#CFEAE4] bg-[#F1FBF8] p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Ready to practise in the app?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#315A55]">
            Start with 15 free app questions, then decide whether the full question bank is the right next step for your study plan. The web practice remains available as a quick preview.
          </p>
          <div className="mt-6">
            <ReleaseCtas source="bottom" />
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-[#4A5568] shadow-sm">
          <h2 className="text-lg font-bold text-[#1F2A44]">Disclaimer</h2>
          <p className="mt-2">{disclaimer}</p>
          <p className="mt-2">
            LifeForgePrep is designed to supplement official course material and independent study. It does not replace official LLQP materials, licensing requirements, regulator guidance, or professional advice.
          </p>
        </section>
      </div>
    </main>
  );
}
