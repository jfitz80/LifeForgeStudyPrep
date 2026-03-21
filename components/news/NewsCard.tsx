import Link from 'next/link';
import ArticleDetail from '@/components/news/ArticleDetail';
import { CategoryTag } from '@/components/news/category-system';
import type { NewsArticleView } from '@/components/news/types';

type NewsCardProps = {
  article: NewsArticleView;
  featured?: boolean;
};

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md ${
        featured ? 'h-full' : ''
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <CategoryTag category={article.category} />
        <span>{article.publishedAtLabel}</span>
        <span>•</span>
        <span>{article.source}</span>
      </div>

      <h3 className={`${featured ? 'mt-3 text-2xl' : 'mt-3 text-lg'} font-bold leading-tight text-[#1F2A44]`}>
        <Link href={`/news/${article.slug}`} className="hover:text-[#2FAF9E]">
          {article.title}
        </Link>
      </h3>

      <div className="mt-3">
        <ArticleDetail summary={article.summary} whyThisMatters={article.whyThisMatters} canonicalUrl={article.canonicalUrl} />
      </div>
    </article>
  );
}
