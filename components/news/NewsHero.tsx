import TrendingStrip from '@/components/news/TrendingStrip';

type NewsHeroProps = {
  topics: string[];
};

export default function NewsHero({ topics }: NewsHeroProps) {
  return (
    <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">LifeForge Market Desk</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">LifeForge Market Desk</h1>
      <p className="mt-3 max-w-3xl text-[#4A5568]">
        Plain-English commentary on life insurance trends, regulation, product changes, and market news — written for learners, advisors, and curious consumers.
      </p>
      <TrendingStrip topics={topics} />
    </header>
  );
}
