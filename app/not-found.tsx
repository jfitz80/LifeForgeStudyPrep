import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-slate-900">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-3 text-slate-600">The article may no longer exist or has not been approved yet.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/news" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          Back to News Hub
        </Link>
        <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          Home
        </Link>
      </div>
    </main>
  );
}
