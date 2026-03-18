import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';
import {
  classifyNewsCategory,
  NewsCategoryVisual,
  newsCategoryMeta,
  type NewsCategoryKey
} from '@/components/editorial/news-categories';
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

type CategorizedHubItem = HubItem & { category: NewsCategoryKey };

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

function normalizeHeadline(title: string): string {
  return title
    .toLowerCase()
    .split(' - ')[0]
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function dedupeHubItems(items: HubItem[]): HubItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = normalizeHeadline(item.title);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildDailyBrief(items: HubItem[]): DailyBrief {
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const ranked = [...items].sort((a, b) => titleScore(b.title, b.tag) - titleScore(a.title, a.tag));

  const seen = new Set<string>();
  const uniqueRanked = ranked.filter((item) => {
    const key = normalizeHeadline(item.title);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const shortlist = uniqueRanked.slice(0, 5);

  const themes = Array.from(new Set(shortlist.map((i) => toTheme(i.tag))));
  while (themes.length < 3) themes.push('Client Impact');
  const keyThemes: [string, string, string] = [themes[0], themes[1], themes[2]];

  const summary =
    shortlist.length > 0
      ? "Today's coverage centers on claim outcomes, policy interpretation, and shifting risk signals across the life insurance market. Advisors should focus on updates that affect claims expectations, underwriting conversations, and client suitability guidance. For LLQP prep, these stories reinforce practical exam scenarios around policy wording, claims handling, and risk assessment."
      : 'Today’s coverage is light, but key stories still highlight claims, policy structure, and underwriting implications. Review the latest items for client-facing relevance.';

  return {
    title: `Daily Insurance Brief — ${dateLabel}`,
    summary,
    keyThemes,
    whyItMatters:
      'This helps you quickly prioritize high-signal stories that affect client advice, policy understanding, and LLQP exam judgment.',
    worthReading: shortlist
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
  const { mode, items } = await getHubItems();
  const dedupedItems = dedupeHubItems(items);
  const brief = buildDailyBrief(dedupedItems);
  const categorized: CategorizedHubItem[] = dedupedItems.map((item) => ({
    ...item,
    category: classifyNewsCategory(item)
  }));
  const featuredStory = categorized[0];
  const remaining = categorized.slice(1);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#EEF2F6] py-12">
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

          </section>

          <div className="mb-6 flex flex-wrap gap-2">
            {digestTags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            ))}
          </div>

          {featuredStory && (
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-[#1F2A44]">Featured Story</h2>
              <article className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md lg:grid-cols-[320px_minmax(0,1fr)]">
                <NewsCategoryVisual category={featuredStory.category} />
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className={`rounded-full px-2.5 py-1 font-semibold ${newsCategoryMeta[featuredStory.category].badgeClass}`}>
                      {newsCategoryMeta[featuredStory.category].label}
                    </span>
                    <span>{featuredStory.publishedAtLabel}</span>
                    <span>•</span>
                    <span>{featuredStory.source}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold leading-tight text-[#1F2A44]">{featuredStory.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{featuredStory.summary}</p>
                  <div className="mt-5">
                    <Link
                      href={`/news/${featuredStory.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-[#2FAF9E] transition hover:text-[#1F2A44]"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            </section>
          )}

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[#1F2A44]">Latest Stories</h2>
            {remaining.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600">
                No additional articles available right now. Please check back shortly.
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {remaining.map((item) => (
                  <article
                    key={item.id ?? item.slug}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <NewsCategoryVisual category={item.category} />
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className={`rounded-full px-2.5 py-1 font-semibold ${newsCategoryMeta[item.category].badgeClass}`}>
                        {newsCategoryMeta[item.category].label}
                      </span>
                      <span>{item.publishedAtLabel}</span>
                      <span>•</span>
                      <span>{item.source}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-[#1F2A44]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.summary}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <Link href={`/news/${item.slug}`} className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                        Read more
                      </Link>
                      <a href="/#newsletter-signup" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
                        Weekly digest
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
