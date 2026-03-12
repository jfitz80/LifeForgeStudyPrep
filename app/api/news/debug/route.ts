import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const total = await db.newsArticle.count();
    const approved = await db.newsArticle.count({ where: { status: 'APPROVED' } });
    const latest = await db.newsArticle.findMany({
      select: { id: true, title: true, slug: true, status: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    return NextResponse.json({ ok: true, total, approved, latest });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
