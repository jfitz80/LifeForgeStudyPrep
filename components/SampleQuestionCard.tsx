'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Option = {
  id: string;
  label: string;
};

const options: Option[] = [
  { id: 'A', label: 'The death benefit is always unaffected' },
  { id: 'B', label: 'A policy loan may create tax consequences if it exceeds the policy’s adjusted cost basis' },
  { id: 'C', label: 'Withdrawals are never taxable' },
  { id: 'D', label: 'The policy automatically becomes paid-up' }
];

const correctId = 'B';

export default function SampleQuestionCard() {
  const [selected, setSelected] = useState<string | null>(null);

  const isCorrect = useMemo(() => selected === correctId, [selected]);
  const hasAnswer = selected !== null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Life Insurance module sample</p>
      <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
        A client owns a permanent life insurance policy with cash value. They want to access funds without cancelling the policy. Which issue should the advisor explain first?
      </h3>

      <div className="mt-6 grid gap-3">
        {options.map((option) => {
          const active = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                active
                  ? 'border-brand-600 bg-brand-50 text-brand-900'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="font-semibold">{option.id}.</span> {option.label}
            </button>
          );
        })}
      </div>

      {hasAnswer && (
        <div
          className={`mt-5 rounded-xl border p-4 text-sm ${
            isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-900'
          }`}
        >
          {isCorrect
            ? 'Correct. Accessing cash value can affect taxation, policy performance, and the eventual death benefit. A policy loan or withdrawal is not automatically tax-free in every situation, so the advisor should explain the possible tax and policy consequences before the client proceeds.'
            : 'Not quite. The trap is assuming cash value access has no side effects. The advisor should explain possible tax and policy consequences before the client proceeds.'}

          <div className="mt-3">
            <Link
              href="/free-practice"
              className="inline-flex rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
            >
              Continue Free Practice
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
