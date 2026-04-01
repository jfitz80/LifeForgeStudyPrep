import Link from 'next/link';
import type { Metadata } from 'next';
import { digestTags } from '@/config/home';
import { newsItems } from '@/data/news';
import { isLiveNewsEnabled } from '@/lib/news/runtime';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Life Insurance News Digest | LifeForge Insurance Prep',
  description: 'Weekly life insurance digest with clear summaries, practical implications, and exam-prep relevance.'
};

type NewsPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

type HubItem = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  publishedAtLabel: string;
  source: string;
  category: string;
  categorySlug: string;
};

const categoryLabels: Record<string, string> = {
  claims: 'Claims',
  'clinical-knowledge': 'Clinical Knowledge',
  'industry-trends': 'Industry Trends',
  underwriting: 'Underwriting',
  'regulation-compliance': 'Regulation & Compliance'
};

function slugifyCategory(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeCategory(raw: string | null | undefined): { category: string; categorySlug: string } {
  const value = raw?.trim();

  if (!value) {
    return {
      category: 'Industry Trends',
      categorySlug: 'industry-trends'
    };
  }

  return {
    category: value,
    categorySlug: slugifyCategory(value)
  };
}

function parseCategory(raw: string | null | undefined): { category: string; categorySlug: string } {
  if (!raw) {
    return normalizeCategory(undefined);
  }

  try {
    const parsed = JSON.parse(raw) as string[];
    return normalizeCategory(parsed?.[0]);
  } catch {
    return normalizeCategory(raw);
  }
}

function mapStaticItems(): HubItem[] {
  return newsItems.map((item) => {
    const parsed = normalizeCategory((item as { category?: string; tag?: string }).category ?? item.tag);

    return {
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      publishedAtLabel: item.publishedAtLabel,
      source: item.source,
      category: parsed.category,
      categorySlug: parsed.categorySlug
    };
  });
}

async function getHubItems(): Promise<{ mode: 'live' | 'static'; items: HubItem[] }> {
  if (!isLiveNewsEnabled()) {
    return {
      mode: 'static',
      items: mapStaticItems()
    };
  }

  try {
    const { getNewsHubData } = await import('@/lib/news/queries');
    const data = await getNewsHubData();

    const items: HubItem[] = data.items.map((item) => {
      const parsed = parseCategory(item.tagsJson);

      return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        publishedAtLabel: item.publishedAt
          ? new Date(item.publishedAt).toLocaleDateString()
          : new Date(item.createdAt).toLocaleDateString(),
        source: item.source?.name ?? 'LifeForge News',
        category: parsed.category,
        categorySlug: parsed.categorySlug
      };
    });

    return {
      mode: 'live',
      items
    };
  } catch (error) {
    console.error('news hub live fetch failed:', error);
    return {
      mode: 'static',
      items: mapStaticItems()
    };
  }
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const selectedCategory = params?.category?.toLowerCase().trim();
  const { mode, items } = await getHubItems();

  const filteredItems = selectedCategory
    ? items.filter((item) => item.categorySlug === selectedCategory)
    : items;

  const selectedCategoryLabel = selectedCategory
    ? categoryLabels[selectedCategory] ?? 'Filtered News'
    : null;

  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">
            LifeForge News Digest
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">
            {selectedCategoryLabel ?? 'Daily Insurance Brief'}
          </h1>
          <p className="mt-3 max-w-3xl text-[#4A5568]">
            Stay updated on life insurance, regulation, underwriting, and industry trends with concise
            summaries and practical context.
          </p>
          {selectedCategoryLabel ? (
            <Link
              href="/news"
              className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
            >
              View all news
            </Link>
          ) : null}
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">Mode: {mode}</p>
        </header>

        {!selectedCategory ? (
          <div className="mb-6 flex flex-wrap gap-2">
            {digestTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600">
            No articles found for this category right now.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredItems.map((item) => (
              <article
                key={item.id ?? item.slug}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{item.publishedAtLabel}</span>
                  <span>•</span>
                  <span>{item.source}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                    {item.category}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold text-[#1F2A44]">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.summary}</p>

                <div className="mt-4 flex gap-4">
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
                  >
                    Read analysis
                  </Link>
                  <a
                    href="/free-practice"
                    className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Try free practice
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
