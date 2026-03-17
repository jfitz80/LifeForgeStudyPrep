import type { KnowledgeClusterSlug } from '@/lib/knowledge/content';

export default function ClusterIcon({ slug }: { slug: KnowledgeClusterSlug }) {
  if (slug === 'life-insurance-basics') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M5 12h14" />
      </svg>
    );
  }

  if (slug === 'policy-mechanics') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    );
  }

  if (slug === 'taxation') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16" />
        <path d="M7 11h10" />
        <path d="M9 15h6" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }

  if (slug === 'advanced-concepts') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4 7v6c0 4.2 2.5 6.7 8 8 5.5-1.3 8-3.8 8-8V7z" />
        <path d="M9.5 12.5 11.5 14.5 15 11" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16" />
      <path d="M4 12h16" />
      <path d="M4 19h10" />
      <circle cx="18" cy="19" r="2" />
    </svg>
  );
}
