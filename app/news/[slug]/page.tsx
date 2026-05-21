import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cache } from 'react';
import ContextualCTA from '@/components/ContextualCTA';
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

const fundamentalsToReview = [
  'Insurable interest is generally required at policy issue, not re-proven at claim time.',
  'Grace period and reinstatement provisions can materially change lapse outcomes.',
  'Policy loans or withdrawals can affect long-term value and death benefits.',
  'Beneficiary setup (primary + contingent) strongly affects claim flow and payout clarity.'
] as const;

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

function buildOpeningInsight(category: NewsArticleView['category']) {
  switch (category) {
    case 'risk-underwriting':
      return 'Read this as an underwriting signal: the study value is in how disclosure, evidence, risk classification, and advisor fact-finding connect.';
    case 'products-pricing':
      return 'Read this as a product-comparison signal: the study value is in separating price, structure, flexibility, and client suitability.';
    case 'legal-litigation':
      return 'Read this as a documentation signal: the study value is in how policy wording, beneficiary setup, and communication affect outcomes.';
    case 'regulation-policy':
      return 'Read this as an advisor-conduct signal: the study value is in needs analysis, disclosure, documentation, and client understanding.';
    default:
      return 'Read this as a study signal: connect the market theme to policy mechanics, advisor duties, and client communication.';
  }
}

function buildLlqpConceptConnection(category: NewsArticleView['category'], fallback: string) {
  switch (category) {
    case 'risk-underwriting':
      return 'Underwriting, risk classification, applicant disclosure, and evidence of insurability.';
    case 'products-pricing':
      return 'Product comparison, suitability, premium structure, policy features, and long-term client fit.';
    case 'legal-litigation':
      return 'Claims process, beneficiary communication, policy conditions, grace periods, and documentation.';
    case 'regulation-policy':
      return 'Advisor ethics, suitability, disclosure, needs analysis, and documented recommendation rationale.';
    default:
      return fallback;
  }
}

function buildCommonExamTrap(category: NewsArticleView['category']) {
  switch (category) {
    case 'risk-underwriting':
      return 'Assuming the advisor can downplay disclosure issues to speed up approval. Exam-style scenarios often test whether the advisor protects the integrity of the application.';
    case 'products-pricing':
      return 'Choosing the lowest premium without considering product features, duration, conversion options, or the client need behind the recommendation.';
    case 'legal-litigation':
      return 'Promising a claim outcome before policy status, beneficiary details, documentation, and contractual conditions have been reviewed.';
    case 'regulation-policy':
      return 'Treating disclosure as a formality instead of a client understanding and suitability requirement.';
    default:
      return 'Jumping to a product answer before identifying the client need, the policy rule, and the advisor responsibility being tested.';
  }
}

const miniPracticeQuestion = {
  question: 'A beneficiary calls the insurer asking why a claim is delayed. What is the most appropriate advisor response?',
  options: [
    'A. Promise immediate payment',
    'B. Explain that claims may require documentation, policy status review, and beneficiary verification',
    'C. Tell the beneficiary to cancel the policy',
    'D. Avoid communication until the insurer pays'
  ],
  answer: 'B',
  explanation:
    'Claims handling requires proper documentation, verification, and policy review. Advisors should communicate clearly without promising outcomes they cannot control.'
};

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
  const staticArticle = fromStatic(slug);
  if (staticArticle) return staticArticle;

  const live = await fromLive(slug);
  if (live) return live;
  return null;
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
    description: item.summary,
    alternates: {
      canonical: `/news/${item.slug}`
    },
    openGraph: {
      title: item.title,
      description: item.summary,
      url: `/news/${item.slug}`,
      type: 'article'
    }
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const slug = await readSlug(params);
  const item = await getArticle(slug);

  if (!item) notFound();

  const openingInsight = buildOpeningInsight(item.category);
  const llqpConceptConnection = buildLlqpConceptConnection(item.category, item.examRelevance);
  const commonExamTrap = buildCommonExamTrap(item.category);

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

          <section className="mt-8 rounded-xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#0f766e]">Opening insight</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">{openingInsight}</p>
          </section>

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

            <div id="llqp-connection" className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">LLQP concept connection</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{llqpConceptConnection}</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.examRelevance}</p>
            </div>

            <div id="common-exam-trap" className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Common exam trap</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{commonExamTrap}</p>
            </div>

            <div id="consumer-takeaway" className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Consumer takeaway</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.consumerTakeaway}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Insurance fundamentals to review</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                {fundamentalsToReview.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div id="mini-practice" className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold text-[#1F2A44]">Mini practice question</h2>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-800">{miniPracticeQuestion.question}</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                {miniPracticeQuestion.options.map((option) => (
                  <li key={option} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    {option}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                <strong>Correct answer:</strong> {miniPracticeQuestion.answer}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-700">{miniPracticeQuestion.explanation}</p>
            </div>
          </section>

          <div className="mt-8">
            <ContextualCTA
              eyebrow="Studying CTA"
              title="Studying the LLQP Life Insurance module? Test yourself on this concept."
              body="News is useful when it helps a concept stick. The next step is checking whether you can apply the idea under exam pressure instead of just recognizing it in an article."
              variant="studying"
              actions={[
                {
                  label: 'Try 15 Free Questions',
                  href: '/free-practice',
                  eventPayload: {
                    source_page: `/news/${item.slug}`,
                    destination_page: '/free-practice',
                    cta_type: 'news_mid_studying',
                    content_type: 'news_article',
                    topic: item.category
                  }
                },
                {
                  label: 'Explore Full Practice',
                  href: '/exam-prep',
                  style: 'secondary',
                  eventPayload: {
                    source_page: `/news/${item.slug}`,
                    destination_page: '/exam-prep',
                    cta_type: 'news_mid_gap',
                    content_type: 'news_article',
                    topic: item.category
                  }
                }
              ]}
            />
          </div>

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

          <section className="mt-8 rounded-xl border border-slate-200 bg-[#F5F7FA] p-5">
            <h2 className="text-lg font-bold text-[#1F2A44]">Educational disclaimer</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              LifeForge Prep content is for education only and should not be treated as financial, legal,
              tax, insurance, or licensing advice. Always refer to official course materials, regulators,
              insurers, and licensed professionals for decisions involving insurance products or licensing requirements.
            </p>
          </section>
        </article>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2FAF9E]">Article guide</p>
          <h3 className="mt-2 text-lg font-bold text-[#1F2A44]">Scan this story quickly</h3>
          <nav className="mt-4 space-y-2 text-sm">
            <a href="#key-points" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">Jump to key points</a>
            <a href="#why-this-matters" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">Why this matters</a>
            <a href="#llqp-connection" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">LLQP connection</a>
            <a href="#common-exam-trap" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">Common exam trap</a>
            <a href="#mini-practice" className="block font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">Mini practice</a>
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
