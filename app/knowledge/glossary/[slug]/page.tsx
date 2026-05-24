import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GLOSSARY_TERMS, KNOWLEDGE_ARTICLES } from '@/lib/knowledge/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return GLOSSARY_TERMS.map((term) => ({ slug: term.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

function getGlossaryTerm(slug: string) {
  return GLOSSARY_TERMS.find((term) => term.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return { title: 'Glossary | LifeForgePrep' };
  return {
    title: `${term.term} | Glossary | LifeForgePrep`,
    description: term.definition
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);

  if (!term) notFound();

  const relatedArticles = KNOWLEDGE_ARTICLES.filter((article) => article.glossaryTerms.includes(term.term)).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link href="/knowledge/glossary" className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
          ← Back to Glossary
        </Link>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Glossary term</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">{term.term}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">{term.definition}</p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Why this matters</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              Terms like {term.term.toLowerCase()} are easier to remember when you connect them to product choice, underwriting, claims, and suitability decisions. Use this page as a plain-language anchor before jumping back into practice or articles.
            </p>
            <div className="mt-6 rounded-xl border border-[#D8ECE8] bg-[#F2FBF8] p-5">
              <p className="text-sm font-semibold text-[#1F2A44]">For exam prep</p>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">
                LLQP and advisor-style questions often test not just the definition of a term, but what changes when that term appears inside a scenario.
              </p>
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-[#1F2A44]">Next steps</h3>
            <div className="mt-4 space-y-3 text-sm font-semibold">
              <Link href="/free-practice" className="block text-[#2FAF9E] hover:text-[#1F2A44]">Try 15 Free Questions</Link>
              <Link href="/knowledge" className="block text-[#2FAF9E] hover:text-[#1F2A44]">Explore Knowledge Hub</Link>
              <Link href="/app" className="block text-[#2FAF9E] hover:text-[#1F2A44]">Download Free App</Link>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Related articles</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {relatedArticles.map((article) => (
              <Link key={article.slug} href={`/knowledge/${article.cluster}/${article.slug}`} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4 transition hover:bg-white hover:shadow-sm">
                <p className="text-lg font-semibold text-[#1F2A44]">{article.title}</p>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
