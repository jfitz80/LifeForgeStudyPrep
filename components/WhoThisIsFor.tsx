export default function WhoThisIsFor() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Who This Is For</h2>

        <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
          LifeForge Insurance Prep is designed primarily for candidates preparing for the Canadian LLQP Life Insurance exam,
          but the practice questions may also help anyone studying for life insurance licensing exams in other regions where
          similar core concepts are tested.
        </p>

        <ul className="mt-5 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 sm:text-base">
          <li>• insurance principles</li>
          <li>• underwriting</li>
          <li>• policy structures</li>
          <li>• client needs analysis</li>
          <li>• claims and servicing</li>
        </ul>

        <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
          This resource focuses on life insurance concepts commonly tested in the LLQP Life Insurance module. Candidates
          from other licensing systems may also find the practice useful.
        </p>
      </div>
    </section>
  );
}
