import Link from 'next/link';
import type { NewsArticleView } from '@/components/news/types';

type ArticleDetailProps = {
  article: NewsArticleView;
};

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const { summary, whyThisMatters, marketDeskView, canonicalUrl } = article;

  return (
    <div>
      <p className="text-sm leading-7 text-slate-600">{summary}</p>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#1F2A44]">Market Desk view</p>
        <p className="mt-2 text-sm leading-7 text-slate-700">{marketDeskView ?? whyThisMatters}</p>
      </div>

      {canonicalUrl ? (
        <div className="mt-3">
          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#2FAF9E] transition hover:text-[#1F2A44]"
          >
            Source link
          </a>
        </div>
      ) : null}

      <div className="mt-4">
        <Link href={`/news/${article.slug}`} className="text-sm font-semibold text-[#2FAF9E] transition hover:text-[#1F2A44]">
          Read Commentary
        </Link>
      </div>
    </div>
  );
}
