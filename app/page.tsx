import Image from 'next/image';
import type { Metadata } from 'next';
import { CategoryTag, classifyNewsCategory } from '@/components/news/category-system';
import type { NewsCategoryKey } from '@/components/news/types';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import TrackedLink from '@/components/TrackedLink';
import { newsItems } from '@/data/news';
import { dedupeAndFilterNewsItems } from '@/lib/news/feed-utils';
import { isLiveNewsEnabled } from '@/lib/news/runtime';
import { ADVISOR_SCENARIOS, KNOWLEDGE_PREVIEW_CARDS, TOOL_TEASERS } from '@/lib/platform-seed';

export const metadata: Metadata = {
  title: 'LifeForgePrep | Insurance Learning and LLQP Exam Prep',
  description:
    'Pass the exam, understand products, and think like an advisor with free LLQP practice, practical life insurance learning, product comparisons, and mobile study tools.'
};

const valueBullets = [
  'Practical life insurance questions',
  'Real-world advisor scenarios',
  'Knowledge hub for core products',
  'Insurance news explained simply'
] as const;

const startHerePaths = [
  {
    title: 'New to insurance?',
    body: 'Learn how life insurance works, compare products, and understand the basics before trying to memorize exam language.',
    cta: 'Explore Buyer’s Guides',
    href: '/knowledge/buyers-guides',
    event: 'homepage_path_click',
    payload: { source_page: '/', destination_page: '/knowledge/buyers-guides', path_type: 'buyer_guides' }
  },
  {
    title: 'Studying for the LLQP?',
    body: 'Practice questions, build confidence, and test what you know before moving into deeper exam prep.',
    cta: 'Start Free Practice',
    href: '/free-practice',
    event: 'homepage_path_click',
    payload: { source_page: '/', destination_page: '/free-practice', path_type: 'free_practice' }
  },
  {
    title: 'Want to study on the go?',
    body: 'Use the app for repetition, quick review, and short practice sessions between longer study blocks.',
    cta: 'See the App',
    href: '/app',
    event: 'homepage_path_click',
    payload: { source_page: '/', destination_page: '/app', path_type: 'app' }
  }
] as const;

const featuredStrip = [
  {
    title: 'How Life Insurance Works',
    href: '/knowledge/buyers-guides/how-does-life-insurance-work',
    eventPayload: { source_page: '/', destination_page: '/knowledge/buyers-guides/how-does-life-insurance-work', content_type: 'buyers_guide' }
  },
  {
    title: 'Term vs Whole Life Insurance',
    href: '/knowledge/buyers-guides/term-vs-whole-life-insurance',
    eventPayload: { source_page: '/', destination_page: '/knowledge/buyers-guides/term-vs-whole-life-insurance', content_type: 'buyers_guide' }
  },
  {
    title: 'How Annuities Work',
    href: '/knowledge/annuities/how-annuities-work',
    eventPayload: { source_page: '/', destination_page: '/knowledge/annuities/how-annuities-work', content_type: 'knowledge_guide' }
  },
  {
    title: 'Free Practice',
    href: '/free-practice',
    eventPayload: { source_page: '/', destination_page: '/free-practice', content_type: 'free_practice' }
  }
] as const;

const sampleQuestions = [
  'A parent with a new mortgage needs affordable coverage for 20 years. Which product direction fits best?',
  'When does a policy withdrawal create a taxable consequence?',
  'What should an advisor clarify before recommending guaranteed issue coverage?'
] as const;

const scoreMessages = [
  '0-40%: You need more work before exam day.',
  '41-70%: You’re building momentum, but there are still gaps.',
  '71-100%: You’re on the right track—keep sharpening.'
] as const;

type HomeNewsItem = {
  slug: string;
  title: string;
  summary: string;
  publishedAtLabel: string;
  category: NewsCategoryKey;
  source?: string;
  tag?: string;
  canonicalUrl?: string | null;
  publishedAtMs?: number;
};

function mapStaticHomeNews(): HomeNewsItem[] {
  const mapped = newsItems.map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    publishedAtLabel: item.publishedAtLabel,
    category: classifyNewsCategory(item),
    source: item.source,
    tag: item.tag,
    canonicalUrl: null,
    publishedAtMs: Date.parse(item.publishedAtLabel) || 0
  }));

  return dedupeAndFilterNewsItems(mapped).slice(0, 3);
}

