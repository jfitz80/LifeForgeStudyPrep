import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ id: string }>;
};

type Payload = {
  isActive?: boolean;
  requiresReview?: boolean;
  priority?: number;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Payload;

    const data: {
      isActive?: boolean;
      requiresReview?: boolean;
      priority?: number;
    } = {};

    if (typeof body.isActive === 'boolean') data.isActive = body.isActive;
    if (typeof body.requiresReview === 'boolean') data.requiresReview = body.requiresReview;
    if (typeof body.priority === 'number' && Number.isFinite(body.priority)) data.priority = body.priority;

    if (!Object.keys(data).length) {
      return NextResponse.json({ error: 'No valid updates provided.' }, { status: 400 });
    }

    const { db } = await import('@/lib/db');

    const source = await db.newsSource.update({
      where: { id },
      data
    });

    return NextResponse.json({ source });
  } catch {
    return NextResponse.json({ error: 'Unable to update source.' }, { status: 500 });
  }
}
