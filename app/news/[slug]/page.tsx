import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NewsLeadSticky from '@/components/news/NewsLeadSticky';
import NewsFaqSchema from '@/components/news/NewsFaqSchema';
import { getKnowledgeMatches } from '@/lib/knowledge/relevance';
import { getNewsArticleBySlug, getRelatedNews } from '@/lib/news/queries';

export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string };
};

const GENERIC_LINES = [
  'This may affect policyholders, prospective buyers, and advisors supporting life insurance decisions.',
  'Use this topic to review policy terms, underwriting logic, claims handling, and client suitability in scenario-style questions.',
  'This development can influence how life insurance products are evaluated, discussed, or recommended by advisors and candidates preparing for licensing exams.'
].map((text) => text.toLowerCase());

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/^llqp exam angle:\s*/i, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isGeneric(text: string) {
  const n = normalize(text);
  return GENERIC_LINES.some((line) => n === normalize(line));
}

function dedupeDigest(lines: string[]) {
  const out: string[] = [];

  for (const line of lines) {
    const clean = line.trim();
    if (!clean || isGeneric(clean)) continue;

    const n = normalize(clean);
    const isDup = out.some((existing) => {
      const e = normalize(existing);
      return e === n || e.includes(n) || n.includes(e);
    });

    if (!isDup) out.push(clean);
  }

  return out;
}

function getKeyPoints(article: {
  summary: string;
  whyItMatters: string;
  whoItAffects: string;
  llqpAngle: string | null;
}) {
  const points = dedupeDigest([article.summary, article.whyItMatters, article.whoItAffects]);

  if (points.length > 0) return points.slice(0, 3);

  return [
    article.summary,
    'Focus on policy wording, claims outcomes, and how to explain tradeoffs clearly to clients.'
  ];
}

function getFallbackSearchUrl(title: string) {
  return `https://news.google.com/search?q=${encodeURIComponent(title)}`;
}

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

  const [related, knowledgeMatches] = await Promise.all([
    getRelatedNews(article.slug),
    getKnowledgeMatches({
      title: article.title,
      summary: article.summary,
      whyItMatters: article.whyItMatters,
      llqpAngle: article.llqpAngle
    })
  ]);

  const keyPoints = getKeyPoints(article);

  const whyItMatters = isGeneric(article.whyItMatters)
    ? 'This update can influence how candidates explain coverage outcomes, policy conditions, and claims decisions in exam scenarios.'
    : article.whyItMatters;

  const llqpAngle = !article.llqpAngle || isGeneric(article.llqpAngle)
    ? 'Use this topic to practice policy interpretation, claims reasoning, and client communication in scenario-based exam questions.'
    : article.llqpAngle;

  const faq = [
    {
      question: 'What this means for policyholders',
      answer: whyItMatters
    },
    {
      question: 'LLQP exam angle',
      answer: llqpAngle
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

          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-slate-900">Key points digest</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {keyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          {!!knowledgeMatches.length && (
            <section className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">From your uploaded study content (relevance match)</h2>
              <div className="mt-3 space-y-3">
                {knowledgeMatches.map((match, index) => (
                  <article key={`${match.docTitle}-${index}`} className="rounded-lg border border-brand-100 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{match.docTitle}</p>
                    <p className="mt-1 text-sm leading-7 text-slate-700">{match.snippet}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="mt-8 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">What this means for policyholders</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{whyItMatters}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">LLQP exam angle</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{llqpAngle}</p>
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

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <p>
              Source attribution: {article.source.name}. This page provides an original summary and commentary.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={article.canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-700 hover:text-brand-900"
              >
                Open original article
              </a>
              <a
                href={getFallbackSearchUrl(article.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-700 hover:text-slate-900"
              >
                Find source by headline
              </a>
            </div>
          </div>

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
