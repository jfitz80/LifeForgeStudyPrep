export const contentMetricsGuide = {
  title: 'Weekly Content Review Guide',
  cadence: 'Review every Sunday before choosing the next weekly brief, question, and exam trap.',
  metrics: [
    {
      label: 'Page views',
      prompt: 'Which weekly pages, Market Desk articles, and Knowledge Hub guides attracted the most visits?'
    },
    {
      label: 'Engagement',
      prompt: 'Which pages kept visitors reading or clicking into another resource?'
    },
    {
      label: 'Quiz starts',
      prompt: 'How many visitors clicked from weekly content into Free Practice or Question of the Week?'
    },
    {
      label: 'Quiz completions',
      prompt: 'Which question topics appear to move learners from curiosity into practice?'
    },
    {
      label: 'Answer reveals',
      prompt: 'Which Question of the Week topics created enough interest for visitors to reveal the answer?'
    },
    {
      label: 'Newsletter signups',
      prompt: 'Which pages encouraged visitors to try the weekly insurance brief signup?'
    },
    {
      label: 'App clicks',
      prompt: 'Which weekly content sent learners toward the app page?'
    },
    {
      label: 'Exam prep clicks',
      prompt: 'Which concepts made visitors more likely to explore the Life Insurance module guide?'
    }
  ],
  reviewQuestions: [
    'What was published this week?',
    'What got clicks?',
    'What led to action?',
    'What should be repeated?',
    'What should be retired?',
    'What should become a full guide?'
  ]
} as const;
