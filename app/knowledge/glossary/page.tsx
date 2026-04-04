import type { Metadata } from 'next';
import GlossaryIndex from '@/components/knowledge/GlossaryIndex';

export const metadata: Metadata = {
  title: 'Glossary | Knowledge Hub | LifeForgePrep',
  description: 'Browse core life insurance and annuity terms in a searchable, beginner-friendly glossary.'
};

export default function KnowledgeGlossaryPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Knowledge Hub</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Glossary</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            Browse core insurance, underwriting, and annuity terms in plain language so you can study or compare products with less friction.
          </p>
        </section>
        <GlossaryIndex />
      </div>
    </main>
  );
}
