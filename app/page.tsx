import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';

export const metadata: Metadata = {
  title: 'LifeForgePrep | Life Insurance Advisor Learning Platform',
  description:
    'Build life insurance knowledge, test yourself with practice questions, and explore exam-focused resources for Canada and the United States.'
};

const freePracticePoints = [
  'Scenario-based questions',
  'Product knowledge',
  'Client recommendation thinking',
  'Exam-style practice'
] as const;

const knowledgeLinks = [
  {
    title: 'Term vs Permanent Life Insurance',
    href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance'
  },
  {
    title: 'What Is Guaranteed Issue Life Insurance?',
    href: '/knowledge'
  },
  {
    title: 'How Advisors Match Coverage to Client Needs',
    href: '/knowledge'
  },
  {
    title: 'Participating vs Non-Participating Whole Life',
    href: '/knowledge'
  },
  {
    title: 'Riders, Renewability, and Convertibility Explained',
    href: '/knowledge'
  }
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA]">
        <section className="bg-[#1F2A44] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Interested in becoming a Life Insurance Advisor?
            </h1>
            <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
              Build your knowledge, test yourself with practice questions, and explore life insurance products, concepts, and exam-focused
              resources.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/free-practice"
                className="inline-flex items-center rounded-xl bg-[#2FAF9E] px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(47,175,158,0.28)] transition hover:bg-[#26988a]"
              >
                Start Free Practice
              </Link>
              <Link
                href="/exam-prep"
                className="inline-flex items-center rounded-xl border border-white/30 bg-white px-6 py-3 text-base font-semibold text-[#1F2A44] transition hover:bg-slate-100"
              >
                Explore Exam Prep
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-300">
              For aspiring advisors, career changers, and insurance learners in Canada and beyond.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">Choose your path</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-xl font-bold text-[#1F2A44]">Canada: LLQP Exam Prep</h3>
                <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                  Prepare for the Life License Qualification Program with focused study support, realistic practice questions, and structured
                  learning by topic.
                </p>
                <Link
                  href="/exam-prep"
                  className="mt-5 inline-flex items-center rounded-lg bg-[#2FAF9E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26988a]"
                >
                  Go to LLQP Prep
                </Link>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-xl font-bold text-[#1F2A44]">United States: Life Insurance Knowledge</h3>
                <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                  Learn the foundations of life insurance, understand common product types, and build practical knowledge for client
                  conversations and career exploration.
                </p>
                <Link
                  href="/knowledge"
                  className="mt-5 inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
                >
                  Explore Knowledge Hub
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">Try free practice questions</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
              Test your understanding with sample questions designed to help you think like an advisor, not just memorize definitions.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {freePracticePoints.map((point) => (
                <div key={point} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-[#1F2A44]">
                  {point}
                </div>
              ))}
            </div>

            <Link
              href="/free-practice"
              className="mt-6 inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Try Free Practice
            </Link>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">Built for practical understanding</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              LifeforgePrep is designed to help future advisors go beyond surface-level memorization. Whether you are preparing for an exam
              or trying to better understand life insurance products, the goal is the same: clearer thinking, stronger knowledge, and more
              confidence.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-lg font-semibold text-[#1F2A44]">Understand products</h3>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                  Learn the difference between term, permanent, and guaranteed issue coverage.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-lg font-semibold text-[#1F2A44]">Practice real thinking</h3>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                  Work through questions that reflect how advisors assess needs and explain options.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-lg font-semibold text-[#1F2A44]">Stay informed</h3>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                  Follow industry developments, consumer trends, and changes shaping life insurance today.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">Learn the business of life insurance</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
              Explore beginner-friendly guides, product explainers, and practical articles on how life insurance works in the real world.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {knowledgeLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-[#1F2A44] transition hover:border-[#2FAF9E] hover:bg-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <Link
              href="/knowledge"
              className="mt-6 inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Visit Knowledge Hub
            </Link>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">Life insurance news and insights</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
              Follow important developments in underwriting, consumer trends, product design, regulation, and health-related changes
              affecting the insurance industry.
            </p>
            <Link
              href="/news"
              className="mt-6 inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Read Latest News
            </Link>
          </div>
        </section>

        <section className="bg-[#1F2A44] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start building your life insurance knowledge today
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-200">
              Access free practice, explore core concepts, and take the next step toward becoming a more confident insurance professional.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/free-practice"
                className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Start Free Practice
              </Link>
              <Link
                href="/knowledge"
                className="inline-flex items-center rounded-lg border border-white/30 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-100"
              >
                Browse Study Resources
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
