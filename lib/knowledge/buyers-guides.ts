export type BuyersGuide = {
  slug: string;
  title: string;
  summary: string;
  quickAnswer: string;
  explanation: string[];
  pros: string[];
  cons: string[];
  whoItMaySuit: string[];
  watchOutFor: string[];
  keyTradeoffs: string[];
  questionsToAsk: string[];
  relatedArticles: Array<{ title: string; href: string }>;
  disclaimer: string;
  category: 'Basics' | 'Buying Process' | 'Product Comparisons' | 'Access & Eligibility' | 'Life Stage';
};

export const BUYERS_GUIDES: BuyersGuide[] = [
  {
    slug: 'how-does-life-insurance-work',
    title: 'How Does Life Insurance Work?',
    summary: 'A consumer-friendly overview of what life insurance actually does, how premiums support a death benefit, and why product design matters.',
    quickAnswer: 'Life insurance is a contract that pays money to a beneficiary when the insured person dies, as long as the policy is in force and the contract rules are met.',
    explanation: [
      'At a basic level, life insurance is a risk-transfer product. You pay premiums so that a larger amount of money can be available to the people or goals you want to protect if death occurs.',
      'Some policies focus only on temporary protection for a set period. Others are designed to last longer and may include cash value or additional features. The right fit depends on the problem the policy is solving.'
    ],
    pros: ['Can protect family income and shared debts.', 'Can create financial support that would be difficult to build quickly in cash.', 'Can be tailored to short-term or long-term needs.'],
    cons: ['Costs vary based on age, health, and product type.', 'The wrong policy structure can create unnecessary cost or complexity.', 'Coverage only works well if beneficiary designations and ownership are handled correctly.'],
    whoItMaySuit: ['People with dependents or shared financial obligations.', 'Homeowners with debts a surviving household would struggle to carry.', 'Anyone with a real financial problem that would appear after a death.'],
    watchOutFor: ['Do not assume every life insurance policy works the same way.', 'Low initial premium does not always mean better long-term value.', 'Policy features matter less than whether the coverage matches the real need.'],
    keyTradeoffs: ['Lower cost now vs broader long-term guarantees', 'Temporary coverage vs lifelong coverage', 'Simplicity vs added features like cash value or riders'],
    questionsToAsk: ['What financial problem would this policy solve?', 'How long does the need last?', 'Who should receive the benefit?', 'Is the goal protection, estate value, or both?'],
    relatedArticles: [
      { title: 'Who Needs Life Insurance?', href: '/knowledge/life-insurance-basics/who-needs-life-insurance' },
      { title: 'Term vs Permanent Life Insurance', href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance' },
      { title: 'Coverage Calculator', href: '/tools' }
    ],
    disclaimer: 'Educational information only. Product features, pricing, and eligibility vary by insurer and contract.',
    category: 'Basics'
  },
  {
    slug: 'how-to-buy-life-insurance',
    title: 'How To Buy Life Insurance',
    summary: 'A practical guide to the buying process, from identifying the need to choosing a policy and applying.',
    quickAnswer: 'Buying life insurance usually means identifying your coverage need, choosing a product type, applying, and completing any underwriting or policy review steps required.',
    explanation: [
      'The strongest buying process starts with the problem you are trying to solve. For many people that means income replacement, debt protection, or estate support.',
      'After that, the real work is comparing product structure, affordability, insurer requirements, and how long the coverage needs to last. The application process may be simple or medically underwritten depending on the product.'
    ],
    pros: ['A structured process reduces rushed or emotional product decisions.', 'Comparing before buying can reveal simpler, better-fitting options.', 'Understanding the process makes it easier to interpret quotes and policy recommendations.'],
    cons: ['The process can feel slow when medical evidence is required.', 'Some buyers focus too much on price and too little on suitability.', 'Applications can be declined or repriced if underwriting finds more risk than expected.'],
    whoItMaySuit: ['First-time buyers.', 'Career changers or beginners learning product selection.', 'People comparing multiple policy types before committing.'],
    watchOutFor: ['Do not buy before understanding how long you need the coverage.', 'Do not assume no-exam means better value.', 'Do not skip questions about renewability, convertibility, or beneficiary setup.'],
    keyTradeoffs: ['Speed of approval vs deeper underwriting', 'Lower premium vs stronger guarantees', 'Shorter-term affordability vs longer-term flexibility'],
    questionsToAsk: ['What type of life insurance is being recommended and why?', 'What happens if I want more coverage later?', 'What would make the premium increase in the future?', 'What would happen if I miss a payment?'],
    relatedArticles: [
      { title: 'How Underwriting Works', href: '/knowledge/policy-mechanics/how-underwriting-works' },
      { title: 'What Is Evidence of Insurability?', href: '/knowledge/policy-mechanics/what-is-evidence-of-insurability' },
      { title: 'Free Practice', href: '/free-practice' }
    ],
    disclaimer: 'Educational information only. Buying steps and underwriting requirements vary by insurer and product.',
    category: 'Buying Process'
  },
  {
    slug: 'term-vs-whole-life-insurance',
    title: 'Term vs Whole Life Insurance',
    summary: 'A plain-language comparison of temporary protection and lifelong coverage with cash value features.',
    quickAnswer: 'Term insurance is usually cheaper and built for a set period, while whole life is built for long-term coverage and may build cash value.',
    explanation: [
      'Term life insurance is often chosen when the need is tied to a time-limited problem such as raising children or covering a mortgage period.',
      'Whole life is a form of permanent insurance. It usually costs more, but it is designed to remain in force for life and can include guaranteed values depending on the contract.'
    ],
    pros: ['Term usually offers more immediate coverage per premium dollar.', 'Whole life can provide longer-term certainty and policy value features.', 'Both can be appropriate depending on the reason for buying.'],
    cons: ['Term can become expensive or expire before long-term needs end.', 'Whole life can be more expensive than many buyers need.', 'Comparisons are often distorted by overselling investment or savings language.'],
    whoItMaySuit: ['Term may suit budget-sensitive families with temporary protection needs.', 'Whole life may suit buyers with permanent obligations, estate goals, or strong preference for lifelong guarantees.'],
    watchOutFor: ['Do not compare only monthly premium without comparing duration and purpose.', 'Do not assume cash value makes whole life automatically better.', 'Do not ignore what happens when term coverage ends.'],
    keyTradeoffs: ['Lower cost now vs higher long-term certainty', 'Temporary protection vs lifelong protection', 'Simple structure vs added policy value features'],
    questionsToAsk: ['How long do I need coverage?', 'What happens when the term ends?', 'Am I paying for permanent features I do not really need?', 'Would convertibility matter later?'],
    relatedArticles: [
      { title: 'Term vs Permanent Life Insurance', href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance' },
      { title: 'What Is Permanent Life Insurance?', href: '/knowledge/life-insurance-basics/what-is-permanent-life-insurance' },
      { title: 'Product Comparisons', href: '/knowledge/product-comparisons' }
    ],
    disclaimer: 'Educational information only. Whole life and other permanent products vary significantly by insurer and contract design.',
    category: 'Product Comparisons'
  },
  {
    slug: 'how-to-compare-life-insurance-quotes',
    title: 'How To Compare Life Insurance Quotes',
    summary: 'A guide to comparing quotes without getting trapped by headline price alone.',
    quickAnswer: 'A good quote comparison looks at policy type, coverage amount, duration, renewal terms, underwriting assumptions, and contract features, not just the cheapest premium.',
    explanation: [
      'Two quotes can look similar while offering very different long-term value. A lower premium may reflect shorter guarantees, fewer conversion options, or different underwriting assumptions.',
      'The practical question is not only “Which quote is cheaper?” but “Which quote solves the need I actually have, with acceptable tradeoffs?”'
    ],
    pros: ['Better comparisons reduce the chance of buying the wrong product.', 'Helps buyers understand what they are paying for.', 'Makes follow-up questions with an advisor or insurer more specific and useful.'],
    cons: ['Quotes can still be hard to compare when products are not equivalent.', 'Some assumptions change after underwriting.', 'Headline numbers can create false confidence if contract details are ignored.'],
    whoItMaySuit: ['Shoppers comparing more than one provider or policy type.', 'Buyers who want clearer criteria before speaking with an advisor.', 'Consumers trying to avoid purely price-driven decisions.'],
    watchOutFor: ['Do not compare term and permanent quotes as if they are interchangeable.', 'Do not ignore whether the quote is fully underwritten, simplified, or no-exam.', 'Do not assume the quoted premium is final until underwriting is complete.'],
    keyTradeoffs: ['Lowest premium vs stronger contractual features', 'Speed and convenience vs more thorough underwriting', 'Short-term affordability vs longer-term renewal risk'],
    questionsToAsk: ['Is this quote for the same policy type and term as the other one?', 'What assumptions could change after underwriting?', 'Does the policy include conversion or guaranteed renewability?', 'What happens after the initial term or rate period?'],
    relatedArticles: [
      { title: 'How To Buy Life Insurance', href: '/knowledge/buyers-guides/how-to-buy-life-insurance' },
      { title: 'No-Exam Life Insurance Explained', href: '/knowledge/buyers-guides/no-exam-life-insurance-explained' },
      { title: 'Coverage Calculator', href: '/tools' }
    ],
    disclaimer: 'Educational information only. Quotes are not all directly comparable, and final terms may change after underwriting review.',
    category: 'Buying Process'
  },
  {
    slug: 'no-exam-life-insurance-explained',
    title: 'No-Exam Life Insurance Explained',
    summary: 'A clear explanation of what no-exam life insurance usually means, where it helps, and what it may cost.',
    quickAnswer: 'No-exam life insurance usually skips the medical exam, but it does not always mean no underwriting, lower cost, or automatic approval.',
    explanation: [
      'No-exam products are often used when speed or convenience matters. Some still ask health questions and use prescription or database checks to assess risk.',
      'The tradeoff is that easier access can come with higher premiums, lower coverage limits, or fewer product choices than traditional full underwriting.'
    ],
    pros: ['Can reduce friction and speed up the application process.', 'Can help buyers who dislike medical exam logistics.', 'Can work well when the coverage need is straightforward and eligibility remains acceptable.'],
    cons: ['May cost more than fully underwritten coverage.', 'Coverage limits may be lower.', 'Some buyers mistake “no exam” for “no questions” or “guaranteed approval.”'],
    whoItMaySuit: ['People who want a faster or simpler application path.', 'Buyers with moderate needs who still qualify under simplified underwriting.', 'Consumers comparing convenience against price efficiency.'],
    watchOutFor: ['No exam does not mean no underwriting.', 'A quick approval path may still produce a higher premium.', 'Guaranteed issue and no-exam are not the same thing.'],
    keyTradeoffs: ['Convenience vs pricing efficiency', 'Faster approval vs more detailed risk assessment', 'Lower friction vs potentially lower coverage flexibility'],
    questionsToAsk: ['What underwriting still happens even without an exam?', 'How does the price compare with a fully underwritten policy?', 'Are there coverage limits or waiting periods?', 'Am I choosing speed over long-term value?'],
    relatedArticles: [
      { title: 'What Is Guaranteed Issue Life Insurance?', href: '/knowledge/life-insurance-basics/what-is-guaranteed-issue-life-insurance' },
      { title: 'How Underwriting Works', href: '/knowledge/policy-mechanics/how-underwriting-works' },
      { title: 'How To Compare Life Insurance Quotes', href: '/knowledge/buyers-guides/how-to-compare-life-insurance-quotes' }
    ],
    disclaimer: 'Educational information only. No-exam products differ widely in underwriting, coverage limits, and pricing.',
    category: 'Access & Eligibility'
  },
  {
    slug: 'life-insurance-for-seniors',
    title: 'Life Insurance for Seniors',
    summary: 'A balanced guide to the most common reasons older buyers consider life insurance and the tradeoffs they face.',
    quickAnswer: 'Life insurance for seniors is often about final expenses, debt, estate goals, or helping survivors with specific financial obligations, but cost and eligibility become more important with age.',
    explanation: [
      'As age rises, life insurance usually becomes more expensive and underwriting becomes more important. That means the best option may not be the same as it would have been years earlier.',
      'For some seniors, the goal is a modest, practical benefit. For others, the conversation is more about estate planning, guaranteed access, or protecting a spouse.'
    ],
    pros: ['Can support final expenses or leave a defined benefit for family.', 'Can still help with estate or liquidity planning in the right situation.', 'Can provide access-focused options when traditional underwriting is difficult.'],
    cons: ['Premiums can be high relative to the benefit.', 'Health history can narrow product options.', 'Some products are easy to buy but offer weaker value.'],
    whoItMaySuit: ['Seniors focused on final expenses or small legacy goals.', 'Buyers with specific estate or debt-related reasons for coverage.', 'People comparing simplified and guaranteed-access options.'],
    watchOutFor: ['Do not buy a large premium obligation that strains retirement cash flow.', 'Do not assume easy-access coverage is automatically the best value.', 'Do not ignore waiting periods, graded benefits, or smaller face amounts.'],
    keyTradeoffs: ['Access vs price efficiency', 'Guaranteed issue vs medically underwritten value', 'Estate goal vs retirement cash-flow pressure'],
    questionsToAsk: ['What exact need am I trying to cover?', 'Can my retirement budget comfortably support this premium?', 'What happens if I die in the first few policy years?', 'Would savings or other planning tools solve the problem more simply?'],
    relatedArticles: [
      { title: 'No-Exam Life Insurance Explained', href: '/knowledge/buyers-guides/no-exam-life-insurance-explained' },
      { title: 'What Is Guaranteed Issue Life Insurance?', href: '/knowledge/life-insurance-basics/what-is-guaranteed-issue-life-insurance' },
      { title: 'How Annuities Work', href: '/knowledge/annuities/how-annuities-work' }
    ],
    disclaimer: 'Educational information only. Senior-oriented products vary widely in underwriting, waiting periods, and value.',
    category: 'Life Stage'
  },
  {
    slug: 'how-much-life-insurance-do-i-need',
    title: 'How Much Life Insurance Do I Need?',
    summary: 'A straightforward guide to estimating coverage based on actual obligations instead of guesswork.',
    quickAnswer: 'A useful starting point is to add up debts, income replacement needs, and major future costs, then subtract available savings and existing coverage.',
    explanation: [
      'There is no perfect universal formula. The amount depends on who relies on your income, what debts would remain, and how much time survivors would need to adjust financially.',
      'The goal is not to chase the biggest number. The goal is to cover the real financial gap that would appear if the insured person died.'
    ],
    pros: ['Focuses the decision on real obligations.', 'Helps avoid both overbuying and underinsuring.', 'Creates a more practical starting point for comparing product options.'],
    cons: ['Estimates can still miss inflation, childcare, or future income changes.', 'A single formula may oversimplify complex family needs.', 'Budget constraints can limit how much coverage is realistic.'],
    whoItMaySuit: ['Families with dependents.', 'Homeowners or borrowers with shared obligations.', 'Consumers trying to translate broad insurance advice into a real number.'],
    watchOutFor: ['Do not rely on generic income multiples alone.', 'Do not ignore existing savings or workplace coverage.', 'Do not choose a policy amount without checking affordability over time.'],
    keyTradeoffs: ['Higher coverage need vs premium affordability', 'Short-term debt coverage vs long-term family support', 'Ideal target vs realistic budget'],
    questionsToAsk: ['What costs would survive me?', 'How many years of income replacement would the household need?', 'What savings or existing coverage already exist?', 'Would a calculator estimate change the product type I should consider?'],
    relatedArticles: [
      { title: 'Coverage Calculator', href: '/tools' },
      { title: 'Who Needs Life Insurance?', href: '/knowledge/life-insurance-basics/who-needs-life-insurance' },
      { title: 'How To Buy Life Insurance', href: '/knowledge/buyers-guides/how-to-buy-life-insurance' }
    ],
    disclaimer: 'Educational information only. Coverage needs depend on personal circumstances, obligations, and affordability.',
    category: 'Basics'
  }
];

export const BUYERS_GUIDE_CATEGORIES = [
  {
    title: 'Start here',
    description: 'Plain-language guides for consumers who want the basics before comparing products or quotes.',
    slugs: ['how-does-life-insurance-work', 'how-much-life-insurance-do-i-need', 'how-to-buy-life-insurance']
  },
  {
    title: 'Comparisons and shopping',
    description: 'Use these guides to compare structures, quote types, and convenience tradeoffs without relying on hype.',
    slugs: ['term-vs-whole-life-insurance', 'how-to-compare-life-insurance-quotes', 'no-exam-life-insurance-explained']
  },
  {
    title: 'Special situations',
    description: 'Guides for age-based or access-based buying decisions where product tradeoffs become more sensitive.',
    slugs: ['life-insurance-for-seniors']
  }
] as const;

export function getBuyersGuide(slug: string) {
  return BUYERS_GUIDES.find((guide) => guide.slug === slug);
}
