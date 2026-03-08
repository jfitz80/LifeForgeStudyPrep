import { digestTags } from '@/config/home';

type DigestItem = {
  id: string;
  title: string;
  summary: string;
  publishedAtLabel: string;
  source: string;
  tag: string;
};

export default function NewsDigestSection({ items }: { items: readonly DigestItem[] }) {
  return (
    <section id="news-digest" className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">News Digest</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">This Week in Life Insurance</h2>
            <p className="mt-2 text-sm text-slate-600">Latest headlines with concise summaries and practical context.</p>
          </div>
          <a href="#newsletter-signup" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            Get digest by email
          </a>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {digestTags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{item.publishedAtLabel}</span>
                <span>•</span>
                <span>{item.source}</span>
                <span className="rounded-full bg-white px-2 py-0.5 font-semibold text-slate-600">{item.tag}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.summary}</p>
              <div className="mt-4 flex gap-4">
                <a href="#industry-insights" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
                  Read related insight
                </a>
                <a href="#knowledge-hub" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
                  Explore core topics
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
