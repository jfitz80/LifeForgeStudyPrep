import { featuredContent } from '@/config/home';

export default function FeaturedGrid() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Featured Content</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Start With the Most Useful Reads</h2>
          </div>
          <a href="#knowledge-hub" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            Browse all categories
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredContent.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.category}</p>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              <a href={item.href} className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900">
                Read more →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
