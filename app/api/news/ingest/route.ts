import { NextResponse } from 'next/server';
import { ingestNewsJob } from '@/lib/news/ingest';

export async function POST() {
  const result = await ingestNewsJob();

  if (!result.ok) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result, { status: 200 });
}
