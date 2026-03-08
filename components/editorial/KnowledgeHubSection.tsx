import { knowledgeCategories, popularTopics } from '@/config/home';

export default function KnowledgeHubSection() {
  return (
    <section id="knowledge-hub" className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Knowledge Hub</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Structured Learning by Topic</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Browse evergreen life insurance content by category to build confidence, compare options, and understand common terminology.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {popularTopics.map((topic) => (
                <span key={topic} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {knowledgeCategories.map((item) => (
              <article key={item} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-slate-900">{item}</h3>
                <p className="mt-1 text-sm text-slate-600">Foundational guides, practical examples, and plain-language explanations.</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
