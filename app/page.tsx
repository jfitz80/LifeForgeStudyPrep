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

const studyPaths = [
  {
    title: 'U.S. Life Insurance Practice',
    text: 'Core life insurance concepts for U.S. learners using LifeForgePrep as a supplemental study tool.',
    href: '/us-life-insurance-practice',
    cta: 'us-landing-page'
  },
  {
    title: 'Canadian LLQP Practice',
    text: 'Life insurance practice for Canadian LLQP learners who want clearer explanations and scenario-style questions.',
    href: '/canada-llqp-practice',
    cta: 'canada-llqp-landing-page'
  },
  {
    title: 'Insurance Foundations',
    text: 'Build the fundamentals behind risk, contracts, underwriting, premiums, policy provisions, annuities, and group insurance.',
    href: '/knowledge',
    cta: 'knowledge-foundations'
  }
] as const;

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

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-white via-teal-50 to-sky-50 p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">App update preview</p>
            <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Coming in the next app update</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                  The next LifeForgePrep update expands the app with deeper scenario-based practice, clearer explanations, improved difficulty progression, timed exam practice, and new professional-practice questions focused on compliance, ethics, market conduct, controls, and regulatory oversight.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/app"
                  data-cta="download-free-app"
                  data-location="homepage-next-update"
                  data-campaign="next-app-update"
                  className="inline-flex items-center justify-center rounded-xl bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
                >
                  Explore the App
                </Link>
                <Link
                  href="/free-practice"
                  data-cta="try-free-practice"
                  data-location="homepage-next-update"
                  data-campaign="next-app-update"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Try Free Practice
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">App pathways</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Choose your study path in the app</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  Start the website quiz right away, then use the app to focus on the path that fits your market and study goals.
                </p>
              </div>
              <Link
                href="/app"
                data-cta="download-free-app"
                data-location="homepage-study-paths"
                data-campaign="freemium-funnel"
                className="inline-flex items-center justify-center rounded-xl bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Download Free App
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {studyPaths.map((path) => (
                <Link
                  key={path.title}
                  href={path.href}
                  data-cta={path.cta}
                  data-location="homepage-study-paths"
                  data-campaign="audience-routing"
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{path.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{path.text}</p>
                </Link>
              ))}
            </div>
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
            body="Start with 15 free questions. Then choose your path in the app: U.S. Life Insurance Practice, Canadian LLQP Practice, or Insurance Foundations."
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
