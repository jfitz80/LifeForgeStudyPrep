const steps = [
  'Download instantly',
  'Study with checklists + scenarios',
  'Test yourself with practice questions'
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Step {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{step}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
