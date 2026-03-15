import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';

export const metadata: Metadata = {
  title: 'Tools | LifeForgePrep',
  description: 'Life insurance calculators and comparison utilities.'
};

export default function ToolsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] px-4 py-16">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8">
          <h1 className="text-3xl font-bold text-[#1F2A44]">Tools</h1>
          <p className="mt-3 text-[#4A5568]">Coming next: coverage calculator, premium estimator, and term-vs-whole comparison tool.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
