export type MarketDeskCategory =
  | 'Market Watch'
  | 'Regulation & Compliance'
  | 'Product Trends'
  | 'Advisor Practice'
  | 'Retirement Income'
  | 'Underwriting'
  | 'Carrier Moves'
  | 'Claims'
  | 'Learner Corner';

export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  publishedAtLabel: string;
  source: string;
  tag: MarketDeskCategory;
  whatHappened: string;
  marketDeskView: string;
  whyAdvisorsShouldCare: string;
  learnerConnection: string;
  sourceName?: string;
  sourceUrl?: string;
  sourceDate?: string;
  keyPoints: string[];
  // Compatibility fields used by older news components and API fallbacks.
  whatItMeans: string;
  llqpAngle: string;
};

export const marketDeskDisclaimer =
  'LifeForge Market Desk is educational commentary for general information only. It is not financial, legal, tax, licensing, regulatory, or exam advice.';

export const newsItems: NewsItem[] = [
  {
    slug: 'annuities-no-longer-quiet-corner-market',
    title: 'Annuities Are No Longer a Quiet Corner of the Market',
    summary:
      'Retirement income is becoming one of the most important conversations in insurance and advice.',
    publishedAtLabel: 'May 25, 2026',
    source: 'LifeForge Market Desk',
    tag: 'Retirement Income',
    whatHappened:
      'Annuity and retirement-income conversations are moving closer to the centre of insurance planning as more clients look for income certainty after work.',
    marketDeskView:
      'As more clients approach retirement without traditional pensions, guaranteed income is becoming easier to discuss but harder to explain well. Advisors need to be clear about the trade-off between certainty, liquidity, flexibility, and estate value.',
    whyAdvisorsShouldCare:
      'Annuities are not just product knowledge. They are part of the broader conversation around longevity risk, retirement income, and client confidence.',
    learnerConnection:
      'This connects to annuities, income planning, suitability, guarantees, and client needs analysis.',
    keyPoints: [
      'Retirement income is becoming a larger insurance and advice conversation.',
      'Guaranteed income requires careful explanation of trade-offs.',
      'Suitability depends on income needs, liquidity, flexibility, and estate goals.'
    ],
    whatItMeans:
      'Retirement income planning increasingly requires advisors to explain certainty, liquidity, flexibility, and estate trade-offs clearly.',
    llqpAngle:
      'Review annuities, income planning, suitability, guarantees, and client needs analysis.'
  },
  {
    slug: 'return-guaranteed-income-clients-listening-again',
    title: 'The Return of Guaranteed Income: Why Clients Are Listening Again',
    summary:
      'Higher-rate environments have made guaranteed income products more relevant in planning conversations.',
    publishedAtLabel: 'May 24, 2026',
    source: 'LifeForge Market Desk',
    tag: 'Retirement Income',
    whatHappened:
      'Guaranteed income products are getting renewed attention as clients compare market uncertainty, retirement timing, and income gaps.',
    marketDeskView:
      'The opportunity is not simply to talk about income. It is to help clients understand what they gain and what they give up when they exchange flexibility for certainty.',
    whyAdvisorsShouldCare:
      'Clients may be more open to guaranteed income, but suitability still depends on liquidity needs, risk tolerance, income gaps, estate goals, and time horizon.',
    learnerConnection:
      'This connects to annuities, retirement income, risk transfer, product suitability, and client objectives.',
    keyPoints: [
      'Higher-rate environments can make income guarantees easier to discuss.',
      'The planning issue is the exchange between flexibility and certainty.',
      'Client objectives and liquidity needs still drive suitability.'
    ],
    whatItMeans:
      'Guaranteed income may be more relevant, but suitability still turns on client goals, liquidity, time horizon, and risk tolerance.',
    llqpAngle:
      'Review annuities, retirement income, risk transfer, product suitability, and client objectives.'
  },
  {
    slug: 'rilas-growing-simplicity-still-matters',
    title: 'RILAs Are Growing — But Simplicity Still Matters',
    summary:
      'Registered index-linked annuities and similar structured products are attracting attention because they combine market exposure with downside protection features.',
    publishedAtLabel: 'May 23, 2026',
    source: 'LifeForge Market Desk',
    tag: 'Product Trends',
    whatHappened:
      'Structured annuity products with buffers, caps, floors, and participation rates continue to attract market attention.',
    marketDeskView:
      'Products with buffers, caps, floors, and participation rates can sound attractive, but complexity is still a risk. If a client cannot explain the product back in plain language, the suitability conversation is not finished.',
    whyAdvisorsShouldCare:
      'Growth in complex products increases the need for clear disclosure, careful documentation, and plain-language client education.',
    learnerConnection:
      'This connects to product structure, guarantees, risk sharing, suitability, disclosure, and explaining product features.',
    keyPoints: [
      'Structured products can combine upside potential with downside features.',
      'Complexity can become a suitability and disclosure risk.',
      'Plain-language explanation is part of professional product advice.'
    ],
    whatItMeans:
      'Complex product growth raises the bar for disclosure, documentation, and client understanding.',
    llqpAngle:
      'Review product structure, guarantees, risk sharing, suitability, disclosure, and product-feature explanations.'
  },
  {
    slug: 'ai-underwriting-faster-applications-trust-questions',
    title: 'AI in Underwriting: Faster Applications, Bigger Trust Questions',
    summary:
      'Insurers continue to explore automation and AI-driven tools to speed up underwriting and improve application workflows.',
    publishedAtLabel: 'May 22, 2026',
    source: 'LifeForge Market Desk',
    tag: 'Underwriting',
    whatHappened:
      'Carriers continue testing automated underwriting and AI-supported workflows to reduce friction and shorten decision timelines.',
    marketDeskView:
      'Faster underwriting is attractive, but life insurance is still a trust business. If clients feel they are being assessed by a black box, advisors may have to spend more time explaining the process, not less.',
    whyAdvisorsShouldCare:
      'Advisors need to understand how underwriting changes affect client expectations, disclosure, application quality, and trust.',
    learnerConnection:
      'This connects to underwriting, risk classification, disclosure, insurability, and advisor-client communication.',
    keyPoints: [
      'Automation can make straightforward applications faster.',
      'Trust and explanation remain central to underwriting conversations.',
      'Disclosure quality still matters when technology changes the workflow.'
    ],
    whatItMeans:
      'Underwriting modernization may improve speed, but advisors still need to manage expectations and explain disclosure requirements.',
    llqpAngle:
      'Review underwriting, risk classification, disclosure, insurability, and advisor-client communication.'
  },
  {
    slug: 'climate-risk-insurance-conversation-outside-pc',
    title: 'Climate Risk Is Becoming an Insurance Conversation, Even Outside P&C',
    summary:
      'Climate risk is often discussed as a property and casualty issue, but it also shapes how consumers think about protection, risk, and insurance costs more broadly.',
    publishedAtLabel: 'May 21, 2026',
    source: 'LifeForge Market Desk',
    tag: 'Market Watch',
    whatHappened:
      'Consumers are hearing more about climate-driven insurance pressure, affordability, and protection gaps across the broader insurance market.',
    marketDeskView:
      'Life agents may not be pricing wildfire or flood risk directly, but they are working in a market where clients are more aware of uncertainty, protection gaps, and the rising cost of insurance.',
    whyAdvisorsShouldCare:
      'Client conversations about protection are influenced by the wider insurance environment, even when the product being discussed is life insurance.',
    learnerConnection:
      'This connects to risk awareness, consumer behaviour, protection needs, affordability, and the purpose of insurance.',
    keyPoints: [
      'Climate risk affects how consumers think about insurance broadly.',
      'Protection conversations do not happen in a vacuum.',
      'Affordability and uncertainty can shape life insurance discussions too.'
    ],
    whatItMeans:
      'Broader insurance affordability and risk awareness can influence how clients think about life insurance protection.',
    llqpAngle:
      'Review risk awareness, consumer behaviour, protection needs, affordability, and the purpose of insurance.'
  },
  {
    slug: 'private-capital-moving-toward-life-insurance',
    title: 'Private Capital Keeps Moving Toward Life Insurance',
    summary:
      'Large asset managers and private capital firms continue to show interest in life insurance, retirement income, and pension-risk-transfer markets.',
    publishedAtLabel: 'May 20, 2026',
    source: 'LifeForge Market Desk',
    tag: 'Market Watch',
    whatHappened:
      'Private capital and large asset managers continue to pursue opportunities connected to life insurers, retirement income, and long-duration liabilities.',
    marketDeskView:
      'This matters because life insurance is no longer just about individual policies. It is also about assets, capital, longevity risk, retirement income, and how insurers manage long-term promises.',
    whyAdvisorsShouldCare:
      'Advisors do not need to become investment bankers, but they should understand why capital is flowing into the life and retirement sector.',
    learnerConnection:
      'This connects to insurer financial strength, reserves, risk transfer, annuities, and long-term policy obligations.',
    keyPoints: [
      'Life insurance is connected to capital, assets, and long-term promises.',
      'Retirement income and pension risk transfer remain attractive markets.',
      'Advisor awareness should extend beyond individual policy mechanics.'
    ],
    whatItMeans:
      'Capital flows into life and retirement markets show how insurance connects individual protection with long-term financial promises.',
    llqpAngle:
      'Review insurer financial strength, reserves, risk transfer, annuities, and long-term policy obligations.'
  }
];

export function getNewsBySlug(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}
