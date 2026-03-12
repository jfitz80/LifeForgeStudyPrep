import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';
import { getNewsBySlug, newsItems } from '@/data/news';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

type Props = {
  params: { slug: string };
};

type ArticleView = {
  title: string;
  summary: string;
  publishedAtLabel: string;
  source: string;
  whatItMeans: string;
  llqpAngle: string;
  keyPoints: string[];
};

function fromStatic(slug: string): ArticleView | null {
  const item = getNewsBySlug(slug);
  if (!item) return null;

  return {
    title: item.title,
    summary: item.summary,
    publishedAtLabel: item.publishedAtLabel,
    source: item.source,
    whatItMeans: item.whatItMeans,
    llqpAngle: item.llqpAngle,
    keyPoints: item.keyPoints
  };
}

async function fromLive(slug: string): Promise<ArticleView | null> {
  try {
    const { getNewsArticleBySlug } = await import('@/lib/news/queries');
    const article = await getNewsArticleBySlug(slug);
    if (!article) return null;

    return {
      title: article.title,
      summary: article.summary,
      publishedAtLabel: new Date(article.publishedAt).toLocaleDateString(),
      source: article.source?.name ?? 'LifeForge News',
      whatItMeans: article.whyItMatters,
      llqpAngle:
        article.llqpAngle ||
        'Use this topic to review policy terms, underwriting logic, claims handling, and client suitability in scenario-style questions.',
      keyPoints: [article.summary, article.whoItAffects, article.whyItMatters].filter(Boolean).slice(0, 3)
    };
  } catch (error) {
    console.error('news article live fetch failed:', slug, error);
    return null;
  }
}

async function getArticle(slug: string): Promise<ArticleView | null> {
  const live = await fromLive(slug);
  if (live) return live;
  return fromStatic(slug);
}

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getArticle(params.slug);
  if (!item) return { title: 'News Analysis | LifeForge Insurance Prep' };

  return {
    title: `${item.title} | LifeForge News Analysis`,
    description: item.summary
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const item = await getArticle(params.slug);
  if (!item) notFound();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <article>
            <Link href="/news" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
              ← Back to News Hub
            </Link>

