export type WeeklyNewsItem = {
  slug: string;
  title: string;
  category: 'Exam Update' | 'Study Strategy' | 'Professional Conduct' | 'Exam Insight' | 'Market Desk';
  date: string;
  summary: string;
  whyItMatters: string;
  examConnection: string;
  cta: string;
  href: string;
};

export const weeklyNewsTheme = 'LLQP exam preparation is becoming more serious, practical, and conduct-focused.';

export const weeklyNewsItems: WeeklyNewsItem[] = [
  {
    slug: 'ontario-llqp-exams-in-person-2026',
    title: 'Ontario LLQP Exams Are Moving In-Person',
    category: 'Exam Update',
    date: 'Week of May 18, 2026',
    summary:
      'Ontario LLQP online exams are ending July 1, 2026. Candidates should prepare for a more formal in-person exam environment.',
    whyItMatters:
      'This makes timed practice and genuine concept understanding more important than answer memorization.',
    examConnection: 'Exam readiness, professional standards, test-day preparation',
    cta: 'Practice under exam conditions',
    href: '/news/ontario-llqp-exams-in-person-2026'
  },
  {
    slug: 'timed-practice-is-no-longer-optional',
    title: 'Timed Practice Is No Longer Optional',
    category: 'Study Strategy',
    date: 'Week of May 18, 2026',
    summary:
      'Students who only study untimed questions may struggle when the pressure of a formal exam setting is added.',
    whyItMatters:
      'The LLQP is not just about recognizing terms. Candidates need to apply product, ethics, and suitability concepts quickly.',
    examConnection: 'Timed exam strategy, scenario questions, knowledge recall',
    cta: 'Try timed exam mode',
    href: '/app/version-5'
  },
  {
    slug: 'agent-conduct-bigger-focus',
    title: 'Agent Conduct Is Becoming a Bigger Focus',
    category: 'Professional Conduct',
    date: 'Week of May 18, 2026',
    summary:
      'Regulators continue to focus on agent conduct, supervision, disclosure, suitability, and documentation.',
    whyItMatters:
      'New agents need to understand the responsibilities that come after passing the exam.',
    examConnection: 'Ethics, suitability, disclosure, replacement, documentation',
    cta: 'Review conduct questions',
    href: '/free-practice'
  },
  {
    slug: 'why-scenario-based-questions-matter',
    title: 'Why Scenario-Based Questions Matter',
    category: 'Exam Insight',
    date: 'Week of May 18, 2026',
    summary:
      'The hardest exam questions usually test judgment, not memorized definitions.',
    whyItMatters:
      'Students need to understand how concepts behave in real client situations.',
    examConnection: 'Needs analysis, beneficiary ownership, product suitability, replacement risk',
    cta: 'Build deeper understanding',
    href: '/exam-prep'
  },
  {
    slug: 'insurance-news-explained-for-future-agents',
    title: 'Insurance News, Explained for Future Agents',
    category: 'Market Desk',
    date: 'Week of May 18, 2026',
    summary:
      "LifeForgePrep's news digest connects industry headlines back to the concepts students need to know.",
    whyItMatters:
      'This helps students see insurance as a real profession, not just an exam to pass.',
    examConnection: 'Industry awareness, licensing, professional judgment',
    cta: "Read this week's digest",
    href: '/news'
  }
];
