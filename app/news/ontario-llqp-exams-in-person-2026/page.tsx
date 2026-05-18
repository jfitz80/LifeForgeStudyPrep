import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Ontario LLQP Exams Moving In-Person in 2026 | LifeForgePrep',
  description:
    'Ontario LLQP online exams are ending July 1, 2026. Learn what this means for LLQP candidates and how to prepare with timed, scenario-based practice.',
  alternates: {
    canonical: '/news/ontario-llqp-exams-in-person-2026'
  },
  openGraph: {
    title: 'Ontario LLQP Exams Are Moving In-Person: What Students Should Do Before July 1, 2026',
    description:
      'A calm study plan for Ontario LLQP candidates preparing for in-person exams, timed practice, and scenario-based understanding.',
    type: 'article',
    url: '/news/ontario-llqp-exams-in-person-2026'
  }
};

const reviewAreas = [
  'Suitability and needs analysis',
  'Replacement, disclosure, and documentation',
  'Beneficiary and ownership concepts',
  'Ethics and professional conduct',
  'Product fundamentals and policy features',
  'Calculations, riders, and estate liquidity'
] as const;

const practiceActions = [
  'Complete one timed set without pausing.',
  'Review every explanation, including the answers you got right.',
  'Rewrite missed questions as concepts: What was the question really testing?',
  'Build a short test-day checklist for identification, timing, and pacing.',
  'Practise close distractors where two answers feel partly correct.'
] as const;

const sourceUrl = 'https://www.fsrao.ca/announcements/steps-being-taken-preserve-integrity-llqp-exams';
const disclaimer =
  'LifeForgePrep is an independent study tool and is not affiliated with FSRA, Durham College, or any regulator.';

function CtaPanel() {
  return (
    <section className="rounded-3xl border border-[#CFEAE4] bg-[#F1FBF8] p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">LifeForgePrep study recommendation</p>
      <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Practice under exam conditions</h2>
      <p className="mt-3 text-sm leading-7 text-[#315A55]">
        This change rewards students who truly understand the material. Use timed practice, scenario-based questions, and stronger explanations to train pacing and decision-making before exam day.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <a
          href={siteConfig.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Practice under exam conditions
        </a>
        <Link
          href="/free-practice"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
        >
          Try free LLQP questions
        </Link>
        <Link
          href="/app/version-5"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
        >
          Build confidence with scenario-based explanations
        </Link>
      </div>
    </section>
  );
}

export default function OntarioLlqpInPersonPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <article className="space-y-8">
          <Link href="/news" className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
            Back to Market Desk
          </Link>

          <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#E8F7F4] px-3 py-1 text-xs font-semibold text-[#1E887B]">Exam Update</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">LLQP Study Insight</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
              Ontario LLQP Exams Are Moving In-Person: What Students Should Do Before July 1, 2026
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              FSRA has announced that Ontario LLQP exams will move to in-person only. Online exams remain available until June 30, 2026, and will be discontinued effective July 1, 2026.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The practical takeaway is not panic. It is preparation: in-person exams reward candidates who can stay calm, manage time, and apply concepts in a formal test-day environment.
            </p>
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
              Read the FSRA announcement
            </a>
          </header>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#1F2A44]">What changed?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              FSRA and Durham College are moving Ontario LLQP exams to in-person delivery only. Online exams are available until June 30, 2026. Beginning July 1, 2026, Ontario candidates should expect to write in person.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Why this matters for LLQP students</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              An in-person exam can feel different from studying at home. The room, timing, check-in process, and pressure can all affect how clearly a candidate reads scenario questions. Students should practise applying concepts under time constraints instead of relying on recognition or memorized wording.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#1F2A44]">How to prepare differently</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                'Use timed sets so pacing becomes familiar.',
                'Practise scenario-based questions where the best answer depends on client facts.',
                'Review explanations until you can explain why the distractors are wrong.',
                'Simulate a formal sitting: quiet room, no notes, one pass through the questions.'
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#1F2A44]">What to practice this week</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold text-[#1F2A44]">Key areas to review</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                  {reviewAreas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1F2A44]">Practice actions</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                  {practiceActions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <CtaPanel />

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Bottom line</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              The move to in-person Ontario LLQP exams does not change the concepts candidates need to understand. It does make study conditions more important. Candidates who practise timed, scenario-based reasoning will be better prepared for the pressure of a formal exam room.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm">
            <h2 className="text-lg font-bold text-[#1F2A44]">Educational disclaimer</h2>
            <p className="mt-2">{disclaimer}</p>
            <p className="mt-2">
              This article is educational commentary and should not be treated as licensing, legal, financial, tax, or insurance advice. Always confirm exam rules, dates, registration details, and licensing requirements with official sources.
            </p>
          </section>
        </article>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Study guide</p>
          <h2 className="mt-2 text-lg font-bold text-[#1F2A44]">Turn the update into action</h2>
          <nav className="mt-4 space-y-3 text-sm">
            <a href="#top" className="block font-semibold text-slate-600 hover:text-[#2FAF9E]">Read the update</a>
            <Link href="/app/version-5" className="block font-semibold text-slate-600 hover:text-[#2FAF9E]">Review Timed Exam mode</Link>
            <Link href="/free-practice" className="block font-semibold text-slate-600 hover:text-[#2FAF9E]">Try web practice</Link>
            <Link href="/exam-prep" className="block font-semibold text-slate-600 hover:text-[#2FAF9E]">Explore exam prep</Link>
          </nav>
          <div className="mt-5 rounded-xl border border-[#CFEAE4] bg-[#F1FBF8] p-4 text-xs leading-6 text-[#315A55]">
            {disclaimer}
          </div>
        </aside>
      </div>
    </main>
  );
}
