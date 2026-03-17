export type KnowledgeClusterSlug = 'life-insurance-basics' | 'policy-mechanics' | 'taxation' | 'advanced-concepts' | 'llqp-exam-prep';

export type KnowledgeCluster = {
  slug: KnowledgeClusterSlug;
  title: string;
  shortDescription: string;
  intro: string;
  accent: string;
};

export type KnowledgeArticle = {
  cluster: KnowledgeClusterSlug;
  slug: string;
  title: string;
  excerpt: string;
  explanation: string;
  example: string;
  commonMistakes: string;
  summary: string;
  glossaryTerms: string[];
};

export type GlossaryTerm = {
  term: string;
  slug: string;
  letter: string;
  definition: string;
};

export const KNOWLEDGE_CLUSTERS: KnowledgeCluster[] = [
  {
    slug: 'life-insurance-basics',
    title: 'Life Insurance Basics',
    shortDescription: 'Core definitions, coverage purpose, and how policies protect households.',
    intro:
      'Start with the foundations: what life insurance does, how coverage is structured, and which concepts appear most often in practical decisions and LLQP questions.',
    accent: '#1F2A44'
  },
  {
    slug: 'policy-mechanics',
    title: 'Policy Mechanics',
    shortDescription: 'How contracts work in-force, including riders, options, and beneficiary structure.',
    intro:
      'Policy mechanics explains how contracts function after issue, including ownership, riders, changes, and servicing rules that affect claim outcomes.',
    accent: '#355C8C'
  },
  {
    slug: 'taxation',
    title: 'Taxation',
    shortDescription: 'Tax treatment for premiums, death benefits, cash value, and dispositions.',
    intro:
      'Taxation can reshape product suitability and long-term planning. This cluster focuses on practical tax treatment scenarios that advisors and students must know.',
    accent: '#2FAF9E'
  },
  {
    slug: 'advanced-concepts',
    title: 'Advanced Concepts',
    shortDescription: 'Complex planning topics including business uses, risk layering, and strategy.',
    intro:
      'Advanced concepts connect technical policy features to real planning outcomes for families, professionals, and business owners.',
    accent: '#0E8F9A'
  },
  {
    slug: 'llqp-exam-prep',
    title: 'LLQP Exam Prep',
    shortDescription: 'Exam-oriented frameworks, scenario thinking, and common high-stakes mistakes.',
    intro:
      'Use this cluster to sharpen exam judgment: apply rules to scenarios, avoid frequent traps, and communicate rationale clearly under time pressure.',
    accent: '#4A5568'
  }
];

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    cluster: 'life-insurance-basics',
    slug: 'term-vs-permanent-life-insurance',
    title: 'Term vs Permanent Life Insurance',
    excerpt: 'Understand the tradeoffs between temporary protection and long-term coverage design.',
    explanation:
      'Term insurance provides pure protection for a defined period, while permanent insurance combines lifelong coverage with cash value features. Suitability depends on budget, time horizon, and whether the client needs coverage that extends beyond income-replacement years.',
    example:
      'A young family may choose 20-year term to cover mortgage and child-rearing years. A business owner planning estate liquidity may prefer permanent coverage to align with long-duration obligations.',
    commonMistakes:
      'A common mistake is selecting permanent insurance only for investment language without confirming protection needs. Another is underestimating renewal costs on term policies when future insurability is uncertain.',
    summary:
      'Start with risk objective first, then choose term or permanent based on duration, affordability, and flexibility requirements.',
    glossaryTerms: ['Term Life Insurance', 'Permanent Insurance', 'Cash Value', 'Underwriting']
  },
  {
    cluster: 'life-insurance-basics',
    slug: 'insurable-interest-and-disclosure',
    title: 'Insurable Interest and Disclosure',
    excerpt: 'Why relationship, financial interest, and full disclosure are central to valid coverage.',
    explanation:
      'Insurable interest exists when the policy owner would suffer financial loss from the insured’s death. Full disclosure on the application is required because underwriting relies on declared facts to price and accept risk.',
    example:
      'A spouse or business partner usually has clear insurable interest. A distant unrelated party generally does not, unless a legally recognized financial dependency is demonstrated.',
    commonMistakes:
      'Applicants often treat health or lifestyle questions as optional details. Incomplete disclosure can trigger claim disputes and rescission risk during the contestability period.',
    summary:
      'Valid ownership structure and accurate disclosure are foundational for enforceable life insurance protection.',
    glossaryTerms: ['Insurable Interest', 'Material Misrepresentation', 'Contestability Period', 'Underwriting']
  },
  {
    cluster: 'policy-mechanics',
    slug: 'beneficiary-designations-and-control',
    title: 'Beneficiary Designations and Policy Control',
    excerpt: 'How revocable vs irrevocable choices affect flexibility and consent requirements.',
    explanation:
      'Beneficiary designation controls claim direction and can limit owner actions. Revocable designations preserve flexibility, while irrevocable designations may require beneficiary consent for important contract changes.',
    example:
      'If a beneficiary is irrevocable, the owner may need that beneficiary’s written consent to borrow against cash value or change designated beneficiaries.',
    commonMistakes:
      'Many owners fail to review designations after family changes. Outdated beneficiary instructions can override intentions expressed in other planning documents.',
    summary:
      'Beneficiary strategy should balance control, protection, and administrative clarity over time.',
    glossaryTerms: ['Beneficiary', 'Irrevocable Beneficiary', 'Policy Owner', 'Cash Value']
  },
  {
    cluster: 'policy-mechanics',
    slug: 'riders-and-contract-flexibility',
    title: 'Riders and Contract Flexibility',
    excerpt: 'How optional riders modify coverage and client suitability.',
    explanation:
      'Riders customize core policy structure by adding benefits like waiver of premium, guaranteed insurability, or accelerated access under specific conditions. Each rider affects cost and should match a defined risk.',
    example:
      'A client with variable income may prioritize waiver of premium to preserve coverage continuity during disability periods.',
    commonMistakes:
      'Clients sometimes add riders without understanding trigger conditions. Overloading riders can increase premium without improving practical protection.',
    summary:
      'Select riders based on identifiable risk exposure, not feature accumulation.',
    glossaryTerms: ['Rider', 'Waiver of Premium', 'Guaranteed Insurability', 'Policy Owner']
  },
  {
    cluster: 'taxation',
    slug: 'tax-treatment-of-death-benefits-and-cash-values',
    title: 'Tax Treatment of Death Benefits and Cash Values',
    excerpt: 'A practical guide to tax outcomes in common life policy scenarios.',
    explanation:
      'Death benefits are often received tax-advantaged by beneficiaries, while cash value access and policy disposition can create taxable consequences depending on structure and transaction method.',
    example:
      'A beneficiary receiving a death benefit may face different tax treatment than a policy owner who surrenders a policy with gain above adjusted cost basis.',
    commonMistakes:
      'A frequent error is assuming all policy proceeds are always tax-free regardless of transaction type. Tax outcomes depend on whether funds are claim proceeds, loans, withdrawals, or surrender value.',
    summary:
      'Always distinguish claim payout from living access transactions when assessing tax impact.',
    glossaryTerms: ['Adjusted Cost Basis', 'Policy Surrender', 'Death Benefit', 'Cash Value']
  },
  {
    cluster: 'taxation',
    slug: 'policy-loans-withdrawals-and-disposition-risk',
    title: 'Policy Loans, Withdrawals, and Disposition Risk',
    excerpt: 'How accessing policy value can affect taxation and long-term policy health.',
    explanation:
      'Policy loans and withdrawals can provide liquidity but may alter long-term contract performance and tax profile. Improper use can increase lapse risk and reduce planned legacy outcomes.',
    example:
      'An owner draws repeated amounts from policy value during market stress, then faces reduced coverage durability if interest and costs are not monitored.',
    commonMistakes:
      'Owners often view policy value as consequence-free liquidity. Ignoring policy illustrations and tax thresholds can produce unexpected liabilities.',
    summary:
      'Access policy value with a structured plan, not as ad hoc cash flow support.',
    glossaryTerms: ['Policy Loan', 'Withdrawal', 'Policy Lapse', 'Adjusted Cost Basis']
  },
  {
    cluster: 'advanced-concepts',
    slug: 'business-insurance-and-key-person-risk',
    title: 'Business Insurance and Key Person Risk',
    excerpt: 'How life insurance supports continuity, succession, and lender confidence.',
    explanation:
      'Businesses use life insurance to protect against revenue disruption when a critical owner or executive dies. Proper structuring supports continuity planning and can stabilize financing relationships.',
    example:
      'A firm insures a founder whose relationships drive sales. If death occurs, proceeds can offset transition costs and maintain operations while leadership is restructured.',
    commonMistakes:
      'A common issue is unclear ownership and beneficiary setup between the company and shareholders, creating disputes during claim events.',
    summary:
      'Business coverage must align policy ownership, beneficiary direction, and continuity objectives.',
    glossaryTerms: ['Key Person Insurance', 'Policy Owner', 'Beneficiary', 'Insurable Interest']
  },
  {
    cluster: 'advanced-concepts',
    slug: 'estate-liquidity-and-coverage-design',
    title: 'Estate Liquidity and Coverage Design',
    excerpt: 'Using life insurance to fund obligations and protect estate transfer plans.',
    explanation:
      'Life insurance can provide immediate liquidity when estates contain illiquid assets. Coverage design should account for timing, beneficiaries, and expected obligations at death.',
    example:
      'An estate with private business assets may need liquid claim proceeds to avoid forced sale pressure during settlement.',
    commonMistakes:
      'Underestimating future liabilities and inflation can leave estates underfunded. Another mistake is failing to synchronize coverage reviews with legal planning updates.',
    summary:
      'Treat estate insurance as a coordinated liquidity tool, not a one-time purchase.',
    glossaryTerms: ['Estate Liquidity', 'Beneficiary', 'Permanent Insurance', 'Policy Review']
  },
  {
    cluster: 'llqp-exam-prep',
    slug: 'llqp-scenario-framework',
    title: 'LLQP Scenario Framework: Read, Qualify, Decide',
    excerpt: 'A repeatable decision model for handling exam case questions.',
    explanation:
      'Strong LLQP answers follow a sequence: identify client objective, isolate policy constraints, then choose the most defensible recommendation. This prevents jumping to product names before suitability is proven.',
    example:
      'In a question about family protection and tight budget, the framework points first to core protection need and affordability before optional enhancements.',
    commonMistakes:
      'Candidates often over-focus on product features and ignore ownership, beneficiary control, or disclosure facts embedded in the scenario.',
    summary:
      'Use structure under pressure: objective, constraints, recommendation, rationale.',
    glossaryTerms: ['Suitability', 'Beneficiary', 'Underwriting', 'Material Misrepresentation']
  },
  {
    cluster: 'llqp-exam-prep',
    slug: 'high-frequency-llqp-mistakes',
    title: 'High-Frequency LLQP Mistakes and How to Avoid Them',
    excerpt: 'A checklist of common exam errors across policy, tax, and claims topics.',
    explanation:
      'Most misses come from misreading qualifiers, confusing ownership with beneficiary rights, or applying tax assumptions too broadly. Precision in contract language and scenario facts is critical.',
    example:
      'A question may test whether an irrevocable beneficiary limits policy changes. Missing that single detail can reverse the correct answer.',
    commonMistakes:
      'Rushing, skipping condition words, and ignoring exceptions are persistent issues. Candidates also confuse contestability rules with all claim situations.',
    summary:
      'Careful reading and rule-based reasoning outperform memorization alone.',
    glossaryTerms: ['Irrevocable Beneficiary', 'Contestability Period', 'Policy Owner', 'Suitability']
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: 'Adjusted Cost Basis', slug: 'adjusted-cost-basis', letter: 'A', definition: 'The policy tax basis used to determine gain for certain policy transactions.' },
  { term: 'Beneficiary', slug: 'beneficiary', letter: 'B', definition: 'The person or entity designated to receive policy proceeds.' },
  { term: 'Cash Value', slug: 'cash-value', letter: 'C', definition: 'Accumulated value within certain permanent policies that may be accessed during life.' },
  { term: 'Contestability Period', slug: 'contestability-period', letter: 'C', definition: 'Initial period where claim review may focus heavily on application accuracy and disclosure.' },
  { term: 'Death Benefit', slug: 'death-benefit', letter: 'D', definition: 'Amount paid to beneficiaries when the insured dies, subject to policy terms.' },
  { term: 'Guaranteed Insurability', slug: 'guaranteed-insurability', letter: 'G', definition: 'Rider allowing future coverage increases at specified events without full medical requalification.' },
  { term: 'Insurable Interest', slug: 'insurable-interest', letter: 'I', definition: 'A legally recognized financial interest in the continued life of the insured.' },
  { term: 'Irrevocable Beneficiary', slug: 'irrevocable-beneficiary', letter: 'I', definition: 'Beneficiary designation that generally restricts owner changes without beneficiary consent.' },
  { term: 'Key Person Insurance', slug: 'key-person-insurance', letter: 'K', definition: 'Coverage used by a business to offset financial impact after loss of a critical individual.' },
  { term: 'Material Misrepresentation', slug: 'material-misrepresentation', letter: 'M', definition: 'An incorrect or omitted fact that would have affected underwriting or policy issuance.' },
  { term: 'Permanent Insurance', slug: 'permanent-insurance', letter: 'P', definition: 'Life insurance designed for long-duration or lifetime coverage, often with cash value features.' },
  { term: 'Policy Loan', slug: 'policy-loan', letter: 'P', definition: 'Borrowing against policy value that can affect long-term policy performance and obligations.' },
  { term: 'Policy Owner', slug: 'policy-owner', letter: 'P', definition: 'Person or entity with contractual control rights over the policy.' },
  { term: 'Rider', slug: 'rider', letter: 'R', definition: 'Optional policy add-on that modifies benefits, conditions, or flexibility.' },
  { term: 'Suitability', slug: 'suitability', letter: 'S', definition: 'Alignment between policy recommendation and client needs, capacity, and objectives.' },
  { term: 'Term Life Insurance', slug: 'term-life-insurance', letter: 'T', definition: 'Coverage for a specified period, focused on temporary risk protection.' },
  { term: 'Underwriting', slug: 'underwriting', letter: 'U', definition: 'Risk assessment process used by insurers to determine eligibility, pricing, and terms.' },
  { term: 'Waiver of Premium', slug: 'waiver-of-premium', letter: 'W', definition: 'Rider that may waive premiums if the insured meets qualifying disability conditions.' },
  { term: 'Withdrawal', slug: 'withdrawal', letter: 'W', definition: 'Removal of policy value that can impact coverage, future values, and tax treatment.' }
];

