import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { marketDeskArticles } from '@/data/marketDeskArticles';
import { newsItems } from '@/data/news';
import { KNOWLEDGE_ARTICLES, KNOWLEDGE_CLUSTERS } from '@/lib/knowledge/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${siteConfig.domain}`;
  const now = new Date();

  const staticRoutes = [
    '/',
    '/foundations',
    '/tools',
    '/market-desk',
    '/news',
    '/news/ontario-llqp-exams-in-person-2026',
    '/news/market-desk',
    '/knowledge',
    '/free-practice',
    '/free-practice/question-of-the-week',
    '/exam-prep',
    '/app',
    '/app/version-5',
    '/about',
    '/support',
    '/privacy',
    '/terms',
    '/disclaimer'
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: now
    })),
    ...newsItems.map((item) => ({
      url: `${base}/news/${item.slug}`,
      lastModified: now
    })),
    ...marketDeskArticles.map((article) => ({
      url: `${base}/news/market-desk/${article.slug}`,
      lastModified: new Date(article.date)
    })),
    ...KNOWLEDGE_CLUSTERS.map((cluster) => ({
      url: `${base}/knowledge/${cluster.slug}`,
      lastModified: now
    })),
    ...KNOWLEDGE_ARTICLES.map((article) => ({
      url: `${base}/knowledge/${article.cluster}/${article.slug}`,
      lastModified: now
    }))
  ];
}
