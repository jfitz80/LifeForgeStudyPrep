import type { Metadata } from 'next';
//import SiteHeader from '@/components/editorial/SiteHeader';
//import SiteFooter from '@/components/editorial/SiteFooter';
import SmartCoverageFinder from '@/components/tools/SmartCoverageFinder';

export const metadata: Metadata = {
  title: 'Tools | LifeForgePrep',
  description: 'Life insurance calculators and comparison utilities.'
};

export default function ToolsPage() {
  return (
    <>
      
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Tools</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Smart Coverage Finder</h1>
            <p className="mt-3 max-w-3xl text-[#4A5568]">
              Use a structured intake to estimate life insurance coverage range, policy type fit, term guidance, and a practical premium range.
            </p>
          </header>

          <SmartCoverageFinder />
        </div>
      </main>
      
    </>
  );
}
