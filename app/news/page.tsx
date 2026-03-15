import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';
import { digestTags } from '@/config/home';
import { newsItems } from '@/data/news';
import { isLiveNewsEnabled } from '@/lib/news/runtime';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Life Insurance News Digest | LifeForge Insurance Prep',
  description: 'Weekly life insurance digest with clear summaries, practical implications, and exam-prep relevance.'
};

type HubItem = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  publishedAtLabel: string;
  source: string;
  tag: string;
};

type DailyBrief = {
  title: string;
  summary: string;
  keyThemes: [string, string, string];
  whyItMatters: string;
  worthReading: HubItem[];
};

function mapStaticItems(): HubItem[] {
  return newsItems.map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    publishedAtLabel: item.publishedAtLabel,
    source: item.source,
    tag: item.tag
  }));
}

function parseTag(raw: string | null | undefined): string {
  if (!raw) return 'Market Watch';
  try {
    const parsed = JSON.parse(raw) as string[];
    const first = parsed?.[0]?.trim();
    if (!first) return 'Market Watch';
    return first.charAt(0).toUpperCase() + first.slice(1);
  } catch {
    return 'Market Watch';
  }
}

function titleScore(title: string, tag: string): number {
  const text = `${title} ${tag}`.toLowerCase();
  let score = 0;
  if (/(claims?|payout|beneficiar|denied|contestability)/.test(text)) score += 4;
  if (/(underwriting|policy|premium|pricing|regulation)/.test(text)) score += 3;
  if (/(ai|automation|insurtech|product|launch)/.test(text)) score += 2;
  if (/(stock|profit|earnings|valuation)/.test(text)) score += 1;
  return score;
}

function toTheme(tag: string): string {
  const raw = tag.toLowerCase();
  if (raw.includes('claim')) return 'Claims Trends';
  if (raw.includes('underwrit')) return 'Underwriting Risk';
  if (raw.includes('regulat')) return 'Regulatory Watch';
  if (raw.includes('premium')) return 'Premium Pressure';
  if (raw.includes('policy')) return 'Policy Terms';
  if (raw.includes('market')) return 'Market Watch';
  return 'Coverage Insights';
}

function buildDailyBrief(items: HubItem[]): DailyBrief {
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const ranked = [...items]
    .sort((a, b) => titleScore(b.title, b.tag) - titleScore(a.title, a.tag))
    .slice(0, 5);

  const top = ranked[0];
  const second = ranked[1];
  const third = ranked[2];

  const themes = Array.from(new Set(ranked.map((i) => toTheme(i.tag))));
  while (themes.length < 3) themes.push('Client Impact');
  const keyThemes: [string, string, string] = [themes[0], themes[1], themes[2]];

  const summary = top
    ? `${top.title} leads today’s brief with direct implications for advisors and policyholders. ${
        second ? `${second.title} adds context on how market and product conditions are shifting.` : 'Recent coverage shows a mix of market and policy developments.'
      } ${third ? `${third.title} is also worth reviewing for exam-relevant scenarios.` : 'These updates are useful for practical LLQP review.'}`
    : 'Today’s coverage is light, but key stories still highlight claims, policy structure, and underwriting implications. Review the latest items for client-facing relevance.';

  return {
    title: `Daily Insurance Brief — ${dateLabel}`,
    summary,
    keyThemes,
    whyItMatters:
      'This helps you quickly prioritize high-signal stories that affect client advice, policy understanding, and LLQP exam judgment.',
    worthReading: ranked
  };
}

async function getHubItems(): Promise<{ mode: 'live' | 'static'; featured: HubItem[]; items: HubItem[] }> {
  if (!isLiveNewsEnabled()) {
    const items = mapStaticItems();
    return { mode: 'static', featured: items.slice(0, 3), items };
  }

  try {
    const { getNewsHubData } = await import('@/lib/news/queries');
    const data = await getNewsHubData();

    const mapped: HubItem[] = data.items.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      publishedAtLabel: item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString()
        : new Date(item.createdAt).toLocaleDateString(),
      source: item.source?.name ?? 'LifeForge News',
      tag: parseTag(item.tagsJson)
    }));

    return {
      mode: 'live',
      featured: mapped.slice(0, 3),
      items: mapped
    };
  } catch (error) {
    console.error('news hub live fetch failed:', error);
    const items = mapStaticItems();
    return { mode: 'static', featured: items.slice(0, 3), items };
  }
}

export default async function NewsHubPage() {
  const { mode, featured, items } = await getHubItems();
  const brief = buildDailyBrief(items);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">LifeForge News Digest</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">This Week in Life Insurance</h1>
            <p className="mt-3 max-w-3xl text-[#4A5568]">
              Practical life insurance headlines with clear summaries, key implications, and exam-relevant context.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">Mode: {mode}</p>
          </header>

          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Daily Brief</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">{brief.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{brief.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {brief.keyThemes.map((theme) => (
                <span key={theme} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {theme}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm font-medium text-slate-800">{brief.whyItMatters}</p>

            {brief.worthReading.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-[#1F2A44]">Worth Reading Now</h3>
                <ul className="mt-2 space-y-2">
                  {brief.worthReading.map((item) => (
                    <li key={`brief-${item.id ?? item.slug}`}>
                      <Link href={`/news/${item.slug}`} className="text-sm text-[#2FAF9E] hover:text-[#1F2A44] hover:underline">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <div className="mb-6 flex flex-wrap gap-2">
            {digestTags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            ))}
          </div>

          {featured.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-[#1F2A44]">Featured</h2>
              <div className="grid gap-4 lg:grid-cols-3">
                {featured.map((item) => (
                  <article key={`featured-${item.id ?? item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>{item.publishedAtLabel}</span>
                      <span>•</span>
                      <span>{item.source}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-[#1F2A44]">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-600">{item.summary}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">{item.tag}</span>
                      <Link href={`/news/${item.slug}`} className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                        Read analysis
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[#1F2A44]">Latest</h2>
            {items.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600">
                No articles available right now. Please check back shortly.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {items.map((item) => (
                  <article key={item.id ?? item.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>{item.publishedAtLabel}</span>
                      <span>•</span>
                      <span>{item.source}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">{item.tag}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-[#1F2A44]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.summary}</p>
                    <div className="mt-4 flex gap-4">
                      <Link href={`/news/${item.slug}`} className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                        Read analysis
                      </Link>
                      <a href="/#newsletter-signup" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
                        Get weekly digest
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
