import Link from 'next/link';
import type { Metadata } from 'next';
import NewsCard from '@/components/news/NewsCard';
import NewsInlineCta from '@/components/news/NewsInlineCta';
import NewsTopCta from '@/components/news/NewsTopCta';
import { getNewsHubData } from '@/lib/news/queries';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Life Insurance News Hub | LifeForge Insurance Prep',
  description:
    'Latest life insurance news with original summaries, policyholder context, advisor insights, and LLQP exam relevance.'
};

export default async function NewsHubPage({
  searchParams
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.trim() || undefined;
  const { featured, items } = await getNewsHubData(query);

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">LifeForge News Engine</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Life Insurance News & Exam Insights</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Fresh life insurance headlines with original summaries and exam-prep context. Read the update, then move into
            practical study resources.
          </p>
        </header>

        <NewsTopCta />

        <form className="mt-6 rounded-xl border border-slate-200 bg-white p-4" method="GET" action="/news">
          <label htmlFor="news-search" className="mb-2 block text-sm font-medium text-slate-700">
            Search news
          </label>
          <div className="flex gap-2">
            <input
              id="news-search"
              name="q"
              defaultValue={query ?? ''}
              placeholder="Search life insurance topics..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
              Search
            </button>
          </div>
        </form>

        {!!featured.length && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-slate-900">Featured Stories</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {featured.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Latest Coverage</h2>
            <Link href="/#free-questions" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
              Get free practice questions
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-sm text-slate-600">
              No approved articles found yet. Run ingestion and review items in the admin panel.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((article, index) => (
                <div key={article.id} className="contents">
                  <NewsCard article={article} />
                  {(index + 1) % 4 === 0 && (
                    <div className="md:col-span-2">
                      <NewsInlineCta />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
