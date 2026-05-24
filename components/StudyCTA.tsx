import Link from 'next/link';

type StudyCTAProps = {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  location: string;
  campaign: string;
  variant?: 'light' | 'dark';
};

function ctaName(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes('15 free') || normalized.includes('start free')) return 'try-free-practice';
  if (normalized.includes('download')) return 'download-free-app';
  if (normalized.includes('unlock')) return 'unlock-full-practice';
  if (normalized.includes('pdf')) return 'optional-pdf-guide';
  return normalized.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function StudyCTA({
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  location,
  campaign,
  variant = 'light'
}: StudyCTAProps) {
  const dark = variant === 'dark';

  return (
    <section
      className={`rounded-3xl border p-6 shadow-sm sm:p-8 ${
        dark ? 'border-slate-700 bg-[#0F1A2E]' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">LifeForgePrep</p>
          <h2 className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${dark ? 'text-white' : 'text-[#1F2A44]'}`}>
            {title}
          </h2>
          <p className={`mt-3 text-sm leading-7 ${dark ? 'text-slate-300' : 'text-[#4A5568]'}`}>{body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href={primaryHref}
            data-cta={ctaName(primaryLabel)}
            data-location={location}
            data-campaign={campaign}
            className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              data-cta={ctaName(secondaryLabel)}
              data-location={location}
              data-campaign={campaign}
              className={`inline-flex items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold transition ${
                dark
                  ? 'border-slate-500 text-white hover:bg-slate-800'
                  : 'border-slate-300 bg-white text-[#1F2A44] hover:bg-slate-50'
              }`}
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
