import { NEWS_ENGINE_CONFIG } from './config';

const CORE_TERMS = [
  'life insurance',
  'insurance policy',
  'policyholder',
  'beneficiary',
  'underwriting',
  'claims',
  'premium',
  'annuity',
  'insurance advisor',
  'llqp'
];

export function getRelevanceScore(title: string, excerpt: string) {
  const text = `${title} ${excerpt}`.toLowerCase();

  let score = 0;
  CORE_TERMS.forEach((term) => {
    if (text.includes(term)) score += 3;
  });

  NEWS_ENGINE_CONFIG.keywordBoosts.forEach((term) => {
    if (text.includes(term.toLowerCase())) score += 1;
  });

  if (/auto insurance|home insurance|travel insurance|pet insurance/.test(text)) {
    score -= 5;
  }

  return score;
}

export function isRelevant(title: string, excerpt: string) {
  return getRelevanceScore(title, excerpt) >= 3;
}
