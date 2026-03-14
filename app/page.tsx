import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';

export const metadata: Metadata = {
  title: 'LifeForgePrep | Life Insurance Explained Clearly',
  description:
    'News, guides, and practical insights to help you make informed life insurance decisions.'
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#F5F7FA]">
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2FAF9E]">
            LIFE INSURANCE KNOWLEDGE HUB
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
            Life Insurance Explained Clearly
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[#4A5568]">
            News, guides, and practical insights to help you make informed life insurance decisions.
          </p>
        </section>
      </main>
    </>
  );
}
