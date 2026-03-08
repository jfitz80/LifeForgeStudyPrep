'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

type State = 'idle' | 'loading' | 'done' | 'error';

export default function NewsLeadSticky() {
  const [state, setState] = useState<State>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();

    if (!email) {
      setState('error');
      return;
    }

    setState('loading');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      if (!response.ok) throw new Error('failed');

      setState('done');
      event.currentTarget.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Free study support</p>
      <h3 className="mt-2 text-lg font-bold text-slate-900">Get free life insurance practice questions</h3>
      <p className="mt-2 text-sm text-slate-600">
        Join the newsletter for practical exam prep updates and weekly question breakdowns.
      </p>

      <form onSubmit={submit} className="mt-4 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name (optional)"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="email"
          required
          name="email"
          placeholder="Email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {state === 'loading' ? 'Submitting...' : 'Get Free Questions'}
        </button>
      </form>

      <p className="mt-3 text-xs text-slate-500">
        By signing up, you agree to receive exam prep emails. Unsubscribe anytime. <Link href="/privacy" className="underline">Privacy</Link>
      </p>

      {state === 'done' && <p className="mt-2 text-xs font-medium text-emerald-700">Thanks - check your inbox.</p>}
      {state === 'error' && <p className="mt-2 text-xs font-medium text-red-600">Please try again with a valid email.</p>}
    </aside>
  );
}
