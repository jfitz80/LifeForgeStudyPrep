export type NewsCategoryKey =
  | 'regulation-policy'
  | 'products-pricing'
  | 'risk-underwriting'
  | 'legal-litigation'
  | 'industry-trends';

export type NewsCategoryMeta = {
  label: string;
  icon: 'scale' | 'document' | 'shield' | 'gavel' | 'graph';
  badgeClass: string;
  accent: string;
};

export type NewsArticleView = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  whyThisMatters: string;
  publishedAtLabel: string;
  source: string;
  tag: string;
  canonicalUrl?: string | null;
  category: NewsCategoryKey;
};
