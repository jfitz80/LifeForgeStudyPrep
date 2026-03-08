import { returnValueItems } from '@/config/home';

export default function ReturnValueSection() {
  return (
    <section className="bg-slate-900 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-100">Why Bookmark This Site</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Built for Repeat Value, Not One-Time Clicks</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              We publish practical digest content and educational resources designed to help readers stay current and make better life insurance decisions over time.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {returnValueItems.map((item) => (
              <li key={item} className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-100">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
