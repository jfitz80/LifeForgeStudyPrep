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
  readingTime?: string;
  featured?: boolean;
  source: string;
  tag: MarketDeskCategory;
  secondaryCategory?: MarketDeskCategory;
  whatHappened: string;
  marketDeskView: string;
  whyAdvisorsShouldCare: string;
  learnerConnection: string;
  relatedTopics?: string[];
  sourceName?: string;
  sourceUrl?: string;
  sourceDate?: string;
  keyPoints: string[];
  bodySections?: Array<{
    heading?: string;
    paragraphs: string[];
  }>;
  // Compatibility fields used by older news components and API fallbacks.
  whatItMeans: string;
  llqpAngle: string;
};

export const marketDeskDisclaimer =
  'LifeForge Market Desk is educational commentary for general information only. It is not financial, legal, tax, licensing, regulatory, or exam advice.';

export const newsItems: NewsItem[] = [
  {
    slug: 'annuity-boom-capital-story',
    title: 'The Annuity Boom Is Becoming a Capital Story',
    summary:
      'Annuities are no longer just a product story. Their growth is increasingly tied to retirement-income demand, product complexity, private capital, reinsurance, and advisor suitability risk.',
    publishedAtLabel: 'May 31, 2026',
    readingTime: '6 min read',
    featured: true,
    source: 'LifeForge Market Desk',
    tag: 'Retirement Income',
    secondaryCategory: 'Market Watch',
    sourceName:
      'Barron’s Advisor / LIMRA annuity sales reporting; Reuters / Moody’s offshore reinsurance and private credit reporting; Reuters reporting on MetLife and General Atlantic’s reinsurance venture',
    sourceDate: '2026',
    relatedTopics: [
      'Annuities',
      'Retirement income',
      'RILAs',
      'Fixed indexed annuities',
      'Private capital',
      'Reinsurance',
      'Suitability',
      'Advisor disclosure'
    ],
    whatHappened:
      'Annuities are no longer sitting quietly in the background of the life insurance market. Demand for retirement income is rising at the same time product design, reinsurance, private capital, and asset-management strategies are changing the industry behind the product.',
    marketDeskView:
      'The annuity boom is an opportunity, but also a test of how clearly advisors can explain trade-offs.',
    whyAdvisorsShouldCare:
      'For life agents, brokers, advisors, and learners, annuities are no longer a side topic. They connect retirement income, product suitability, insurer financial strength, private capital, reinsurance, client psychology, disclosure, and long-term risk.',
    learnerConnection:
      'This topic connects to annuities, retirement income, suitability, guarantees, liquidity, insurer financial strength, reinsurance, and explaining product trade-offs to clients.',
    keyPoints: [
      'Annuity growth is increasingly tied to retirement-income demand, product innovation, and capital-market strategy.',
      'More complex product designs raise the bar for plain-language explanation, suitability, and documentation.',
      'Private capital and reinsurance involvement can influence pricing, product design, investment strategy, and risk appetite.',
      'The advisor challenge is explaining what the client is protecting against, what they give up, and why the recommendation fits.'
    ],
    bodySections: [
      {
        paragraphs: [
          'Annuities are no longer sitting quietly in the background of the life insurance market.',
          'For years, many advisors treated annuities as a specialist product: useful in the right retirement-income case, but not necessarily central to everyday client conversations. That is changing. Aging populations, higher interest rates, pension uncertainty, market volatility, and demand for more predictable income have pushed annuities back into the centre of the industry conversation.',
          'But the story is bigger than sales numbers.',
          'The annuity market is now being shaped by three forces at once: changing client needs, changing product design, and changing capital ownership behind the insurance industry itself. For agents, brokers, and advisors, that means annuities should not be viewed only as “guaranteed income products.” They are also a window into where the life and retirement sector is heading.'
        ]
      },
      {
        heading: 'Demand is being driven by retirement uncertainty',
        paragraphs: [
          'The retirement-income problem is easy to describe but difficult to solve.',
          'More clients are entering retirement without the kind of defined-benefit pensions that previous generations relied on. Many have savings, but savings are not the same as guaranteed income. A portfolio can rise or fall. Withdrawal rates can be misjudged. Inflation can last longer than expected. Longevity risk — the risk of outliving one’s assets — is becoming more visible.',
          'That is why annuities are getting renewed attention.',
          'For clients, the appeal is straightforward: turn some capital into a more predictable income stream. For advisors, the conversation is more complicated. The trade-off is not simply income versus no income. It is certainty versus flexibility, guarantees versus liquidity, and protection against longevity risk versus control over assets.',
          'That is where advisor judgment matters.',
          'A client who wants maximum flexibility may not be suited to the same solution as a client who is anxious about outliving their money. A client with strong pension income may view an annuity differently from someone relying mostly on registered savings. The product conversation only makes sense after the client’s income floor, expenses, tax situation, estate goals, health, risk tolerance, and time horizon are understood.'
        ]
      },
      {
        heading: 'Product design is moving beyond simple guarantees',
        paragraphs: [
          'The annuity market is also changing because the products themselves are changing.',
          'Traditional income annuities remain part of the landscape, but growth is also coming from products that try to balance protection and market participation. Fixed-rate deferred annuities, fixed indexed annuities, variable annuities, and registered index-linked annuities all sit in different places on the risk-and-return spectrum.',
          'That creates opportunity, but it also creates communication risk.',
          'A simple guarantee is relatively easy to explain. A product with buffers, caps, floors, participation rates, index-crediting methods, surrender schedules, income riders, and market-linked outcomes is harder. These features may be valuable, but they can also make it difficult for clients to understand what they actually own.',
          'The more complex the product, the more important the explanation.',
          'If a client cannot explain back what they own, when they can access their money, what risk they have retained, what risk has been transferred, and what could reduce the value of the product, the suitability conversation is not complete.',
          'That is why the growth of RILAs and similar products matters. They are not simply “new annuities.” They show how insurers are trying to meet demand for upside potential while still offering some form of downside structure. In uncertain markets, that can be attractive. But it also raises the standard for disclosure, documentation, and advisor education.'
        ]
      },
      {
        heading: 'Major players are watching the retirement-income opportunity',
        paragraphs: [
          'The annuity boom has attracted more than traditional life insurers.',
          'Large asset managers, private capital firms, reinsurers, and alternative investment platforms are increasingly interested in life insurance, annuity blocks, pension-risk-transfer business, and retirement platforms.',
          'The reason is not hard to understand.',
          'Annuity business can bring long-duration liabilities, predictable premium flows, large pools of assets, and opportunities to manage investment spread over time. For firms with asset-management capabilities, insurance liabilities can become a major source of long-term investable capital.',
          'That is changing the competitive landscape.',
          'Traditional insurers still matter enormously. But they are no longer the only players shaping the future of the annuity and retirement-income market. Private capital has shown growing interest in acquiring life insurers, reinsuring blocks of business, forming reinsurance vehicles, and participating in retirement-income platforms.',
          'Some deals are about distribution. Others are about asset management. Others are about acquiring or reinsuring long-term liabilities and investing the backing assets differently.',
          'For advisors, this does not mean every client conversation needs to become a discussion about private capital. But it does mean the background of the industry is changing.',
          'When new capital enters the life and annuity market, it can influence pricing, product design, investment strategy, reinsurance arrangements, risk appetite, and the kinds of products that appear in distribution channels. Over time, that can affect what advisors see on the shelf.'
        ]
      },
      {
        heading: 'The risk story is getting more important',
        paragraphs: [
          'The annuity boom also comes with risks.',
          'Some are client-level risks. These include misunderstanding product features, surrender charges, liquidity restrictions, market-linked outcomes, inflation risk, and the possibility that a product is sold for its headline benefit rather than its actual fit.',
          'Some are advisor-level risks. These include weak needs analysis, inadequate documentation, poor explanation of alternatives, and failure to explain how the product behaves under different market conditions. As products become more complex, the advisor’s file needs to show not only what was recommended, but why it was suitable.',
          'Then there are industry-level risks.',
          'As insurers and reinsurers search for returns, the investment side of the business matters more. Private credit, offshore reinsurance, and more complex asset strategies have become part of the broader life insurance conversation. These structures may support growth and competitiveness, but they also raise questions about transparency, liquidity, valuation, and how risks are managed during stress.',
          'This is why annuities should not be viewed only through the lens of sales growth. Strong sales can reflect real client need, but they can also hide growing complexity underneath.'
        ]
      },
      {
        heading: 'My view',
        paragraphs: [
          'The annuity comeback is real, but the most important story is not simply that more annuities are being sold.',
          'The bigger story is that retirement income has become one of the central problems of modern financial planning, and the life insurance industry is repositioning itself around that need. That creates opportunity for advisors, but it also raises the standard for explanation.',
          'In my view, the advisors who will stand out are not the ones who can repeat product features. They are the ones who can explain the trade-off clearly: what the client is protecting against, what the client is giving up, and why the recommendation fits the client’s actual retirement problem.',
          'The industry may be moving toward more sophisticated products and more sophisticated capital structures, but the client conversation still has to be simple enough to understand.',
          'That is the tension at the centre of the annuity boom.'
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'For life agents, brokers, advisors, and learners, annuities are no longer a side topic. They connect retirement income, product suitability, insurer financial strength, private capital, reinsurance, client psychology, disclosure, and long-term risk. Understanding annuities today means understanding not only the product, but also the market forces behind it.'
        ]
      }
    ],
    whatItMeans:
      'Annuities are increasingly tied to retirement-income demand, product innovation, private capital, reinsurance, asset management, and the suitability risks advisors need to explain clearly.',
    llqpAngle:
      'Review annuities, retirement income, suitability, guarantees, liquidity, insurer financial strength, reinsurance, and explaining product trade-offs.'
  },
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
