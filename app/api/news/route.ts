import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim() ?? '';

  try {
    const { getNewsHubData } = await import('@/lib/news/queries');
    const data = await getNewsHubData(query || undefined);

    return NextResponse.json({
      featured: data.featured,
      items: data.items,
      count: data.items.length
    });
  } catch {
    return NextResponse.json({
      featured: [],
      items: [],
      count: 0
    });
  }
}
