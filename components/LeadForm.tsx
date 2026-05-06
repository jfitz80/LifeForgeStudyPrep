'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

type LeadFormProps = {
  sectionId?: string;
  heading?: string;
  description?: string;
  submitLabel?: string;
  successMessage?: string;
  interest?: 'free-pack' | 'newsletter' | 'exam-prep' | 'general';
  source?: string;
};

export default function LeadForm({
  sectionId = 'free-questions',
  heading = 'Get free life insurance practice questions',
  description = 'Enter your name and email to get free sample questions delivered and start practicing today.',
  submitLabel = 'Get Free Questions',
  successMessage = 'Success. Check your inbox for the next step, or open the free pack now.',
  interest = 'free-pack',
  source = 'lead-form'
}: LeadFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || undefined, email, interest, source })
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'Submission failed.');
      }

      trackEvent('email_capture_submit', {
        interest,
        source,
        email_domain: email.split('@')[1] ?? 'unknown'
      });

      form.reset();
      setStatus('success');
      setMessage(successMessage);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <section id={sectionId} className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white px-4 py-8 shadow-sm sm:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{heading}</h2>
        <p className="mt-3 text-slate-600">{description}</p>

        <form className="mt-6 grid gap-3 sm:grid-cols-3" onSubmit={handleSubmit} noValidate>
          <div className="sm:col-span-1">
            <label htmlFor={`${sectionId}-name`} className="mb-1 block text-sm font-medium text-slate-700">
              Name (optional)
            </label>
            <input
              type="text"
              name="name"
              id={`${sectionId}-name`}
              autoComplete="name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Alex"
            />
          </div>

          <div className="sm:col-span-1">
            <label htmlFor={`${sectionId}-email`} className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id={`${sectionId}-email`}
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
              {status === 'loading' ? 'Submitting...' : submitLabel}
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs leading-6 text-slate-500">
          We only use your email to send the requested resource and relevant LifeForgePrep updates. You can unsubscribe at any time. See our{' '}
          <Link href={siteConfig.legalUrls.privacy} className="font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900">
            Privacy Policy
          </Link>
          .
        </p>

        {message ? (
          <div
            className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
              status === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
            role="status"
            aria-live="polite"
          >
            <p>{message}</p>
            {status === 'success' ? (
              <div className="mt-3 flex flex-wrap gap-3">
                <Link href="/free-pack" className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  Open Free Pack
                </Link>
                <Link href="/free-practice" className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
                  Try 5 Free Questions
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
