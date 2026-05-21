import StudyCTA from '@/components/StudyCTA';
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
      secondary: { label: 'Explore Full Practice', href: '/exam-prep' }
    };
  }

  const productCategories: NewsArticleView['category'][] = ['products-pricing', 'risk-underwriting', 'legal-litigation'];
  if (productCategories.includes(article.category) || /product|underwriting|claims|health|risk/.test(text)) {
    return {
      heading: 'Studying life insurance? Test the concept.',
      subheading: 'Reading the article helps. Practice shows whether you can apply the concept under exam-style pressure.',
      primary: { label: 'Try 15 Free Questions', href: '/free-practice' },
      secondary: { label: 'Explore Full Practice', href: '/exam-prep' }
    };
  }

  if (article.category === 'industry-trends' || educationKeywords.test(text)) {
    return {
      heading: 'Studying life insurance? Test the concept.',
      subheading: 'Reading the article helps. Practice shows whether you can apply the concept under exam-style pressure.',
      primary: { label: 'Try 15 Free Questions', href: '/free-practice' },
      secondary: { label: 'Explore Full Practice', href: '/exam-prep' }
    };
  }

  return {
    heading: 'Studying life insurance? Test the concept.',
    subheading: 'Reading the article helps. Practice shows whether you can apply the concept under exam-style pressure.',
    primary: { label: 'Try 15 Free Questions', href: '/free-practice' },
    secondary: { label: 'Explore Full Practice', href: '/exam-prep' }
  };
}

export default function NewsCtaBlock({ article, compact = false }: { article: NewsArticleView; compact?: boolean }) {
  const cta = selectNewsCta(article);
  return (
    <StudyCTA
      title={cta.heading}
      body={cta.subheading}
      primaryLabel={cta.primary.label}
      primaryHref={cta.primary.href}
      secondaryLabel={cta.secondary?.label}
      secondaryHref={cta.secondary?.href}
      location={compact ? 'news-article-compact' : 'news-article'}
      campaign="exam-trap"
    />
  );
}
