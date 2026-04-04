import type { Metadata } from 'next';
import ToolSuite from '@/components/tools/ToolSuite';

export const metadata: Metadata = {
  title: 'Tools | LifeForgePrep',
  description: 'Coverage calculators, term vs permanent comparisons, needs analysis, and educational premium estimates.'
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Tools</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Insurance decision tools</h1>
          <p className="mt-3 max-w-3xl text-[#4A5568]">
            Use calculators, comparisons, and advisor-style workflows to translate life insurance concepts into practical decisions. These tools are educational and designed to support clearer thinking, not replace licensed advice.
          </p>
        </header>

        <ToolSuite />
      </div>
    </main>
  );
}
