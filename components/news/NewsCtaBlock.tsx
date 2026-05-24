import Link from 'next/link';
import type { NewsArticleView } from '@/components/news/types';

type NewsCta = {
  heading: string;
  subheading: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

const llqpKeywords = /(llqp|licen|license|exam|regulat|compliance|disclosure)/i;
const educationKeywords = /(education|consumer|planning|coverage|policyholder)/i;

export function selectNewsCta(article: NewsArticleView): NewsCta {
  const text = `${article.title} ${article.summary} ${article.whyThisMatters} ${article.tag}`.toLowerCase();
  const isRegulatory = article.category === 'regulation-policy' || llqpKeywords.test(text);
  if (isRegulatory) {
    return {
      heading: 'Studying life insurance? Test the concept.',
      subheading: 'Reading the article helps. Practice shows whether you can apply the concept under exam-style pressure.',
      primary: { label: 'Try 15 Free Questions', href: '/free-practice' },
      secondary: { label: 'Download Free App', href: '/app' }
    };
  }

  const productCategories: NewsArticleView['category'][] = ['products-pricing', 'risk-underwriting', 'legal-litigation'];
  if (productCategories.includes(article.category) || /product|underwriting|claims|health|risk/.test(text)) {
    return {
      heading: 'Explore the concepts behind this story',
      subheading: 'Learn how this topic connects to products, underwriting, and suitability.',
      primary: { label: 'Start Learning', href: '/knowledge' },
      secondary: { label: 'Read related guide', href: '/knowledge' }
    };
  }

  if (article.category === 'industry-trends' || educationKeywords.test(text)) {
    return {
      heading: 'Want to understand this topic better?',
      subheading: 'Build practical life insurance knowledge with guides and examples.',
      primary: { label: 'Try 15 Free Questions', href: '/free-practice' },
      secondary: { label: 'Download Free App', href: '/app' }
    };
  }

  return {
    heading: 'See how this connects to coverage decisions',
    subheading: 'Learn how this topic connects to products, underwriting, and suitability.',
    primary: { label: 'Try 15 Free Questions', href: '/free-practice' },
    secondary: { label: 'Download Free App', href: '/app' }
  };
}

export default function NewsCtaBlock({ article, compact = false }: { article: NewsArticleView; compact?: boolean }) {
  const cta = selectNewsCta(article);
  return (
    <div className={`rounded-xl border border-[#CFEAE4] bg-[#F1FBF8] ${compact ? 'p-4' : 'p-5'}`}>
      <h4 className="text-sm font-bold text-[#1F2A44]">{cta.heading}</h4>
      <p className="mt-1 text-sm text-[#3F4D62]">{cta.subheading}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={cta.primary.href}
          data-cta={cta.primary.label.includes('15') ? 'try-free-practice' : 'knowledge-guide'}
          data-location="news-cta"
          data-campaign="freemium-funnel"
          className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#26988a]"
        >
          {cta.primary.label}
        </Link>
        {cta.secondary ? (
          <Link
            href={cta.secondary.href}
            data-cta={cta.secondary.label.includes('Download') ? 'download-free-app' : 'try-free-practice'}
            data-location="news-cta"
            data-campaign="freemium-funnel"
            className="inline-flex items-center rounded-lg border border-[#8FA3B9] bg-white px-3.5 py-2 text-xs font-semibold text-[#1F2A44] transition hover:bg-slate-50"
          >
            {cta.secondary.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
