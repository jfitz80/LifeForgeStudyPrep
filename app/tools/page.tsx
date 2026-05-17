import type { Metadata } from 'next';
import ToolSuite from '@/components/tools/ToolSuite';

export const metadata: Metadata = {
  title: 'Insurance Learning Tools | LifeForgePrep',
  description:
    'Interactive insurance learning tools for coverage planning, product comparison, needs analysis, premium estimates, and study practice.'
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Tools hub</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Insurance learning tools</h1>
          <p className="mt-3 max-w-3xl text-[#4A5568]">
            Use calculators, comparisons, and advisor-style workflows to translate life insurance concepts into practical decisions. These tools are educational and designed to support clearer thinking, not replace licensed advice.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {['Study streak tracker', 'Timed quiz mode', 'Difficulty filters', 'Scenario drills'].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#1F2A44]">
                {item}
              </div>
            ))}
          </div>
        </header>

        <ToolSuite />
      </div>
    </main>
  );
}
