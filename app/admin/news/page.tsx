import Link from 'next/link';
import AdminArticlesTable from '@/components/news/AdminArticlesTable';
import AdminSourcesTable from '@/components/news/AdminSourcesTable';
import { getAdminNewsData } from '@/lib/news/queries';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'News Admin | LifeForge Insurance Prep'
};

function formatDateLabel(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${hh}:${mm}`;
}

export default async function AdminNewsPage() {
  const data = await getAdminNewsData();

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Admin</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">News Moderation Console</h1>
            <p className="mt-2 text-sm text-slate-600">Review pending articles, manage sources, pin featured stories, and track job logs.</p>
          </div>
          <div className="flex gap-2">
            <form action="/api/news/ingest" method="POST">
              <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
                Run Ingestion Job
              </button>
            </form>
            <Link href="/news" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-white">
              View News Hub
            </Link>
          </div>
        </header>

        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">Article Review Queue</h2>
          <AdminArticlesTable
            items={data.articles.map((item) => ({
              id: item.id,
              title: item.title,
              status: item.status,
              isFeatured: item.isFeatured,
              source: { name: item.source.name },
              publishedAtLabel: formatDateLabel(new Date(item.publishedAt))
            }))}
          />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">Source Management</h2>
          <AdminSourcesTable
            items={data.sources.map((source) => ({
              id: source.id,
              name: source.name,
              feedUrl: source.feedUrl,
              isActive: source.isActive,
              requiresReview: source.requiresReview,
              priority: source.priority
            }))}
          />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">Ingestion Jobs</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Started</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Fetched</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Failed</th>
                </tr>
              </thead>
              <tbody>
                {data.jobs.map((job) => (
                  <tr key={job.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">{formatDateLabel(new Date(job.startedAt))}</td>
                    <td className="px-4 py-3">{job.status ?? 'RUNNING'}</td>
                    <td className="px-4 py-3">{job.itemsFetched}</td>
                    <td className="px-4 py-3">{job.itemsCreated}</td>
                    <td className="px-4 py-3">{job.failedItems}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
