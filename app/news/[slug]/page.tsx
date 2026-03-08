import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NewsLeadSticky from '@/components/news/NewsLeadSticky';
import NewsFaqSchema from '@/components/news/NewsFaqSchema';
import { getNewsArticleBySlug, getRelatedNews } from '@/lib/news/queries';

export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getNewsArticleBySlug(params.slug);

  if (!article) {
    return { title: 'News Article | LifeForge Insurance Prep' };
  }

  return {
    title: `${article.title} | LifeForge Insurance Prep News`,
    description: article.summary
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const article = await getNewsArticleBySlug(params.slug);
  if (!article) notFound();

  const related = await getRelatedNews(article.slug);

  const faq = [
    {
      question: 'What this means for policyholders',
      answer: article.whyItMatters
    },
    {
      question: 'LLQP exam angle',
      answer:
        article.llqpAngle ??
        'Use this topic to practice explaining policy features, client suitability, and claims outcomes in scenario-based questions.'
    },
    {
      question: 'Need help understanding life insurance?',
      answer:
        'Start with free practice questions, then move into structured scenario-based study resources designed for future advisors.'
    }
  ];

  return (
    <main className="min-h-screen bg-white py-10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <article>
          <Link href="/news" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
            ← Back to News Hub
          </Link>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{article.title}</h1>

          <p className="mt-3 text-sm text-slate-500">
            {new Date(article.publishedAt).toLocaleDateString()} · Source: {article.source.name}
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-700">{article.summary}</p>

          <section className="mt-8 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">What this means for policyholders</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{article.whyItMatters}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">LLQP exam angle</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                {article.llqpAngle ??
                  'Use this development to practice policy interpretation, client communication, and exam-style scenario analysis.'}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-brand-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">Need help understanding life insurance?</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                Study with realistic practice questions and clear explanations designed for future advisors.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Link href="/#free-questions" className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900">
                  Get Free Questions
                </Link>
                <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-white">
                  View LLQP Study Guide
                </Link>
              </div>
            </div>
          </section>

          <p className="mt-8 text-sm text-slate-500">
            Source attribution: {article.source.name}. This page provides an original summary and commentary. Read the
            full original report at{' '}
            <a
              href={article.canonicalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 hover:text-brand-900"
            >
              the publisher's website
            </a>
            .
          </p>

          {!!related.length && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">Related News</h2>
              <div className="mt-4 space-y-3">
                {related.map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                    <Link href={`/news/${item.slug}`} className="font-semibold text-slate-900 hover:text-brand-700">
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-slate-600">{item.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <NewsFaqSchema items={faq} />
        </article>

        <NewsLeadSticky />
      </div>
    </main>
  );
}
