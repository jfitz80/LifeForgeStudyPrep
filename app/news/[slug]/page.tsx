import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cache } from 'react';
import { CategoryTag, classifyNewsCategory } from '@/components/news/category-system';
import type { NewsArticleView } from '@/components/news/types';
import { getNewsBySlug, getRelatedNewsItems, marketDeskDisclaimer, newsItems } from '@/data/news';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
};

type ArticleView = {
  slug: string;
  title: string;
  summary: string;
  publishedAtLabel: string;
  updatedAtLabel?: string;
  readingTime?: string;
  source: string;
  originalUrl?: string;
  sourceName?: string;
  sourceDate?: string;
  sources?: Array<{
    name: string;
    url?: string;
  }>;
  seoTitle?: string;
  metaDescription?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  archiveNotice?: string;
  whatHappened: string;
  marketDeskView: string;
  whyAdvisorsShouldCare: string;
  learnerConnection: string;
  bodySections?: Array<{
    heading?: string;
    paragraphs: string[];
  }>;
  consumerTakeaway: string;
  relatedTopics: Array<{ label: string; href: string }>;
  relatedCommentary?: Array<{
    slug: string;
    title: string;
    summary: string;
    tag: string;
    publishedAtLabel: string;
  }>;
  keyPoints: string[];
  category: NewsArticleView['category'];
  tag: string;
};

async function readSlug(params: Props['params']): Promise<string> {
  const resolved = await params;
  return resolved.slug;
}

function buildKeyPoints(parts: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const points: string[] = [];

  for (const part of parts) {
    if (!part) continue;
    const chunks = part
      .split(/[.!?]\s+/)
      .map((s) => s.trim().replace(/\s+/g, ' '))
      .filter(Boolean);

    for (const chunk of chunks) {
      const key = chunk.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      points.push(chunk);
      if (points.length >= 4) return points;
    }
  }

  return points.length
    ? points
    : ['Use this story to connect product logic, underwriting, claims, and suitability principles.'];
}

