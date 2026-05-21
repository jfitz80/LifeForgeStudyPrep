import Link from 'next/link';

export default function NewsTopCta() {
  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-900">Top prep resource</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Don&apos;t just memorize terms. Practise exam-style reasoning.</h2>
        <Link
          href="/free-practice"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-900"
        >
          Try 15 Free Questions
        </Link>
      </div>
    </div>
  );
}
