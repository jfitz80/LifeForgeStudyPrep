import type { Metadata } from 'next';
import { contentMetricsGuide } from '@/data/contentMetricsGuide';

export const metadata: Metadata = {
  title: 'Weekly Content Review Guide | LifeForgePrep',
  description:
    'A simple internal guide for reviewing weekly LifeForgePrep content performance and deciding what to publish next.'
};

export default function ContentReviewGuidePage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Internal guide</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">
            {contentMetricsGuide.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{contentMetricsGuide.cadence}</p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {contentMetricsGuide.metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-[#1F2A44]">{metric.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{metric.prompt}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-[#CFEAE4] bg-[#F1FBF8] p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Sunday review questions</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {contentMetricsGuide.reviewQuestions.map((question) => (
              <div key={question} className="rounded-xl border border-white bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700">
                {question}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#1F2A44]">Plain-English weekly workflow</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600">
            <li>Check which weekly cards and article links earned clicks.</li>
            <li>Compare answer reveals, free-practice clicks, app clicks, and exam-prep clicks.</li>
            <li>Repeat topics that create action, not only page views.</li>
            <li>Promote strong weekly topics into full Knowledge Hub guides.</li>
            <li>Retire topics that feel broad, stale, or disconnected from the LLQP Life Insurance module.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
