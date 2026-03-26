import Link from 'next/link';
import { CategoryTag } from '@/components/news/category-system';
import type { NewsCategoryKey } from '@/components/news/types';

type HomeNewsItem = {
  slug: string;
  title: string;
  summary: string;
  publishedAtLabel: string;
  category: NewsCategoryKey;
  imageUrl?: string | null;
};

type HomeNewsReelProps = {
  items: HomeNewsItem[];
};

export default function HomeNewsReel({ items }: HomeNewsReelProps) {
  if (items.length === 0) return null;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="latest-life-insurance-news">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="latest-life-insurance-news" className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">
              Latest in Life Insurance
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
              Stay up to date with trends, product changes, regulation, and consumer-focused developments shaping the industry.
            </p>
          </div>

          <Link href="/news" className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
            View All News
          </Link>
        </div>

        <div className="-mx-2 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {items.map((item) => (
            <article
              key={item.slug}
              className="min-w-[290px] snap-start rounded-xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-sm md:min-w-0"
            >
              {item.imageUrl ? (
                <div className="mb-3 overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-32 w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <CategoryTag category={item.category} />
                <span>{item.publishedAtLabel}</span>
              </div>

              <h3 className="mt-3 text-lg font-bold leading-tight text-[#1F2A44]">
                <Link href={`/news/${item.slug}`} className="hover:text-[#2FAF9E]">
                  {item.title}
                </Link>
              </h3>

              <p className="mt-2 text-sm leading-7 text-[#4A5568]">{item.summary}</p>

              <Link href={`/news/${item.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
                Read more
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
