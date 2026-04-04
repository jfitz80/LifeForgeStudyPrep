'use client';

import { FormEvent, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/config/site';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const issueTypes = [
  'Exam Prep Access',
  'App Support',
  'Technical Issue',
  'General Question',
  'Partnership / Business Inquiry'
] as const;

export default function SupportContactForm() {
  const [state, setState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim().toLowerCase(),
      issueType: String(formData.get('issueType') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
      source: 'support-page'
    };

    try {
      setState('loading');
      setMessage('');
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit support request.');
      }

      trackEvent('support_form_submission', { issue_type: payload.issueType, location: 'support_page' });
      setState('success');
      setMessage(`Thanks. We received your message. For direct follow-up, you can also email ${siteConfig.supportEmail}.`);
      form.reset();
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Unable to submit support request.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
      <input
        type="text"
        name="name"
        placeholder="Your name"
        className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#1F2A44]"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#1F2A44]"
        required
      />
      <select
        name="issueType"
        className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#1F2A44]"
        defaultValue="General Question"
      >
        {issueTypes.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        placeholder="Describe your issue or question"
        className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#1F2A44]"
        rows={5}
        required
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === 'loading' ? 'Submitting...' : 'Send support request'}
      </button>
      {message ? (
        <p className={`text-sm ${state === 'success' ? 'text-emerald-700' : 'text-rose-700'}`}>{message}</p>
      ) : null}
    </form>
  );
}
