export type KnowledgePreviewCard = {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
};

export type AdvisorScenarioSeed = {
  slug: string;
  title: string;
  clientProfile: string;
  needs: string;
  budgetContext: string;
  productOptions: string[];
  advisorQuestions: string[];
  bestFit: string;
  whyNotOthers: string;
  takeaway: string;
  recommendedProduct: string;
  primaryObjective: string;
  priority: 'affordability' | 'permanence' | 'guaranteed acceptance' | 'estate planning' | 'simplicity';
};

export type ToolTeaser = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

export type ComparisonGuideSeed = {
  title: string;
  description: string;
  href: string;
};

export const KNOWLEDGE_PREVIEW_CARDS: KnowledgePreviewCard[] = [
  {
    eyebrow: 'Basics',
    title: 'Term Life Insurance',
    description: 'Understand when temporary coverage fits income protection and debt timelines.',
    href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance'
  },
  {
    eyebrow: 'Access & Eligibility',
    title: 'Guaranteed Issue Life Insurance',
    description: 'See where simplified or guaranteed access products fit and what tradeoffs they bring.',
    href: '/knowledge/life-insurance-basics/what-is-guaranteed-issue-life-insurance'
  },
  {
    eyebrow: 'Long-Term Coverage',
    title: 'Permanent Life Insurance',
    description: 'Learn how permanent coverage, cash value, and estate objectives work together.',
    href: '/knowledge/life-insurance-basics/what-is-permanent-life-insurance'
  },
  {
    eyebrow: 'Retirement Income',
    title: 'Annuities Basics',
    description: 'Get a plain-language view of annuities, payout structures, and retirement-income fit.',
    href: '/knowledge/annuities'
  }
];

export const TOOL_TEASERS: ToolTeaser[] = [
  {
    title: 'Coverage Calculator',
    description: 'Estimate a practical protection range using income, debt, dependents, and savings.',
    href: '/tools'
  },
  {
    title: 'Term vs Permanent Comparison',
    description: 'See which product direction fits lower cost now, lifelong coverage, or estate goals.',
    href: '/knowledge/product-comparisons'
  },
  {
    title: 'Needs Analysis Tool',
    description: 'Walk through household obligations and planning goals the way an advisor would.',
    href: '/tools',
    badge: 'Planned'
  },
  {
    title: 'Premium Estimator',
    description: 'Preview educational premium ranges with clear disclaimers before speaking to a provider.',
    href: '/tools',
    badge: 'Beta'
  }
];

