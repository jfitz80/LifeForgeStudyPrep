import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';
import GlossaryTerm from '@/components/knowledge/GlossaryTerm';
import InlineGlossaryText from '@/components/knowledge/InlineGlossaryText';
import {
  GLOSSARY_TERMS,
  KNOWLEDGE_ARTICLES,
  KNOWLEDGE_CLUSTERS,
  getKnowledgeArticle,
  getKnowledgeCluster
} from '@/lib/knowledge/content';

type Props = {
  params: Promise<{ cluster: string; article: string }>;
};

export async function generateStaticParams() {
  return KNOWLEDGE_ARTICLES.map((article) => ({
    cluster: article.cluster,
    article: article.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cluster, article } = await params;
  const data = getKnowledgeArticle(cluster, article);

  if (!data) {
    return {
      title: 'Knowledge Article | LifeForgePrep'
    };
  }

  return {
    title: `${data.title} | Knowledge Hub | LifeForgePrep`,
    description: data.excerpt
  };
}

export default async function KnowledgeArticlePage({ params }: Props) {
  const { cluster, article } = await params;

  const clusterData = getKnowledgeCluster(cluster);
  const articleData = getKnowledgeArticle(cluster, article);

  if (!clusterData || !articleData) notFound();

  const terms = articleData.glossaryTerms
    .map((term) => GLOSSARY_TERMS.find((entry) => entry.term === term))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: clusterData.accent }}>
              {clusterData.title}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#1F2A44] sm:text-4xl">{articleData.title}</h1>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">{articleData.excerpt}</p>
            <Link href={`/knowledge/${clusterData.slug}`} className="mt-4 inline-flex text-sm font-semibold" style={{ color: clusterData.accent }}>
              Back to cluster
            </Link>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <section>
                <h2 className="text-xl font-bold text-[#1F2A44]">Explanation</h2>
                <InlineGlossaryText text={articleData.explanation} className="mt-3 text-sm leading-7 text-[#4A5568]" />
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-[#1F2A44]">Example</h2>
                <InlineGlossaryText text={articleData.example} className="mt-3 text-sm leading-7 text-[#4A5568]" />
              </section>

              <section className="mt-8 rounded-xl border border-[#F9D4D4] bg-[#FFF6F6] p-5">
                <h2 className="text-xl font-bold text-[#7D1E1E]">Common mistakes</h2>
                <InlineGlossaryText text={articleData.commonMistakes} className="mt-3 text-sm leading-7 text-[#6B2B2B]" />
              </section>

              <section className="mt-8 rounded-xl border border-[#D8ECE8] bg-[#F2FBF8] p-5">
                <h2 className="text-xl font-bold text-[#1E6D63]">Summary</h2>
                <InlineGlossaryText text={articleData.summary} className="mt-3 text-sm leading-7 text-[#2D5D58]" />
              </section>
            </article>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-[#1F2A44]">Glossary in this article</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {terms.map((term) => (
                  <GlossaryTerm key={term.slug} term={term.term} definition={term.definition} />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
