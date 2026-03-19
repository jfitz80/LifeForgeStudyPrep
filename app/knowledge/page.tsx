import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';
import ClusterIcon from '@/components/knowledge/ClusterIcon';
import GlossaryIndex from '@/components/knowledge/GlossaryIndex';
import { KNOWLEDGE_CLUSTERS } from '@/lib/knowledge/content';

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

const categorizedSections = [
  {
    title: 'Foundations',
    items: ['Life insurance purpose and core terminology', 'Insurable interest and disclosure principles', 'Coverage need estimation basics']
  },
  {
    title: 'Products',
    items: ['Term vs permanent policy structure', 'Riders and contract flexibility', 'Beneficiary and ownership mechanics']
  },
  {
    title: 'Exam Concepts',
    items: ['Scenario-based suitability reasoning', 'High-frequency LLQP question traps', 'Calculation and interpretation workflows']
  },
  {
    title: 'Industry Insights',
    items: ['Claims and litigation patterns', 'Regulatory and compliance updates', 'Underwriting and market trend implications']
  }
] as const;

export default function KnowledgePage() {
  return (
    <>
      <SiteHeader />
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
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {KNOWLEDGE_CLUSTERS.map((cluster) => (
                <Link
                  key={cluster.slug}
                  href={`/knowledge/${cluster.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: cluster.accent }}>
                    <ClusterIcon slug={cluster.slug} />
                  </div>
                  <h2 className="text-lg font-semibold text-[#1F2A44]">{cluster.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#4A5568]">{cluster.shortDescription}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold" style={{ color: cluster.accent }}>
                    View cluster
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <GlossaryIndex />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
