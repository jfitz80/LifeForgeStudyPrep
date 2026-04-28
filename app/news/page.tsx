'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type BriefItem = {
  headline: string;
  sentence: string;
  why: string;
};

type NewsCategory =
  | 'Life Insurance'
  | 'Annuities'
  | 'Regulation'
  | 'Industry Trends'
  | 'Claims'
  | 'Consumer Education';

type CategoryTab = 'All' | NewsCategory;

type NewsItem = {
  category: NewsCategory;
  title: string;
  date: string;
  summary: string;
  whyItMatters: string;
  href: string;
};

const weeklyBrief: BriefItem[] = [
  {
    headline: 'Carriers tighten underwriting for high-risk profiles',
    sentence:
      'Several carriers signaled stricter evidence requirements for selected applicants.',
    why: 'Affects product suitability and client expectation setting.'
  },
  {
    headline: 'Policy disclosure language updates continue across provinces',
    sentence:
      'New plain-language disclosure templates are being adopted in consumer-facing materials.',
    why: 'Advisors need clearer communication habits to reduce misunderstanding risk.'
  },
  {
    headline: 'Claims turnaround times improve at major insurers',
    sentence:
      'Operational improvements are reducing response times in common claims workflows.',
    why: 'Faster servicing can influence retention and client trust.'
  },
  {
    headline: 'Term insurance pricing remains competitive in key segments',
    sentence:
      'Multiple providers adjusted rates to stay competitive in standard risk classes.',
    why: 'Important for recommendation comparisons and needs analysis.'
  }
];

const featured = {
  title: 'How claims communication quality is becoming a competitive advantage',
  summary:
    'Insurers are investing in clearer claims communication and transparent status updates to reduce friction for policyholders and beneficiaries.',
  whyItMatters:
    'For advisors and learners, this highlights the practical role of servicing standards in long-term client trust and policy value.',
  href: '/news/claims-communication-consumer-pain-point'
};

const categories: CategoryTab[] = [
  'All',
  'Life Insurance',
  'Annuities',
  'Regulation',
  'Industry Trends',
  'Claims',
  'Consumer Education'
];

const newsItems: NewsItem[] = [
  {
    category: 'Life Insurance',
    title: 'Term product comparisons are shifting in 2026',
    date: 'April 28, 2026',
    summary:
      'Carriers continue repositioning term offerings for younger family markets.',
    whyItMatters:
      'Helps learners connect pricing dynamics to recommendation strategy.',
    href: '/news/carrier-pricing-updates-term-comparisons'
  },
  {
    category: 'Regulation',
    title: 'Suitability and disclosure remain a policy focus',
    date: 'April 27, 2026',
    summary:
      'Guidance continues to emphasize clear consumer explanations and documentation.',
    whyItMatters:
      'Directly relevant to LLQP-style suitability and ethics scenarios.',
    href: '/news/regulatory-disclosure-suitability-focus'
  },
  {
    category: 'Industry Trends',
    title: 'Underwriting modernization expands with human review controls',
    date: 'April 26, 2026',
    summary:
      'Insurers are combining automation with structured manual oversight.',
    whyItMatters:
      'Useful context for risk classification and underwriting decision logic.',
    href: '/news/underwriting-modernization-human-review-critical'
  },
  {
    category: 'Claims',
    title: 'Claims servicing updates improve response expectations',
    date: 'April 25, 2026',
    summary:
      'New workflow changes target faster status communication and resolution timing.',
    whyItMatters:
      'Supports client communication planning during sensitive moments.',
    href: '/news/claims-communication-consumer-pain-point'
  },
  {
    category: 'Annuities',
    title: 'Annuity product communication is becoming more client-centric',
    date: 'April 24, 2026',
    summary:
      'Providers are simplifying client-facing wording around guarantees and fees.',
    whyItMatters:
      'Clear communication improves suitability discussions and recommendation confidence.',
    href: '/news'
  },
  {
    category: 'Consumer Education',
    title: 'More consumers are comparing policy features before buying',
    date: 'April 23, 2026',
    summary:
      'Educational behavior is increasing as buyers evaluate exclusions and claims processes.',
    whyItMatters:
      'Advisors who educate clearly can improve trust and long-term retention.',
    href: '/news'
  }
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('All');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return newsItems;
    return newsItems.filter((item) => item.category === activeCategory);
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
            A weekly digest of insurance headlines, product trends, regulation, and
            what they mean for learners/advisors.
          </p>

          <form className="mt-7 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
            />
            <button
              type="button"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Get the Weekly Digest
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">This Week’s Brief</h2>
            <ul className="mt-4 space-y-4">
              {weeklyBrief.map((item) => (
                <li
                  key={item.headline}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.headline}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{item.sentence}</p>
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
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{featured.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{featured.summary}</p>
            <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4">
              <p className="text-sm text-brand-900">
                <span className="font-semibold">Why it matters:</span>{' '}
                {featured.whyItMatters}
              </p>
            </div>
            <Link
              href={featured.href}
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
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:border-slate-400'
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            No articles yet in this category.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredItems.map((item) => (
              <article
                key={`${item.title}-${item.date}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                    {item.category}
                  </span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold">Why it matters:</span>{' '}
                  {item.whyItMatters}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900"
                >
                  Read more
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Get the 2-minute insurance brief every week.
          </h2>
          <p className="mt-2 text-slate-600">No noise. Just what matters.</p>
          <form className="mt-5 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
            />
            <button
              type="button"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
          <h2 className="text-2xl font-bold text-slate-900">Studying insurance?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
            See how today’s industry news connects to LLQP concepts and real advisor
            decision-making.
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


