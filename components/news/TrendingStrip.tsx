type TrendingStripProps = {
  topics: string[];
};

export default function TrendingStrip({ topics }: TrendingStripProps) {
  if (topics.length === 0) return null;

  return (
    <div className="mt-4 overflow-x-auto pb-1">
      <div className="inline-flex min-w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
        <span className="whitespace-nowrap text-sm font-semibold text-[#1F2A44]">Industry topics:</span>
        {topics.map((topic) => (
          <span key={topic} className="whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
