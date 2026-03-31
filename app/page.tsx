import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';
import { CategoryTag, classifyNewsCategory } from '@/components/news/category-system';
import type { NewsCategoryKey } from '@/components/news/types';
import { newsItems } from '@/data/news';
import { isLiveNewsEnabled } from '@/lib/news/runtime';

export const metadata: Metadata = {
  title: 'LifeForgePrep | Life Insurance Advisor Learning Platform',
  description:
    'Build life insurance knowledge, test yourself with practice questions, and explore exam-focused resources for Canada and the United States.'
};

const knowledgeLinks = [
  {
    title: 'Term vs Permanent Life Insurance',
    href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance'
  },
  {
    title: 'What Is Guaranteed Issue Life Insurance?',
    href: '/knowledge'
  },
  {
    title: 'How Advisors Match Coverage to Client Needs',
    href: '/knowledge'
  },
  {
    title: 'Participating vs Non-Participating Whole Life',
    href: '/knowledge'
  },
  {
    title: 'Riders, Renewability, and Convertibility Explained',
    href: '/knowledge'
  }
] as const;

const howItWorks = [
  {
    title: 'Learn the concepts',
    description: 'Absorb product basics, underwriting logic, and regulation through concise explainers.'
  },
  {
    title: 'Practice with questions',
    description: 'Apply what you learn using scenario-based and exam-style prompts.'
  },
  {
    title: 'Prepare with confidence',
    description: 'Build judgment with targeted feedback before client conversations or exams.'
  }
] as const;

const audienceCards = [
  {
    title: 'Aspiring advisors',
    description: 'Gain clarity on client conversations, underwriting, and licensing requirements.'
  },
  {
    title: 'Career changers',
    description: 'Transition into insurance with curated lessons and practical thinking exercises.'
  },
  {
    title: 'Insurance learners',
    description: 'Deepen product knowledge and advisory confidence on your own schedule.'
  }
] as const;

const personaCopy = {
  best: 'Best for practical learners who want judgment, clarity, and exam readiness.',
  notFor: 'Not for those seeking unrelated finance topics or generic business training.'
};

type HomeNewsItem = {
  slug: string;
  title: string;
  summary: string;
  publishedAtLabel: string;
  category: NewsCategoryKey;
  imageUrl?: string | null;
};

function mapStaticHomeNews(): HomeNewsItem[] {
  return newsItems.slice(0, 3).map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    publishedAtLabel: item.publishedAtLabel,
    category: classifyNewsCategory(item),
    imageUrl: null
  }));
}

async function getHomeNews(): Promise<HomeNewsItem[]> {
  if (!isLiveNewsEnabled()) return mapStaticHomeNews();

  try {
    const { getNewsHubData } = await import('@/lib/news/queries');
    const data = await getNewsHubData();

    return data.items.slice(0, 3).map((item) => ({
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      publishedAtLabel: item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString()
        : new Date(item.createdAt).toLocaleDateString(),
      category: classifyNewsCategory({ title: item.title, summary: item.summary, tag: item.tagsJson ?? '' }),
      imageUrl: item.imageUrl ?? null
    }));
  } catch (error) {
    console.error('home news fetch failed:', error);
    return mapStaticHomeNews();
  }
}

const faqItems = [
  {
    question: 'Is LifeforgePrep only for Canadian learners?',
    answer:
      'LifeforgePrep includes Canadian LLQP-focused resources, but many of the life insurance concepts and learning materials are useful for anyone building foundational knowledge.'
  },
  {
    question: 'Can U.S. visitors use LifeforgePrep?',
    answer:
      'Yes. U.S. visitors can benefit from the site\'s life insurance education, product guides, and practice-based learning resources.'
  },
  {
    question: 'What is included in Free Practice?',
    answer:
      'Free Practice includes sample questions designed to help you test your understanding of life insurance concepts, products, and advisor-style thinking.'
  },
  {
    question: 'Who is Exam Prep for?',
    answer:
      'Exam Prep is designed primarily for Canadian learners preparing for the LLQP, while also helping users strengthen broader life insurance knowledge.'
  },
  {
    question: 'Do I need prior insurance experience?',
    answer:
      'No. LifeforgePrep is built to help beginners, career changers, and aspiring advisors build confidence step by step.'
  }
] as const;

