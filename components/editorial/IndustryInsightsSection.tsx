import { industryInsightItems } from '@/config/home';

export default function IndustryInsightsSection() {
  return (
    <section id="industry-insights" className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Industry Insights</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Professional Context on Market and Product Trends</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Editorial-style analysis covering insurer strategy, consumer behavior, and regulatory movement that can shape advice and outcomes.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {industryInsightItems.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.tag}</p>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
