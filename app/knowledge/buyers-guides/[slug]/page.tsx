import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BuyerGuideQuestions from '@/components/knowledge/BuyerGuideQuestions';
import BuyerGuideWatchouts from '@/components/knowledge/BuyerGuideWatchouts';
import { BUYERS_GUIDES, getBuyersGuide } from '@/lib/knowledge/buyers-guides';

export function generateStaticParams() {
  return BUYERS_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getBuyersGuide(params.slug);

  if (!guide) {
    return {
      title: "Buyer's Guide | LifeForgePrep"
    };
  }

  return {
    title: `${guide.title} | Buyer’s Guides | LifeForgePrep`,
    description: guide.summary
  };
}

export default function BuyersGuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = getBuyersGuide(params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Buyer’s Guides</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">{guide.title}</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#4A5568]">{guide.summary}</p>
        </section>

        <section className="mt-8 rounded-2xl border border-[#D6E8E5] bg-[#F2FBF8] p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Quick answer</p>
          <p className="mt-3 text-base leading-8 text-[#1F2A44]">{guide.quickAnswer}</p>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Plain-English explanation</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#4A5568]">
            {guide.explanation.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {guide.howTheyWorkSections?.length ? (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">How They Work</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {guide.howTheyWorkSections.map((section) => (
                <article key={section.title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
                  <h3 className="text-lg font-semibold text-[#1F2A44]">{section.title}</h3>
                  {section.body ? <p className="mt-2 text-sm leading-7 text-[#4A5568]">{section.body}</p> : null}
                  {section.bullets?.length ? (
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-[#4A5568]">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.kicker ? <p className="mt-4 text-sm font-semibold text-[#1F2A44]">{section.kicker}</p> : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#D6E8E5] bg-[#F2FBF8] p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Pros and cons</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-[#1F2A44]">Potential pros</h3>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-[#4A5568]">
                  {guide.pros.map((item) => (
                    <li key={item} className="flex gap-3"><span className="mt-[10px] h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2A44]">Potential cons</h3>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-[#4A5568]">
                  {guide.cons.map((item) => (
                    <li key={item} className="flex gap-3"><span className="mt-[10px] h-2 w-2 rounded-full bg-[#1F2A44]" aria-hidden="true" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Who it may suit</h2>
            {guide.whoItMaySuitSections?.length ? (
              <div className="mt-4 space-y-5">
                {guide.whoItMaySuitSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-lg font-semibold text-[#1F2A44]">{section.title}</h3>
                    <ul className="mt-3 space-y-3 text-sm leading-7 text-[#4A5568]">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-[10px] h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
                {guide.whoItMaySuit.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[10px] h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <BuyerGuideWatchouts items={guide.watchOutFor} />
          <BuyerGuideQuestions items={guide.questionsToAsk} />
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Key tradeoffs</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guide.keyTradeoffs.map((item) => (
              <article key={item} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5 text-sm font-medium leading-7 text-[#1F2A44]">
                {item}
              </article>
            ))}
          </div>
        </section>

        {guide.comparisonTable ? (
          <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-7 py-6">
              <h2 className="text-2xl font-bold text-[#1F2A44]">Comparison table</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-[#4A5568]">
                <thead className="bg-[#F9FAFB] text-xs uppercase tracking-[0.14em] text-slate-500">
                  <tr>
                    {guide.comparisonTable.columns.map((column) => (
                      <th key={column} className="px-6 py-4 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.comparisonTable.rows.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFDFE]'}>
                      <th className="px-6 py-4 font-semibold text-[#1F2A44]">{row.feature}</th>
                      {row.values.map((value) => (
                        <td key={`${row.feature}-${value}`} className="px-6 py-4 leading-7">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Related articles and tools</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guide.relatedArticles.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{item.title}</h3>
                <p className="mt-3 text-sm font-medium text-[#2FAF9E]">Open resource</p>
              </Link>
            ))}
            <Link href="/knowledge/annuities/how-annuities-work" className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm">
              <h3 className="text-lg font-semibold text-[#1F2A44]">How Annuities Work</h3>
              <p className="mt-3 text-sm font-medium text-[#2FAF9E]">Explore annuity tradeoffs</p>
            </Link>
            <div className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
              <h3 className="text-lg font-semibold text-[#1F2A44]">Glossary links</h3>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">
                <Link href="/knowledge/glossary/annuity" className="font-medium text-[#2FAF9E] hover:text-[#1F2A44]">Annuity</Link>,{' '}
                <Link href="/knowledge/glossary/beneficiary" className="font-medium text-[#2FAF9E] hover:text-[#1F2A44]">Beneficiary</Link>,{' '}
                <Link href="/knowledge/glossary/premium" className="font-medium text-[#2FAF9E] hover:text-[#1F2A44]">Premium</Link>
              </p>
            </div>
          </div>
        </section>

        {guide.bottomLine?.length ? (
          <section className="mt-8 rounded-2xl border border-[#D6E8E5] bg-[#F2FBF8] p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Bottom line</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
              {guide.bottomLine.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-[#4A5568] shadow-sm">
          <p className="font-semibold text-[#1F2A44]">Disclaimer</p>
          <p className="mt-2">{guide.disclaimer}</p>
        </section>
      </div>
    </main>
  );
}
