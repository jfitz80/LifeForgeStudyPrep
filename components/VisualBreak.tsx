import Link from 'next/link';
import Image from 'next/image';
import HeroInsightTiles from '@/components/HeroInsightTiles';

type VisualBreakProps = {
  title: string;
  subtitle: string;
  variant?: 'light' | 'dark' | 'gradient';
  imageSrc?: string;
  imageAlt?: string;
  cta?: {
    label: string;
    href: string;
  };
};

const variantClasses: Record<NonNullable<VisualBreakProps['variant']>, string> = {
  light: 'bg-white border border-slate-200 text-slate-900',
  dark: 'bg-slate-900 text-white border border-slate-800',
  gradient:
    'bg-gradient-to-br from-slate-900 via-slate-800 to-brand-700 text-white border border-slate-700'
};

export default function VisualBreak({
  title,
  subtitle,
  variant = 'gradient',
  imageSrc,
  imageAlt,
  cta
}: VisualBreakProps) {
  return (
    <section className={`rounded-3xl p-6 sm:p-10 ${variantClasses[variant]}`}>
      <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 opacity-90 sm:text-base">{subtitle}</p>

          {cta && (
            <div className="mt-6">
              <Link
                href={cta.href}
                data-cta={cta.label.toLowerCase().includes('15 free') ? 'try-free-practice' : undefined}
                data-location="homepage-visual-break"
                data-campaign="freemium-funnel"
                className="inline-flex rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500"
              >
                {cta.label}
              </Link>
            </div>
          )}
        </div>

        {imageSrc ? (
          <div className="relative h-56 overflow-hidden rounded-2xl border border-white/20 bg-white/10">
            <Image src={imageSrc} alt={imageAlt ?? title} fill className="object-cover" />
          </div>
        ) : (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5">
            <HeroInsightTiles />
          </div>
        )}
      </div>
    </section>
  );
}
