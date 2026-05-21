import type { Metadata } from 'next';
import StudyCTA from '@/components/StudyCTA';
import TrackedLink from '@/components/TrackedLink';
import NewThisWeekSection from '@/components/home/NewThisWeekSection';
import WeeklyExamWatch from '@/components/news/WeeklyExamWatch';
import { marketDeskArticles } from '@/data/marketDeskArticles';
import { weeklyNewsItems } from '@/data/weeklyNews';

export const metadata: Metadata = {
  title: 'LifeForgePrep | Life Insurance Exam Practice & Scenario-Based Study',
  description:
    'Practise life insurance exam-style questions with clear explanations, timed drills, and scenario-based learning. Built as an independent companion study tool for insurance learners.',
  alternates: {
    canonical: '/'
  }
};

const trustBadges = [
  '15 free questions',
  'Scenario-based practice',
  'Timed Exam mode',
  'Clear answer explanations',
  'Independent study tool'
] as const;

const sampleQuestions = [
  {
    difficulty: 'Intermediate',
    type: 'Scenario drill',
    question: 'A client wants low-cost coverage while their mortgage is highest. Which policy structure should be compared first?',
    insight: 'Tests product fit, duration, and affordability.'
  },
  {
    difficulty: 'Hard',
    type: 'Trap question',
    question: 'A permanent policyowner accesses cash value. What should they understand before assuming the transaction is tax-free?',
    insight: 'Tests policy loan, withdrawal, ACB, and cash-value mechanics.'
  },
  {
    difficulty: 'Beginner',
    type: 'Foundations',
    question: 'Why does underwriting matter before an insurer issues coverage?',
    insight: 'Tests risk classification and premium logic.'
  }
] as const;

const whyFeatures = [
  {
    title: 'Scenario-Based Learning',
    copy: 'Practise client-style questions where the best answer depends on need, duration, affordability, ownership, and suitability.'
  },
  {
    title: 'Exam Trap Training',
    copy: 'Learn why two similar answers may both look right - and why one is more defensible.'
  },
  {
    title: 'Timed Practice Mode',
    copy: 'Build speed and discipline with exam-style timed sessions.'
  },
  {
    title: 'Clear Explanations',
    copy: 'Every answer should help the learner understand the reasoning, not just memorize the correct option.'
  }
] as const;

const marketDeskPreview = marketDeskArticles.slice(0, 3);

