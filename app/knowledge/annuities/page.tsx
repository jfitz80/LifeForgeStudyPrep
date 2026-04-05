import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Annuities Guide | LifeForgePrep',
  description: 'Learn what annuities are, how they work, the main types available, and how they differ from life insurance.'
};

const annuityTypes = [
  {
    title: 'Immediate annuities',
    body: 'Income payments usually begin shortly after a lump-sum premium is deposited, making them relevant for retirement-income planning.'
  },
  {
    title: 'Deferred annuities',
    body: 'Value builds first and income begins later, which can suit longer time horizons or staged retirement planning.'
  },
  {
    title: 'Fixed annuities',
    body: 'Offer a stated crediting rate or payment structure with less market variability than investment-linked options.'
  },
  {
    title: 'Variable annuities',
    body: 'Tie value and income potential to investment subaccounts, which can increase upside and risk at the same time.'
  },
  {
    title: 'Indexed annuities',
    body: 'Link returns to a market index using caps, participation rates, or spreads, while still relying on contract terms for outcomes.'
  }
] as const;

const comparisonCards = [
  {
    title: 'Annuities',
    points: [
      'Built primarily to create or support income over time',
      'Often used in retirement planning and payout strategies',
      'Can include guarantees, deferral periods, and surrender schedules'
    ]
  },
  {
    title: 'Life Insurance',
    points: [
      'Built primarily to provide a death benefit to beneficiaries',
      'Often used for income protection, estate goals, and family security',
      'May include cash value, riders, and underwriting considerations'
    ]
  }
] as const;

const audiences = [
  'Near-retirees who want to convert savings into a more predictable income stream.',
  'People seeking stability in part of their retirement-income strategy.',
  'People concerned about outliving savings and looking for longevity protection.'
] as const;

const benefits = [
  'Predictable income potential for retirement cash-flow planning',
  'Long-term planning support when coordinated with other assets',
  'Tax-deferred growth in some contract structures and jurisdictions'
] as const;

const tradeoffs = [
  'Contracts can be complex and difficult to compare quickly',
  'Fees, riders, and crediting formulas may reduce expected value',
  'Liquidity can be limited by surrender periods and withdrawal rules'
] as const;

const buyerQuestions = [
  'What type of annuity is this, and how does it generate value or income?',
  'What fees, rider charges, or expenses apply over time?',
  'Is there a surrender charge or withdrawal limitation?',
  'What is guaranteed, and what depends on market performance or insurer terms?',
  'How does this fit into a broader retirement, tax, and estate plan?'
] as const;

const faqItems = [
  {
    question: 'Are annuities the same as life insurance?',
    answer: 'No. Life insurance is generally designed to provide a death benefit, while annuities are generally designed to support income or asset drawdown during life.'
  },
  {
    question: 'Do annuities always provide guaranteed income?',
    answer: 'Not always. Some contracts focus on accumulation first, and the guarantees available depend on the contract design, rider choices, and insurer terms.'
  },
  {
    question: 'Why are annuities often described as complex?',
    answer: 'Many annuities include crediting formulas, optional riders, surrender schedules, and tax considerations that are not obvious from the product name alone.'
  },
  {
    question: 'Who should ask extra questions before buying an annuity?',
    answer: 'Anyone comparing retirement-income products, especially buyers concerned about liquidity, fees, guarantees, or how the contract fits with other assets.'
  },
  {
    question: 'Can annuities play a role in advisor education?',
    answer: 'Yes. Even when a learner is focused on life insurance, annuities help build a broader understanding of retirement planning, guarantees, and product suitability.'
  }
] as const;

export default function AnnuitiesPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Knowledge Hub</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
            Understanding Annuities
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            A simple guide to how annuities work, the main types available, and when they may fit into a retirement income plan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/knowledge/annuities/how-annuities-work"
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              How Annuities Work
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Read Industry News
            </Link>
          </div>
        </section>



        <section className="mt-8 rounded-2xl border border-[#D6E8E5] bg-[#F2FBF8] p-7 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Start Here</p>
          <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">A better way to understand annuities</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#4A5568]">
            The deeper guide focuses on the part that confuses most people: who wins if someone lives a very long time, who loses if someone dies early, and how guarantee periods, refund options, and survivor features change the outcome.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/knowledge/annuities/how-annuities-work"
              className="inline-flex items-center rounded-lg bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#162033]"
            >
              Read the Full Explainer
            </Link>
            <Link
              href="/knowledge/glossary/annuity"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Review the Glossary Term
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">What is an annuity?</h2>
          <p className="mt-3 text-sm leading-7 text-[#4A5568]">
            An annuity is a contract, usually issued by an insurance company, that is designed to help turn savings into future income or support long-term accumulation before income begins. In simple terms, it is often used when someone wants more structure around retirement cash flow and wants to understand what parts of that cash flow are guaranteed versus variable.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Main types of annuities</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {annuityTypes.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4A5568]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Annuities vs Life Insurance</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {comparisonCards.map((card) => (
              <article key={card.title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{card.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4A5568]">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Who might consider an annuity?</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
              {audiences.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[10px] h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Questions to ask before buying</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
              {buyerQuestions.map((question) => (
                <li key={question} className="flex gap-3">
                  <span className="mt-[10px] h-2 w-2 rounded-full bg-[#1F2A44]" aria-hidden="true" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Benefits and tradeoffs</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-[#D6E8E5] bg-[#F2FBF8] p-5">
              <h3 className="text-lg font-semibold text-[#1F2A44]">Potential benefits</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4A5568]">
                {benefits.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-xl border border-[#E8D9D9] bg-[#FFF8F7] p-5">
              <h3 className="text-lg font-semibold text-[#1F2A44]">Tradeoffs to weigh</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4A5568]">
                {tradeoffs.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#1F2A44]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Frequently asked questions</h2>
          <div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50">
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
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Continue exploring</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
            If you are building broader product knowledge, keep going with the Knowledge Hub, review current insurance reporting in News, or sharpen your exam context with structured preparation materials.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/knowledge"
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Back to Knowledge Hub
            </Link>
            <Link
              href="/exam-prep"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Explore Exam Prep
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Read Latest News
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-[#F9FAFB] p-5 text-sm leading-7 text-[#4A5568] shadow-sm">
          <p>
            Disclaimer: This page is for educational purposes only and is not financial, legal, or tax advice. Product features and regulations vary by provider and jurisdiction.
          </p>
        </section>
      </div>
    </main>
  );
}
