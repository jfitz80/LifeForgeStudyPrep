import type { Metadata } from 'next';
import Link from 'next/link';
import { marketDeskArticles, marketDeskDisclaimer } from '@/data/marketDeskArticles';

export const metadata: Metadata = {
  title: 'LifeForge Market Desk | Life Insurance News and Trends',
  description:
    'Plain-English commentary on life insurance trends, regulation, products, and consumer issues.',
  alternates: {
    canonical: '/news/market-desk'
  },
  openGraph: {
    title: 'LifeForge Market Desk',
    description:
      'Plain-English commentary on life insurance trends, regulation, products, and consumer issues.',
    url: '/news/market-desk',
    type: 'website'
  }
};

const snapshotItems = [
  {
    title: 'Consumer protection',
    text: 'Plain-language coverage of trust, disclosure, suitability, and claims expectations.'
  },
  {
    title: 'Insurance education',
    text: 'Market commentary shaped for curious consumers and exam-prep learners.'
  },
  {
    title: 'Editorial independence',
    text: 'No fake advisor personas, no product sales, and no personalized recommendations.'
  }
] as const;

export default function MarketDeskPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <section className="border-b border-slate-200 bg-gradient-to-br from-white via-[#F2FBF8] to-[#EEF6FF] py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Editorial commentary</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-6xl">
              LifeForge Market Desk
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#4A5568]">
              Clear, independent commentary on life insurance, annuities, regulation, and market trends.
            </p>
          </div>

          <aside className="rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#1F2A44]">Market snapshot</h2>
            <div className="mt-4 space-y-3">
              {snapshotItems.map((item) => (
                <div key={item.title} className="rounded-xl border-l-4 border-[#2FAF9E] bg-slate-50 px-4 py-3">
                  <p className="font-semibold text-[#1F2A44]">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#4A5568]">{item.text}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Latest analysis</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Current insurance trends, explained plainly</h2>
          </div>
          <Link href="/news" className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
            Back to all news
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {marketDeskArticles.map((article) => (
            <article key={article.slug} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-[#E8F7F4] px-2.5 py-1 font-semibold text-[#1E887B]">{article.category}</span>
                <span>{article.date}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">{article.readingTime}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold leading-snug text-[#1F2A44]">{article.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-[#4A5568]">{article.summary}</p>
              <Link
                href={`/news/market-desk/${article.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
              >
                Read commentary
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1F2A44]">Educational disclaimer</h2>
          <p className="mt-2 text-sm leading-7 text-[#4A5568]">{marketDeskDisclaimer}</p>
        </div>
      </section>
    </main>
  );
}
