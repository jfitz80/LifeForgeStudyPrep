export const siteConfig = {
  brandName: 'LifeForge Insurance Prep',
  productName: 'LLQP Life Insurance Pass Guide',
  price: '$39',
  checkoutUrl: 'https://example-checkout-link.com',
  supportEmail: 'support@lifeforgeprep.com',
  seo: {
    title: 'LifeForge Insurance Prep | LLQP Life Insurance Pass Guide',
    description:
      'Pass the LLQP Life Insurance exam with a streamlined, scenario-focused study guide, practice questions, and clear explanations.'
  }
} as const;

export const heroCopy = {
  headline: 'Pass the LLQP Life Insurance Exam with Confidence',
  subheadline:
    'A streamlined, scenario-focused study guide with clear explanations, exam-style practice questions, and common traps explained.',
  bullets: [
    'Covers the full Life Insurance LLQP curriculum',
    'Practice questions + explanations',
    'Designed for studying at night in short sessions'
  ],
  primaryCta: 'Download the Study Guide',
  secondaryCta: 'Get 50 Free Practice Questions'
} as const;

export const insideGuideItems = [
  'Chapter-by-chapter summaries',
  'Exam traps & common mistakes',
  'Scenario questions with explanations',
  'Quick review checklists'
] as const;

export const faqItems = [
  {
    question: 'What is included?',
    answer:
      'You get a digital PDF study guide with chapter summaries, scenario-based examples, practice questions with explanations, and quick review checklists.'
  },
  {
    question: 'Is this official / affiliated?',
    answer:
      'No. This is an independent study resource and is not affiliated with or endorsed by any regulator, insurer, or official LLQP provider.'
  },
  {
    question: 'Will this guarantee I pass?',
    answer:
      'No. No study aid can guarantee a pass. Your result depends on your preparation, exam readiness, and compliance with your official curriculum requirements.'
  },
  {
    question: 'Is this for Life Insurance only?',
    answer:
      'Yes. This version is focused on the Life Insurance LLQP track and is designed to support that module specifically.'
  },
  {
    question: 'How do I access the download?',
    answer:
      'After checkout, you receive instant access to the PDF download link on the confirmation screen and by email from the checkout provider.'
  },
  {
    question: 'Can I use it on mobile?',
    answer:
      'Yes. The PDF works on phones, tablets, and desktop devices. You can read it in any standard PDF app.'
  },
  {
    question: 'Refund policy?',
    answer:
      'Placeholder policy: if you have a technical issue accessing your file, contact support within 7 days and we will resolve access or issue a refund where appropriate.'
  },
  {
    question: 'How often is it updated?',
    answer:
      'The guide is reviewed periodically for clarity and relevance. Major updates are announced on the product page and delivered to recent customers when applicable.'
  },
  {
    question: 'Can I share it?',
    answer:
      'No. Your purchase is for personal, individual use only and may not be redistributed, reposted, or shared.'
  },
  {
    question: 'Who is it for?',
    answer:
      'It is built for LLQP candidates who want a focused review format, especially busy learners balancing work and evening study sessions.'
  }
] as const;
