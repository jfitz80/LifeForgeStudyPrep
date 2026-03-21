type BreakdownItem = {
  typeLabel: string;
  correct: number;
  total: number;
};

type QuizResultsCardProps = {
  score: number;
  total: number;
  breakdown: BreakdownItem[];
};

type PerformanceBand = 'low' | 'mid' | 'high';

function getPerformanceBand(score: number): PerformanceBand {
  if (score <= 4) return 'low';
  if (score <= 7) return 'mid';
  return 'high';
}

function getBandLabel(band: PerformanceBand): string {
  if (band === 'low') return 'Needs Work';
  if (band === 'mid') return 'Getting There';
  return 'Strong Start';
}

function getBandMessage(band: PerformanceBand): string {
  if (band === 'low') {
    return 'You’ve got critical gaps — especially in applying concepts. This is where most candidates fail.';
  }
  if (band === 'mid') {
    return 'You’re close, but the LLQP exam is designed to catch small misunderstandings.';
  }
  return 'Strong foundation — but the real exam goes deeper with layered scenarios.';
}

function getBandClasses(band: PerformanceBand): string {
  if (band === 'low') {
    return 'border-rose-500/40 bg-rose-500/10 text-rose-100';
  }
  if (band === 'mid') {
    return 'border-amber-500/40 bg-amber-500/10 text-amber-100';
  }
  return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100';
}

export default function QuizResultsCard({ score, total, breakdown }: QuizResultsCardProps) {
  const percentage = Math.round((score / Math.max(total, 1)) * 100);
  const band = getPerformanceBand(score);

  return (
    <section className="rounded-2xl border border-slate-700 bg-[#111A2D] p-6 shadow-xl sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6BC4B8]">Free Practice Complete</p>
      <h2 className="mt-2 text-3xl font-bold text-white">Your Results</h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl border border-slate-700 bg-[#0E1628] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#6BC4B8]">Score</p>
          <p className="mt-2 text-2xl font-bold text-white">{score}/{total}</p>
        </article>
        <article className="rounded-xl border border-slate-700 bg-[#0E1628] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#6BC4B8]">Percentage</p>
          <p className="mt-2 text-2xl font-bold text-white">{percentage}%</p>
        </article>
        <article className="rounded-xl border border-slate-700 bg-[#0E1628] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#6BC4B8]">Performance</p>
          <p className={`mt-2 inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${getBandClasses(band)}`}>
            {getBandLabel(band)}
          </p>
        </article>
      </div>

      <div className="mt-5 rounded-xl border border-slate-700 bg-[#0E1628] p-4">
        <p className="text-base font-semibold text-white">{getBandMessage(band)}</p>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          The difference between passing and failing isn’t memorization — it’s how well you apply concepts under exam conditions.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {breakdown.map((item) => (
          <article key={item.typeLabel} className="rounded-xl border border-slate-700 bg-[#0E1628] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6BC4B8]">{item.typeLabel}</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {item.correct}/{item.total}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
