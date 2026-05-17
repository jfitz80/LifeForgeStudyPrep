import type { Metadata } from 'next';
import TrackedLink from '@/components/TrackedLink';
import { marketDeskArticles, marketDeskDisclaimer } from '@/data/marketDeskArticles';
import { weeklyContent } from '@/data/weeklyContent';

export const metadata: Metadata = {
  title: 'LifeForge Market Desk | Insurance Commentary and Study Insights',
  description:
    'Weekly plain-English commentary on life insurance trends, regulation, products, consumer issues, and exam connections.',
  alternates: {
    canonical: '/market-desk'
  },
  openGraph: {
    title: 'LifeForge Market Desk',
    description:
      'Insurance commentary translated into practical learning insights for candidates, new advisors, and consumers.',
    url: '/market-desk',
    type: 'website'
  }
};

const buckets = [
  {
    title: 'This Week in Life Insurance',
    text: weeklyContent.weeklyBrief.summary,
    href: weeklyContent.weeklyBrief.href
  },
  {
    title: 'Regulation Watch',
    text: 'Suitability, disclosure, advisor conduct, and consumer understanding translated into study language.',
    href: '/news/regulatory-disclosure-suitability-focus'
  },
  {
    title: 'Consumer Impact',
    text: 'Claims, beneficiary communication, product clarity, and protection planning from the client lens.',
    href: '/news/claims-communication-consumer-pain-point'
  }
] as const;

export default function MarketDeskHubPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2FAF9E]">LifeForge Market Desk</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
            Insurance Trends Turned Into Study Insights
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Weekly plain-English commentary on life insurance trends, regulation, products, and consumer issues.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {buckets.map((bucket) => (
            <article key={bucket.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="rounded-full bg-[#E8F7F4] px-3 py-1 text-xs font-semibold text-[#1E887B]">Weekly bucket</span>
              <h2 className="mt-4 text-xl font-bold text-[#1F2A44]">{bucket.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{bucket.text}</p>
              <TrackedLink
                href={bucket.href}
                eventName="click_new_this_week_brief"
                eventPayload={{ source: 'market_desk_bucket', bucket: bucket.title }}
                className="mt-5 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
              >
                Read insight
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {marketDeskArticles.map((article) => (
            <article key={article.slug} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#E8F7F4] px-2.5 py-1 text-xs font-semibold text-[#1E887B]">{article.category}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{article.readingTime}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold leading-7 text-[#1F2A44]">{article.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                <strong>Why this matters:</strong> {article.summary}
              </p>
              <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                Exam connection: product logic, suitability, and client communication.
              </p>
              <TrackedLink
                href={`/news/market-desk/${article.slug}`}
                eventName="click_new_this_week_brief"
                eventPayload={{ source: 'market_desk_article', article: article.slug }}
                className="mt-5 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
              >
                Read commentary
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-2xl font-bold text-[#1F2A44]">Subscribe to the Weekly Insurance Brief</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Get the weekly insurance brief, exam traps, and plain-English insurance insights.
            </p>
          </div>
          <form action="https://app.kit.com/forms/9376932/subscriptions" method="post" acceptCharset="UTF-8" className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <label className="sr-only" htmlFor="market-desk-email">Email address</label>
            <input
              id="market-desk-email"
              type="email"
              name="email_address"
              required
              autoComplete="email"
              placeholder="Email address"
              className="min-w-0 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#2FAF9E] focus:ring-2 focus:ring-[#2FAF9E]/20"
            />
            <button type="submit" className="rounded-xl bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Subscribe
            </button>
          </form>
        </div>
        <p className="mt-5 text-xs leading-6 text-slate-500">{marketDeskDisclaimer}</p>
      </section>
    </main>
  );
}
