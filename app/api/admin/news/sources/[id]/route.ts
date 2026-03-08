import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

type Payload = {
  isActive?: boolean;
  requiresReview?: boolean;
  priority?: number;
};

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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

  const source = await db.newsSource.update({
    where: { id: params.id },
    data
  });

  return NextResponse.json({ source });
}
