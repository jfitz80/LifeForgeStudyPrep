import Parser from 'rss-parser';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { NEWS_ENGINE_CONFIG, NEWS_FEED_SOURCES } from './config';
import { buildEditorial, buildTags, sanitizeExcerpt } from './editorial';
import { isRelevant, getRelevanceScore } from './relevance';
import { toSlug } from './slug';

type FeedItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
  creator?: string;
  author?: string;
  enclosure?: { url?: string };
};

const parser = new Parser<Record<string, never>, FeedItem>({
  timeout: 10000,
  headers: {
    'User-Agent': 'LifeForgeNewsBot/1.0'
  }
});

function sanitizeXmlEntities(xml: string) {
  return xml.replace(/&(?!(?:amp|lt|gt|quot|apos|#[0-9]+|#x[0-9A-Fa-f]+);)/g, '&amp;');
}

async function parseFeedWithFallback(url: string) {
  try {
    return await parser.parseURL(url);
  } catch {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'LifeForgeNewsBot/1.0' },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Feed request failed (${response.status}) for ${url}`);
    }

    const raw = await response.text();
    const sanitized = sanitizeXmlEntities(raw);
    return parser.parseString(sanitized);
  }
}

function normalizeUrl(raw?: string | null) {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('//')) return `https:${trimmed}`;

  try {
    const url = new URL(trimmed);
    if (!url.protocol.startsWith('http')) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function normalizeSummary(text: string) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s([,.!?;:])/g, '$1')
    .trim();
}

function isLowFitHeadline(title: string) {
  const t = title.toLowerCase();

  const blocked = [
    'astrology',
    'horoscope',
    'celebrity',
    'gossip',
    'lottery',
    'crypto price prediction',
    'movie review',
    'sports betting'
  ];

  return blocked.some((x) => t.includes(x));
}

async function resolvePublisherUrl(rawUrl: string) {
  const normalized = normalizeUrl(rawUrl);
  if (!normalized) return null;

  try {
    const parsed = new URL(normalized);
    if (!parsed.hostname.includes('news.google.com')) {
      return normalized;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);

    try {
      const response = await fetch(normalized, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'LifeForgeNewsBot/1.0' }
      });

      const finalUrl = normalizeUrl(response.url);
      return finalUrl ?? normalized;
    } finally {
      clearTimeout(timer);
    }
  } catch {
    return normalized;
  }
}

async function upsertSources() {
  for (const source of NEWS_FEED_SOURCES) {
    await db.newsSource.upsert({
      where: { slug: source.slug },
      update: {
        name: source.name,
        type: source.type,
        feedUrl: source.feedUrl,
        homepageUrl: source.homepageUrl,
        isActive: source.isActive,
        requiresReview: source.requiresReview,
        priority: source.priority
      },
      create: {
        name: source.name,
        slug: source.slug,
        type: source.type,
        feedUrl: source.feedUrl,
        homepageUrl: source.homepageUrl,
        isActive: source.isActive,
        requiresReview: source.requiresReview,
        priority: source.priority
      }
    });
  }
}

function safeDate(item: FeedItem) {
  const raw = item.isoDate ?? item.pubDate;
  if (!raw) return new Date();
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function dedupeSlug(base: string, fallback: string) {
  const clean = toSlug(base || fallback);
  return clean || `news-${Date.now()}`;
}

export async function ingestNewsJob() {
  await upsertSources();

  const job = await db.ingestionJob.create({
    data: { startedAt: new Date() }
  });

  let itemsFetched = 0;
  let itemsAccepted = 0;
  let itemsCreated = 0;
  let itemsRejected = 0;
  let failedItems = 0;

  try {
    const sources = await db.newsSource.findMany({
      where: { isActive: true },
      orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }]
    });

    for (const source of sources) {
      let feed;
      try {
        feed = await parseFeedWithFallback(source.feedUrl);
      } catch {
        failedItems += 1;
        continue;
      }

      const list = (feed.items ?? []).slice(0, NEWS_ENGINE_CONFIG.maxItemsPerSource);

      for (const item of list) {
        itemsFetched += 1;
        const title = item.title?.trim() ?? '';
        const resolvedUrl = await resolvePublisherUrl(item.link ?? '');
        const canonicalUrl = resolvedUrl ?? '';

        if (!title || !canonicalUrl) {
          itemsRejected += 1;
          continue;
        }

        if (isLowFitHeadline(title)) {
          itemsRejected += 1;
          continue;
        }

        const excerpt = sanitizeExcerpt(item.contentSnippet ?? item.content ?? '');
        if (!isRelevant(title, excerpt)) {
          itemsRejected += 1;
          continue;
        }

        const relevanceScore = getRelevanceScore(title, excerpt);
        const editorial = buildEditorial(title, excerpt);
        const tags = buildTags(title, excerpt);

        const slugBase = dedupeSlug(title, canonicalUrl);
        const uniqueSlug = `${slugBase}-${safeDate(item).getTime().toString().slice(-6)}`;

        const status =
          source.requiresReview || NEWS_ENGINE_CONFIG.manualReviewDefault ? 'PENDING' : 'APPROVED';

        const payload: Prisma.NewsArticleCreateInput = {
          title,
          slug: uniqueSlug,
          canonicalUrl,
          author: item.creator ?? item.author ?? null,
          publishedAt: safeDate(item),
          excerpt,
          imageUrl: item.enclosure?.url ?? null,
          summary: normalizeSummary(editorial.summary),
          whyItMatters: normalizeSummary(editorial.whyItMatters),
          whoItAffects: normalizeSummary(
            editorial.whoItAffects ||
              'This can affect policyholders, applicants, beneficiaries, and advisors.'
          ),
          llqpAngle: normalizeSummary(
            editorial.llqpAngle ||
              'Use this topic to review policy terms, underwriting logic, claims handling, and client suitability in scenario-style questions.'
          ),
          status,
          isFeatured: false,
          relevanceScore,
          tagsJson: JSON.stringify(tags),
          attributionLabel: source.name,
          source: { connect: { id: source.id } }
        };

        try {
          await db.newsArticle.create({ data: payload });
          itemsAccepted += 1;
          itemsCreated += 1;
        } catch (error) {
          failedItems += 1;
          if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')) {
            throw error;
          }
        }

        if (itemsCreated >= NEWS_ENGINE_CONFIG.maxArticlesPerRun) break;
      }

      if (itemsCreated >= NEWS_ENGINE_CONFIG.maxArticlesPerRun) break;
    }

    await db.ingestionJob.update({
      where: { id: job.id },
      data: {
        finishedAt: new Date(),
        status: 'SUCCESS',
        itemsFetched,
        itemsAccepted,
        itemsCreated,
        itemsRejected,
        failedItems,
        detailsJson: JSON.stringify({ sources: NEWS_FEED_SOURCES.map((s) => s.slug) })
      }
    });

    return { ok: true, jobId: job.id, itemsFetched, itemsCreated };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown ingestion error';

    await db.ingestionJob.update({
      where: { id: job.id },
      data: {
        finishedAt: new Date(),
        status: 'FAILED',
        itemsFetched,
        itemsAccepted,
        itemsCreated,
        itemsRejected,
        failedItems,
        errorMessage: message
      }
    });

    return { ok: false, jobId: job.id, error: message };
  }
}
