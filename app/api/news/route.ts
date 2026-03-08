import { NextResponse } from 'next/server';
import { getNewsHubData } from '@/lib/news/queries';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim() ?? '';

  const data = await getNewsHubData(query || undefined);

  return NextResponse.json({
    featured: data.featured,
    items: data.items,
    count: data.items.length
  });
}
