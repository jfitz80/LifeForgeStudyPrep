import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContextualCTA from '@/components/ContextualCTA';
import ClusterIcon from '@/components/knowledge/ClusterIcon';
import GlossaryTerm from '@/components/knowledge/GlossaryTerm';
import {
  KNOWLEDGE_CLUSTERS,
  getClusterGlossaryTerms,
  getKnowledgeArticlesByCluster,
  getKnowledgeCluster
} from '@/lib/knowledge/content';

type Props = {
  params: Promise<{ cluster: string }>;
};

export async function generateStaticParams() {
  return KNOWLEDGE_CLUSTERS.map((cluster) => ({ cluster: cluster.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cluster } = await params;
  const item = getKnowledgeCluster(cluster);

  if (!item) {
    return {
      title: 'Knowledge Hub | LifeForgePrep'
    };
  }

  return {
    title: `${item.title} | Knowledge Hub | LifeForgePrep`,
    description: item.shortDescription
  };
}

export default async function KnowledgeClusterPage({ params }: Props) {
  const { cluster } = await params;
  const clusterData = getKnowledgeCluster(cluster);

  if (!clusterData) notFound();

  const articles = getKnowledgeArticlesByCluster(cluster);
  const glossary = getClusterGlossaryTerms(cluster).slice(0, 10);

  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div
            className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: clusterData.accent }}
          >
            <ClusterIcon slug={clusterData.slug} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: clusterData.accent }}>
            Knowledge Cluster
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#1F2A44] sm:text-4xl">{clusterData.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">{clusterData.intro}</p>
        </section>

        <div className="mb-8">
          <ContextualCTA
            eyebrow="Studying CTA"
            title="Studying the LLQP Life Insurance module? Test yourself on this concept."
            body="Reading articles builds understanding. Free practice shows whether the idea holds up when you have to apply it under exam pressure."
            variant="studying"
            actions={[
              {
                label: 'Try 15 Free Questions',
                href: '/free-practice',
                eventPayload: {
                  source_page: `/knowledge/${clusterData.slug}`,
                  destination_page: '/free-practice',
                  cta_type: 'cluster_studying',
                  content_type: 'knowledge_cluster',
                  topic: clusterData.slug
                }
              },
              {
                label: 'Explore Full Practice',
                href: '/exam-prep',
                style: 'secondary',
                eventPayload: {
                  source_page: `/knowledge/${clusterData.slug}`,
                  destination_page: '/exam-prep',
                  cta_type: 'cluster_gap',
                  content_type: 'knowledge_cluster',
                  topic: clusterData.slug
                }
              }
            ]}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-[#1F2A44]">Articles</h2>
            <div className="grid gap-4">
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-xl font-bold text-[#1F2A44]">{article.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4A5568]">{article.excerpt}</p>
                  <Link
                    href={`/knowledge/${clusterData.slug}/${article.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold"
                    style={{ color: clusterData.accent }}
                  >
                    Read article
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-[#1F2A44]">Glossary Terms</h2>
            <p className="mt-2 text-sm text-[#4A5568]">Click any term for a quick definition.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {glossary.map((term) => (
                <GlossaryTerm key={term.slug} term={term.term} definition={term.definition} />
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-8">
          <ContextualCTA
            eyebrow="Gap CTA"
            title="Understanding the concept is one thing. Applying it under exam pressure is another."
            body="Use the free set if you want a quick signal. If you already know you need deeper review, full exam prep gives you harder scenarios and stronger explanation depth."
            variant="gap"
            actions={[
              {
                label: 'Try 15 Free Questions',
                href: '/free-practice',
                eventPayload: {
                  source_page: `/knowledge/${clusterData.slug}`,
                  destination_page: '/free-practice',
                  cta_type: 'cluster_bottom_studying',
                  content_type: 'knowledge_cluster',
                  topic: clusterData.slug
                }
              },
              {
                label: 'Explore Full Practice',
                href: '/exam-prep',
                style: 'secondary',
                eventPayload: {
                  source_page: `/knowledge/${clusterData.slug}`,
                  destination_page: '/exam-prep',
                  cta_type: 'cluster_bottom_gap',
                  content_type: 'knowledge_cluster',
                  topic: clusterData.slug
                }
              }
            ]}
          />
        </div>
      </div>
    </main>
  );
}