const dashboardStats = [
  { label: 'Study streak', value: '3 days', detail: 'Keep momentum with short sessions.' },
  { label: 'Timed mode', value: '5 min', detail: 'Practise under light exam pressure.' },
  { label: 'Progress', value: '68%', detail: 'Track concepts by topic and difficulty.' }
] as const;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is LifeForgePrep only for Canadian LLQP learners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'No. LifeForgePrep includes Canadian LLQP exam-prep content and broader insurance foundations for learners, career changers, and beginner advisors.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does LifeForgePrep guarantee exam success?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'No. LifeForgePrep is an educational study support platform designed to build confidence and improve practice habits. It does not guarantee licensing exam results.'
      }
    }
  ]
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="border-b border-[#CFEAE4] bg-[#F1FBF8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-bold text-[#1F2A44]">New: LifeForgePrep 5.0 is here</p>
            <p className="mt-1 max-w-4xl text-sm leading-6 text-[#315A55]">
              Practise with a rebuilt question bank, stronger explanations, improved difficulty progression, better topic tagging, more scenario-based questions, and new Timed Exam mode.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <TrackedLink
              href="/app/version-5"
              eventName="click_app_cta"
              eventPayload={{ source: 'home_launch_banner', action: 'version_5' }}
              className="inline-flex items-center justify-center text-sm font-semibold text-[#1E887B] transition hover:text-[#1F2A44]"
            >
              See what&apos;s new in 5.0
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2FAF9E]">LifeForgePrep</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-[#111827] sm:text-6xl">
              Life Insurance Exam Practice That Teaches You How to Think
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Practise realistic life insurance questions, learn from clear explanations, and build confidence with scenario-based drills designed to test advisor judgment - not just memorization.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/free-practice"
                eventName="click_free_practice_cta"
                eventPayload={{ source: 'home_hero', campaign: 'exam_trap' }}
                data-cta="try-free-practice"
                data-location="homepage-hero"
                data-campaign="exam-trap"
                className="inline-flex items-center justify-center rounded-xl bg-[#1F2A44] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Try 15 Free Questions
              </TrackedLink>
              <TrackedLink
                href="/exam-prep"
                eventName="click_exam_prep_cta"
                eventPayload={{ source: 'home_hero' }}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Explore Exam Prep
              </TrackedLink>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {badge}
                </span>
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-xs leading-6 text-slate-500">
              Independent study tool. Designed to support your study alongside your approved course materials. No pass guarantee is provided.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300/50">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Study dashboard</p>
                  <h2 className="mt-1 text-xl font-bold">Today’s practice plan</h2>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">Live preview</span>
              </div>
              <div className="mt-5 space-y-3">
                {dashboardStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-100">{stat.label}</p>
                      <p className="text-sm font-bold text-cyan-200">{stat.value}</p>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-300">{stat.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-[#2FAF9E]" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <WeeklyExamWatch source="home_exam_watch" items={weeklyNewsItems.slice(0, 3)} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <span className="text-3xl" aria-hidden="true">🇨🇦</span>
            <h2 className="mt-4 text-2xl font-bold text-[#1F2A44]">Canadian LLQP Exam Prep</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Prepare for the Canadian life insurance licensing exam with realistic practice questions and scenario-based learning.
            </p>
            <TrackedLink
              href="/exam-prep"
              eventName="click_exam_prep_cta"
              eventPayload={{ source: 'home_dual_path', path: 'llqp' }}
              className="mt-5 inline-flex rounded-xl bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-slate-800"
            >
              Explore LLQP Prep
            </TrackedLink>
          </article>

          <article className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <span className="text-3xl" aria-hidden="true">🌎</span>
            <h2 className="mt-4 text-2xl font-bold text-[#1F2A44]">Insurance Fundamentals</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Learn universal life insurance concepts, underwriting basics, policy structures, and advisor reasoning.
            </p>
            <TrackedLink
              href="/foundations"
              eventName="knowledge_hub_click"
              eventPayload={{ source: 'home_dual_path', path: 'foundations' }}
              className="mt-5 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition group-hover:bg-slate-50"
            >
              Explore Foundations
            </TrackedLink>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2FAF9E]">5-question web preview</p>
              <h2 className="mt-2 text-3xl font-bold text-[#1F2A44]">Try a quick web practice set</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                Sample focused question types on the web, then move into the app for 15 free questions, Timed Exam mode, and the rebuilt 5.0 question bank.
              </p>
            </div>
            <TrackedLink
              href="/free-practice"
              eventName="click_free_practice_cta"
              eventPayload={{ source: 'home_practice_preview' }}
              className="inline-flex rounded-xl bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Try Web Practice
            </TrackedLink>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {sampleQuestions.map((item) => (
              <article key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">{item.difficulty}</span>
                  <span className="rounded-full bg-[#E8F7F4] px-2.5 py-1 text-xs font-semibold text-[#1E887B]">{item.type}</span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">Timer 01:30</span>
                </div>
                <h3 className="mt-4 text-base font-bold leading-7 text-[#1F2A44]">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.insight}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2FAF9E]">Exam trap challenge</p>
            <h2 className="mt-2 text-3xl font-bold text-[#1F2A44]">Can You Beat the Exam Trap?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Many life insurance questions look easy until two answers both seem correct. LifeForgePrep helps you practise the judgment behind the answer.
            </p>
            <TrackedLink
              href="/free-practice"
              eventName="click_free_practice_cta"
              eventPayload={{ source: 'home_exam_trap_section', campaign: 'exam_trap' }}
              data-cta="try-free-practice"
              data-location="homepage-exam-trap"
              data-campaign="exam-trap"
              className="mt-5 inline-flex rounded-xl bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Try 15 Free Questions
            </TrackedLink>
          </div>
          <article className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2FAF9E]">Sample trap question</p>
            <h3 className="mt-3 text-lg font-bold leading-7 text-[#1F2A44]">
              A client wants affordable coverage while their mortgage is highest and their children are financially dependent. Which product is usually the better starting point?
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {['A. Whole life insurance', 'B. Term life insurance', 'C. Universal life insurance', 'D. Segregated fund contract'].map((option) => (
                <li key={option} className="rounded-xl border border-slate-200 bg-white px-3 py-2">{option}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl border border-[#CFEAE4] bg-[#F1FBF8] p-4 text-sm leading-7 text-[#315A55]">
              The trap is assuming permanent coverage is always better. If the need is temporary, high-coverage, and affordability-sensitive, term insurance is often the more suitable starting point.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#1F2A44]">Why LifeForgePrep</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyFeatures.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="h-2 w-16 rounded-full bg-[#2FAF9E]" />
              <h3 className="mt-4 text-lg font-bold text-[#1F2A44]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {feature.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <StudyCTA
          eyebrow="Built for reasoning"
          title="Built for learners who want to understand the why."
          body="LifeForgePrep is designed for people studying life insurance concepts who want more than flashcards. Practise realistic scenarios, review explanations, and train yourself to spot the trap in the question."
          primaryLabel="Start Free Practice"
          primaryHref="/free-practice"
          secondaryLabel="Download on the App Store"
          secondaryHref="/app"
          location="homepage-marketing-section"
          campaign="exam-trap"
        />
      </section>

      <NewThisWeekSection />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2FAF9E]">Weekly commentary</p>
              <h2 className="mt-2 text-3xl font-bold text-[#1F2A44]">LifeForge Market Desk</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                Insurance trends translated into plain-English study insights for learners and new advisors.
              </p>
            </div>
            <TrackedLink
              href="/market-desk"
              eventName="click_new_this_week_brief"
              eventPayload={{ source: 'home_market_desk_preview' }}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Visit Market Desk
            </TrackedLink>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {marketDeskPreview.map((article) => (
              <article key={article.slug} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <span className="rounded-full bg-[#E8F7F4] px-2.5 py-1 text-xs font-semibold text-[#1E887B]">{article.category}</span>
                <h3 className="mt-4 text-lg font-bold leading-7 text-[#1F2A44]">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  <strong>Why this matters:</strong> {article.summary}
                </p>
                <p className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                  LLQP connection: scenario reasoning and client communication
                </p>
                <TrackedLink
                  href={`/news/market-desk/${article.slug}`}
                  eventName="click_new_this_week_brief"
                  eventPayload={{ source: 'home_market_desk_card', article: article.slug }}
                  className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
                >
                  Read insight
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
