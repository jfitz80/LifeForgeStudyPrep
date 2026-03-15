import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';

export const metadata: Metadata = {
  title: 'About | LifeForgePrep',
  description: 'Editorial standards and mission for LifeForgePrep.'
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] px-4 py-16">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8">
          <h1 className="text-3xl font-bold text-[#1F2A44]">About</h1>
          <p className="mt-3 text-[#4A5568]">LifeForgePrep is an independent life insurance education and news platform focused on clarity and practical guidance.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
