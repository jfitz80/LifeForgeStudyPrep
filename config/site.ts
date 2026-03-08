export const siteConfig = {
  brandName: 'LifeForge Insurance Prep',
  tagline: 'Empowering Future Advisors',
  domain: 'lifeforgeprep.com',
  productName: 'Life Insurance Licensing Question Bank',
  launchPrice: 19,
  regularPrice: 29,
  launchPriceDisplay: '$19',
  regularPriceDisplay: '$29',
  checkoutUrl: 'https://example-checkout-link.com',
  supportEmail: 'support@lifeforgeprep.com',
  legalUrls: {
    privacy: '/privacy',
    terms: '/terms',
    refundPolicy: '/refund-policy',
    disclaimer: '/disclaimer'
  },
  seo: {
    title: 'LifeForge Insurance Prep | Life Insurance Licensing Question Bank ($19 Launch)',
    description:
      '200+ exam-style life insurance licensing questions with clear explanations and scenario-based practice. Especially helpful for LLQP Life Insurance candidates.'
  }
} as const;

// Admin note: review GST/HST obligations and checkout tax handling before launch.

export const heroCopy = {
  headline: 'Pass Your Life Insurance Licensing Exam With Confidence',
  subheadline:
    'Practice with realistic exam-style questions designed for future advisors. Especially helpful for candidates preparing for the Canadian LLQP Life Insurance module.',
  bullets: [
    '200+ exam-style questions',
    'Clear explanations',
    'Scenario-based practice',
    'Built for life insurance licensing exam candidates',
    'Especially helpful for LLQP Life Insurance candidates'
  ],
  primaryCta: 'Start Practicing Questions',
  secondaryCta: 'Get the Study Guide'
} as const;

export const insideGuideItems = [
  '200+ exam-style questions',
  'Scenario-based practice with explanations',
  'Core life insurance concepts for licensing prep',
  'Quick review checklists for focused study'
] as const;

export const faqItems = [
  {
    question: 'What is included?',
    answer:
      'You get digital access to the Life Insurance Licensing Question Bank with 200+ exam-style questions, clear explanations, and scenario-based practice designed to support exam prep.'
  },
  {
    question: 'Is this an official LLQP resource?',
    answer:
      'No. LifeForge Insurance Prep is an independent study resource and is not affiliated with any regulator, licensing body, or exam provider.'
  },
  {
    question: 'Does this guarantee I will pass?',
    answer:
      'No. This product is designed to support study and practice, but exam success depends on the learner and their overall preparation.'
  },
  {
    question: 'Is this only for LLQP candidates?',
    answer:
      'It is especially helpful for LLQP Life Insurance candidates, but many questions cover broader life insurance licensing concepts.'
  },
  {
    question: 'Who is this for?',
    answer:
      'It is built for future advisors preparing for life insurance licensing exams, especially candidates studying for the LLQP Life Insurance module.'
  },
  {
    question: 'Can I share the PDF or question bank?',
    answer:
      'No. Access is for personal individual use only and may not be copied, redistributed, or resold.'
  },
  {
    question: 'What is your refund policy?',
    answer:
      'Digital product sales are generally final, but support is available for duplicate purchases or technical issues. Contact support and we will review your case promptly.'
  },
  {
    question: 'How do I access the download?',
    answer:
      'After checkout, you receive immediate access details on-screen and by email from the checkout provider.'
  },
  {
    question: 'Can I use it on mobile?',
    answer:
      'Yes. The materials are designed to be usable on phones, tablets, and desktop devices.'
  },
  {
    question: 'How often is it updated?',
    answer:
      'The question bank is reviewed periodically for clarity and relevance. Updates may be released as content improvements are made.'
  }
] as const;
