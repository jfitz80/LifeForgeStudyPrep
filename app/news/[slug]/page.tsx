import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cache } from 'react';
import NewsCtaBlock from '@/components/news/NewsCtaBlock';
import { CategoryTag, classifyNewsCategory } from '@/components/news/category-system';
import type { NewsArticleView } from '@/components/news/types';
import { getNewsBySlug, newsItems } from '@/data/news';

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
  source: string;
  originalUrl?: string;
  whatItMeans: string;
  examRelevance: string;
  consumerTakeaway: string;
  relatedTopics: Array<{ label: string; href: string }>;
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
    source: item.source,
    whatItMeans: item.whatItMeans,
    examRelevance: item.llqpAngle,
    consumerTakeaway: buildConsumerTakeaway(category, item.whatItMeans),
    relatedTopics: getRelatedTopics(category),
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
      whatItMeans: article.whyItMatters || 'This update may affect coverage expectations, product comparisons, or underwriting judgments.',
      examRelevance:
        article.llqpAngle ||
        'Use this story to review policy terms, underwriting logic, claims handling, and client suitability in scenario-style questions.',
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
    title: `${item.title} | LifeForge News`,
    description: item.summary
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
            ← Back to News Hub
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <CategoryTag category={item.category} />
            <span>{item.publishedAtLabel}</span>
            <span>•</span>
            <span>{item.source}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">{item.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">{item.summary}</p>

          {item.originalUrl ? (
            <p className="mt-3">
              <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                Read original source
              </a>
            </p>
          ) : null}

          <section id="key-points" className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-bold text-[#1F2A44]">Key points</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {item.keyPoints.map((point, idx) => (
                <li key={`${idx}-${point.slice(0, 24)}`}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8 grid gap-6">
            <div id="why-this-matters" className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Why this matters</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.whatItMeans}</p>
            </div>

            <div id="exam-relevance" className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Exam relevance</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.examRelevance}</p>
            </div>

            <div id="consumer-takeaway" className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Consumer takeaway</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.consumerTakeaway}</p>
            </div>
          </section>

          <section className="mt-8 rounded-xl border border-slate-200 bg-[#F5F7FA] p-5">
            <h2 className="text-lg font-bold text-[#1F2A44]">Related topics from the Knowledge Hub</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {item.relatedTopics.map((topic) => (
                <Link key={topic.href} href={topic.href} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#1F2A44] transition hover:border-[#2FAF9E] hover:text-[#2FAF9E]">
                  {topic.label}
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-8">
            <NewsCtaBlock
              article={{
                id: item.slug,
                slug: item.slug,
                title: item.title,
                summary: item.summary,
                whyThisMatters: item.whatItMeans,
                publishedAtLabel: item.publishedAtLabel,
                source: item.source,
                tag: item.tag,
                category: item.category,
                canonicalUrl: item.originalUrl ?? null
              }}
            />
          </div>
        </article>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2FAF9E]">Article guide</p>
          <h3 className="mt-2 text-lg font-bold text-[#1F2A44]">Scan this story quickly</h3>
          <nav className="mt-4 space-y-2 text-sm">
            <a href="#key-points" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">Jump to key points</a>
            <a href="#why-this-matters" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">Why this matters</a>
            <a href="#exam-relevance" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">Exam relevance</a>
            <a href="#consumer-takeaway" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">Consumer takeaway</a>
          </nav>
          <Link href="/free-practice" className="mt-5 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
            Try free practice
          </Link>
        </aside>
      </div>
    </main>
  );
}
