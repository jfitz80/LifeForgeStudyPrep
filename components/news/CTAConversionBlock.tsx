import Link from 'next/link';

type CTAConversionBlockProps = {
  compact?: boolean;
};

export default function CTAConversionBlock({ compact = false }: CTAConversionBlockProps) {
  return (
    <div className={`rounded-xl border border-[#CFEAE4] bg-[#F1FBF8] ${compact ? 'p-4' : 'p-5'}`}>
      <h4 className="text-sm font-bold text-[#1F2A44]">Studying life insurance? Test the concept.</h4>
      <p className="mt-1 text-sm text-[#3F4D62]">Reading the article helps. Practice shows whether you can apply the concept under exam-style pressure.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href="/free-practice"
          data-cta="try-free-practice"
          data-location="news-article-cta"
          data-campaign="freemium-funnel"
          className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#26988a]"
        >
          Try 15 Free Questions
        </Link>
        <Link
          href="/app"
          data-cta="download-free-app"
          data-location="news-article-cta"
          data-campaign="freemium-funnel"
          className="inline-flex items-center rounded-lg border border-[#8FA3B9] bg-white px-3.5 py-2 text-xs font-semibold text-[#1F2A44] transition hover:bg-slate-50"
        >
          Download Free App
        </Link>
      </div>
    </div>
  );
}
