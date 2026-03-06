'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { heroCopy } from '@/config/site';

type FormStatus = 'idle' | 'loading' | 'error';

export default function LeadForm() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      event.currentTarget.reset();
      router.push('/thanks');
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    } finally {
      setStatus((current) => (current === 'error' ? 'error' : 'idle'));
    }
  }

  return (
    <section id="free-questions" className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white px-4 py-8 shadow-sm sm:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{heroCopy.secondaryCta}</h2>
        <p className="mt-3 text-slate-600">
          Enter your email to get a free starter set delivered and start practicing today.
        </p>

        <form className="mt-6 grid gap-3 sm:grid-cols-3" onSubmit={handleSubmit} noValidate>
          <div className="sm:col-span-1">
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
              Name (optional)
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Alex"
            />
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex items-end sm:col-span-1">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'loading' ? 'Submitting...' : 'Get Free Questions'}
            </button>
          </div>
        </form>

        {status === 'error' && (
          <p className="mt-3 text-sm font-medium text-red-600" role="status" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
