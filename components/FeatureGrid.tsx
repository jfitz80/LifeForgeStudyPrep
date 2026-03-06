import { insideGuideItems } from '@/config/site';

export default function FeatureGrid() {
  return (
    <section id="inside" className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Inside the Guide</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Built to reduce overwhelm and help you focus on high-value concepts likely to appear in exam scenarios.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {insideGuideItems.map((item) => (
            <article key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">{item}</h3>
              <p className="mt-2 text-sm text-slate-600">
                Practical, concise coverage so you can review efficiently and retain key ideas under time pressure.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