function getRelatedTopics(category: NewsArticleView['category']) {
  switch (category) {
    case 'products-pricing':
      return [
        { label: 'Term vs Permanent Life Insurance', href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance' },
        { label: 'What Is Permanent Life Insurance?', href: '/knowledge/life-insurance-basics/what-is-permanent-life-insurance' }
      ];
    case 'risk-underwriting':
      return [
        { label: 'How Underwriting Works', href: '/knowledge/policy-mechanics/how-underwriting-works' },
        { label: 'What Is Evidence of Insurability?', href: '/knowledge/policy-mechanics/what-is-evidence-of-insurability' }
      ];
    case 'legal-litigation':
      return [
        { label: 'Beneficiary Designations and Policy Control', href: '/knowledge/policy-mechanics/beneficiary-designations-and-control' },
        { label: 'Insurable Interest and Disclosure', href: '/knowledge/life-insurance-basics/insurable-interest-and-disclosure' }
      ];
    case 'regulation-policy':
      return [
        { label: 'Questions a New Advisor Should Ask a Client', href: '/knowledge/llqp-exam-prep/questions-a-new-advisor-should-ask-a-client' },
        { label: 'LLQP Scenario Framework', href: '/knowledge/llqp-exam-prep/llqp-scenario-framework' }
      ];
    default:
      return [
        { label: 'Who Needs Life Insurance?', href: '/knowledge/life-insurance-basics/who-needs-life-insurance' },
        { label: 'Explore the Knowledge Hub', href: '/knowledge' }
      ];
  }
}

function buildConsumerTakeaway(category: NewsArticleView['category'], whatItMeans: string) {
  switch (category) {
    case 'risk-underwriting':
      return 'Expect health, disclosure, and risk-class details to affect both availability and price. Clean fact-finding matters.';
    case 'products-pricing':
      return 'Do not compare policies on headline premium alone. Product details, flexibility, and long-term fit matter.';
    case 'legal-litigation':
      return 'Claims and legal disputes usually reveal weak documentation, disclosure gaps, or misunderstood policy terms.';
    case 'regulation-policy':
      return 'Changes in disclosure and suitability standards affect how recommendations should be explained and documented.';
    default:
      return whatItMeans;
  }
}

function fromStatic(slug: string): ArticleView | null {
  const item = getNewsBySlug(slug);
  if (!item) return null;

  const category = classifyNewsCategory(item);
  return {
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    publishedAtLabel: item.publishedAtLabel,
    updatedAtLabel: item.updatedAtLabel,
    readingTime: item.readingTime,
    source: item.source,
    originalUrl: item.sourceUrl,
    sourceName: item.sourceName,
    sourceDate: item.sourceDate,
    sources: item.sources,
    seoTitle: item.seoTitle,
    metaDescription: item.metaDescription,
    openGraphTitle: item.openGraphTitle,
    openGraphDescription: item.openGraphDescription,
    archiveNotice: item.archiveNotice,
    whatHappened: item.whatHappened,
    marketDeskView: item.marketDeskView,
    whyAdvisorsShouldCare: item.whyAdvisorsShouldCare,
    learnerConnection: item.learnerConnection,
    bodySections: item.bodySections,
    consumerTakeaway: buildConsumerTakeaway(category, item.whatItMeans),
    relatedTopics: getRelatedTopics(category),
    relatedCommentary: getRelatedNewsItems(item).map((related) => ({
      slug: related.slug,
      title: related.title,
      summary: related.summary,
      tag: related.tag,
      publishedAtLabel: related.publishedAtLabel
    })),
    keyPoints: item.keyPoints,
    category,
    tag: item.tag
  };
}

async function fromLive(slug: string): Promise<ArticleView | null> {
  try {
    const { getNewsArticleBySlug } = await import('@/lib/news/queries');
    const article = await getNewsArticleBySlug(slug);
    if (!article) return null;

    const publishedAtLabel = article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString()
      : new Date(article.createdAt).toLocaleDateString();

    const base = {
      title: article.title,
      summary: article.summary,
      tag: article.tagsJson ?? ''
    };
    const category = classifyNewsCategory(base);

    return {
      slug: article.slug,
      title: article.title,
      summary: article.summary,
      publishedAtLabel,
      source: article.source?.name ?? 'LifeForge News',
      originalUrl: article.canonicalUrl ?? undefined,
      whatHappened: article.summary,
      marketDeskView:
        article.whyItMatters || 'This update may affect coverage expectations, product comparisons, underwriting judgments, or advisor-client communication.',
      whyAdvisorsShouldCare:
        article.whyItMatters || 'Advisors should watch how this development may affect client expectations, documentation, and product conversations.',
      learnerConnection:
        article.llqpAngle ||
        'This topic connects to policy terms, underwriting logic, claims handling, suitability, and advisor communication.',
      consumerTakeaway: buildConsumerTakeaway(category, article.whyItMatters || ''),
      relatedTopics: getRelatedTopics(category),
      keyPoints: buildKeyPoints([article.summary, article.whoItAffects, article.whyItMatters, article.llqpAngle]),
      category,
      tag: typeof article.tagsJson === 'string' ? article.tagsJson : ''
    };
  } catch (error) {
    console.error('news article live fetch failed:', { slug, error });
    return null;
  }
}

const getArticle = cache(async (slug: string): Promise<ArticleView | null> => {
  const live = await fromLive(slug);
  if (live) return live;
  return fromStatic(slug);
});

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = await readSlug(params);
  const item = await getArticle(slug);
  if (!item) return { title: 'News Analysis | LifeForgePrep' };
  return {
    title: item.seoTitle ?? `${item.title} | LifeForge Market Desk`,
    description: item.metaDescription ?? item.summary,
    alternates: {
      canonical: `/news/${item.slug}`
    },
    openGraph: {
      title: item.openGraphTitle ?? item.title,
      description: item.openGraphDescription ?? item.summary,
      type: 'article',
      url: `/news/${item.slug}`
    }
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const slug = await readSlug(params);
  const item = await getArticle(slug);

  if (!item) notFound();

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <article>
          <Link href="/news" className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
            ← Back to Market Desk
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <CategoryTag category={item.category} />
            <span>{item.publishedAtLabel}</span>
            {item.updatedAtLabel ? (
              <>
                <span>•</span>
                <span>Updated {item.updatedAtLabel}</span>
              </>
            ) : null}
            {item.readingTime ? (
              <>
                <span>•</span>
                <span>{item.readingTime}</span>
              </>
            ) : null}
            <span>•</span>
            <span>{item.source}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">{item.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">{item.summary}</p>

          {item.archiveNotice ? (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
              {item.archiveNotice}
            </p>
          ) : null}

          {item.originalUrl ? (
            <p className="mt-3">
              <a
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
              >
                Read original source
              </a>
            </p>
          ) : null}

          {item.sourceName ? (
            <p className="mt-3 text-xs leading-6 text-slate-500">
              Source context: {item.sourceName}
              {item.sourceDate ? ` (${item.sourceDate})` : ''}
            </p>
          ) : null}

          {item.bodySections?.length ? (
            <section id="what-happened" className="mt-8 space-y-8">
              {item.bodySections.map((section, index) => (
                <div
                  key={`${section.heading ?? 'intro'}-${index}`}
                  id={section.heading === 'My view' ? 'market-desk-view' : undefined}
                  className={section.heading === 'My view' ? 'rounded-xl border border-[#CFEAE4] bg-[#F1FBF8] p-5' : ''}
                >
                  {section.heading ? (
                    <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">{section.heading}</h2>
                  ) : null}
                  <div className="mt-3 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="text-base leading-8 text-slate-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <section id="what-happened" className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">What happened</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.whatHappened}</p>
            </section>
          )}

          <section className="mt-8 grid gap-6">
            {item.bodySections?.length ? null : (
              <div id="market-desk-view" className="rounded-xl border border-[#CFEAE4] bg-[#F1FBF8] p-5">
                <h2 className="text-lg font-bold text-[#1F2A44]">My view</h2>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.marketDeskView}</p>
              </div>
            )}

            <div id="advisor-relevance" className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Why advisors should care</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.whyAdvisorsShouldCare}</p>
            </div>

            <div id="learner-connection" className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Learner connection</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.learnerConnection}</p>
            </div>

            {item.sources?.length ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h2 className="text-lg font-bold text-[#1F2A44]">Sources and further reading</h2>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                  {item.sources.map((source) => (
                    <li key={source.name}>
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
                        >
                          {source.name}
                        </a>
                      ) : (
                        source.name
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Key points</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                {item.keyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-8 rounded-xl border border-slate-200 bg-[#F5F7FA] p-5">
            <h2 className="text-lg font-bold text-[#1F2A44]">Related topics from the Knowledge Hub</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {item.relatedTopics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#1F2A44] transition hover:border-[#2FAF9E] hover:text-[#2FAF9E]"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </section>

          {item.relatedCommentary?.length ? (
            <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Related commentary</h2>
              <div className="mt-4 grid gap-3">
                {item.relatedCommentary.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/news/${related.slug}`}
                    className="rounded-lg border border-slate-200 bg-[#F9FAFB] px-4 py-3 transition hover:border-[#2FAF9E] hover:bg-white"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#2FAF9E]">{related.tag}</span>
                    <span className="ml-2 text-xs text-slate-500">{related.publishedAtLabel}</span>
                    <span className="mt-1 block text-sm font-bold text-[#1F2A44]">{related.title}</span>
                    <span className="mt-1 block text-xs leading-6 text-slate-600">{related.summary}</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-[#1F2A44]">New to life insurance?</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              LifeForgePrep also offers scenario-based practice questions for learners who want to test the concepts behind the industry.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/free-practice" className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26988a]">
                Try 15 Free Questions
              </Link>
              <Link href="/app" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
                Download Free App
              </Link>
            </div>
          </section>

          <p className="mt-6 text-xs leading-6 text-slate-500">{marketDeskDisclaimer}</p>
        </article>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2FAF9E]">Article guide</p>
          <h3 className="mt-2 text-lg font-bold text-[#1F2A44]">Scan this story quickly</h3>
          <nav className="mt-4 space-y-2 text-sm">
            <a href="#what-happened" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">What happened</a>
            <a href="#market-desk-view" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">My view</a>
            <a href="#advisor-relevance" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">Advisor relevance</a>
            <a href="#learner-connection" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">Learner connection</a>
          </nav>
        </aside>
      </div>
    </main>
  );
}
