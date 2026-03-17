'use client';

import { FormEvent, useState } from 'react';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSignup() {
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
        throw new Error(data.error || 'Unable to subscribe right now.');
      }

      setState('success');
      setMessage('You are subscribed. Watch your inbox for updates.');
      setEmail('');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Unable to subscribe right now.');
    }
  }

  return (
    <section id="newsletter-signup" className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-gradient-to-r from-[#1F2A44] to-[#2f4d73] p-8 text-white shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h3 className="text-5xl font-bold">Stay Informed with LifeForgePrep</h3>
            <p className="mt-3 text-2xl text-slate-200">
              Get the latest life insurance news and expert tips delivered to your inbox.
            </p>
          </div>

          <div>
            <form onSubmit={onSubmit} className="flex overflow-hidden rounded-2xl bg-white">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (state !== 'idle') {
                    setState('idle');
                    setMessage('');
                  }
                }}
                className="w-full px-5 py-4 text-xl text-[#1F2A44] outline-none"
                required
                autoComplete="email"
              />
              <button
                type="submit"
                disabled={state === 'loading'}
                className="bg-[#2FAF9E] px-8 py-4 text-2xl font-semibold text-white transition hover:bg-[#26988a] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state === 'loading' ? 'Submitting...' : 'Subscribe'}
              </button>
            </form>

            {message ? (
              <p
                className={`mt-3 text-base ${
                  state === 'success' ? 'text-emerald-200' : state === 'error' ? 'text-red-200' : 'text-slate-200'
                }`}
              >
                {message}
              </p>
            ) : (
              <p className="mt-3 text-base text-slate-200">Your information is kept secure. Unsubscribe anytime.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
