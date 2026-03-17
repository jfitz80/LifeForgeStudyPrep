import Link from 'next/link';
import ClusterIcon from '@/components/knowledge/ClusterIcon';
import { KNOWLEDGE_CLUSTERS } from '@/lib/knowledge/content';

export default function KnowledgeHubHomeSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Knowledge Hub</p>
        <h2 className="mt-2 text-2xl font-bold text-[#1F2A44] sm:text-3xl">Explore Topic Clusters</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#4A5568]">
          Structured life insurance learning paths designed for professionals and LLQP students.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {KNOWLEDGE_CLUSTERS.map((cluster) => (
          <Link
            key={cluster.slug}
            href={`/knowledge/${cluster.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: cluster.accent }}>
              <ClusterIcon slug={cluster.slug} />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2A44]">{cluster.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#4A5568]">{cluster.shortDescription}</p>
            <span className="mt-4 inline-flex text-sm font-semibold" style={{ color: cluster.accent }}>
              Open cluster
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
