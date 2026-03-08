import { NextResponse } from 'next/server';
import { newsItems } from '@/data/news';
import { isLiveNewsEnabled } from '@/lib/news/runtime';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim().toLowerCase();

  if (!isLiveNewsEnabled()) {
    const staticItems = newsItems.filter((item) => {
      if (!query) return true;
      return (`${item.title} ${item.summary} ${item.tag}`).toLowerCase().includes(query);
    });

    return NextResponse.json({
      mode: 'static',
      items: staticItems,
      featured: staticItems.slice(0, 2),
      count: staticItems.length
    });
  }

  try {
    const { getNewsHubData } = await import('@/lib/news/queries');
    const data = await getNewsHubData(query || undefined);

    return NextResponse.json({
      mode: 'live',
      featured: data.featured,
      items: data.items,
      count: data.items.length
    });
  } catch {
    return NextResponse.json({
      mode: 'fallback',
      featured: newsItems.slice(0, 2),
      items: newsItems,
      count: newsItems.length
    });
  }
}
