import type { ReactElement } from 'react';

export type NewsCategoryKey =
  | 'law-regulation'
  | 'claims-litigation'
  | 'clinical-underwriting'
  | 'future-risk'
  | 'industry-market'
  | 'consumer-planning'
  | 'product-innovation';

export type NewsCategoryMeta = {
  label: string;
  accent: string;
  badgeClass: string;
  panelClass: string;
};

export type CategoryInput = {
  title: string;
  summary: string;
  tag: string;
};

export const newsCategoryMeta: Record<NewsCategoryKey, NewsCategoryMeta> = {
  'law-regulation': {
    label: 'Law & Regulation',
    accent: '#1F2A44',
    badgeClass: 'bg-[#E8EDF7] text-[#1F2A44]',
    panelClass: 'from-[#EFF3FA] to-white border-[#D7DFEE]'
  },
  'claims-litigation': {
    label: 'Claims & Litigation',
    accent: '#315B93',
    badgeClass: 'bg-[#E8EEF9] text-[#315B93]',
    panelClass: 'from-[#EEF3FB] to-white border-[#D5E1F5]'
  },
  'clinical-underwriting': {
    label: 'Clinical & Underwriting',
    accent: '#1D7C73',
    badgeClass: 'bg-[#E6F6F3] text-[#1D7C73]',
    panelClass: 'from-[#EAF8F4] to-white border-[#CAEBDD]'
  },
  'future-risk': {
    label: 'Future Risk',
    accent: '#4A5568',
    badgeClass: 'bg-[#EEF1F5] text-[#4A5568]',
    panelClass: 'from-[#F2F5F8] to-white border-[#DFE5EC]'
  },
  'industry-market': {
    label: 'Industry & Market',
    accent: '#24334E',
    badgeClass: 'bg-[#EAF0F8] text-[#24334E]',
    panelClass: 'from-[#EDF2F8] to-white border-[#DCE5F0]'
  },
  'consumer-planning': {
    label: 'Consumer & Planning',
    accent: '#2FAF9E',
    badgeClass: 'bg-[#E6F7F4] text-[#1E887B]',
    panelClass: 'from-[#EBFAF6] to-white border-[#D0EFE8]'
  },
  'product-innovation': {
    label: 'Product Innovation',
    accent: '#0E8F9A',
    badgeClass: 'bg-[#E6F6F8] text-[#0E8F9A]',
    panelClass: 'from-[#EAF8FA] to-white border-[#CFEAF0]'
  }
};

function CategoryIcon({ category }: { category: NewsCategoryKey }): ReactElement {
  if (category === 'law-regulation') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="M7 7l-3 5h6l-3-5z" />
        <path d="M17 7l-3 5h6l-3-5z" />
      </svg>
    );
  }

  if (category === 'claims-litigation') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 4h9v16H6V7z" />
        <path d="M9 4v3H6" />
        <path d="M9 11h6" />
        <path d="M9 15h4" />
      </svg>
    );
  }

  if (category === 'clinical-underwriting') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v16" />
        <path d="M4 12h16" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }

  if (category === 'future-risk') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 4v5c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V7z" />
        <path d="M9.5 12.5l1.5 1.5 3.5-3.5" />
      </svg>
    );
  }

  if (category === 'industry-market') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19h16" />
        <path d="M6 16v-5" />
        <path d="M11 16V8" />
        <path d="M16 16v-3" />
      </svg>
    );
  }

  if (category === 'consumer-planning') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.9 4.9l2.8 2.8" />
      <path d="M16.3 16.3l2.8 2.8" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export function NewsCategoryVisual({ category }: { category: NewsCategoryKey }) {
  const meta = newsCategoryMeta[category];

  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-gradient-to-br p-4 ${meta.panelClass}`}
      style={{ borderColor: `${meta.accent}33` }}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: meta.accent }}>
        <CategoryIcon category={category} />
      </div>
      <p className="text-sm font-semibold" style={{ color: meta.accent }}>
        {meta.label}
      </p>
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-20 w-20 rounded-full opacity-20" style={{ backgroundColor: meta.accent }} />
    </div>
  );
}

export function classifyNewsCategory(item: CategoryInput): NewsCategoryKey {
  const text = `${item.title} ${item.summary} ${item.tag}`.toLowerCase();

  if (/(regulat|law|legislation|compliance|court|ruling|legal)/.test(text)) return 'law-regulation';
  if (/(claim|litigation|lawsuit|settle|beneficiar|payout|contestability)/.test(text)) return 'claims-litigation';
  if (/(underwriting|clinical|medical|health|mortality|risk class)/.test(text)) return 'clinical-underwriting';
  if (/(catastrophe|climate|cyber|emerging risk|future risk|volatility)/.test(text)) return 'future-risk';
  if (/(consumer|family|planning|advisor|retire|coverage amount|personal finance)/.test(text)) return 'consumer-planning';
  if (/(insurtech|innovation|ai|automation|digital|new product|launch)/.test(text)) return 'product-innovation';

  return 'industry-market';
}
