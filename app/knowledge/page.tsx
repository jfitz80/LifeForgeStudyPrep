import type { Metadata } from 'next';
import Link from 'next/link';
//import SiteHeader from '@/components/editorial/SiteHeader';
//import SiteFooter from '@/components/editorial/SiteFooter';
import TrackedLink from '@/components/TrackedLink';
import ClusterIcon from '@/components/knowledge/ClusterIcon';
import GlossaryIndex from '@/components/knowledge/GlossaryIndex';
import { marketDeskArticles } from '@/data/marketDeskArticles';
import { weeklyContent } from '@/data/weeklyContent';
import { KNOWLEDGE_ARTICLES, KNOWLEDGE_CLUSTERS } from '@/lib/knowledge/content';

export const metadata: Metadata = {
  title: 'Knowledge Hub | LifeForgePrep',
  description: 'Structured life insurance guides and glossary-linked educational explainers.'
};

const startHereGuides = [
  {
    title: 'Choosing the Right Life Insurance',
    description: 'A practical framework for matching policy type, duration, and budget to real-life needs.',
    href: '/knowledge/life-insurance-basics/insurable-interest-and-disclosure'
  },
  {
    title: 'Term vs Permanent Explained',
    description: 'Understand cost, duration, and long-term tradeoffs before choosing a policy structure.',
    href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance'
  },
  {
    title: 'How Much Coverage Do You Need',
    description: 'Use a simple protection-first formula to estimate practical coverage ranges.',
    href: '/free-practice'
  }
] as const;

const lifeForgeSteps = [
  {
    title: 'Learn the concepts',
    description: 'Structured guides explain product purpose, terminology, and foundational mechanics.'
  },
  {
    title: 'Practice with questions',
    description: 'Real scenarios and quick drills help you think like an advisor instead of memorizing terms.'
  },
  {
    title: 'Prepare with confidence',
    description: 'Use exam logic to connect product choice with suitability, risk, and client decisions.'
  }
] as const;

const categorizedSections = [
  {
    title: 'Foundations',
    items: ['Life insurance purpose and terminology', 'Insurable interest and disclosure', 'Coverage need estimation basics']
  },
  {
    title: 'Products',
    items: ['Term vs permanent structures', 'Riders and flexibility', 'Beneficiary mechanics']
  },
  {
    title: 'Exam Concepts',
    items: ['Scenario-based suitability reasoning', 'High-frequency LLQP question traps', 'Calculation workflows']
  },
  {
    title: 'Industry Insights',
    items: ['Claims & litigation patterns', 'Regulatory updates', 'Underwriting & market implications']
  }
] as const;


const supplementalKnowledgeCards = [
  {
    title: 'Annuities',
    description: 'Understand retirement income contracts, the main annuity types, and how they compare with life insurance.',
    href: '/knowledge/annuities',
    eyebrow: 'Retirement Income',
    cta: 'Explore annuities'
  },
  {
    title: "Buyer's Guides",
    description: 'Read consumer-friendly guides that explain how life insurance products work, what to compare, and what to watch out for before buying.',
    href: '/knowledge/buyers-guides',
    eyebrow: 'Consumer Guides',
    cta: "Browse buyer's guides"
  }
] as const;

