type QuizProgressBarProps = {
  current: number;
  total: number;
};

export default function QuizProgressBar({ current, total }: QuizProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const percent = Math.round((current / safeTotal) * 100);

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6BC4B8]">Free Question Set</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Question {Math.min(current, total)} of {total}
        </p>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-700" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Quiz progress">
        <div
          className="h-2.5 rounded-full bg-[#2FAF9E] transition-all duration-500"
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
