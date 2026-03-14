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
