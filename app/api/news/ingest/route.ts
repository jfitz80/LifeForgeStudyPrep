import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  // NOTE: Disabled in hosted builds to avoid DB-coupled build/runtime failures.
  // Run ingestion locally via: npm run news:ingest
  // TODO: Re-enable with a production database + secret-protected webhook endpoint.
  return NextResponse.json(
    {
      ok: false,
      error: 'News ingestion endpoint is disabled in this deployment. Run `npm run news:ingest` locally.'
    },
    { status: 501 }
  );
}
