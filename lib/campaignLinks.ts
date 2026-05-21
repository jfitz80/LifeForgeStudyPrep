type CampaignParams = {
  source: 'linkedin' | 'tiktok' | 'youtube_shorts' | 'reddit_facebook' | 'website_news' | 'knowledge_hub';
  medium?: 'social' | 'internal' | 'community' | 'video';
  campaign?: string;
  content?: string;
};

const defaultMedium: Record<CampaignParams['source'], NonNullable<CampaignParams['medium']>> = {
  linkedin: 'social',
  tiktok: 'social',
  youtube_shorts: 'video',
  reddit_facebook: 'community',
  website_news: 'internal',
  knowledge_hub: 'internal'
};

export function buildCampaignUrl(href: string, params: CampaignParams) {
  const isExternal = /^https?:\/\//i.test(href);
  const base = isExternal ? href : `https://www.lifeforgeprep.com${href.startsWith('/') ? href : `/${href}`}`;
  const url = new URL(base);

  url.searchParams.set('utm_source', params.source);
  url.searchParams.set('utm_medium', params.medium ?? defaultMedium[params.source]);
  url.searchParams.set('utm_campaign', params.campaign ?? 'exam_trap');
  if (params.content) url.searchParams.set('utm_content', params.content);

  return isExternal ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
}

export const campaignLinks = {
  linkedinHero: buildCampaignUrl('/free-practice', { source: 'linkedin', content: 'hero_cta' }),
  tiktokBio: buildCampaignUrl('/free-practice', { source: 'tiktok', content: 'bio_link' }),
  youtubeShorts: buildCampaignUrl('/free-practice', { source: 'youtube_shorts', content: 'shorts_cta' }),
  communityPost: buildCampaignUrl('/free-practice', { source: 'reddit_facebook', content: 'community_post' }),
  websiteNewsCta: buildCampaignUrl('/free-practice', { source: 'website_news', content: 'article_cta' }),
  knowledgeHubCta: buildCampaignUrl('/free-practice', { source: 'knowledge_hub', content: 'guide_cta' })
} as const;
