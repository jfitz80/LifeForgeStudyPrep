import Link from 'next/link';
import type { Metadata } from 'next';
//import SiteHeader from '@/components/editorial/SiteHeader';
//import SiteFooter from '@/components/editorial/SiteFooter';
import FeaturedStoriesGrid from '@/components/news/FeaturedStoriesGrid';
import ForStudentsStrip from '@/components/news/ForStudentsStrip';
import NewsCard from '@/components/news/NewsCard';
import NewsHero from '@/components/news/NewsHero';
import { classifyNewsCategory } from '@/components/news/category-system';
import type { NewsArticleView } from '@/components/news/types';
import { newsItems } from '@/data/news';
import { isLiveNewsEnabled } from '@/lib/news/runtime';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Daily Insurance Brief | LifeForge Insurance Prep',
  description:
    'Life insurance news, insurance industry updates, underwriting trends, and insurance regulation updates with practical LLQP context.',
  keywords: [
    'life insurance news',
    'insurance industry updates',
    'underwriting trends',
    'insurance regulation updates',
    'llqp practice exam'
  ]
};

type HubItem = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  whyThisMatters: string;
  publishedAtLabel: string;
  source: string;
  tag: string;
  canonicalUrl?: string | null;
};

type Props = {
  searchParams?: {
    page?: string;
  };
};

function mapStaticItems(): HubItem[] {
  return newsItems.map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    whyThisMatters: item.whatItMeans,
    publishedAtLabel: item.publishedAtLabel,
    source: item.source,
    tag: item.tag,
    canonicalUrl: null
  }));
}

function parseTag(raw: string | null | undefined): string {
  if (!raw) return 'Industry Trends';
  try {
    const parsed = JSON.parse(raw) as string[];
    const first = parsed?.[0]?.trim();
    if (!first) return 'Industry Trends';
    return first.charAt(0).toUpperCase() + first.slice(1);
  } catch {
    return 'Industry Trends';
  }
}

function normalizeHeadline(title: string): string {
  return title
    .toLowerCase()
    .split(' - ')[0]
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeSummary(summary: string): string {
  return summary
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function dedupeHubItems(items: HubItem[]): HubItem[] {
  const seenKeys = new Set<string>();
  const seenSlugs = new Set<string>();
  return items.filter((item) => {
    if (seenSlugs.has(item.slug)) return false;
    const canonical = item.canonicalUrl?.toLowerCase() ?? '';
    const headlineKey = normalizeHeadline(item.title);
    const summaryKey = normalizeSummary(item.summary);
    const compositeKey = canonical || `${headlineKey}|${summaryKey}`;
    if (!compositeKey || seenKeys.has(compositeKey)) return false;
    seenSlugs.add(item.slug);
    seenKeys.add(compositeKey);
    return true;
  });
}

function fallbackWhyThisMatters(item: Pick<HubItem, 'title' | 'summary' | 'tag'>): string {
  const text = `${item.title} ${item.summary} ${item.tag}`.toLowerCase();
  if (/(underwriting|risk class|medical)/.test(text)) {
    return 'This could impact underwriting decisions and lead to stricter risk classification.';
  }
  if (/(claim|contestability|beneficiar|lawsuit)/.test(text)) {
    return 'This may affect claims expectations, beneficiary planning, and advisor guidance on policy conditions.';
  }
  if (/(regulat|policy|compliance|rule)/.test(text)) {
    return 'This may change suitability, disclosure, or documentation standards in advisor recommendations.';
  }

  return 'This highlights market shifts that can influence product comparisons, client planning, and exam-relevant judgment.';
}

function buildTrendingTopics(items: HubItem[]): string[] {
  const text = items.slice(0, 20).map((item) => `${item.title} ${item.tag}`).join(' ').toLowerCase();
  const topics: string[] = [];

  if (/(ai|automation|digital|insurtech)/.test(text)) topics.push('AI in underwriting');
  if (/(premium|pricing|rate|cost)/.test(text)) topics.push('Premium increases');
  if (/(regulat|policy|compliance|rule)/.test(text)) topics.push('Regulatory changes');
  if (/(claim|litigation|lawsuit)/.test(text)) topics.push('Claims disputes');
  if (/(underwriting|risk)/.test(text)) topics.push('Underwriting trends');

  if (topics.length === 0) {
    return ['AI in underwriting', 'Premium increases', 'Regulatory changes'];
  }

  return topics.slice(0, 5);
}

async function getHubItems(): Promise<{ mode: 'live' | 'static'; items: HubItem[] }> {
  if (!isLiveNewsEnabled()) {
    return { mode: 'static', items: mapStaticItems() };
  }

  try {
    const { getNewsHubData } = await import('@/lib/news/queries');
    const data = await getNewsHubData();

    const mapped: HubItem[] = data.items.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      whyThisMatters: item.whyItMatters,
      publishedAtLabel: item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString()
        : new Date(item.createdAt).toLocaleDateString(),
      source: item.source?.name ?? 'LifeForge News',
      tag: parseTag(item.tagsJson),
      canonicalUrl: item.canonicalUrl ?? null
    }));

    return { mode: 'live', items: mapped };
  } catch (error) {
    console.error('news hub live fetch failed:', error);
    return { mode: 'static', items: mapStaticItems() };
  }
}

