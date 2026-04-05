import type { Metadata } from 'next';
import Link from 'next/link';
import KnowledgeAccordion from '@/components/knowledge/KnowledgeAccordion';
import {
  annuityExamples,
  annuityReasons,
  annuityTimeline,
  annuityTypeComparison,
  buyerQuestions,
  comparisonRows,
  cons,
  outcomeFeatures,
  pros,
  riskCards,
  whatHappensIfItems
} from '@/lib/knowledge/annuities-content';

export const metadata: Metadata = {
  title: 'How Annuities Work | LifeForgePrep',
  description:
    'A plain-language guide to how annuities work, how payments are structured, and what happens if someone dies early or lives much longer than expected.'
};

export default function HowAnnuitiesWorkPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Knowledge Hub</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">How Annuities Work</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#4A5568]">
            A plain-language guide to what an annuity really does: turning a lump sum into future income, changing who bears longevity risk, and shaping what happens if death comes early or much later than expected.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/knowledge/annuities" className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]">
              Back to Annuities Overview
            </Link>
            <Link href="/knowledge/product-comparisons" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
              Product Comparisons
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#D6E8E5] bg-[#F2FBF8] p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Plain English</p>
          <p className="mt-3 text-base leading-8 text-[#1F2A44] sm:text-lg">
            An annuity is not just a savings product. It is a way of trading a lump sum for future income, often to protect against the risk of outliving your money.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">What is an annuity?</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              An annuity is a contract, usually issued by an insurance company, that exchanges money now for a stream of payments later. Some annuities start paying almost immediately. Others delay payments until a future date. The key idea is simple: part of the contract is designed to create income, not just hold savings.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Why people buy annuities</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
              {annuityReasons.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[10px] h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">How annuities work</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {annuityTimeline.map((step) => (
              <article key={step.title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4A5568]">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Who takes the risk?</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#4A5568]">
            Annuities are longevity-risk products. If the annuity owner dies early, they may receive less than they paid in unless there is a guarantee period, refund, or survivor option. If the annuity owner lives much longer than expected, the insurer may pay out more than the original deposit.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {riskCards.map((card) => (
              <article key={card.title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4A5568]">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Life annuity vs term-certain annuity</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {annuityTypeComparison.map((card) => (
              <article key={card.title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4A5568]">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#E8D9D9] bg-[#FFF8F7] p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">What happens if you die early?</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              This depends entirely on the annuity design. A pure life annuity may stop at death, even if only a small amount of income has been paid so far. That is the tradeoff for stronger protection against living a very long time. Contracts with guarantee periods, refund features, or survivor protection change this outcome.
            </p>
          </article>

          <article className="rounded-2xl border border-[#D6E8E5] bg-[#F2FBF8] p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">What happens if you live much longer than expected?</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              This is where a life annuity can become more valuable. If payments continue for life and the annuitant lives well beyond average expectations, the contract may pay out more than the original premium. That is the core longevity protection many people are paying for.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Features that change the outcome</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {outcomeFeatures.map((feature) => (
              <article key={feature.title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4A5568]">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Example: a $100,000 annuity purchased at age 65</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              These examples are educational only. Actual payments depend on age, interest rates, annuity type, insurer pricing, and contract features. The point is to show how different structures can lead to very different outcomes from the same starting deposit.
            </p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {annuityExamples.map((card) => (
              <article key={card.title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{card.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">What happens if…</h2>
          <p className="mt-3 text-sm leading-7 text-[#4A5568]">
            Use these quick answers to understand how common annuity concerns usually work at a high level before reading the contract details.
          </p>
          <div className="mt-5">
            <KnowledgeAccordion items={whatHappensIfItems.map((item) => ({ question: item.question, answer: item.answer }))} headingLevel="h3" />
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-7 py-6">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Comparison table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-[#4A5568]">
              <thead className="bg-[#F9FAFB] text-xs uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Feature</th>
                  <th className="px-6 py-4 font-semibold">Life Annuity</th>
                  <th className="px-6 py-4 font-semibold">Term-Certain Annuity</th>
                  <th className="px-6 py-4 font-semibold">Joint Life Annuity</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFDFE]'}>
                    <th className="px-6 py-4 font-semibold text-[#1F2A44]">{row.feature}</th>
                    <td className="px-6 py-4 leading-7">{row.life}</td>
                    <td className="px-6 py-4 leading-7">{row.termCertain}</td>
                    <td className="px-6 py-4 leading-7">{row.jointLife}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#D6E8E5] bg-[#F2FBF8] p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Pros and cons</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-[#1F2A44]">Potential advantages</h3>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-[#4A5568]">
                  {pros.map((item) => (
                    <li key={item} className="flex gap-3"><span className="mt-[10px] h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2A44]">Tradeoffs</h3>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-[#4A5568]">
                  {cons.map((item) => (
                    <li key={item} className="flex gap-3"><span className="mt-[10px] h-2 w-2 rounded-full bg-[#1F2A44]" aria-hidden="true" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Questions to ask before buying</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
              {buyerQuestions.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[10px] h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Why this matters</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
              <h3 className="text-lg font-semibold text-[#1F2A44]">For beginners</h3>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                Many people hear the word annuity and think only about “guaranteed income.” That is incomplete. The real question is what income is guaranteed, for how long, and what happens if death happens sooner or later than expected.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
              <h3 className="text-lg font-semibold text-[#1F2A44]">For exam-prep users</h3>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                Exam questions often test product suitability, guarantee structures, and the tradeoff between longevity protection and estate value. Understanding those tradeoffs is more useful than memorizing a product label.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Related Knowledge Hub links</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link href="/knowledge/advisor-guidance/retirement-income-planning" className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm">
              <h3 className="text-lg font-semibold text-[#1F2A44]">Retirement income planning</h3>
              <p className="mt-2 text-sm leading-6 text-[#4A5568]">See how annuities fit into a broader retirement cash-flow plan.</p>
            </Link>
            <Link href="/knowledge/advisor-guidance/risk-management" className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm">
              <h3 className="text-lg font-semibold text-[#1F2A44]">Risk management</h3>
              <p className="mt-2 text-sm leading-6 text-[#4A5568]">Review how longevity, liquidity, and estate risk shape product choices.</p>
            </Link>
            <Link href="/knowledge/product-comparisons" className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm">
              <h3 className="text-lg font-semibold text-[#1F2A44]">Product comparisons</h3>
              <p className="mt-2 text-sm leading-6 text-[#4A5568]">Compare annuity structures alongside other insurance concepts.</p>
            </Link>
            <div className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
              <h3 className="text-lg font-semibold text-[#1F2A44]">Glossary terms</h3>
              <p className="mt-2 text-sm leading-6 text-[#4A5568]">
                <Link href="/knowledge/glossary/annuity" className="font-medium text-[#2FAF9E] hover:text-[#1F2A44]">Annuity</Link>,{' '}
                <Link href="/knowledge/glossary/beneficiary" className="font-medium text-[#2FAF9E] hover:text-[#1F2A44]">Beneficiary</Link>,{' '}
                <Link href="/knowledge/glossary/guarantee-period" className="font-medium text-[#2FAF9E] hover:text-[#1F2A44]">Guarantee Period</Link>,{' '}
                <Link href="/knowledge/glossary/estate" className="font-medium text-[#2FAF9E] hover:text-[#1F2A44]">Estate</Link>,{' '}
                <Link href="/knowledge/glossary/longevity-risk" className="font-medium text-[#2FAF9E] hover:text-[#1F2A44]">Longevity Risk</Link>
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/news" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
              Read News and Insights
            </Link>
            <Link href="/exam-prep" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
              Explore Exam Prep
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-[#4A5568] shadow-sm">
          <p className="font-semibold text-[#1F2A44]">Disclaimer</p>
          <p className="mt-2">Educational information only. Annuity features and outcomes vary by contract and insurer.</p>
        </section>
      </div>
    </main>
  );
}
