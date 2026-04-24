export const navLinks = [
  { label: 'Knowledge Hub', href: '#knowledge-hub' },
  { label: 'News Digest', href: '#news-digest' },
  { label: 'Industry Insights', href: '#industry-insights' },
  { label: 'Exam Prep', href: '#exam-prep' }
] as const;

export const credibilityItems = [
  {
    title: 'Unbiased Educational Content',
    description: 'Clear, independent explainers focused on practical life insurance decisions.'
  },
  {
    title: 'Plain-Language Explanations',
    description: 'Complex policy and underwriting topics made understandable in minutes.'
  },
  {
    title: 'Industry-Focused News Digest',
    description: 'Regular updates with concise context on regulation, products, and consumer impact.'
  },
  {
    title: 'Useful for Learners and Professionals',
    description: 'Built for consumers, licensing candidates, and insurance professionals.'
  }
] as const;

export const featuredContent = [
  {
    title: 'Life Insurance 101: A Practical Starter Guide',
    description: 'Understand policy structure, beneficiaries, premiums, and how claims actually work.',
    category: 'Beginner Guide',
    href: '#knowledge-hub'
  },
  {
    title: 'Term vs. Permanent: How to Compare Real-World Tradeoffs',
    description: 'A practical framework for comparing costs, duration, flexibility, and long-term value.',
    category: 'Product Explainer',
    href: '#knowledge-hub'
  },
  {
    title: 'What This Week in Life Insurance Means for Households',
    description: 'Quick digest of regulation, pricing, and carrier trends with consumer context.',
    category: 'News Digest',
    href: '#news-digest'
  },
  {
    title: 'Underwriting and Taxation: Key Concepts to Know',
    description: 'A concise look at risk selection, disclosure, and common tax treatment scenarios.',
    category: 'Policy Insight',
    href: '#industry-insights'
  },
  {
    title: 'Exam Prep Corner: Scenario-Based Practice Strategy',
    description: 'Study more efficiently with scenario-first methods designed for licensing exams.',
    category: 'Exam Prep',
    href: '#exam-prep'
  },
  {
    title: 'Carrier Product Shifts and Market Watch',
    description: 'How insurer strategy and product design changes may affect advisors and clients.',
    category: 'Market Watch',
    href: '#industry-insights'
  }
] as const;

export const digestTags = ['Regulation', 'Product Trends', 'Carriers', 'Consumer Impact', 'Market Watch'] as const;

export const digestPreviewItems = [
  {
    id: 'digest-1',
    title: 'Carrier pricing updates continue to reshape term product comparisons',
    summary: 'Several carriers are refining pricing tiers, making side-by-side term comparisons more important for advisors and consumers.',
    publishedAtLabel: 'This week',
    source: 'LifeForge Editorial Digest',
    tag: 'Product Trends'
  },
  {
    id: 'digest-2',
    title: 'Claims communication remains a key consumer pain point',
    summary: 'Clear guidance around grace periods, contestability, and documentation can reduce avoidable confusion at claim time.',
    publishedAtLabel: 'This week',
    source: 'LifeForge Editorial Digest',
    tag: 'Consumer Impact'
  },
  {
    id: 'digest-3',
    title: 'Regulatory watch: disclosure clarity and suitability conversations in focus',
    summary: 'Ongoing regulatory attention highlights the importance of accurate needs analysis and documented recommendation rationale.',
    publishedAtLabel: 'This week',
    source: 'LifeForge Editorial Digest',
    tag: 'Regulation'
  },
  {
    id: 'digest-4',
    title: 'Underwriting modernization: digital intake expands but human review stays critical',
    summary: 'Digital workflows are improving speed, yet nuanced risk assessment still depends on strong advisor case preparation.',
    publishedAtLabel: 'This week',
    source: 'LifeForge Editorial Digest',
    tag: 'Market Watch'
  }
] as const;

export const knowledgeCategories = [
  'Life Insurance Basics',
  'Term vs Whole Life',
  'Universal Life',
  'Riders and Benefits',
  'Taxation',
  'Underwriting',
  'Group Insurance',
  'Estate Planning',
  'Business Insurance',
  'Exam Prep / LLQP'
] as const;

