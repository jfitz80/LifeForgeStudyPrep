import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
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