export default async function HomePage() {
  const homeNewsItems = await getHomeNews();
  const featuredNews = homeNewsItems[0];
  const secondaryNews = homeNewsItems.slice(1, 3);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA]">
        <section className="bg-[#1F2A44] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Interested in becoming a Life Insurance Advisor?
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              Build your knowledge, test yourself with practice questions, and explore life insurance products and exam-focused resources designed across
              Canada and the United States.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <Link
                href="/exam-prep"
                className="group flex flex-col justify-between rounded-2xl border border-white/30 bg-white/90 p-6 text-left shadow-lg transition hover:-translate-y-1 hover:bg-white"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2FAF9E]">Canada</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[#1F2A44]">LLQP Exam Prep</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                    Structured lessons, exam-style questions, and focused reasoning for the Life Licence Qualification Program.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-[#1F2A44]">
                  Go to LLQP Prep
                  <span aria-hidden="true" className="ml-2 opacity-70">
                    →
                  </span>
                </span>
              </Link>

              <Link
                href="/knowledge"
                className="group flex flex-col justify-between rounded-2xl border border-white/30 bg-white/5 p-6 text-left shadow-lg transition hover:-translate-y-1 hover:bg-white/10"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2FAF9E]">United States & Beyond</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Life Insurance Knowledge</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    Deepen product knowledge, understand underwriting logic, and explore lessons that help you advise with confidence anywhere.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-white">
                  Explore Knowledge Hub
                  <span aria-hidden="true" className="ml-2 opacity-70">
                    →
                  </span>
                </span>
              </Link>
            </div>

            <Link
              href="/free-practice"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Start Free Practice
            </Link>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">How LifeForgePrep works</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {howItWorks.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="text-xs font-semibold tracking-[0.3em] text-[#4A5568]">Step {index + 1}</span>
                  <h3 className="mt-3 text-xl font-semibold text-[#1F2A44]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4A5568]">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">Who this is for</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {audienceCards.map((audience) => (
                <article key={audience.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-xl font-semibold text-[#1F2A44]">{audience.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4A5568]">{audience.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-[#4A5568] sm:flex-row sm:items-center sm:justify-between">
              <p>
                <span className="font-semibold text-[#1F2A44]">Best for:</span> {personaCopy.best}
              </p>
              <p>
                <span className="font-semibold text-[#1F2A44]">Not for:</span> {personaCopy.notFor}
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">Learn the business of life insurance</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
              Explore beginner-friendly guides, product explainers, and practical articles on how life insurance works in the real world.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {knowledgeLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-[#1F2A44] transition hover:border-[#2FAF9E] hover:bg-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <Link
              href="/knowledge"
              className="mt-6 inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Visit Knowledge Hub
            </Link>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2FAF9E]">Latest in life insurance</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">Daily Insurance Brief</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#4A5568]">
                  Stay up to date with trends, product shifts, regulation, and filed stories that affect advisors and exam candidates.
                </p>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
              >
                Read Latest News
              </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.85fr]">
              {featuredNews && (
                <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <CategoryTag category={featuredNews.category} />
                    <span className="text-xs text-[#4A5568]">{featuredNews.publishedAtLabel}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold text-[#1F2A44]" aria-label="Featured news">
                    {featuredNews.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#4A5568]">{featuredNews.summary}</p>
                  <Link
                    href={`/news/${featuredNews.slug}`}
                    className="mt-5 inline-flex items-center text-sm font-semibold text-[#2FAF9E]"
                  >
                    Read full story
                    <span aria-hidden="true" className="ml-2">
                      →
                    </span>
                  </Link>
                </article>
              )}

              <div className="grid gap-4">
                {secondaryNews.map((item) => (
                  <article key={item.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <CategoryTag category={item.category} />
                      <span className="text-xs text-[#4A5568]">{item.publishedAtLabel}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-[#1F2A44]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#4A5568]">{item.summary}</p>
                    <Link href={`/news/${item.slug}`} className="mt-4 inline-flex items-center text-sm font-semibold text-[#2FAF9E]">
                      Read story
                      <span aria-hidden="true" className="ml-2">
                        →
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="homepage-faq">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 id="homepage-faq" className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
              Quick answers for new visitors, aspiring advisors, and learners exploring life insurance.
            </p>

            <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50">
              {faqItems.map((item) => (
                <details key={item.question} className="group p-4">
                  <summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-[#1F2A44]">
                    {item.question}
                    <span className="float-right text-[#2FAF9E] transition group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[#4A5568]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">Study on the go with the LifeforgePrep App</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
              Access learning tools and practice resources in a convenient mobile experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/app"
                className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Learn More
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
              >
                Support
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#1F2A44] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Start building practical life insurance knowledge</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-200">
              Access free practice, explore core concepts, and take the next step toward becoming a confident insurance professional.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/free-practice"
                className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Start Free Practice
              </Link>
              <Link
                href="/exam-prep"
                className="inline-flex items-center rounded-lg border border-white/40 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-100"
              >
                Explore Exam Prep
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
