import Link from 'next/link';
//import SiteHeader from '@/components/editorial/SiteHeader';
//import SiteFooter from '@/components/editorial/SiteFooter';
import VisualBreak from '@/components/VisualBreak';
import SampleQuestionCard from '@/components/SampleQuestionCard';
import StudyCTA from '@/components/StudyCTA';

const whyCards = [
  {
    title: 'Scenario-Based Learning',
    text: 'Practise client-style questions where the best answer depends on need, duration, affordability, ownership, and suitability.'
  },
  {
    title: 'Exam Trap Training',
    text: 'Learn why two similar answers may both look right — and why one is more defensible.'
  },
  {
    title: 'Timed Practice Mode',
    text: 'Build speed and discipline with exam-style timed sessions.'
  },
  {
    title: 'Clear Explanations',
    text: 'Every answer should help you understand the reasoning, not just memorize the correct option.'
  }
];

export default function HomePage() {
  return (
    <>
     
      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">LifeForgePrep</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Life Insurance Exam Practice That Teaches You How to Think
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Practise realistic life insurance questions, review clear explanations, and build confidence with scenario-based drills designed to test judgment — not just memorization.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/free-practice"
                data-cta="try-free-practice"
                data-location="homepage-hero"
                data-campaign="freemium-funnel"
                className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Try 15 Free Questions
              </Link>
              <Link
                href="/app"
                data-cta="download-free-app"
                data-location="homepage-hero"
                data-campaign="freemium-funnel"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Download Free App
              </Link>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              {['15 free questions', 'Scenario-based practice', 'Timed exam mode', 'Clear explanations', 'Independent study tool'].map((item) => (
                <li key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">Built to support your study alongside approved course materials — not replace them.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <VisualBreak
            variant="gradient"
            title="Learn by doing — not by reading endless notes."
            subtitle="Start with 15 free questions, see what you know, then decide whether the free app and full practice unlock fit how you learn best."
            cta={{ label: 'Try 15 Free Questions', href: '/free-practice' }}
          />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
          <SampleQuestionCard />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Why this helps</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {whyCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-practice" className="rounded-xl bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700">
                Try 15 Free Questions
              </Link>
              <Link href="/app" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-100">
                Download Free App
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <StudyCTA
            title="Study on the go with the LifeForgePrep app."
            body="Download the free app, try 15 practice questions, review explanations, and unlock deeper scenario-based practice when you’re ready."
            primaryLabel="Download Free App"
            primaryHref="/app"
            secondaryLabel="Try 15 Free Questions"
            secondaryHref="/free-practice"
            location="homepage-app-cta"
            campaign="freemium-funnel"
          />
        </section>
      </main>
     
    </>
  );
}
