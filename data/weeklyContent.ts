export type WeeklyDifficulty = 'Beginner' | 'Intermediate' | 'Hard';

export const weeklyContent = {
  weekOf: '2026-05-11',
  weeklyBrief: {
    title: 'This Week in Life Insurance',
    summary:
      'Claims communication, underwriting expectations, and disclosure quality are this week’s study signals from the LifeForge Market Desk.',
    href: '/news/claims-communication-consumer-pain-point',
    category: 'Market Desk',
    updatedLabel: 'Updated weekly',
    examConnection: 'Claims process, suitability, and advisor communication'
  },
  questionOfTheWeek: {
    title: 'Question of the Week',
    difficulty: 'Hard' as WeeklyDifficulty,
    question:
      'A client owns a permanent life insurance policy with cash value. They want to access funds without cancelling the policy. Which issue should the advisor explain first?',
    choices: [
      'A. The death benefit is always unaffected',
      'B. A policy loan may create tax consequences if it exceeds the policy’s adjusted cost basis',
      'C. Withdrawals are never taxable',
      'D. The policy automatically becomes paid-up'
    ],
    correctAnswer: 'B',
    explanation:
      'Accessing cash value can affect taxation, policy performance, and the eventual death benefit. A policy loan or withdrawal is not automatically tax-free in every situation, so the advisor should explain the possible tax and policy consequences before the client proceeds.',
    href: '/free-practice/question-of-the-week'
  },
  examTrap: {
    title: 'Exam Trap of the Week',
    trap: 'Do not confuse policy loans with withdrawals.',
    explanation:
      'Both can give a policyowner access to cash value, but they are not identical. The tax treatment, policy impact, repayment expectations, and effect on the death benefit can differ.',
    href: '/knowledge/exam-traps',
    examConnection: 'Policy mechanics and taxation'
  },
  recentlyUpdated: [
    {
      title: 'Annuities Explained',
      href: '/knowledge/annuities',
      category: 'Retirement Income',
      updated: 'May 2026',
      type: 'Consumer Guide'
    },
    {
      title: 'Term vs Permanent Life Insurance',
      href: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance',
      category: 'Product Comparison',
      updated: 'May 2026',
      type: 'Guide'
    },
    {
      title: 'LLQP Scenario Framework',
      href: '/knowledge/llqp-exam-prep/llqp-scenario-framework',
      category: 'LLQP Exam Prep',
      updated: 'May 2026',
      type: 'Exam Help'
    },
    {
      title: 'Beneficiary Designations and Policy Control',
      href: '/knowledge/policy-mechanics/beneficiary-designations-and-control',
      category: 'Policy Mechanics',
      updated: 'May 2026',
      type: 'Explainer'
    }
  ]
} as const;

export const commonExamTraps = [
  {
    title: 'Policy loan vs withdrawal',
    whyWrong:
      'Learners often treat every cash-value access method as the same kind of transaction.',
    correctThinking:
      'A loan and a withdrawal can affect tax, policy values, interest, and death benefit differently. Read the question for the transaction type.',
    relatedHref: '/knowledge/taxation/tax-treatment-of-death-benefits-and-cash-values'
  },
  {
    title: 'Owner vs insured vs beneficiary',
    whyWrong:
      'The person who pays, controls, is covered, and receives proceeds may not be the same person.',
    correctThinking:
      'Identify each role before answering questions about rights, changes, consent, or claims.',
    relatedHref: '/knowledge/policy-mechanics/beneficiary-designations-and-control'
  },
  {
    title: 'Term insurance vs permanent insurance',
    whyWrong:
      'Candidates sometimes choose based on price alone instead of matching duration and purpose.',
    correctThinking:
      'Term is temporary coverage for a defined period. Permanent coverage is designed for lifelong protection and may include cash value.',
    relatedHref: '/knowledge/life-insurance-basics/term-vs-permanent-life-insurance'
  },
  {
    title: 'Guaranteed issue vs simplified issue',
    whyWrong:
      'Both reduce underwriting friction, but they are not interchangeable.',
    correctThinking:
      'Simplified issue usually asks fewer health questions. Guaranteed issue may avoid medical underwriting but often has limits, higher cost, or exclusions.',
    relatedHref: '/knowledge/policy-mechanics/what-is-evidence-of-insurability'
  },
  {
    title: 'Annuity income guarantee period',
    whyWrong:
      'The guarantee period can be mistaken for the annuitant’s life expectancy or the total contract length.',
    correctThinking:
      'A guarantee period defines payment protection for a minimum period under the contract terms.',
    relatedHref: '/knowledge/annuities/how-annuities-work'
  },
  {
    title: 'Suitability vs product features',
    whyWrong:
      'A product feature can sound attractive even when it does not match the client’s need.',
    correctThinking:
      'Suitability starts with the client’s goals, risk, budget, timeline, and understanding, not with the product feature list.',
    relatedHref: '/knowledge/llqp-exam-prep/llqp-scenario-framework'
  },
  {
    title: 'Tax treatment assumptions',
    whyWrong:
      'Questions often tempt learners to assume all policy proceeds, loans, or withdrawals are tax-free.',
    correctThinking:
      'Check the policy type, adjusted cost basis, transaction, ownership, and beneficiary context before answering.',
    relatedHref: '/knowledge/taxation/tax-treatment-of-death-benefits-and-cash-values'
  },
  {
    title: 'Beneficiary designation confusion',
    whyWrong:
      'Revocable, irrevocable, primary, and contingent beneficiary rules are easy to blur together.',
    correctThinking:
      'Identify the designation type and who has the legal authority to make changes.',
    relatedHref: '/knowledge/policy-mechanics/beneficiary-designations-and-control'
  }
] as const;
