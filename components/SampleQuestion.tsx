export default function SampleQuestion() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Sample Question</h2>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Original Practice Example</p>
          <p className="mt-3 text-base text-slate-800">
            A client says they only need coverage while paying off a 20-year mortgage and wants the lowest cost for that period.
            Which product type is generally most aligned with that goal?
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>A) Whole life insurance with participating dividends</li>
            <li>B) Universal life with aggressive investment options</li>
            <li>C) Renewable term insurance matched to the debt horizon</li>
            <li>D) Deferred annuity with life rider</li>
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Answer rationale:</span> Choice C is typically best aligned because it
            prioritizes temporary protection over a defined period at lower initial cost.
          </p>
        </div>
      </div>
    </section>
  );
}
