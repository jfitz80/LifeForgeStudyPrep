import NewsCard from '@/components/news/NewsCard';
import type { NewsArticleView } from '@/components/news/types';

type FeaturedStoriesGridProps = {
  items: NewsArticleView[];
};

export default function FeaturedStoriesGrid({ items }: FeaturedStoriesGridProps) {
  if (items.length === 0) return null;

  const [lead, ...rest] = items;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold text-[#1F2A44]">Featured Stories</h2>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="lg:row-span-2">
          <NewsCard article={lead} featured />
        </div>
        {rest.map((item) => (
          <NewsCard key={item.id ?? item.slug} article={item} />
        ))}
      </div>
    </section>
  );
}
