'use client';

import TrackedLink from '@/components/TrackedLink';

type StudyCTAProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  location: string;
  campaign?: string;
  variant?: 'light' | 'dark';
};

export default function StudyCTA({
  eyebrow = 'Next step',
  title = 'Studying life insurance? Test the concept.',
  body = 'Reading the article helps. Practice shows whether you can apply the concept under exam-style pressure.',
  primaryLabel = 'Try 15 Free Questions',
  primaryHref = '/free-practice',
  secondaryLabel = 'Explore Full Practice',
  secondaryHref = '/exam-prep',
  location,
  campaign = 'exam-trap',
  variant = 'light'
}: StudyCTAProps) {
  const isDark = variant === 'dark';

  return (
    <section className={`rounded-2xl border p-6 shadow-sm sm:p-8 ${isDark ? 'border-slate-700 bg-[#0F1A2E]' : 'border-[#CFEAE4] bg-[#F1FBF8]'}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${isDark ? 'text-[#6BC4B8]' : 'text-[#2FAF9E]'}`}>{eyebrow}</p>
      <h2 className={`mt-2 text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1F2A44]'}`}>{title}</h2>
      <p className={`mt-3 max-w-3xl text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-[#315A55]'}`}>{body}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <TrackedLink
          href={primaryHref}
          eventName="study_cta_click"
          eventPayload={{ location, campaign, cta: 'primary' }}
          data-cta="try-free-practice"
          data-location={location}
          data-campaign={campaign}
          className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
        >
          {primaryLabel}
        </TrackedLink>
        {secondaryHref && secondaryLabel ? (
          <TrackedLink
            href={secondaryHref}
            eventName="study_cta_click"
            eventPayload={{ location, campaign, cta: 'secondary' }}
            data-cta="explore-full-practice"
            data-location={location}
            data-campaign={campaign}
            className={`inline-flex items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold transition ${
              isDark ? 'border-slate-500 text-white hover:bg-slate-800' : 'border-slate-300 bg-white text-[#1F2A44] hover:bg-slate-50'
            }`}
          >
            {secondaryLabel}
          </TrackedLink>
        ) : null}
      </div>
    </section>
  );
}