const clusterMap = new Map(KNOWLEDGE_CLUSTERS.map((cluster) => [cluster.slug, cluster]));

export function getKnowledgeCluster(slug: string) {
  return clusterMap.get(slug as KnowledgeClusterSlug);
}

export function getKnowledgeArticlesByCluster(slug: string) {
  return KNOWLEDGE_ARTICLES.filter((article) => article.cluster === slug);
}

export function getKnowledgeArticle(cluster: string, article: string) {
  return KNOWLEDGE_ARTICLES.find((item) => item.cluster === cluster && item.slug === article);
}

export function getClusterGlossaryTerms(cluster: string) {
  const terms = new Set(
    KNOWLEDGE_ARTICLES.filter((article) => article.cluster === cluster).flatMap((article) => article.glossaryTerms)
  );

  return GLOSSARY_TERMS.filter((term) => terms.has(term.term));
}

export function getGlossaryByLetter() {
  const grouped = new Map<string, GlossaryTerm[]>();

  for (const term of GLOSSARY_TERMS) {
    const letter = term.letter.toUpperCase();
    const list = grouped.get(letter) ?? [];
    list.push(term);
    grouped.set(letter, list);
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, terms]) => ({
      letter,
      terms: [...terms].sort((a, b) => a.term.localeCompare(b.term))
    }));
}
