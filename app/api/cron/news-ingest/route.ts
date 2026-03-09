import { NextResponse } from 'next/server';
import { isCronAuthorized, isLiveNewsEnabled } from '@/lib/news/runtime';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!isLiveNewsEnabled()) {
    return NextResponse.json({ ok: false, error: 'Live news mode is disabled.' }, { status: 503 });
  }

  if (!isCronAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { ingestNewsJob } = await import('@/lib/news/ingest');
    const result = await ingestNewsJob();

    if (!result.ok) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json({ schedule: 'daily', ...result }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Cron ingest failed.' }, { status: 500 });
  }
}
