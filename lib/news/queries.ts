import { db } from '@/lib/db';

function slugBase(slug: string) {
  return slug.replace(/-\d{6}$/, '');
}

export async function getNewsHubData(search?: string) {
  const where = search
    ? {
        status: 'APPROVED' as const,
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { summary: { contains: search, mode: 'insensitive' as const } },
          { excerpt: { contains: search, mode: 'insensitive' as const } },
          { whyItMatters: { contains: search, mode: 'insensitive' as const } }
        ]
      }
    : {
        status: 'APPROVED' as const
      };

  try {
    const [featured, items] = await Promise.all([
      db.newsArticle.findMany({
        where: { ...where, isFeatured: true },
        include: { source: true },
        orderBy: [{ publishedAt: 'desc' }],
        take: 3
      }),
      db.newsArticle.findMany({
        where,
        include: { source: true },
        orderBy: [{ publishedAt: 'desc' }],
        take: 120
      })
    ]);

    return {
      featured: featured.length ? featured : items.slice(0, 3),
      items
    };
  } catch (error) {
    console.error('getNewsHubData failed:', error);
    throw error;
  }
}

export async function getNewsArticleBySlug(slug: string) {
  try {
    const exactApproved = await db.newsArticle.findFirst({
      where: { slug, status: 'APPROVED' },
      include: { source: true }
    });

    if (exactApproved) return exactApproved;

    const base = slugBase(slug);

    const relatedApproved = await db.newsArticle.findFirst({
      where: {
        status: 'APPROVED',
        slug: { startsWith: base }
      },
      include: { source: true },
      orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }]
    });

    if (relatedApproved) return relatedApproved;

    return await db.newsArticle.findFirst({
      where: { slug },
      include: { source: true }
    });
  } catch (error) {
    console.error('getNewsArticleBySlug failed:', error);
    return null;
  }
}

export async function getRelatedNews(slug: string) {
  try {
    return await db.newsArticle.findMany({
      where: {
        slug: { not: slug },
        status: 'APPROVED'
      },
      include: { source: true },
      orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
      take: 4
    });
  } catch (error) {
    console.error('getRelatedNews failed:', error);
    return [];
  }
}

export async function getAdminNewsData() {
  try {
    const [articles, sources, jobs] = await Promise.all([
      db.newsArticle.findMany({
        include: { source: true },
        orderBy: [{ updatedAt: 'desc' }],
        take: 120
      }),
      db.newsSource.findMany({ orderBy: [{ priority: 'desc' }, { name: 'asc' }] }),
      db.ingestionJob.findMany({ orderBy: [{ startedAt: 'desc' }], take: 30 })
    ]);

    return { articles, sources, jobs };
  } catch (error) {
    console.error('getAdminNewsData failed:', error);
    return { articles: [], sources: [], jobs: [] };
  }
}
