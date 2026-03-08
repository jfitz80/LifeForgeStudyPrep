'use client';

import { useState } from 'react';

export default function SampleQuestion() {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <section id="question-most-wrong" className="bg-white pb-14 pt-2 sm:pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Question Most Candidates Get Wrong</h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          A core concept that frequently appears in LLQP prep and other life insurance licensing exam study.
        </p>

        <article className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-7">
          <p className="text-base font-semibold text-slate-900">
            A policyholder dies during the grace period after missing a premium payment. What happens?
          </p>

          <ul className="mt-5 space-y-2 text-sm text-slate-700 sm:text-base">
            <li>A. Claim denied</li>
            <li>B. Policy cancelled</li>
            <li>C. Death benefit paid minus unpaid premium</li>
            <li>D. Policy must be reinstated</li>
          </ul>

          <button
            type="button"
            onClick={() => setShowAnswer((current) => !current)}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>

          {showAnswer && (
            <p className="mt-4 rounded-lg border border-brand-100 bg-white px-4 py-3 text-sm text-slate-700" role="status" aria-live="polite">
              <span className="font-semibold text-slate-900">Correct answer:</span> C — the death benefit is paid, but the
              unpaid premium is deducted.
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
