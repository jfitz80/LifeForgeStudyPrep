export const siteConfig = {
  brandName: 'LifeForge Insurance Prep',
  tagline: 'Empowering Future Advisors',
  productName: 'Life Insurance Scenario Practice',

  regularPrice: 29,
  launchPrice: 8.99,
  regularPriceDisplay: '$29',
  launchPriceDisplay: '$8.99',
  price: '$8.99',

  checkoutUrl: 'https://payhip.com/b/xwfO6',
  appStoreUrl: 'https://apps.apple.com/ca/app/lifeforgeprep/id6761309802',
  playStoreUrl: '',
  leadMagnetPath: '/thanks',
  siteUrl: 'https://www.lifeforgeprep.com',
  supportEmail: 'support@lifeforgeprep.com',
  domain: 'www.lifeforgeprep.com',

  seo: {
    title: 'LifeForgePrep | Life Insurance Exam Practice & Scenario-Based Study',
    description:
      'LLQP Life Insurance module study support with exam-style questions, clear explanations, and scenario-based practice.'
  },

  legalUrls: {
    privacy: '/privacy',
    terms: '/terms',
    refundPolicy: '/refund-policy',
    disclaimer: '/disclaimer'
  }
} as const;

export const heroCopy = {
  eyebrow: 'LifeForge Insurance Prep',
  tagline: 'Empowering Future Advisors',
  headline: 'Life Insurance Exam Practice That Teaches You How to Think',
  subheadline:
    "Don't just memorize life insurance terms. Learn how to reason through exam-style questions with scenario-based practice that supplements your official course material.",
  bullets: [
    '80+ Life Insurance module questions',
    'Clear explanations',
    'Scenario-based practice',
    'Designed to supplement official LLQP course material'
  ],
  primaryCta: 'Try 15 Free Questions',
  secondaryCta: 'Get the Life Insurance Practice Guide',
  trustLine: 'Independent exam prep resource. Instant digital access.'
};

export const insideGuideItems = [
  'Chapter-by-chapter summaries',
  'Exam traps & common mistakes',
  'Scenario questions with explanations',
  'Quick review checklists'
] as const;

export const howItWorksSteps = [
  'Download instantly',
  'Study with checklists + scenarios',
  'Test yourself with practice questions'
] as const;

export const faqItems = [
  {
    question: 'Is this an official LLQP resource?',
    answer:
      'No. LifeForge Insurance Prep is an independent study resource and is not affiliated with any regulator, licensing body, or exam provider.'
  },
  {
    question: 'Does this guarantee I will pass?',
    answer:
      'No. This product is designed to support study and practice, but exam success depends on the learner.'
  },
  {
    question: 'Is this only for LLQP candidates?',
    answer:
      'It is especially helpful for LLQP Life Insurance candidates, but many questions cover broader life insurance licensing concepts.'
  },
  {
    question: 'Can I share the PDF or question bank?',
    answer:
      'No. Access is for personal, individual use only and may not be copied, redistributed, or resold.'
  },
  {
    question: 'What is your refund policy?',
    answer:
      'Digital product sales are generally final, but support is available for duplicate purchases or technical access issues.'
  },
  {
    question: 'Do life insurance policies always lapse immediately after a missed payment?',
    answer:
      'Not always. Many policies include a grace period. Coverage outcomes during that period depend on policy terms and unpaid premium treatment.'
  },
  {
    question: 'Can a lapsed policy ever be put back in force?',
    answer:
      'Sometimes yes. Reinstatement may be possible if policy requirements are met, which can include evidence and payment conditions.'
  }
] as const;

export const sampleQuestion = {
  heading: 'Question Most Candidates Get Wrong',
  question:
    'A policyholder dies during the grace period after missing a premium payment. What happens?',
  answers: [
    'A. Claim denied',
    'B. Policy cancelled',
    'C. Death benefit paid minus unpaid premium',
    'D. Policy must be reinstated'
  ],
  reveal:
    'Correct answer: C — the death benefit is paid, but the unpaid premium is deducted.'
} as const;
