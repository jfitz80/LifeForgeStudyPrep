import type { Metadata } from 'next';
import Link from 'next/link';
import { BUYERS_GUIDE_CATEGORIES, BUYERS_GUIDES } from '@/lib/knowledge/buyers-guides';

export const metadata: Metadata = {
  title: 'Buyer\'s Guides | Knowledge Hub | LifeForgePrep',
  description: 'Honest, consumer-friendly life insurance buyer guides that explain tradeoffs, product differences, and what to watch out for in plain language.'
};

export default function BuyersGuidesPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Knowledge Hub</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Buyer’s Guides</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#4A5568]">
            Honest, practical guides for consumers who want to understand how life insurance products work before buying. These guides focus on plain language, real tradeoffs, and what to watch out for.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-[#D6E8E5] bg-[#F2FBF8] p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">How to use this section</p>
          <p className="mt-3 text-base leading-8 text-[#1F2A44]">
            Start with the basics, then move into product comparisons and shopping guides. The goal is not to sell one product type. The goal is to help you understand what a product does, what it does not do, and what questions you should ask before you commit money.
          </p>
        </section>

        <section className="mt-8 space-y-8">
          {BUYERS_GUIDE_CATEGORIES.map((category) => {
            const guides = category.slugs
              .map((slug) => BUYERS_GUIDES.find((guide) => guide.slug === slug))
              .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));

            return (
              <div key={category.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold text-[#1F2A44]">{category.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#4A5568]">{category.description}</p>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {guides.map((guide) => (
                    <article key={guide.slug} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">{guide.category}</p>
                      <h3 className="mt-2 text-xl font-bold text-[#1F2A44]">{guide.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#4A5568]">{guide.summary}</p>
                      <Link href={`/knowledge/buyers-guides/${guide.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                        Read guide
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
