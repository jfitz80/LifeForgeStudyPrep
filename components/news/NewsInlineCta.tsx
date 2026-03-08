import Link from 'next/link';

export default function NewsInlineCta() {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-100">Study boost</p>
      <h3 className="mt-2 text-xl font-bold">Need help understanding life insurance?</h3>
      <p className="mt-2 text-sm text-slate-300">
        Get scenario-based practice questions and clear explanations built for future advisors preparing for licensing exams.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/#free-questions"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Get Free Questions
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          View Study Options
        </Link>
      </div>
    </article>
  );
}
