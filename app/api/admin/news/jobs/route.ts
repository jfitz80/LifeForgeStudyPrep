import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { db } = await import('@/lib/db');

    const jobs = await db.ingestionJob.findMany({
      orderBy: [{ startedAt: 'desc' }],
      take: 30
    });

    return NextResponse.json({ jobs });
  } catch {
    return NextResponse.json({ jobs: [] });
  }
}
