import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getMarketDeskArticle,
  getRelatedMarketDeskArticles,
  marketDeskArticles,
  marketDeskDisclaimer
} from '@/data/marketDeskArticles';
import { siteConfig } from '@/config/site';

type Props = {
  params: Promise<{ slug: string }>;
};

function publishedIso(date: string) {
  return new Date(date).toISOString();
}

export function generateStaticParams() {
  return marketDeskArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getMarketDeskArticle(slug);

  if (!article) {
    return {
      title: 'Market Desk Article Not Found | LifeForgePrep'
    };
  }

  const path = `/news/market-desk/${article.slug}`;

  return {
    title: `${article.title} | LifeForge Market Desk`,
    description: article.summary,
    alternates: {
      canonical: path
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: path,
      type: 'article',
      publishedTime: publishedIso(article.date),
      authors: [article.author]
    }
  };
}

export default async function MarketDeskArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getMarketDeskArticle(slug);

  if (!article) notFound();

  const related = getRelatedMarketDeskArticles(article);
  const canonicalUrl = `https://${siteConfig.domain}/news/market-desk/${article.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: publishedIso(article.date),
    author: {
      '@type': 'Organization',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brandName
    },
    mainEntityOfPage: canonicalUrl
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-slate-200 bg-gradient-to-br from-white via-[#F8FBFC] to-[#F2FBF8] py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div>
            <Link href="/news/market-desk" className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
              Back to Market Desk
            </Link>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="rounded-full bg-[#E8F7F4] px-2.5 py-1 text-xs font-semibold text-[#1E887B]">
                {article.category}
              </span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readingTime}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">{article.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{article.subtitle}</p>
          </div>

          <aside className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2FAF9E] to-sky-600 text-lg font-black text-white"
              aria-hidden="true"
            >
              LF
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">
              {article.heroLabel ?? 'Editorial desk'}
            </p>
            <h2 className="mt-2 text-lg font-bold text-[#1F2A44]">{article.author}</h2>
            <p className="mt-2 text-sm leading-6 text-[#4A5568]">
              Educational insurance commentary from LifeForge Prep. No fake advisor personas, no product recommendations.
            </p>
          </aside>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <article>
          <div className="space-y-6">
            {article.content.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={`${block.type}-${index}`} className="pt-3 text-2xl font-bold text-[#1F2A44]">
                    {block.text}
                  </h2>
                );
              }

              if (block.type === 'callout') {
                return (
                  <blockquote
                    key={`${block.type}-${index}`}
                    className="rounded-2xl border-l-4 border-[#2FAF9E] bg-[#F2FBF8] p-5 text-base leading-8 text-[#245E57]"
                  >
                    {block.text}
                  </blockquote>
                );
              }

              if (block.type === 'bulletList') {
                return (
                  <ul key={`${block.type}-${index}`} className="list-disc space-y-2 pl-6 text-base leading-8 text-slate-700">
                    {block.items?.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                );
              }

              return (
                <p key={`${block.type}-${index}`} className="text-base leading-8 text-slate-700">
                  {block.text}
                </p>
              );
            })}
          </div>

          <section className="mt-10 rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-[#EEF6FF] p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#1F2A44]">Studying insurance concepts?</h2>
            <p className="mt-2 text-sm leading-7 text-[#4A5568]">
              Turn market commentary into exam-ready understanding with LifeForge Prep.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/free-practice" className="rounded-xl bg-[#2C3440] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Try Free Practice
              </Link>
              <Link
                href="/exam-prep"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:border-[#2FAF9E] hover:text-[#2FAF9E]"
              >
                Explore Exam Prep
              </Link>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Related articles</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <article key={item.slug} className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2FAF9E]">{item.category}</p>
                  <h3 className="mt-2 text-lg font-bold text-[#1F2A44]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4A5568]">{item.summary}</p>
                  <Link
                    href={`/news/market-desk/${item.slug}`}
                    className="mt-3 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
                  >
                    Read next
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5">
            <h2 className="text-lg font-bold text-[#1F2A44]">Educational disclaimer</h2>
            <p className="mt-2 text-sm leading-7 text-[#4A5568]">{marketDeskDisclaimer}</p>
          </section>
        </article>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2FAF9E]">Article guide</p>
          <h3 className="mt-2 text-lg font-bold text-[#1F2A44]">Market Desk</h3>
          <p className="mt-2 text-sm leading-6 text-[#4A5568]">
            Educational commentary on insurance markets, regulation, consumer protection, underwriting, and claims.
          </p>
          <Link href="/news/market-desk" className="mt-5 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
            View all Market Desk
          </Link>
        </aside>
      </div>
    </main>
  );
}
