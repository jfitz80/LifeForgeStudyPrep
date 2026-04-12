type HubItemLike = {
  slug: string;
  title: string;
  summary: string;
  publishedAtLabel?: string;
  canonicalUrl?: string | null;
  source?: string;
  tag?: string;
  whyThisMatters?: string;
  isFeatured?: boolean;
  publishedAtMs?: number;
};

const SOURCE_SUFFIX_PATTERN =
  /\s+-\s+(advisor\.ca|investment executive|insurance business|google news|google news - [a-z ]+|life insurance|insurance claims|reuters|associated press|bloomberg|yahoo finance|msn|canadian underwriter|fanews\.co\.za|조선일보)$/i;

const STRONG_POSITIVE_PATTERNS = [
  /life insurance/,
  /\bannuit(?:y|ies)\b/,
  /\bunderwriting\b/,
  /\bclaim(?:s)?\b/,
  /\bbeneficiar(?:y|ies)\b/,
  /\bpremium\b/,
  /\bpolicy\b/,
  /\bcoverage\b/,
  /\binsurability\b/,
  /\badvisor\b/,
  /\bcompliance\b/,
  /\bregulat(?:ion|ory)?\b/,
  /\bpricing\b/,
  /\bproduct(?:s| design)?\b/,
  /\bllqp\b/
] as const;

const STRONG_NEGATIVE_PATTERNS = [
  /\bseries tie\b/,
  /\bcoach\b/,
  /\bplayer\b/,
  /\bgoal\b/,
  /\bseason\b/,
  /\bmatch\b/,
  /\btournament\b/,
  /\bcomeback\b/,
  /\bscore(?:d|s|ing)?\b/,
  /\b34 point\b/,
  /\b34 points\b/,
  /\bexplosion\b/,
  /\bbasketball\b/,
  /\bdriver behaviour\b/
] as const;

function normalizeWords(value: string): string {
  return value
    .toLowerCase()
    .replace(/[–—-]/g, ' ')
    .replace(/(\d+)\s+point(s)?/g, '$1 points')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractDomain(url: string | null | undefined): string {
  if (!url) return '';

  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

function sourcePreference(source: string | undefined): number {
  const normalized = (source ?? '').toLowerCase();

  if (!normalized) return 0;
  if (normalized.includes('google news')) return -2;
  if (normalized.includes('reuters') || normalized.includes('associated press') || normalized.includes('bloomberg')) {
    return 2;
  }
  if (normalized.includes('advisor') || normalized.includes('investment executive') || normalized.includes('underwriter')) {
    return 3;
  }

  return 1;
}

function buildStoryFingerprint(item: HubItemLike): string {
  const headline = normalizeHeadline(item.title);
  const summaryTokens = normalizeSummary(item.summary).split(' ').slice(0, 12).join(' ');
  const domain = extractDomain(item.canonicalUrl);
  return `${headline}|${summaryTokens}|${domain}`;
}

export function normalizeHeadline(title: string): string {
  return normalizeWords(title.replace(SOURCE_SUFFIX_PATTERN, '').split(' - ')[0] ?? title);
}

export function normalizeSummary(summary: string): string {
  return normalizeWords(summary);
}

export function buildTrendingTopics<T extends Pick<HubItemLike, 'title' | 'tag'>>(items: T[]): string[] {
  const text = items.slice(0, 20).map((item) => `${item.title} ${item.tag ?? ''}`).join(' ').toLowerCase();
  const topics: string[] = [];

  if (/(ai|automation|digital|insurtech)/.test(text)) topics.push('AI in underwriting');
  if (/(premium|pricing|rate|cost)/.test(text)) topics.push('Premium increases');
  if (/(regulat|policy|compliance|rule)/.test(text)) topics.push('Regulatory changes');
  if (/(claim|litigation|lawsuit)/.test(text)) topics.push('Claims disputes');
  if (/(underwriting|risk)/.test(text)) topics.push('Underwriting trends');

  if (topics.length === 0) {
    return ['AI in underwriting', 'Premium increases', 'Regulatory changes'];
  }

  return topics.slice(0, 5);
}

export function scoreNewsRelevance(item: HubItemLike): number {
  const text = `${item.title} ${item.summary} ${item.tag ?? ''} ${item.source ?? ''} ${item.whyThisMatters ?? ''}`.toLowerCase();

  let score = 0;

  for (const pattern of STRONG_POSITIVE_PATTERNS) {
    if (pattern.test(text)) score += 2;
  }

  for (const pattern of STRONG_NEGATIVE_PATTERNS) {
    if (pattern.test(text)) score -= 3;
  }

  if (/\binsurance\b/.test(text)) score += 1;
  if (/\bhealth insurance\b/.test(text)) score -= 1;
  if ((item.source ?? '').toLowerCase().includes('google news')) score -= 1;
  if (/\bpolicy\b|\bbeneficiary\b|\bunderwriting\b|\bclaims\b|\bannuity\b/.test(text)) score += 1;

  return score;
}

export function isRelevantNewsItem(item: HubItemLike): boolean {
  return scoreNewsRelevance(item) >= 2;
}

export function dedupeAndFilterNewsItems<T extends HubItemLike>(items: T[]): T[] {
  const ranked = items
    .map((item) => ({
      item,
      headlineKey: normalizeHeadline(item.title),
      storyFingerprint: buildStoryFingerprint(item),
      canonicalKey: item.canonicalUrl?.toLowerCase().trim() ?? '',
      relevanceScore: scoreNewsRelevance(item),
      sourceScore: sourcePreference(item.source)
    }))
    .filter(({ item, relevanceScore }) => {
      if (item.isFeatured) return true;
      return relevanceScore >= 2;
    })
    .sort((left, right) => {
      if (right.relevanceScore !== left.relevanceScore) return right.relevanceScore - left.relevanceScore;
      if (Boolean(right.item.isFeatured) !== Boolean(left.item.isFeatured)) {
        return Number(Boolean(right.item.isFeatured)) - Number(Boolean(left.item.isFeatured));
      }
      if ((right.item.publishedAtMs ?? 0) !== (left.item.publishedAtMs ?? 0)) {
        return (right.item.publishedAtMs ?? 0) - (left.item.publishedAtMs ?? 0);
      }
      if (right.sourceScore !== left.sourceScore) return right.sourceScore - left.sourceScore;
      return right.item.summary.length - left.item.summary.length;
    });

  const seenSlugs = new Set<string>();
  const seenCanonical = new Set<string>();
  const seenHeadlines = new Set<string>();
  const seenFingerprints = new Set<string>();

  return ranked.flatMap(({ item, canonicalKey, headlineKey, storyFingerprint }) => {
    if (seenSlugs.has(item.slug)) return [];
    if (canonicalKey && seenCanonical.has(canonicalKey)) return [];
    if (headlineKey && seenHeadlines.has(headlineKey)) return [];
    if (storyFingerprint && seenFingerprints.has(storyFingerprint)) return [];

    seenSlugs.add(item.slug);
    if (canonicalKey) seenCanonical.add(canonicalKey);
    if (headlineKey) seenHeadlines.add(headlineKey);
    if (storyFingerprint) seenFingerprints.add(storyFingerprint);

    return [item];
  });
}