export default function KnowledgePage() {
  const latestMarketDeskArticles = marketDeskArticles.slice(0, 3);
  const articleCounts = KNOWLEDGE_ARTICLES.reduce<Record<string, number>>((acc, article) => {
    acc[article.cluster] = (acc[article.cluster] ?? 0) + 1;
    return acc;
  }, {});

  const startHerePath = [
    {
      title: 'What life insurance does',
      description: 'Discover how protection, income replacement, and legacy planning intersect in real scenarios.',
      href: '/knowledge/life-insurance-basics/insurable-interest-and-disclosure'
    },
    {
      title: 'Types of policies',
      description: 'Compare term, permanent, and guaranteed issue options so you know what fits each need.',
      href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance'
    },
    {
      title: 'How to estimate coverage',
      description: 'Use practical formulas to translate household costs into a coverage target.',
      href: '/free-practice'
    },
    {
      title: 'Basic suitability thinking',
      description: 'Learn how advisors weigh risk, suitability, and affordability before recommending coverage.',
      href: '/knowledge/llqp-exam-prep/llqp-scenario-framework'
    }
  ] as const;

  const recommendedNextSteps = [
    {
      title: 'Read a guide',
      text: 'Dive deeper into product categories, policy mechanics, or taxation before practicing.',
      href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance'
    },
    {
      title: 'Take free practice',
      text: 'Try practice questions focused on taxation and policy mechanics to test your understanding.',
      href: '/free-practice'
    },
    {
      title: 'Explore Life Insurance module prep',
      text: 'Use LLQP Life Insurance module prep to sharpen scenario reasoning, understand traps, and build confidence alongside your official course material.',
      href: '/exam-prep'
    }
  ] as const;

  const clusterGuideBySlug: Record<string, string> = {
    'life-insurance-basics': '/knowledge/life-insurance-basics/insurable-interest-and-disclosure',
    'policy-mechanics': '/knowledge/policy-mechanics/beneficiary-designations-and-control',
    taxation: '/knowledge/taxation/tax-treatment-of-death-benefits-and-cash-values',
    'advanced-concepts': '/knowledge/advanced-concepts/business-insurance-and-key-person-risk',
    'llqp-exam-prep': '/knowledge/llqp-exam-prep/llqp-scenario-framework'
  };

  return (
    <>
      
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Knowledge Hub</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Life Insurance Knowledge Hub</h1>
            <p className="mt-3 max-w-3xl text-[#4A5568]">
              Explore core concepts, policy mechanics, tax treatment, advanced strategy, and LLQP-focused learning in one structured editorial library.
            </p>
          </header>

          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Start Here</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Begin with these essential guides</h2>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
              <article className="rounded-2xl border border-[#D6E8E5] bg-[#F2FBF8] p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1E887B]">Featured Guide</p>
                <h3 className="mt-2 text-xl font-bold text-[#1F2A44]">Choosing the Right Life Insurance</h3>
                <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                  Learn a practical step-by-step method to choose the right life insurance solution based on household risk, timeline, and affordability.
                </p>
                <Link
                  href="/knowledge/life-insurance-basics/insurable-interest-and-disclosure"
                  className="mt-4 inline-flex items-center rounded-lg bg-[#2FAF9E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26988a]"
                >
                  Read Guide
                </Link>
              </article>

              {startHereGuides.slice(1).map((guide) => (
                <article key={guide.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-[#1F2A44]">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4A5568]">{guide.description}</p>
                  <Link href={guide.href} className="mt-3 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                    Read Guide
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Recommended next step</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {recommendedNextSteps.map((step) => (
                <article key={step.title} className="flex flex-col rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
                  <h3 className="text-lg font-semibold text-[#1F2A44]">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#4A5568]">{step.text}</p>
                  <Link href={step.href} className="mt-4 inline-flex items-center text-sm font-semibold text-[#2FAF9E]">
                    Continue
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10 rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-[#EEF6FF] p-6 shadow-sm sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Market commentary</p>
                <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">From the LifeForge Market Desk</h2>
                <p className="mt-2 text-sm leading-6 text-[#4A5568]">
                  Current insurance trends explained in plain language.
                </p>
              </div>
              <Link href="/news/market-desk" className="inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                Read Market Desk
              </Link>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {latestMarketDeskArticles.map((article) => (
                <article key={article.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-[#E8F7F4] px-2.5 py-1 font-semibold text-[#1E887B]">{article.category}</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-snug text-[#1F2A44]">{article.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#4A5568]">{article.summary}</p>
                  <Link
                    href={`/news/market-desk/${article.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
                  >
                    Read commentary
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <h2 className="text-2xl font-bold text-[#1F2A44]">How LifeForgePrep works</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {lifeForgeSteps.map((step) => (
                <article key={step.title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] px-4 py-5 text-center sm:px-6">
                  <p className="text-lg font-semibold text-[#1F2A44]">{step.title}</p>
                  <p className="mt-2 text-sm text-[#4A5568]">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Start here path</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {startHerePath.map((path) => (
                <article key={path.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#1F2A44]">{path.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#4A5568]">{path.description}</p>
                  <Link href={path.href} className="mt-4 inline-flex items-center text-sm font-semibold text-[#2FAF9E]">
                    Open guide
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Recently updated</p>
                <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Freshly reviewed study guides</h2>
                <p className="mt-2 text-sm leading-6 text-[#4A5568]">
                  Updated labels make it easier to spot current explainers and exam-help pages worth revisiting.
                </p>
              </div>
              <Link href="/knowledge/exam-traps" className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                See exam traps
              </Link>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {weeklyContent.recentlyUpdated.map((guide) => (
                <article key={guide.href} className="flex flex-col rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#E8F7F4] px-2.5 py-1 text-xs font-semibold text-[#1E887B]">
                      {guide.category}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">
                      {guide.type}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#1F2A44]">{guide.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-500">Updated {guide.updated}</p>
                  <TrackedLink
                    href={guide.href}
                    eventName="click_recently_updated_guide"
                    eventPayload={{ source: 'knowledge_recently_updated', guide: guide.title }}
                    className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
                  >
                    Open guide
                  </TrackedLink>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-[#1F2A44]">Browse by Category</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {categorizedSections.map((section) => (
                <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#1F2A44]">{section.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4A5568]">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Category clusters</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {KNOWLEDGE_CLUSTERS.map((cluster) => (
                <article key={cluster.slug} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: cluster.accent }}>
                    <ClusterIcon slug={cluster.slug} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1F2A44]">{cluster.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4A5568]">{cluster.shortDescription}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#718096]">{articleCounts[cluster.slug] ?? 0} articles</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold">
                    <Link href={`/knowledge/${cluster.slug}`} className="inline-flex items-center text-[#2FAF9E]">
                      View cluster
                    </Link>
                    <Link href={clusterGuideBySlug[cluster.slug]} className="inline-flex items-center text-[#1F2A44]">
                      Start with a guide
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Additional topics</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {supplementalKnowledgeCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">{card.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#1F2A44]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4A5568]">{card.description}</p>
                  <Link
                    href={card.href}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
                  >
                    {card.cta}
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <GlossaryIndex />
        </div>
      </main>
      
    </>
  );
}
