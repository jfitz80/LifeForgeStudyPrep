import type { ReactElement } from 'react';
import type { NewsArticleView, NewsCategoryKey, NewsCategoryMeta } from '@/components/news/types';

export const newsCategoryMeta: Record<NewsCategoryKey, NewsCategoryMeta> = {
  'regulation-policy': {
    label: 'Regulation & Policy',
    icon: 'scale',
    badgeClass: 'bg-[#E8EDF7] text-[#1F2A44]',
    accent: '#1F2A44'
  },
  'products-pricing': {
    label: 'Products & Pricing',
    icon: 'document',
    badgeClass: 'bg-[#E6F6F8] text-[#0E8F9A]',
    accent: '#0E8F9A'
  },
  'risk-underwriting': {
    label: 'Risk & Underwriting',
    icon: 'shield',
    badgeClass: 'bg-[#E6F6F3] text-[#1D7C73]',
    accent: '#1D7C73'
  },
  'legal-litigation': {
    label: 'Legal & Litigation',
    icon: 'gavel',
    badgeClass: 'bg-[#E8EEF9] text-[#315B93]',
    accent: '#315B93'
  },
  'industry-trends': {
    label: 'Industry Trends',
    icon: 'graph',
    badgeClass: 'bg-[#EEF1F5] text-[#4A5568]',
    accent: '#4A5568'
  }
};

function Icon({ icon }: { icon: NewsCategoryMeta['icon'] }): ReactElement {
  if (icon === 'scale') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="M7 7l-3 5h6l-3-5z" />
        <path d="M17 7l-3 5h6l-3-5z" />
      </svg>
    );
  }

  if (icon === 'shield') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 5 7v5c0 5 3.5 7.5 7 9 3.5-1.5 7-4 7-9V7z" />
        <path d="m9.5 12.5 1.5 1.5 3.5-3.5" />
      </svg>
    );
  }

  if (icon === 'gavel') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m14 4 6 6" />
        <path d="m5 13 6 6" />
        <path d="m3 21 6-6" />
        <path d="m9 15 8-8" />
      </svg>
    );
  }

  if (icon === 'document') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19h16" />
      <path d="M7 16v-5" />
      <path d="M12 16V8" />
      <path d="M17 16v-3" />
    </svg>
  );
}

export function CategoryTag({ category }: { category: NewsCategoryKey }) {
  const meta = newsCategoryMeta[category];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badgeClass}`}>
      <Icon icon={meta.icon} />
      <span>{meta.label}</span>
    </span>
  );
}

export function classifyNewsCategory(item: Pick<NewsArticleView, 'title' | 'summary' | 'tag'>): NewsCategoryKey {
  const text = `${item.title} ${item.summary} ${item.tag}`.toLowerCase();

  if (/(regulat|policy|compliance|guideline|rule|disclosure|standards)/.test(text)) return 'regulation-policy';
  if (/(premium|pricing|product|term|whole|universal|benefit|coverage|carrier)/.test(text)) return 'products-pricing';
  if (/(underwriting|medical|clinical|risk class|smoker|insurability|mortality)/.test(text)) return 'risk-underwriting';
  if (/(legal|lawsuit|litigation|court|ruling|claim dispute|denied claim|contestability)/.test(text)) {
    return 'legal-litigation';
  }

  return 'industry-trends';
}
