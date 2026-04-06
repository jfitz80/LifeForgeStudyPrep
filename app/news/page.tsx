import Link from 'next/link';
import type { Metadata } from 'next';
import FeaturedStoriesGrid from '@/components/news/FeaturedStoriesGrid';
import ForStudentsStrip from '@/components/news/ForStudentsStrip';
import NewsCard from '@/components/news/NewsCard';
import NewsHero from '@/components/news/NewsHero';
import { CategoryTag, classifyNewsCategory } from '@/components/news/category-system';
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

const categoryFilterMap = {
  claims: {
    key: 'legal-litigation',
    label: 'Claims',
    description: 'Claims disputes, litigation patterns, and beneficiary or policy wording issues.'
  },
  'clinical-knowledge': {
    key: 'risk-underwriting',
    label: 'Clinical Knowledge',
    description: 'Health-related risk factors, medical evidence, and underwriting consequences.'
  },
  'industry-trends': {
    key: 'industry-trends',
    label: 'Industry Trends',
    description: 'Carrier behavior, market direction, and broader insurance business shifts.'
  },
  underwriting: {
    key: 'risk-underwriting',
    label: 'Underwriting',
    description: 'Risk classification, disclosure quality, and decision logic.'
  },
  'regulation-compliance': {
    key: 'regulation-policy',
    label: 'Regulation & Compliance',
    description: 'Disclosure, documentation, and compliance updates that affect advisor practice.'
  },
  'law-and-litigation': {
    key: 'legal-litigation',
    label: 'Law & Litigation',
    description: 'Court cases, disputes, and legal precedents with practical insurance implications.'
  },
  'future-risk': {
    key: 'risk-underwriting',
    label: 'Future Risk',
    description: 'Emerging underwriting patterns and evolving insurability concerns.'
  },
  'product-innovation': {
    key: 'products-pricing',
    label: 'Product Innovation',
    description: 'Product design changes, pricing moves, and feature comparisons.'
  }
} as const;

type CategoryFilterSlug = keyof typeof categoryFilterMap;

const categoryRail: Array<{ slug: CategoryFilterSlug; title: string; teaser: string }> = [
  {
    slug: 'product-innovation',
    title: 'Product Innovation',
    teaser: 'Track product changes, pricing moves, and design shifts that affect recommendation logic.'
  },
  {
    slug: 'regulation-compliance',
    title: 'Regulation & Compliance',
    teaser: 'Follow suitability, disclosure, and documentation themes that matter in practice and on exams.'
  },
  {
    slug: 'underwriting',
    title: 'Underwriting',
    teaser: 'See how health risk, disclosures, and evidence requirements shape what clients can actually buy.'
  },
  {
    slug: 'claims',
    title: 'Claims & Litigation',
    teaser: 'Use disputes and claims cases to understand policy wording, beneficiary control, and claim expectations.'
  }
];

function buildNewsUrl(page: number, category?: string): string {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/news?${query}` : '/news';
}

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
  searchParams?: Promise<{
    page?: string;
    category?: string;
  }>;
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
  const seenSlugs = new Set<string>();
  const seenHeadlines = new Set<string>();
  const seenCanonicalUrls = new Set<string>();
  const seenSummaryPairs = new Set<string>();

  return items.filter((item) => {
    if (seenSlugs.has(item.slug)) {
      return false;
    }

    const canonical = item.canonicalUrl?.toLowerCase().trim();
    const headlineKey = normalizeHeadline(item.title);
    const summaryKey = normalizeSummary(item.summary);
    const summaryPairKey = `${headlineKey}|${summaryKey}`;

    if (headlineKey && seenHeadlines.has(headlineKey)) {
      return false;
    }

    if (canonical && seenCanonicalUrls.has(canonical)) {
      return false;
    }

    if (seenSummaryPairs.has(summaryPairKey)) {
      return false;
    }

    seenSlugs.add(item.slug);

    if (headlineKey) {
      seenHeadlines.add(headlineKey);
    }

    if (canonical) {
      seenCanonicalUrls.add(canonical);
    }

    seenSummaryPairs.add(summaryPairKey);

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
  const params = (await searchParams) ?? {};
  const requestedCategory = params.category?.toLowerCase().trim() as CategoryFilterSlug | undefined;
  const activeCategory = requestedCategory ? categoryFilterMap[requestedCategory] : undefined;

  const { mode, items } = await getHubItems();
  const deduped = dedupeHubItems(items);

  const categorized: NewsArticleView[] = deduped.map((item) => ({
    ...item,
    whyThisMatters: item.whyThisMatters?.trim() ? item.whyThisMatters : fallbackWhyThisMatters(item),
    category: classifyNewsCategory(item)
  }));

  const filtered = activeCategory
    ? categorized.filter((item) => item.category === activeCategory.key)
    : categorized;

  const featured = activeCategory ? [] : filtered.slice(0, 4);
  const feed = activeCategory ? filtered : filtered.slice(4);

  const pageSize = 9;
  const requestedPage = Number(params.page ?? '1');
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1;
  const totalPages = Math.max(1, Math.ceil(feed.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * pageSize;
  const pagedFeed = feed.slice(start, start + pageSize);

  const trendingTopics = buildTrendingTopics(filtered);
  const categoryCounts = categoryRail.map((item) => ({
    ...item,
    count: categorized.filter((article) => article.category === categoryFilterMap[item.slug].key).length
  }));

  return (
    <main className="min-h-screen bg-[#EEF2F6] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NewsHero topics={trendingTopics} />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-medium uppercase tracking-wide text-slate-500">
          <span>Mode: {mode}</span>
          <span>{categorized.length} editorial stories available</span>
        </div>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Editorial categories</p>
              <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Browse by insurance theme</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#4A5568]">
                Use category views when you want the news feed to reinforce a specific area like underwriting, claims, product design, or compliance.
              </p>
            </div>
            {activeCategory ? (
              <Link href="/news" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
                View all news
              </Link>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {categoryCounts.map((item) => {
              const isActive = requestedCategory === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/news?category=${item.slug}`}
                  className={`rounded-2xl border p-4 transition ${
                    isActive
                      ? 'border-[#2FAF9E] bg-[#F2FBF8]'
                      : 'border-slate-200 bg-[#F9FAFB] hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-base font-semibold text-[#1F2A44]">{item.title}</p>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#4A5568]">{item.count}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#4A5568]">{item.teaser}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {activeCategory ? (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold text-[#1F2A44]">Showing category:</span>
              <span className="rounded-full bg-[#E8F7F4] px-3 py-1 font-semibold text-[#1E887B]">{activeCategory.label}</span>
            </div>
            <p className="mt-3 text-[#4A5568]">{activeCategory.description}</p>
          </div>
        ) : null}

        {!activeCategory ? <FeaturedStoriesGrid items={featured} /> : null}
        {!activeCategory ? <ForStudentsStrip /> : null}

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-[#1F2A44]">
              {activeCategory ? `${activeCategory.label} Stories` : 'Latest Insurance Industry Updates'}
            </h2>
            {!activeCategory ? (
              <div className="hidden gap-2 md:flex">
                {categoryRail.slice(0, 3).map((item) => (
                  <CategoryTag key={item.slug} category={categoryFilterMap[item.slug].key} />
                ))}
              </div>
            ) : null}
          </div>
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
                href={buildNewsUrl(safePage > 1 ? safePage - 1 : 1, requestedCategory)}
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
                href={buildNewsUrl(safePage < totalPages ? safePage + 1 : safePage, requestedCategory)}
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
  );
}
