import Image from 'next/image';
import type { Metadata } from 'next';
import { CategoryTag, classifyNewsCategory } from '@/components/news/category-system';
import type { NewsCategoryKey } from '@/components/news/types';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import TrackedLink from '@/components/TrackedLink';
import { newsItems } from '@/data/news';
import { isLiveNewsEnabled } from '@/lib/news/runtime';
import { ADVISOR_SCENARIOS, KNOWLEDGE_PREVIEW_CARDS, TOOL_TEASERS } from '@/lib/platform-seed';

export const metadata: Metadata = {
  title: 'LifeForgePrep | Insurance Learning and Exam Prep Platform',
  description:
    'Pass the exam, understand products, and think like an advisor with free practice, practical life insurance learning, product comparisons, and mobile study tools.'
};

const valueBullets = [
  'Practical life insurance questions',
  'Real-world advisor scenarios',
  'Knowledge hub for core products',
  'Insurance news explained simply'
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
};

function mapStaticHomeNews(): HomeNewsItem[] {
  return newsItems.slice(0, 3).map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    publishedAtLabel: item.publishedAtLabel,
    category: classifyNewsCategory(item)
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
      category: classifyNewsCategory({ title: item.title, summary: item.summary, tag: item.tagsJson ?? '' })
    }));
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
                LifeForgePrep combines LLQP prep, practical insurance learning, product comparisons, and real-world scenario thinking so users can study with more context and make better decisions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  href="/free-practice"
                  eventName="hero_cta_click"
                  eventPayload={{ cta: 'start_free_practice', location: 'homepage_hero' }}
                  className="inline-flex items-center justify-center rounded-full bg-[#2FAF9E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
                >
                  Start Free Practice
                </TrackedLink>
                <TrackedLink
                  href="/exam-prep"
                  eventName="hero_cta_click"
                  eventPayload={{ cta: 'explore_exam_prep', location: 'homepage_hero' }}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Explore Exam Prep
                </TrackedLink>
                <TrackedLink
                  href="/app"
                  eventName="app_cta_click"
                  eventPayload={{ cta: 'see_app', location: 'homepage_hero' }}
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
                <p className="mt-2 leading-7">Pass exams, understand products, think like an advisor, and take action when you are ready.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Free Practice</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44]">Try a quick practice set before you commit</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
                Use the free set to check product logic, tax awareness, and suitability reasoning. The point is not memorization. It is seeing how well you apply concepts under pressure.
              </p>
            </div>
            <TrackedLink
              href="/free-practice"
              eventName="free_practice_start"
              eventPayload={{ location: 'homepage_teaser' }}
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
                Advanced scenario-based questions, deeper explanations, and harder product-fit logic sit inside paid Exam Prep.
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
                Start with the product categories users ask about most, then go deeper into comparisons, advisor guidance, and glossary-backed explanations.
              </p>
            </div>
            <TrackedLink
              href="/knowledge"
              eventName="knowledge_hub_click"
              eventPayload={{ location: 'homepage_preview' }}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Explore Knowledge Hub
            </TrackedLink>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {KNOWLEDGE_PREVIEW_CARDS.map((card) => (
              <TrackedLink
                key={card.title}
                href={card.href}
                eventName="knowledge_hub_click"
                eventPayload={{ article: card.title, location: 'homepage_card' }}
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
                eventPayload={{ location: 'homepage_teaser' }}
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
              eventPayload={{ location: 'homepage_tools_teaser', action: 'open_tools_page' }}
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
                eventPayload={{ tool: tool.title, location: 'homepage_tool_card' }}
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
            <TrackedLink
              href="/news"
              eventName="news_preview_click"
              eventPayload={{ location: 'homepage_news' }}
              className="inline-flex items-center rounded-lg bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#162033]"
            >
              View All News
            </TrackedLink>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {homeNewsItems.map((item) => (
              <TrackedLink
                key={item.slug}
                href={`/news/${item.slug}`}
                eventName="news_preview_click"
                eventPayload={{ slug: item.slug, location: 'homepage_news_card' }}
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
                  eventPayload={{ cta: 'learn_more', location: 'homepage_app' }}
                  className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
                >
                  See the App
                </TrackedLink>
                <TrackedLink
                  href="/support"
                  eventName="app_cta_click"
                  eventPayload={{ cta: 'support', location: 'homepage_app' }}
                  className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
                >
                  Get Support
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
              eventPayload={{ cta: 'final_free_practice', location: 'homepage_footer_cta' }}
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Free Practice
            </TrackedLink>
            <TrackedLink
              href="/exam-prep"
              eventName="paid_prep_click"
              eventPayload={{ location: 'homepage_footer_cta' }}
              className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Buy Exam Prep
            </TrackedLink>
            <TrackedLink
              href="/knowledge"
              eventName="knowledge_hub_click"
              eventPayload={{ location: 'homepage_footer_cta' }}
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
