import Link from 'next/link';

type NewsCardProps = {
  article: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    publishedAt: Date;
    source: { name: string };
    canonicalUrl: string;
    isFeatured: boolean;
  };
};

function formatDate(date: Date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {article.isFeatured && (
        <p className="mb-2 inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-900">Featured story</p>
      )}

      <Link href={`/news/${article.slug}`} className="block rounded-md focus-visible:ring-2 focus-visible:ring-brand-600">
        <h3 className="text-lg font-bold text-slate-900 hover:text-brand-700">{article.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{article.summary}</p>
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
        <span>{formatDate(article.publishedAt)}</span>
        <span>Source: {article.source.name}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <Link href={`/news/${article.slug}`} className="inline-flex text-xs font-semibold text-slate-900 underline hover:text-brand-700">
          Read analysis
        </Link>
        <a
          href={article.canonicalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-xs font-semibold text-brand-700 hover:text-brand-900"
        >
          Read original source
        </a>
      </div>
    </article>
  );
}