export const industryInsightItems = [
  {
    title: 'How Product Design Is Shifting in a Higher-Rate Environment',
    description: 'A closer look at pricing pressure, guarantees, and client suitability conversations.',
    tag: 'Product Strategy'
  },
  {
    title: 'What Consumer Questions Reveal About Coverage Gaps',
    description: 'Patterns in household concerns and how advisors can improve policy communication.',
    tag: 'Consumer Behavior'
  },
  {
    title: 'Regulatory Developments to Watch This Quarter',
    description: 'A concise tracker of changes that may affect disclosures, sales practices, and servicing.',
    tag: 'Regulation'
  }
] as const;

export const returnValueItems = [
  'Weekly life insurance digest with concise context',
  'Updated industry insights and market implications',
  'Practical explainers that simplify policy decisions',
  'New learning resources added regularly'
] as const;

export const popularTopics = [
  'Contestability Period',
  'Beneficiary Rules',
  'Conversion Options',
  'Policy Loans',
  'Living Benefits',
  'Claim Denial Reasons'
] as const;


export const insuranceFundamentalsHighlights = [
  {
    title: 'Insurable interest is checked when a policy is issued',
    detail:
      'A life policy typically requires insurable interest at issue. After issue, claims are generally determined by contract terms and policy status.',
    relevance: 'This explains why setup quality at application stage matters so much.'
  },
  {
    title: 'Grace periods can prevent avoidable policy lapse',
    detail:
      'Many policies include a grace period after a missed premium where coverage may still continue, subject to policy terms.',
    relevance: 'One of the most practical clauses for families and exam candidates to understand.'
  },
  {
    title: 'Reinstatement may be possible after lapse',
    detail:
      'Some lapsed policies can be reinstated if eligibility conditions are met, which may include evidence and payment requirements.',
    relevance: 'Clients often do not realize lapse does not always mean permanent loss of coverage.'
  },
  {
    title: 'Policy loans and withdrawals affect long-term outcomes',
    detail:
      'Using cash value may reduce policy performance or death benefit depending on product design and repayment behavior.',
    relevance: 'Useful for both consumer planning and scenario-based exam logic.'
  },
  {
    title: 'Underwriting exists to manage adverse selection',
    detail:
      'Insurers classify risk to price coverage fairly and keep pools sustainable when high-risk applicants seek larger protection.',
    relevance: 'Core to understanding premiums, eligibility, and product recommendations.'
  },
  {
    title: 'Beneficiary structure directly affects claim flow',
    detail:
      'Primary and contingent beneficiary setup can significantly change who receives proceeds and how smoothly claims are paid.',
    relevance: 'A simple admin step that has major real-world impact.'
  }
] as const;


export const chapter7SupplementalBenefitsHighlights = [
  {
    code: '7A',
    title: 'Supplemental disability benefits',
    summary:
      'Common riders include waiver of premium, payor waiver, and disability income support. These help protect policy continuity when income is disrupted.',
    whyItMatters:
      'Disability risk can stop premium payments long before mortality risk materializes.'
  },
  {
    code: '7B',
    title: 'Accidental death and AD&D riders',
    summary:
      'These riders can increase payout for defined accidental outcomes, but usually include exclusions and strict definitions.',
    whyItMatters:
      'Clients often assume broad coverage, but wording and exclusions drive real claim outcomes.'
  },
  {
    code: '7C',
    title: 'Accelerated death benefit riders',
    summary:
      'Terminal illness, severe illness, or long-term-care-style accelerations may allow early access to part of the death benefit while living.',
    whyItMatters:
      'Living benefit design affects liquidity, care planning, and eventual death-benefit amounts.'
  },
  {
    code: '7D',
    title: 'Riders for additional insureds',
    summary:
      'Spouse, child, or second-insured riders can extend coverage beyond one life under a single policy framework.',
    whyItMatters:
      'Useful for family-level protection planning and cost-efficient coverage layering.'
  },
  {
    code: '7E',
    title: 'Insurability riders',
    summary:
      'Guaranteed insurability and paid-up additions options can allow additional coverage purchases later without new evidence in certain windows.',
    whyItMatters:
      'Future insurability can matter as much as current premiums for long-term planning.'
  }
] as const;
