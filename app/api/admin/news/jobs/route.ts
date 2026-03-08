import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const jobs = await db.ingestionJob.findMany({
      orderBy: [{ startedAt: 'desc' }],
      take: 30
    });

    return NextResponse.json({ jobs });
  } catch {
    return NextResponse.json({ jobs: [] });
  }
}
