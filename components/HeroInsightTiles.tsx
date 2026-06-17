import Link from 'next/link';
import { getSortedNewsItems, newsItems } from '@/data/news';

type HeroTile = {
  label: string;
  title: string;
  subtitle?: string;
  href: string;
  ariaLabel: string;
  cta: string;
};

const questionPreview = {
  prompt: 'What fact changes the answer?',
  subtitle: 'Try a scenario-based question'
};

const appUpdatePreview = {
  status: 'coming-soon',
  title: 'Professional Practice & Compliance',
  subtitle: 'Ethics, privacy, market conduct, controls, and regulatory oversight',
  href: '/app'
} as const;

const toughTopics = [
  'Market Conduct vs Solvency',
  'Beneficiary Changes',
  'Underwriting Decisions',
  'Policy Provisions',
  'Annuity Payouts',
  'Privacy & Confidentiality'
] as const;

function trimPreview(text: string, maxLength = 78) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function getLatestMarketDeskTile(): HeroTile {
  const latest = getSortedNewsItems(newsItems)[0];

  return {
    label: 'Latest Commentary',
    title: latest?.title ?? 'AI in Underwriting: The Faster Application Has a Trust Problem',
    subtitle: latest?.tag ?? 'LifeForge Market Desk',
    href: latest ? `/news/${latest.slug}` : '/news',
    ariaLabel: 'Read latest Market Desk commentary',
    cta: 'hero-latest-commentary'
  };
}

function getHeroTiles(): HeroTile[] {
  const latest = getLatestMarketDeskTile();

  return [
    {
      label: 'Question Preview',
      title: trimPreview(questionPreview.prompt),
      subtitle: questionPreview.subtitle,
      href: '/free-practice',
      ariaLabel: 'Start free practice questions',
      cta: 'hero-question-preview'
    },
    latest,
    {
      label: appUpdatePreview.status === 'coming-soon' ? 'Coming Next' : 'Now Available',
      title: appUpdatePreview.title,
      subtitle: appUpdatePreview.subtitle,
      href: appUpdatePreview.href,
      ariaLabel: 'Explore the upcoming app update',
      cta: 'hero-app-update-preview'
    },
    {
      label: 'Tough Topic',
      title: toughTopics[0],
      subtitle: 'Build judgment, not memorization',
      href: '/exam-prep',
      ariaLabel: 'Review life insurance exam topics',
      cta: 'hero-tough-topic'
    }
  ];
}

export default function HeroInsightTiles() {
  const tiles = getHeroTiles();

  return (
    <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
      {tiles.map((tile) => (
        <Link
          key={tile.label}
          href={tile.href}
          aria-label={tile.ariaLabel}
          data-cta={tile.cta}
          data-tile-label={tile.label}
          data-location="homepage_hero"
          data-campaign="hero-insight-tiles"
          className="group flex min-h-[118px] flex-col justify-between rounded-xl border border-white/15 bg-white/[0.11] p-4 text-left shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-teal-200/50 hover:bg-white/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-teal-100/80">
            {tile.label}
          </span>
          <span className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-white">
            {tile.title}
          </span>
          {tile.subtitle ? (
            <span className="mt-3 line-clamp-2 text-xs leading-5 text-slate-200/80">
              {tile.subtitle}
            </span>
          ) : null}
          <span className="mt-3 h-px w-10 bg-gradient-to-r from-teal-200/70 to-sky-200/20 transition group-hover:w-16" />
        </Link>
      ))}
    </div>
  );
}
