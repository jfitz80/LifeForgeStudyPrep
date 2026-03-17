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
