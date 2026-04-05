'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/config/site';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

type NewsletterSignupProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  successMessage?: string;
  privacyNote?: string;
  idleMessage?: string;
  eventName?: string;
};

export default function NewsletterSignup({
  title = 'Stay Informed with LifeForgePrep',
  description = 'Get the latest life insurance news and expert tips delivered to your inbox.',
  buttonLabel = 'Subscribe',
  successMessage = 'You are subscribed. Watch your inbox for updates.',
  privacyNote,
  idleMessage = 'We only use your email to send the requested resource and relevant LifeForgePrep updates. You can unsubscribe anytime.',
  eventName = 'email_capture_submit'
}: NewsletterSignupProps) {
  const helperText = privacyNote ?? idleMessage;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();
    const trimmedName = name.trim();

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
        body: JSON.stringify({
          name: trimmedName || undefined,
          email: normalized,
          interest: 'newsletter',
          source: 'homepage-newsletter'
        })
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'Unable to subscribe right now.');
      }

      trackEvent(eventName, {
        placement: 'homepage',
        email_domain: normalized.split('@')[1] ?? 'unknown'
      });
      setState('success');
      setMessage(successMessage);
      setName('');
      setEmail('');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Unable to subscribe right now.');
    }
  }

  return (
    <section id="newsletter-signup" className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-gradient-to-r from-[#1F2A44] to-[#2f4d73] p-8 text-white shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h3 className="text-4xl font-bold sm:text-5xl">{title}</h3>
            <p className="mt-3 text-lg text-slate-200 sm:text-2xl">{description}</p>
          </div>

          <div>
            <form onSubmit={onSubmit} className="grid gap-3">
              <div>
                <label htmlFor="newsletter-name" className="mb-2 block text-sm font-medium text-slate-100">
                  Name (optional)
                </label>
                <input
                  id="newsletter-name"
                  type="text"
                  placeholder="Alex"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (state !== 'idle') {
                      setState('idle');
                      setMessage('');
                    }
                  }}
                  className="w-full rounded-2xl border border-white/20 bg-white px-5 py-3 text-base text-[#1F2A44] outline-none"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium text-slate-100">
                  Email
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
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
                    className="w-full rounded-2xl border border-white/20 bg-white px-5 py-4 text-lg text-[#1F2A44] outline-none"
                    required
                    autoComplete="email"
                  />
                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="rounded-2xl bg-[#2FAF9E] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#26988a] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {state === 'loading' ? 'Submitting...' : buttonLabel}
                  </button>
                </div>
              </div>
            </form>

            <p className="mt-3 text-base text-slate-200">
              {helperText}{' '}
              <Link href={siteConfig.legalUrls.privacy} className="font-medium text-white underline underline-offset-2 hover:text-[#7AD2C4]">
                Privacy Policy
              </Link>
              .
            </p>

            {message ? (
              <div
                className={`mt-4 rounded-2xl border px-4 py-3 text-base ${
                  state === 'success'
                    ? 'border-emerald-200/40 bg-emerald-500/10 text-emerald-100'
                    : 'border-red-200/40 bg-red-500/10 text-red-100'
                }`}
              >
                {message}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
