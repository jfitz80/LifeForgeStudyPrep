'use client';

import { FormEvent, useState } from 'react';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function BonusPracticeCapture() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();

    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setState('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      setState('loading');
      setMessage('');

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalized })
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'Unable to submit right now.');
      }

      setState('success');
      setMessage('Bonus questions are on the way. Check your inbox.');
      setEmail('');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Unable to submit right now.');
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-700 bg-[#111A2D] p-6 sm:p-8">
      <h3 className="text-xl font-bold text-white">Want More Practice Questions?</h3>
      <p className="mt-2 text-sm leading-7 text-slate-300">Get 10 bonus questions and exam tips.</p>

      <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label htmlFor="bonus-practice-email" className="sr-only">
          Email address
        </label>
        <input
          id="bonus-practice-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state !== 'idle') {
              setState('idle');
              setMessage('');
            }
          }}
          placeholder="Enter your email"
          autoComplete="email"
          required
          className="w-full rounded-lg border border-slate-600 bg-[#0E1628] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-[#2FAF9E]"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === 'loading' ? 'Submitting...' : 'Send Bonus Questions'}
        </button>
      </form>

      {message ? (
        <p className={`mt-3 text-sm ${state === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>{message}</p>
      ) : null}
    </section>
  );
}
