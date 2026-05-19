import { weeklyNewsItems, type WeeklyNewsItem } from '@/data/weeklyNews';
import { normalizeHeadline } from '@/lib/news/feed-utils';
import { isLiveNewsEnabled } from '@/lib/news/runtime';

type PublishedNewsArticle = {
  slug: string;
  title: string;
  publishedAt: Date;
  summary: string;
  whyItMatters: string;
  llqpAngle: string | null;
  tagsJson: string | null;
};

function categoryFromTags(tags: string | null): WeeklyNewsItem['category'] {
  const normalized = (tags ?? '').toLowerCase();
  if (normalized.includes('conduct') || normalized.includes('suitability') || normalized.includes('disclosure')) return 'Professional Conduct';
  if (normalized.includes('strategy') || normalized.includes('timed')) return 'Study Strategy';
  if (normalized.includes('exam')) return 'Exam Update';
  if (normalized.includes('market')) return 'Market Desk';
  return 'Exam Insight';
}

function toWeeklyNewsItem(article: PublishedNewsArticle): WeeklyNewsItem {
  const category = categoryFromTags(article.tagsJson);

  return {
    slug: article.slug,
    title: article.title,
    category,
    date: article.publishedAt.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' }),
    summary: article.summary,
    whyItMatters: article.whyItMatters,
    examConnection: article.llqpAngle || 'Life insurance concepts, advisor judgment, and exam-style scenario reasoning',
    cta: category === 'Study Strategy' ? 'Try timed exam mode' : category === 'Professional Conduct' ? 'Review conduct questions' : 'Read the study insight',
    href: `/news/${article.slug}`
  };
}

function headlineTokens(title: string) {
  return normalizeHeadline(title)
    .split(' ')
    .filter((token) => token.length > 2 && !['the', 'and', 'for', 'with', 'from', 'plans'].includes(token));
}

function isNearDuplicateTitle(left: string, right: string) {
  const leftKey = normalizeHeadline(left);
  const rightKey = normalizeHeadline(right);

  if (!leftKey || !rightKey) return false;
  if (leftKey === rightKey) return true;
  if (leftKey.includes(rightKey) || rightKey.includes(leftKey)) return true;

  const leftTokens = headlineTokens(left);
  const rightTokens = headlineTokens(right);
  if (leftTokens.length < 4 || rightTokens.length < 4) return false;

  const rightSet = new Set(rightTokens);
  const overlap = leftTokens.filter((token) => rightSet.has(token)).length;
  const smaller = Math.min(leftTokens.length, rightTokens.length);

  return overlap / smaller >= 0.62;
}

function dedupeWeeklyNewsItems(items: WeeklyNewsItem[]) {
  const accepted: WeeklyNewsItem[] = [];

  for (const item of items) {
    if (accepted.some((existing) => existing.slug === item.slug || isNearDuplicateTitle(existing.title, item.title))) {
      continue;
    }
    accepted.push(item);
  }

  return accepted;
}

export async function getPublishedNewsItems(): Promise<WeeklyNewsItem[]> {
  if (!isLiveNewsEnabled() || !process.env.DATABASE_URL) {
    return [];
  }

  try {
    const { db } = await import('@/lib/db');
    const dbItems = await db.newsArticle.findMany({
      where: { status: 'APPROVED' },
      orderBy: [{ publishedAt: 'desc' }],
      take: 8,
      select: {
        slug: true,
        title: true,
        publishedAt: true,
        summary: true,
        whyItMatters: true,
        llqpAngle: true,
        tagsJson: true
      }
    });

    return dedupeWeeklyNewsItems(dbItems.map(toWeeklyNewsItem));
  } catch (error) {
    console.error('News DB fetch failed. Falling back to static weekly news.', error);
    return [];
  }
}

export async function getWeeklyNewsItems(): Promise<WeeklyNewsItem[]> {
  const dbItems = await getPublishedNewsItems();
  if (dbItems.length === 0) return weeklyNewsItems;

  const curatedSlugs = new Set(weeklyNewsItems.map((item) => item.slug));
  const supplementalDbItems = dbItems.filter(
    (item) =>
      !curatedSlugs.has(item.slug) &&
      !weeklyNewsItems.some((curated) => isNearDuplicateTitle(curated.title, item.title))
  );

  return dedupeWeeklyNewsItems([...weeklyNewsItems, ...supplementalDbItems]);
}