async function getHomeNews(): Promise<HomeNewsItem[]> {
  if (!isLiveNewsEnabled()) return mapStaticHomeNews();

  try {
    const { getNewsHubData } = await import('@/lib/news/queries');
    const data = await getNewsHubData();

    const mapped = data.items.map((item) => ({
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      publishedAtLabel: item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString()
        : new Date(item.createdAt).toLocaleDateString(),
      category: classifyNewsCategory({ title: item.title, summary: item.summary, tag: item.tagsJson ?? '' }),
      source: item.source?.name ?? 'LifeForge News',
      tag: item.tagsJson ?? '',
      canonicalUrl: item.canonicalUrl ?? null,
      publishedAtMs: item.publishedAt
        ? new Date(item.publishedAt).getTime()
        : new Date(item.createdAt).getTime()
    }));

    return dedupeAndFilterNewsItems(mapped).slice(0, 3);
  } catch (error) {
    console.error('home news fetch failed:', error);
    return mapStaticHomeNews();
  }
}

function getWhyItMatters(category: NewsCategoryKey) {
  switch (category) {
    case 'risk-underwriting':
      return 'This affects how risk is classified, what clients disclose, and how coverage decisions are priced.';
    case 'regulation-policy':
      return 'Regulatory shifts change advisor obligations, compliance expectations, and exam-relevant rules.';
    case 'products-pricing':
      return 'Product changes reshape recommendation logic, affordability conversations, and comparison work.';
    case 'legal-litigation':
      return 'Claims disputes and legal cases reveal where advice, wording, and disclosure really matter.';
    default:
      return 'Trend shifts help you connect industry changes to real product, underwriting, and client decisions.';
  }
}

