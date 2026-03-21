import Link from 'next/link';

export default function UpgradeCTA() {
  return (
    <section className="mt-6 rounded-2xl border border-slate-700 bg-[#0F1A2E] p-6 sm:p-8">
      <h3 className="text-2xl font-bold text-white">Get Fully Prepared for the LLQP</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Build exam-day confidence with focused practice designed around the way LLQP questions are actually tested.
      </p>

      <ul className="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
          <span>80+ exam-level questions</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
          <span>Scenario-based cases</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
          <span>Taxation traps</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
          <span>Underwriting logic</span>
        </li>
        <li className="flex items-start gap-2 sm:col-span-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
          <span>Real exam difficulty</span>
        </li>
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/exam-prep"
          className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
        >
          Unlock Full Exam Prep
        </Link>
        <Link
          href="/exam-prep"
          className="inline-flex items-center rounded-lg border border-slate-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Explore Study Guide
        </Link>
      </div>

      <article className="mt-6 rounded-xl border border-slate-700 bg-[#111A2D] p-4">
        <h4 className="text-base font-semibold text-white">Why This Works</h4>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          <li>Based on real exam patterns</li>
          <li>Focused on application</li>
          <li>Built around common failure points</li>
        </ul>
      </article>
    </section>
  );
}
