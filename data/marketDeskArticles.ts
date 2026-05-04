export type MarketDeskArticle = {
  slug: string;
  title: string;
  subtitle: string;
  category:
    | 'Market Trends'
    | 'Annuities'
    | 'Regulation'
    | 'Consumer Protection'
    | 'Claims'
    | 'Underwriting'
    | 'Exam Insight';
  date: string;
  readingTime: string;
  summary: string;
  author: 'LifeForge Market Desk';
  heroLabel?: string;
  content: Array<{
    type: 'paragraph' | 'heading' | 'callout' | 'bulletList';
    text?: string;
    items?: string[];
  }>;
  relatedSlugs?: string[];
};

export const marketDeskDisclaimer =
  'This article is for educational purposes only and does not provide insurance, legal, tax, or financial advice. LifeForge Prep does not sell insurance products. Readers should speak with a licensed insurance professional before making product decisions.';

export const marketDeskArticles: MarketDeskArticle[] = [
  {
    slug: 'why-life-insurance-feels-more-relevant-in-an-uncertain-market',
    title: 'Why Life Insurance Feels More Relevant in an Uncertain Market',
    subtitle:
      'Market volatility can make protection planning feel less abstract and more practical for families, business owners, and new advisors.',
    category: 'Market Trends',
    date: 'May 3, 2026',
    readingTime: '4 min read',
    summary:
      'A plain-language look at why life insurance conversations often become more important when households feel financial uncertainty.',
    author: 'LifeForge Market Desk',
    heroLabel: 'Market snapshot',
    content: [
      {
        type: 'paragraph',
        text:
          'Uncertain markets tend to push people back toward first principles. Before they think about advanced planning, many households want to know whether income, debt, dependants, and final expenses are protected if something goes wrong.'
      },
      {
        type: 'paragraph',
        text:
          'That does not mean every person needs the same type or amount of insurance. It means the protection conversation often becomes easier to understand when market conditions remind people that risk is not theoretical.'
      },
      { type: 'heading', text: 'Protection is different from prediction' },
      {
        type: 'paragraph',
        text:
          'Life insurance is not a tool for predicting interest rates, equity returns, or inflation. Its core purpose is risk transfer. The policyholder pays a premium so a defined benefit may be available if the insured person dies while coverage is in force.'
      },
      {
        type: 'callout',
        text:
          'For exam learners, this is a useful distinction: protection planning starts with needs, risk, beneficiaries, policy structure, and suitability.'
      },
      {
        type: 'bulletList',
        items: [
          'Income replacement can matter more when household budgets are already under pressure.',
          'Debt coverage may become a clearer priority when borrowing costs are high.',
          'Policy conversations should stay grounded in documented needs, affordability, and client understanding.'
        ]
      }
    ],
    relatedSlugs: [
      'annuities-explained-guaranteed-income-back-in-conversation',
      'what-new-advisors-should-understand-about-consumer-trust'
    ]
  },
  {
    slug: 'annuities-explained-guaranteed-income-back-in-conversation',
    title: 'Annuities Explained: Why Guaranteed Income Is Back in the Conversation',
    subtitle:
      'Higher attention on retirement income has renewed interest in how annuities work, what they can solve, and what trade-offs they may involve.',
    category: 'Annuities',
    date: 'May 2, 2026',
    readingTime: '5 min read',
    summary:
      'An educational overview of annuity basics and why guaranteed income keeps appearing in retirement planning discussions.',
    author: 'LifeForge Market Desk',
    heroLabel: 'Income planning',
    content: [
      {
        type: 'paragraph',
        text:
          'Annuities often re-enter the conversation when people are worried about outliving savings or managing retirement income through uncertain markets. The basic idea is straightforward: an annuity can convert capital into a stream of payments under the terms of a contract.'
      },
      { type: 'heading', text: 'The appeal is predictability' },
      {
        type: 'paragraph',
        text:
          'Guaranteed income can be attractive because it turns a portion of retirement assets into scheduled payments. That can help some clients plan monthly spending with more confidence, especially when investment returns feel unpredictable.'
      },
      {
        type: 'callout',
        text:
          'Annuities are contracts, not one-size-fits-all solutions. Features, guarantees, liquidity, taxation, fees, and insurer strength all matter.'
      },
      {
        type: 'bulletList',
        items: [
          'Immediate annuities can begin payments soon after purchase.',
          'Deferred annuities delay payments until a future date.',
          'Guarantees depend on the claims-paying ability of the insurer.'
        ]
      },
      {
        type: 'paragraph',
        text:
          'For LLQP learners, annuities are a good example of how product structure, client goals, and suitability must be considered together.'
      }
    ],
    relatedSlugs: [
      'why-life-insurance-feels-more-relevant-in-an-uncertain-market',
      'what-market-news-can-teach-you-before-the-llqp-exam'
    ]
  },
  {
    slug: 'what-new-advisors-should-understand-about-consumer-trust',
    title: 'What New Advisors Should Understand About Consumer Trust',
    subtitle:
      'Trust is built less by polished language and more by clear explanations, documented needs, and respect for consumer uncertainty.',
    category: 'Consumer Protection',
    date: 'May 1, 2026',
    readingTime: '4 min read',
    summary:
      'A beginner-friendly look at the habits that support better insurance conversations and stronger consumer protection.',
    author: 'LifeForge Market Desk',
    heroLabel: 'Consumer lens',
    content: [
      {
        type: 'paragraph',
        text:
          'New advisors often learn product details first, but consumer trust usually depends on process. People want to understand what they are buying, why it fits their situation, what it costs, and what it does not do.'
      },
      { type: 'heading', text: 'Clarity is a protection tool' },
      {
        type: 'paragraph',
        text:
          'A clear explanation can reduce confusion before it becomes a complaint. That includes plain-language descriptions of policy features, exclusions, premium obligations, surrender charges, beneficiary designations, and replacement risks.'
      },
      {
        type: 'bulletList',
        items: [
          'Avoid overstating certainty or product benefits.',
          'Document client needs and the reasoning behind recommendations.',
          'Invite questions and confirm understanding before applications are submitted.'
        ]
      },
      {
        type: 'callout',
        text:
          "Exam scenarios often test whether the advisor recognizes disclosure, suitability, conflicts, and the client's right to understand the recommendation."
      }
    ],
    relatedSlugs: [
      'how-underwriting-connects-risk-pricing-and-fairness',
      'what-market-news-can-teach-you-before-the-llqp-exam'
    ]
  },
  {
    slug: 'how-underwriting-connects-risk-pricing-and-fairness',
    title: 'How Underwriting Connects Risk, Pricing, and Fairness',
    subtitle:
      'Underwriting is where insurer risk assessment, consumer disclosure, and pricing discipline meet.',
    category: 'Underwriting',
    date: 'April 30, 2026',
    readingTime: '5 min read',
    summary:
      'A practical explanation of underwriting as a bridge between risk classification, premiums, and fair treatment.',
    author: 'LifeForge Market Desk',
    heroLabel: 'Risk review',
    content: [
      {
        type: 'paragraph',
        text:
          'Underwriting helps insurers decide whether to issue coverage, what premium to charge, and whether any exclusions or ratings should apply. The process can include health history, lifestyle details, financial information, and other relevant risk factors.'
      },
      { type: 'heading', text: 'Why risk classification matters' },
      {
        type: 'paragraph',
        text:
          "Insurance pools work when premiums reasonably reflect expected risk. If risk is priced poorly, costs can shift unfairly across policyholders or threaten the stability of the insurer's promises."
      },
      {
        type: 'callout',
        text:
          'Fairness in underwriting includes accurate disclosure, consistent standards, privacy safeguards, and clear communication when additional evidence is needed.'
      },
      {
        type: 'bulletList',
        items: [
          'Applicants should answer questions accurately and completely.',
          'Advisors should avoid minimizing the importance of disclosure.',
          'Insurers should apply underwriting rules consistently and explain requirements clearly.'
        ]
      }
    ],
    relatedSlugs: [
      'what-new-advisors-should-understand-about-consumer-trust',
      'why-life-insurance-feels-more-relevant-in-an-uncertain-market'
    ]
  },
  {
    slug: 'what-market-news-can-teach-you-before-the-llqp-exam',
    title: 'What Market News Can Teach You Before the LLQP Exam',
    subtitle:
      'Current headlines can make insurance exam concepts feel less abstract when learners connect news to risk, suitability, and ethics.',
    category: 'Exam Insight',
    date: 'April 29, 2026',
    readingTime: '4 min read',
    summary:
      'How to use market commentary as a study tool without turning headlines into product recommendations.',
    author: 'LifeForge Market Desk',
    heroLabel: 'Exam insight',
    content: [
      {
        type: 'paragraph',
        text:
          'Insurance news can be useful for exam preparation when you read it through the lens of concepts. A story about claims delays can connect to beneficiary service. A story about disclosure can connect to ethics. A story about annuities can connect to retirement income needs.'
      },
      { type: 'heading', text: 'Turn headlines into concepts' },
      {
        type: 'bulletList',
        items: [
          'Ask which insurance concept the article illustrates.',
          'Identify the consumer protection issue, if there is one.',
          'Separate education from advice or product promotion.'
        ]
      },
      {
        type: 'paragraph',
        text:
          'The goal is not to memorize market opinions. The goal is to recognize how policy features, underwriting, regulation, claims, and suitability show up in real conversations.'
      },
      {
        type: 'callout',
        text:
          'A useful study habit: after reading commentary, write one exam-style question that tests the underlying concept.'
      }
    ],
    relatedSlugs: [
      'annuities-explained-guaranteed-income-back-in-conversation',
      'how-underwriting-connects-risk-pricing-and-fairness'
    ]
  }
];

export function getMarketDeskArticle(slug: string) {
  return marketDeskArticles.find((article) => article.slug === slug);
}

export function getRelatedMarketDeskArticles(article: MarketDeskArticle) {
  const requested = article.relatedSlugs
    ?.map((slug) => getMarketDeskArticle(slug))
    .filter((item): item is MarketDeskArticle => Boolean(item));

  if (requested?.length) return requested.slice(0, 3);

  return marketDeskArticles.filter((item) => item.slug !== article.slug).slice(0, 3);
}
