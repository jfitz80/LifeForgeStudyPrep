import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';
import SmartCoverageFinder from '@/components/tools/SmartCoverageFinder';

export const metadata: Metadata = {
  title: 'Free Practice | LifeForgePrep',
  description: 'Practice exam-style questions and estimate coverage with LifeForge free tools.'
};

export default function FreePracticePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Free Practice</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Practice Before You Commit</h1>
            <p className="mt-3 max-w-3xl text-[#4A5568]">
              Use this free practice tool to test your understanding of core life insurance concepts and get practical recommendation guidance.
            </p>
          </header>

          <SmartCoverageFinder />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
