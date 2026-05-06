import Link from 'next/link';
//import SiteHeader from '@/components/editorial/SiteHeader';
//import SiteFooter from '@/components/editorial/SiteFooter';
import VisualBreak from '@/components/VisualBreak';
import SampleQuestionCard from '@/components/SampleQuestionCard';

const whyCards = [
  {
    title: 'Practice first',
    text: 'Start with exam-style Life Insurance module questions before committing to the full guide.'
  },
  {
    title: 'Learn the traps',
    text: 'Understand why an answer is right, not just what the answer is.'
  },
  {
    title: 'Build confidence',
    text: 'Use short sessions to make study feel manageable.'
  }
];

export default function HomePage() {
  return (
    <>
     
      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">LifeForge Insurance Prep</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Prepare for the LLQP Life Insurance Module — Start Practicing in 30 Seconds
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Scenario-based questions, clear explanations, calculation drills, and common exam-style traps.
              Built to supplement your official LLQP course material — not replace it.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/free-practice"
                className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Try 5 Free Questions
              </Link>
              <Link
                href="/exam-prep"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                View Life Insurance Guide
              </Link>
            </div>

            <div className="mt-4 space-y-1 text-xs text-slate-500">
              <p>No signup required to start.</p>
              <p>Currently focused on the LLQP Life Insurance module.</p>
              <p>Designed for insurance exam preparation and beginner life insurance learning.</p>
              <p>Educational content only — not legal, tax, investment, or financial advice.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <VisualBreak
            variant="gradient"
            title="Learn by doing — not by reading endless notes."
            subtitle="Start with a few LLQP Life Insurance module practice questions, see what you know, then decide if the full guide is right for you."
            cta={{ label: 'Try Free Questions', href: '/free-practice' }}
          />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
          <SampleQuestionCard />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Why this helps</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {whyCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-practice" className="rounded-xl bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700">
                Try 5 Free Questions
              </Link>
              <Link href="/exam-prep" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-100">
                Get the Life Insurance Practice Guide
              </Link>
            </div>
          </div>
        </section>
      </main>
     
    </>
  );
}
