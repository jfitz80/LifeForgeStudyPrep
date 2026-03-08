export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  publishedAtLabel: string;
  source: string;
  tag: 'Regulation' | 'Product Trends' | 'Carriers' | 'Consumer Impact' | 'Market Watch';
  whatItMeans: string;
  llqpAngle: string;
  keyPoints: string[];
};

export const newsItems: NewsItem[] = [
  {
    slug: 'carrier-pricing-updates-term-comparisons',
    title: 'Carrier pricing updates continue to reshape term product comparisons',
    summary:
      'Several carriers are refining pricing tiers, making side-by-side term comparisons more important for advisors and consumers.',
    publishedAtLabel: 'March 8, 2026',
    source: 'LifeForge Editorial Digest',
    tag: 'Product Trends',
    whatItMeans:
      'Small pricing changes can materially affect recommendation outcomes when clients compare coverage amount, term length, and flexibility.',
    llqpAngle:
      'Review product suitability and recommendation rationale when two policies appear similar at first glance but differ in long-term value.',
    keyPoints: [
      'Premium tiers can shift quickly across carriers and age bands.',
      'Total value depends on policy details, not headline premium alone.',
      'Clear comparison notes improve client confidence and exam-case reasoning.'
    ]
  },
  {
    slug: 'claims-communication-consumer-pain-point',
    title: 'Claims communication remains a key consumer pain point',
    summary:
      'Clear guidance around grace periods, contestability, and documentation can reduce avoidable confusion at claim time.',
    publishedAtLabel: 'March 7, 2026',
    source: 'LifeForge Editorial Digest',
    tag: 'Consumer Impact',
    whatItMeans:
      'Policyholders and beneficiaries often need plain-language support to understand timelines, required documents, and claim status updates.',
    llqpAngle:
      'Practice explaining claims process steps clearly, especially grace period outcomes and documentation expectations in scenario questions.',
    keyPoints: [
      'Early explanation of claims timelines prevents misunderstandings.',
      'Beneficiary communication quality directly affects client experience.',
      'Documentation clarity is a common exam and real-world theme.'
    ]
  },
  {
    slug: 'regulatory-disclosure-suitability-focus',
    title: 'Regulatory watch: disclosure clarity and suitability conversations in focus',
    summary:
      'Ongoing regulatory attention highlights the importance of accurate needs analysis and documented recommendation rationale.',
    publishedAtLabel: 'March 6, 2026',
    source: 'LifeForge Editorial Digest',
    tag: 'Regulation',
    whatItMeans:
      'Advisors who document needs analysis and disclosure discussions thoroughly reduce compliance risk and strengthen client trust.',
    llqpAngle:
      'Expect scenario prompts that test suitability analysis, documentation standards, and balanced product explanation.',
    keyPoints: [
      'Needs analysis remains central to compliant recommendations.',
      'Documentation quality is part of professional risk management.',
      'Disclosure conversations should be specific and understandable.'
    ]
  },
  {
    slug: 'underwriting-modernization-human-review-critical',
    title: 'Underwriting modernization: digital intake expands but human review stays critical',
    summary:
      'Digital workflows are improving speed, yet nuanced risk assessment still depends on strong advisor case preparation.',
    publishedAtLabel: 'March 5, 2026',
    source: 'LifeForge Editorial Digest',
    tag: 'Market Watch',
    whatItMeans:
      'Automation can improve intake efficiency, but advisor-provided context remains essential for complex risk profiles and policy decisions.',
    llqpAngle:
      'Reinforce underwriting fundamentals and how applicant disclosure quality affects decisions and timelines.',
    keyPoints: [
      'Digital intake improves processing speed for straightforward cases.',
      'Complex files still require thoughtful human review.',
      'Accurate disclosures reduce delays and reversals.'
    ]
  }
];

export function getNewsBySlug(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}