export default async function NewsHubPage({ searchParams }: Props) {
  const { mode, items } = await getHubItems();
  const deduped = dedupeHubItems(items);

  const categorized: NewsArticleView[] = deduped.map((item) => ({
    ...item,
    whyThisMatters: item.whyThisMatters?.trim() ? item.whyThisMatters : fallbackWhyThisMatters(item),
    category: classifyNewsCategory(item)
  }));

  const featured = categorized.slice(0, 4);
  const feed = categorized.slice(4);

  const pageSize = 9;
  const requestedPage = Number(searchParams?.page ?? '1');
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1;
  const totalPages = Math.max(1, Math.ceil(feed.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * pageSize;
  const pagedFeed = feed.slice(start, start + pageSize);

  const trendingTopics = buildTrendingTopics(categorized);

  return (
    <>
      
      <main className="min-h-screen bg-[#EEF2F6] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsHero topics={trendingTopics} />

          <p className="mb-6 text-xs font-medium uppercase tracking-wide text-slate-500">Mode: {mode}</p>

          <FeaturedStoriesGrid items={featured} />

          <ForStudentsStrip />

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-[#1F2A44]">Latest Insurance Industry Updates</h2>
            {pagedFeed.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600">
                No additional articles available right now. Please check back shortly.
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {pagedFeed.map((item) => (
                  <NewsCard key={item.id ?? item.slug} article={item} />
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <span className="text-slate-600">
                Page {safePage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Link
                  href={safePage > 1 ? `/news?page=${safePage - 1}` : '/news'}
                  className={`rounded-lg border px-3 py-1.5 font-semibold ${
                    safePage > 1
                      ? 'border-slate-300 text-[#1F2A44] hover:bg-slate-50'
                      : 'cursor-not-allowed border-slate-200 text-slate-400'
                  }`}
                  aria-disabled={safePage <= 1}
                  tabIndex={safePage <= 1 ? -1 : 0}
                >
                  Previous
                </Link>
                <Link
                  href={safePage < totalPages ? `/news?page=${safePage + 1}` : `/news?page=${safePage}`}
                  className={`rounded-lg border px-3 py-1.5 font-semibold ${
                    safePage < totalPages
                      ? 'border-slate-300 text-[#1F2A44] hover:bg-slate-50'
                      : 'cursor-not-allowed border-slate-200 text-slate-400'
                  }`}
                  aria-disabled={safePage >= totalPages}
                  tabIndex={safePage >= totalPages ? -1 : 0}
                >
                  Next
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      
    </>
  );
}
