import CTAConversionBlock from '@/components/news/CTAConversionBlock';

type ArticleDetailProps = {
  summary: string;
  whyThisMatters: string;
  canonicalUrl?: string | null;
};

export default function ArticleDetail({ summary, whyThisMatters, canonicalUrl }: ArticleDetailProps) {
  return (
    <div>
      <p className="text-sm leading-7 text-slate-600">{summary}</p>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#1F2A44]">Why This Matters</p>
        <p className="mt-2 text-sm leading-7 text-slate-700">{whyThisMatters}</p>
      </div>

      {canonicalUrl ? (
        <div className="mt-3">
          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#2FAF9E] transition hover:text-[#1F2A44]"
          >
            Read full story
          </a>
        </div>
      ) : null}

      <div className="mt-4">
        <CTAConversionBlock compact />
      </div>
    </div>
  );
}
