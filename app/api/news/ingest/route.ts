import { NextResponse } from 'next/server';
import { isLiveNewsEnabled } from '@/lib/news/runtime';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorized(request: Request) {
  const secret = process.env.NEWS_INGEST_TOKEN;
  if (!secret) return false;

  const headerToken = request.headers.get('x-ingest-token');
  const auth = request.headers.get('authorization');
  const bearer = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

  return headerToken === secret || bearer === secret;
}

export async function POST(request: Request) {
  if (!isLiveNewsEnabled()) {
    return NextResponse.json({ ok: false, error: 'Live news mode is disabled.' }, { status: 503 });
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { ingestNewsJob } = await import('@/lib/news/ingest');
    const result = await ingestNewsJob();

    if (!result.ok) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: 'News ingest failed.' }, { status: 500 });
  }
}
