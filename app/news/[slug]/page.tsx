import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cache } from 'react';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';
import { getNewsBySlug, newsItems } from '@/data/news';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

type RouteParams = { slug: string };
type Props = {
  params: RouteParams | Promise<RouteParams>;
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

async function readSlug(params: Props['params']): Promise<string> {
  const resolved = await params;
  return resolved.slug;
}

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
      keyPoints: [article.summary, article.whoItAffects, article.whyItMatters]
        .filter(Boolean)
        .slice(0, 3)
    };
  } catch (error) {
    console.error('news article live fetch failed:', { slug, error });
    return null;
  }
}

const getArticle = cache(async (slug: string): Promise<ArticleView | null> => {
  const live = await fromLive(slug);
  if (live) return live;

  console.warn('live article missing, using static fallback:', slug);
  return fromStatic(slug);
});

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = await readSlug(params);
  const item = await getArticle(slug);

  if (!item) return { title: 'News Analysis | LifeForge Insurance Prep' };

  return {
    title: `${item.title} | LifeForge News Analysis`,
    description: item.summary
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const slug = await readSlug(params);
  const item = await getArticle(slug);

  if (!item) {
    console.error('news article not found:', slug);
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <article>
            <Link href="/news" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
              ← Back to News Hub
            </Link>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{item.title}</h1>

            <p className="mt-3 text-sm text-slate-500">
              {item.publishedAtLabel} · {item.source}
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-700">{item.summary}</p>

            <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">Key points digest</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                {item.keyPoints.map((point, idx) => (
                  <li key={`${idx}-${point.slice(0, 24)}`}>{point}</li>
                ))}
              </ul>
            </section>

            <section className="mt-8 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-bold text-slate-900">What this means for policyholders</h2>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.whatItMeans}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-bold text-slate-900">LLQP exam angle</h2>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.llqpAngle}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-brand-50 p-5">
                <h2 className="text-lg font-bold text-slate-900">Need exam prep support?</h2>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  Get the Life Insurance Exam Aid with practical scenarios and clear explanations.
                </p>
                <a
                  href={siteConfig.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Buy Exam Prep - {siteConfig.launchPriceDisplay}
                </a>
              </div>
            </section>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Weekly digest</p>
            <h3 className="mt-2 text-lg font-bold text-slate-900">Stay current without the noise</h3>
            <p className="mt-2 text-sm text-slate-600">
              Get concise life insurance updates and practical explainers each week.
            </p>
            <a href="/#newsletter-signup" className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900">
              Join newsletter
            </a>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
