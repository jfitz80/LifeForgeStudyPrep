import { weeklyNewsItems, type WeeklyNewsItem } from '@/data/weeklyNews';
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

    return dbItems.map(toWeeklyNewsItem);
  } catch (error) {
    console.error('News DB fetch failed. Falling back to static weekly news.', error);
    return [];
  }
}

export async function getWeeklyNewsItems(): Promise<WeeklyNewsItem[]> {
  const dbItems = await getPublishedNewsItems();
  if (dbItems.length === 0) return weeklyNewsItems;

  const curatedSlugs = new Set(weeklyNewsItems.map((item) => item.slug));
  const supplementalDbItems = dbItems.filter((item) => !curatedSlugs.has(item.slug));

  return [...weeklyNewsItems, ...supplementalDbItems];
}
