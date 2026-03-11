import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'] as const;
type ArticleStatus = (typeof VALID_STATUSES)[number];

type Payload = {
  status?: ArticleStatus;
  isFeatured?: boolean;
};

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Payload;

    const updates: { status?: ArticleStatus; isFeatured?: boolean } = {};

    if (body.status && VALID_STATUSES.includes(body.status)) {
      updates.status = body.status;
    }

    if (typeof body.isFeatured === 'boolean') {
      updates.isFeatured = body.isFeatured;
    }

    if (!Object.keys(updates).length) {
      return NextResponse.json({ error: 'No valid updates provided.' }, { status: 400 });
    }

    const { db } = await import('@/lib/db');

    const article = await db.newsArticle.update({
      where: { id },
      data: updates
    });

    return NextResponse.json({ article });
  } catch {
    return NextResponse.json({ error: 'Unable to update article.' }, { status: 500 });
  }
}

