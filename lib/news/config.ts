export type FeedSourceConfig = {
  name: string;
  slug: string;
  type: 'rss';
  feedUrl: string;
  homepageUrl?: string;
  isActive: boolean;
  requiresReview: boolean;
  priority: number;
};

export const NEWS_ENGINE_CONFIG = {
  manualReviewDefault: true,
  maxItemsPerSource: 15,
  maxArticlesPerRun: 60,
  keywordBoosts: [
    'life insurance',
    'term life',
    'whole life',
    'beneficiary',
    'underwriting',
    'insurance premium',
    'policyholder',
    'death benefit',
    'claims',
    'annuity',
    'LLQP',
    'licensing exam'
  ]
} as const;

export const NEWS_FEED_SOURCES: FeedSourceConfig[] = [
  {
    name: 'Google News - Life Insurance',
    slug: 'google-news-life-insurance',
    type: 'rss',
    feedUrl: 'https://news.google.com/rss/search?q=life+insurance&hl=en-CA&gl=CA&ceid=CA:en',
    homepageUrl: 'https://news.google.com',
    isActive: true,
    requiresReview: true,
    priority: 10
  },
  {
    name: 'Google News - Insurance Claims',
    slug: 'google-news-insurance-claims',
    type: 'rss',
    feedUrl: 'https://news.google.com/rss/search?q=life+insurance+claims&hl=en-CA&gl=CA&ceid=CA:en',
    homepageUrl: 'https://news.google.com',
    isActive: true,
    requiresReview: true,
    priority: 9
  },
  {
    name: 'Insurance Journal - Life Insurance',
    slug: 'insurance-journal-life',
    type: 'rss',
    feedUrl: 'https://www.insurancejournal.com/topics/life-insurance/feed/',
    homepageUrl: 'https://www.insurancejournal.com',
    isActive: true,
    requiresReview: true,
    priority: 8
  }
];