export default async function HomePage() {
  const homeNewsItems = await getHomeNews();

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <section className="bg-[radial-gradient(circle_at_top,#284165_0%,#1F2A44_44%,#162033_100%)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7AD2C4]">Insurance Learning + Exam Prep</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Pass the exam. Understand the products. Think like an advisor.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
                LifeForgePrep helps you move from reading to application with LLQP practice, product explanations, comparisons, and practical scenario thinking.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  href="/free-practice"
                  eventName="hero_cta_click"
                  eventPayload={{ source_page: '/', destination_page: '/free-practice', cta_type: 'primary' }}
                  className="inline-flex items-center justify-center rounded-full bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
                >
                  Start Free Practice
                </TrackedLink>
                <TrackedLink
                  href="/exam-prep"
                  eventName="hero_cta_click"
                  eventPayload={{ source_page: '/', destination_page: '/exam-prep', cta_type: 'secondary' }}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Explore Exam Prep
                </TrackedLink>
                <TrackedLink
                  href="/app"
                  eventName="app_cta_click"
                  eventPayload={{ source_page: '/', destination_page: '/app', cta_type: 'tertiary' }}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40 hover:text-white"
                >
                  See the App
                </TrackedLink>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7AD2C4]">What you can do here</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {valueBullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[#89D8CA]/25 bg-[#0F1B2D] p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Built for four outcomes</p>
                <p className="mt-2 leading-7">
                  Pass exams, understand products, think like an advisor, and take action when you are ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Start Here</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44]">Choose the right next step</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
              The site works best when you take the path that matches your goal. Learn first, test yourself next, then move into deeper exam prep if gaps show up.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {startHerePaths.map((path) => (
              <TrackedLink
                key={path.title}
                href={path.href}
                eventName={path.event}
                eventPayload={path.payload}
                className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#BFE3DC] hover:bg-white"
              >
                <h3 className="text-xl font-semibold text-[#1F2A44]">{path.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4A5568]">{path.body}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-[#2FAF9E]">{path.cta}</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3">
          {featuredStrip.map((item) => (
            <TrackedLink
              key={item.title}
              href={item.href}
              eventName="related_content_click"
              eventPayload={item.eventPayload}
              className="inline-flex items-center rounded-full border border-slate-300 bg-[#F9FAFB] px-4 py-2 text-sm font-semibold text-[#1F2A44] transition hover:bg-white"
            >
              {item.title}
            </TrackedLink>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Free Practice</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44]">Test yourself before you trust your readiness</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
                Use the free set to check product logic, tax awareness, and suitability reasoning. The point is not memorization. It is seeing how well you apply concepts under pressure.
              </p>
            </div>
            <TrackedLink
              href="/free-practice"
              eventName="free_practice_started"
              eventPayload={{ source_page: '/', destination_page: '/free-practice', cta_type: 'homepage_teaser' }}
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Go to Free Practice
            </TrackedLink>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-3">
              {sampleQuestions.map((question, index) => (
                <article key={question} className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Sample question {index + 1}</p>
                  <p className="mt-2 text-base font-semibold text-[#1F2A44]">{question}</p>
                </article>
              ))}
            </div>
            <aside className="rounded-2xl border border-[#D8ECE8] bg-[#F2FBF8] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1E887B]">Score-based feedback</p>
              <div className="mt-4 space-y-3">
                {scoreMessages.map((message) => (
                  <div key={message} className="rounded-xl border border-white bg-white/80 p-3 text-sm text-[#1F2A44]">
                    {message}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-[#4A5568]">
                If the free set shows hesitation, the next logical step is Full Exam Prep with harder scenarios and deeper review.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Knowledge Hub</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44]">Understand products before you try to memorize them</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
                Start with the product categories users ask about most, then go deeper into comparisons, buyer’s guides, annuities, advisor guidance, and glossary-backed explanations.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href="/knowledge"
                eventName="related_content_click"
                eventPayload={{ source_page: '/', destination_page: '/knowledge', content_type: 'knowledge_hub' }}
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
              >
                Explore Knowledge Hub
              </TrackedLink>
              <TrackedLink
                href="/knowledge/buyers-guides"
                eventName="related_content_click"
                eventPayload={{ source_page: '/', destination_page: '/knowledge/buyers-guides', content_type: 'buyers_guides' }}
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
              >
                Browse Buyer’s Guides
              </TrackedLink>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {KNOWLEDGE_PREVIEW_CARDS.map((card) => (
              <TrackedLink
                key={card.title}
                href={card.href}
                eventName="related_content_click"
                eventPayload={{ source_page: '/', destination_page: card.href, content_type: 'knowledge_card', topic: card.title }}
                className="group rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#BFE3DC] hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">{card.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold text-[#1F2A44]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4A5568]">{card.description}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-[#1F2A44]">Open guide</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Advisor Mode</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44]">Think like an advisor</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                Move beyond definitions and practice client-based recommendations. The goal is to understand what the client is protecting, what matters most, and which product direction actually fits.
              </p>
              <TrackedLink
                href="/advisor-mode"
                eventName="advisor_mode_start"
                eventPayload={{ source_page: '/', destination_page: '/advisor-mode' }}
                className="mt-6 inline-flex items-center rounded-lg bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#162033]"
              >
                Explore Advisor Scenarios
              </TrackedLink>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {ADVISOR_SCENARIOS.map((scenario) => (
                <article key={scenario.slug} className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5">
                  <h3 className="text-lg font-semibold text-[#1F2A44]">{scenario.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4A5568]">{scenario.clientProfile}</p>
                  <p className="mt-3 text-sm font-medium text-[#1F2A44]">Best-fit direction</p>
                  <p className="mt-1 text-sm leading-7 text-[#4A5568]">{scenario.bestFit}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Tools</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44]">Use calculators and comparisons to turn concepts into action</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
                Educational tools help users estimate coverage, compare policy directions, and organize the questions that should come before a recommendation.
              </p>
            </div>
            <TrackedLink
              href="/tools"
              eventName="calculator_usage"
              eventPayload={{ source_page: '/', destination_page: '/tools', cta_type: 'homepage_tools_teaser' }}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Explore Tools
            </TrackedLink>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {TOOL_TEASERS.map((tool) => (
              <TrackedLink
                key={tool.title}
                href={tool.href}
                eventName="calculator_usage"
                eventPayload={{ source_page: '/', destination_page: tool.href, tool: tool.title }}
                className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5 shadow-sm transition hover:-translate-y-1 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[#1F2A44]">{tool.title}</h3>
                  {tool.badge ? (
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#4A5568]">
                      {tool.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-7 text-[#4A5568]">{tool.description}</p>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">News</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44]">Latest insurance news, translated into learning</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
                Follow life insurance developments, regulation, underwriting shifts, and product changes with practical context instead of generic headlines.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href="/news"
                eventName="related_content_click"
                eventPayload={{ source_page: '/', destination_page: '/news', content_type: 'news_hub' }}
                className="inline-flex items-center rounded-lg bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#162033]"
              >
                View All News
              </TrackedLink>
              <TrackedLink
                href="/knowledge/buyers-guides"
                eventName="related_content_click"
                eventPayload={{ source_page: '/', destination_page: '/knowledge/buyers-guides', content_type: 'buyers_guides' }}
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
              >
                Read Buyer’s Guides
              </TrackedLink>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {homeNewsItems.map((item) => (
              <TrackedLink
                key={item.slug}
                href={`/news/${item.slug}`}
                eventName="related_content_click"
                eventPayload={{ source_page: '/', destination_page: `/news/${item.slug}`, content_type: 'news_article' }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                  <CategoryTag category={item.category} />
                  <span>{item.publishedAtLabel}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold leading-8 text-[#1F2A44]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4A5568]">{item.summary}</p>
                <div className="mt-4 rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Why this matters</p>
                  <p className="mt-2 text-sm leading-7 text-[#4A5568]">{getWhyItMatters(item.category)}</p>
                </div>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[linear-gradient(135deg,#F2FBF8_0%,#FFFFFF_60%)] p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">App</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44]">Use the site for understanding, use the app for repetition</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                Study on the go with a cleaner quiz flow, practical review screens, and faster repetition between longer reading sessions on the site.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-[#4A5568]">
                <li className="flex gap-2"><span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" /><span>Practice questions on the go</span></li>
                <li className="flex gap-2"><span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" /><span>Clean mobile quiz flow and quick feedback</span></li>
                <li className="flex gap-2"><span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" /><span>Future-ready for more scenario drills and review formats</span></li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedLink
                  href="/app"
                  eventName="app_cta_click"
                  eventPayload={{ source_page: '/', destination_page: '/app', cta_type: 'homepage_app' }}
                  className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
                >
                  See the App
                </TrackedLink>
                <TrackedLink
                  href="/free-practice"
                  eventName="app_cta_click"
                  eventPayload={{ source_page: '/', destination_page: '/free-practice', cta_type: 'homepage_app_to_free_practice' }}
                  className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
                >
                  Start Free Practice
                </TrackedLink>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { src: '/app/screen-3.png', caption: 'Start screen: fast entry into study' },
                { src: '/app/screen-2.png', caption: 'Question screen: focused quiz flow' },
                { src: '/app/screen-1.png', caption: 'Results screen: quick feedback and progress' }
              ].map((screen) => (
                <figure key={screen.src} className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#F5F7FA]">
                    <Image src={screen.src} alt={screen.caption} width={945} height={2048} className="h-auto w-full" />
                  </div>
                  <figcaption className="mt-3 text-sm leading-6 text-[#4A5568]">{screen.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <NewsletterSignup
          title="Get 5 free exam-style questions + product comparison cheat sheet"
          description="Join the list for practical study prompts, comparison guidance, and lightweight updates you can use right away."
          buttonLabel="Get the Free Pack"
          successMessage="You are in. Check your inbox for the free questions and cheat sheet."
          idleMessage="We keep this lightweight. No spam, and your email stays private."
          eventName="email_capture_submit"
        />
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-[#1F2A44] px-6 py-10 text-white shadow-sm sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7AD2C4]">Next step</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Build confidence before exam day</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200">
            Use free practice to test yourself, move into deeper exam prep when you need harder scenarios, and keep building product knowledge in the hub between practice sessions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink
              href="/free-practice"
              eventName="hero_cta_click"
              eventPayload={{ source_page: '/', destination_page: '/free-practice', cta_type: 'final_free_practice' }}
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Free Practice
            </TrackedLink>
            <TrackedLink
              href="/exam-prep"
              eventName="contextual_cta_click"
              eventPayload={{ source_page: '/', destination_page: '/exam-prep', cta_type: 'final_exam_prep' }}
              className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Explore Full Exam Prep
            </TrackedLink>
            <TrackedLink
              href="/knowledge"
              eventName="related_content_click"
              eventPayload={{ source_page: '/', destination_page: '/knowledge', content_type: 'knowledge_hub' }}
              className="inline-flex items-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40 hover:text-white"
            >
              Explore Knowledge Hub
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