export const ADVISOR_SCENARIOS: AdvisorScenarioSeed[] = [
  {
    slug: 'young-family-mortgage',
    title: 'Young family with mortgage',
    clientProfile: 'Two working parents with two children, a new mortgage, and moderate emergency savings.',
    needs: 'Income replacement, debt protection, and coverage that fits a growing family budget.',
    budgetContext: 'Budget is tight now, but long-term protection matters.',
    productOptions: ['20-year term', '30-year term', 'Permanent insurance', 'Guaranteed issue'],
    advisorQuestions: ['How long does the mortgage need protection?', 'What happens if one income disappears?', 'Is future convertibility important?'],
    bestFit: 'Term coverage usually leads because it matches temporary high-liability years at a manageable cost.',
    whyNotOthers: 'Permanent coverage may be stronger for estate or lifelong goals, but it can strain affordability in this scenario.',
    takeaway: 'Start with the household risk first, then layer features only if the budget still supports them.',
    recommendedProduct: '20-year term',
    primaryObjective: 'Protect family income and debt obligations during child-rearing and mortgage years.',
    priority: 'affordability'
  },
  {
    slug: 'single-professional-no-dependents',
    title: 'Single professional with no dependents',
    clientProfile: 'High-earning professional, no children, some debt, and rising savings.',
    needs: 'Debt cleanup, future insurability planning, and flexibility as life circumstances change.',
    budgetContext: 'Can afford more premium than a protection-only buyer, but values simplicity.',
    productOptions: ['Shorter term policy', 'Convertible term', 'Permanent insurance', 'No coverage yet'],
    advisorQuestions: ['Who would be affected by outstanding debt?', 'Are future family or business obligations likely?', 'Does the client want long-term guarantees or low-cost flexibility?'],
    bestFit: 'Convertible term often makes sense when current need is limited but future insurability matters.',
    whyNotOthers: 'Permanent coverage may be premature if the objective is still uncertain and affordability discipline matters.',
    takeaway: 'Advisors should not oversell coverage where immediate financial dependency is low, but they should still think ahead.',
    recommendedProduct: 'Convertible term',
    primaryObjective: 'Preserve future options while covering debt and protecting insurability.',
    priority: 'simplicity'
  },
  {
    slug: 'older-applicant-health-issues',
    title: 'Older applicant with health issues',
    clientProfile: 'Near-retiree with a recent health event, limited coverage, and concern about final expenses.',
    needs: 'Accessible coverage, realistic underwriting expectations, and clarity on guaranteed versus underwritten products.',
    budgetContext: 'Budget is limited and certainty matters more than optimization.',
    productOptions: ['Simplified issue', 'Guaranteed issue', 'Traditional underwritten policy', 'Small permanent policy'],
    advisorQuestions: ['What conditions affect insurability?', 'Is the client seeking estate value or just final-expense support?', 'What waiting periods or limitations apply?'],
    bestFit: 'Simplified or guaranteed access products may be more realistic if full underwriting is unlikely to succeed.',
    whyNotOthers: 'Traditional coverage may not be available or may be priced well beyond the client’s comfort level.',
    takeaway: 'Good advisor thinking means matching recommendation quality to access realities, not idealized product theory.',
    recommendedProduct: 'Guaranteed issue',
    primaryObjective: 'Secure accessible final-expense support when underwriting flexibility is limited.',
    priority: 'guaranteed acceptance'
  },
  {
    slug: 'business-owner-key-person',
    title: 'Business owner needing key person protection',
    clientProfile: 'Founder-led company with lender pressure, concentrated revenue relationships, and a small leadership bench.',
    needs: 'Business continuity, cash flow support, and lender reassurance if the key person dies.',
    budgetContext: 'Company can support premium if the policy clearly protects operations and borrowing capacity.',
    productOptions: ['Key person term insurance', 'Permanent insurance', 'Buy-sell funding only', 'No business coverage'],
    advisorQuestions: ['What financial loss would the business face immediately?', 'Who should own the policy and receive proceeds?', 'Is this about temporary continuity risk or long-term succession planning?'],
    bestFit: 'Key person term insurance often fits when the main objective is protecting revenue and lender confidence during a vulnerable growth period.',
    whyNotOthers: 'Permanent insurance may fit succession or estate goals later, but term usually aligns better with immediate business continuity exposure.',
    takeaway: 'Separate business continuity protection from owner legacy planning before recommending a structure.',
    recommendedProduct: 'Key person term insurance',
    primaryObjective: 'Protect business continuity and lender confidence if the core revenue driver dies.',
    priority: 'simplicity'
  },
  {
    slug: 'final-expense-limited-budget',
    title: 'Final expense and limited budget case',
    clientProfile: 'Older client with modest savings, strong desire to avoid burdening family, and strict monthly budget limits.',
    needs: 'Small face amount, simple qualification process, and confidence that some benefit will be available.',
    budgetContext: 'Client needs a manageable premium and values certainty more than optimization.',
    productOptions: ['Simplified issue final expense', 'Guaranteed issue', 'Large underwritten permanent policy', 'Short-term accidental policy'],
    advisorQuestions: ['How much support is actually needed?', 'Can the client answer health questions?', 'Does the client understand waiting periods and benefit limitations?'],
    bestFit: 'Simplified issue final-expense coverage may be the best educational direction when the client can still qualify and wants a manageable premium.',
    whyNotOthers: 'Guaranteed issue can still fit, but it often gives up value when the client could have qualified for a stronger simplified product.',
    takeaway: 'Budget cases require disciplined scope: cover the most realistic need first and explain tradeoffs clearly.',
    recommendedProduct: 'Simplified issue final expense',
    primaryObjective: 'Provide a modest, realistic death benefit without overextending the client budget.',
    priority: 'affordability'
  }
];

export const COMPARISON_GUIDES: ComparisonGuideSeed[] = [
  {
    title: 'Term vs Permanent Life Insurance',
    description: 'Compare duration, affordability, cash value, and flexibility before recommending coverage.',
    href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance'
  },
  {
    title: 'Fixed vs Variable Annuities',
    description: 'Understand predictability, market exposure, and where each annuity structure may fit.',
    href: '/knowledge/annuities'
  },
  {
    title: 'Guaranteed Issue vs Underwritten Coverage',
    description: 'Learn when accessibility matters more than price efficiency and why those tradeoffs matter.',
    href: '/knowledge/life-insurance-basics/what-is-guaranteed-issue-life-insurance'
  }
];

export const ADVISOR_GUIDANCE_LINKS: ComparisonGuideSeed[] = [
  {
    title: 'Questions a New Advisor Should Ask a Client',
    description: 'Use a simple discovery framework before talking about product type or premium.',
    href: '/knowledge/llqp-exam-prep/questions-a-new-advisor-should-ask-a-client'
  },
  {
    title: 'How Underwriting Works',
    description: 'Understand how health, risk, and disclosure affect what the client can actually buy.',
    href: '/knowledge/policy-mechanics/how-underwriting-works'
  },
  {
    title: 'What Is Evidence of Insurability?',
    description: 'Learn when extra proof is required and why that changes timing and recommendation strategy.',
    href: '/knowledge/policy-mechanics/what-is-evidence-of-insurability'
  },
  {
    title: 'Retirement Income Planning',
    description: 'See how guaranteed income, spending needs, and product fit work together in retirement.',
    href: '/knowledge/advisor-guidance/retirement-income-planning'
  },
  {
    title: 'Risk Management',
    description: 'Review how longevity, liquidity, and family protection risks shape recommendations.',
    href: '/knowledge/advisor-guidance/risk-management'
  }
];
