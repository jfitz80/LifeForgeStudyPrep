'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useMemo, useState } from 'react';

type NewsCategory =
  | 'Life Insurance'
  | 'Annuities'
  | 'Regulation'
  | 'Industry Trends'
  | 'Claims'
  | 'Consumer Education';

type CategoryFilter = 'All' | NewsCategory;

type BriefItem = {
  headline: string;
  summary: string;
  why: string;
};

type NewsItem = {
  id: string;
  category: NewsCategory;
  title: string;
  date: string;
  summary: string;
  whyItMatters?: string;
  href: string;
};

const categories: CategoryFilter[] = [
  'All',
  'Life Insurance',
  'Annuities',
  'Regulation',
  'Industry Trends',
  'Claims',
  'Consumer Education'
];

const weeklyBrief: BriefItem[] = [
  {
    headline: 'Carriers tighten underwriting in selected risk segments',
    summary: 'Several insurers signaled stricter evidence requirements in higher-risk profiles.',
    why: 'This affects recommendation strategy and expectation setting.'
  },
  {
    headline: 'Disclosure language updates continue',
    summary: 'Plain-language policy communications are expanding across providers.',
    why: 'Clear communication helps reduce confusion and complaint risk.'
  },
  {
    headline: 'Claims servicing turnaround improves',
    summary: 'Workflow updates are reducing delays in common claims scenarios.',
    why: 'Faster servicing supports client trust and retention.'
  },
  {
    headline: 'Term pricing remains competitive',
    summary: 'Carriers continue adjusting term offerings for core family markets.',
    why: 'Important context for needs analysis and policy comparisons.'
  }
];

const featuredInsight = {
  title: 'How claims communication quality is becoming a competitive advantage',
  summary:
    'Insurers are improving timelines, status updates, and plain-language claims communication to reduce friction for policyholders and beneficiaries.',
  why:
    'For learners and advisors, this shows policy value includes service quality, not just premium and coverage.',
  href: '/news/claims-communication-consumer-pain-point'
};

const articles: NewsItem[] = [
  {
    id: '1',
    category: 'Life Insurance',
    title: 'Term product comparisons are shifting in 2026',
    date: 'April 28, 2026',
    summary: 'Carriers are repositioning term offerings for younger families and digital buyers.',
    whyItMatters: 'Helps connect pricing dynamics to recommendation logic.',
    href: '/news/carrier-pricing-updates-term-comparisons'
  },
  {
    id: '2',
    category: 'Regulation',
    title: 'Suitability and disclosure remain a policy focus',
    date: 'April 27, 2026',
    summary: 'Guidance continues to emphasize clear explanations and stronger documentation.',
    whyItMatters: 'Directly relevant to LLQP-style ethics and suitability scenarios.',
    href: '/news/regulatory-disclosure-suitability-focus'
  },
  {
    id: '3',
    category: 'Industry Trends',
    title: 'Underwriting modernization expands with human review controls',
    date: 'April 26, 2026',
    summary: 'Automation is growing, with stronger manual quality checkpoints.',
    whyItMatters: 'Supports understanding of underwriting and risk classification.',
    href: '/news/underwriting-modernization-human-review-critical'
  },
  {
    id: '4',
    category: 'Claims',
    title: 'Claims servicing updates improve response expectations',
    date: 'April 25, 2026',
    summary: 'Process improvements target faster communication and clearer claim status tracking.',
    whyItMatters: 'Useful for client communication during sensitive claim periods.',
    href: '/news/claims-communication-consumer-pain-point'
  }
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
            LifeForge News Digest
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Life Insurance News, Explained Simply
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            A weekly digest of insurance headlines, product trends, regulation, and what they mean for learners, advisors, and curious consumers.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">Get the 2-minute insurance brief every week.</p>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <form action="/api/lead" method="POST" className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
                  <input type="hidden" name="source" value="news_digest" />
                  <label htmlFor="news-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="news-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Get the Weekly Digest
                  </button>
                </form>
                <script async data-uid="d6b92e6422" src="https://lifeforgetrading.kit.com/d6b92e6422/index.js"></script>
                <p className="mt-3 text-xs text-slate-500">No spam. Just the weekly insurance brief.</p>
              </div>
            </div>

            <Link
              href="#latest-news"
              className="inline-flex h-[46px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Browse Latest News
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">This Week&apos;s Brief</h2>
            <ul className="mt-4 space-y-4">
              {weeklyBrief.map((item) => (
                <li key={item.headline} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">{item.headline}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.summary}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-brand-700">
                    Why it matters: {item.why}
                  </p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
              Featured Insight
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{featuredInsight.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{featuredInsight.summary}</p>
            <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4">
              <p className="text-sm text-brand-900">
                <span className="font-semibold">Why it matters:</span> {featuredInsight.why}
              </p>
            </div>
            <Link
              href={featuredInsight.href}
              className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Read analysis
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-bold text-slate-900">News Categories</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section id="latest-news" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredArticles.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            No articles available in this category yet.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredArticles.map((item) => (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                    {item.category}
                  </span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.summary}</p>
                {item.whyItMatters ? (
                  <p className="mt-3 text-sm text-slate-700">
                    <span className="font-semibold">Why it matters:</span> {item.whyItMatters}
                  </p>
                ) : null}
                <Link href={item.href} className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900">
                  Read More
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Studying insurance? Turn headlines into exam knowledge.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
            LifeForgePrep connects real insurance trends to the concepts learners need to understand.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/free-practice"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Start Free Practice
            </Link>
            <Link
              href="/exam-prep"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Explore Exam Prep
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
