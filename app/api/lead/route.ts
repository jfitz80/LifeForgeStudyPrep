import { NextResponse } from 'next/server';
import { saveLeadSubmission, type LeadInterest } from '@/lib/submissions';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      interest?: LeadInterest;
      source?: string;
    };

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const interest = body.interest ?? 'general';
    const source = typeof body.source === 'string' ? body.source.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    saveLeadSubmission({
      name: name || undefined,
      email,
      interest,
      source: source || undefined,
      submittedAt: new Date().toISOString()
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to process request.' }, { status: 500 });
  }
}
