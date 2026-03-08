import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';
import { digestTags } from '@/config/home';
import { newsItems } from '@/data/news';

export const metadata: Metadata = {
  title: 'Life Insurance News Digest | LifeForge Insurance Prep',
  description: 'Weekly life insurance digest with clear summaries, practical implications, and exam-prep relevance.'
};

export default function NewsHubPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">LifeForge News Digest</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">This Week in Life Insurance</h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Practical life insurance headlines and analysis for consumers, licensing candidates, and professionals.
            </p>
          </header>

          <div className="mb-6 flex flex-wrap gap-2">
            {digestTags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {newsItems.map((item) => (
              <article key={item.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{item.publishedAtLabel}</span>
                  <span>•</span>
                  <span>{item.source}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">{item.tag}</span>
                </div>
                <h2 className="mt-3 text-xl font-bold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.summary}</p>
                <div className="mt-4 flex gap-4">
                  <Link href={`/news/${item.slug}`} className="text-sm font-semibold text-brand-700 hover:text-brand-900">
                    Read analysis
                  </Link>
                  <a href="#newsletter-signup" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
                    Get weekly digest
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
