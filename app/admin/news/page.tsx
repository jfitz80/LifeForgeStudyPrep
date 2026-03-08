import Link from 'next/link';
import AdminArticlesTable from '@/components/news/AdminArticlesTable';
import AdminSourcesTable from '@/components/news/AdminSourcesTable';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'News Admin | LifeForge Insurance Prep'
};

export default async function AdminNewsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Admin</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">News Moderation Console</h1>
            <p className="mt-2 text-sm text-slate-600">
              Deployment-safe admin view. Run ingestion locally and approve content through your local environment.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/news" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-white">
              View News Hub
            </Link>
          </div>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-base font-bold text-slate-900">Run ingestion locally</h2>
          <p className="mt-2 text-sm text-slate-600">Use this command in your local project folder:</p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-100">npm run news:ingest</pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">Article Review Queue</h2>
          <AdminArticlesTable items={[]} />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">Source Management</h2>
          <AdminSourcesTable items={[]} />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">Ingestion Jobs</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            No hosted job logs available in this deployment.
          </div>
        </section>
      </div>
    </main>
  );
}
