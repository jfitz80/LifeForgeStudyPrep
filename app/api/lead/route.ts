import { NextResponse } from 'next/server';

interface LeadSubmission {
  name?: string;
  email: string;
  submittedAt: string;
}

const leadStore: LeadSubmission[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    const submission: LeadSubmission = {
      name: name || undefined,
      email,
      submittedAt: new Date().toISOString()
    };

    leadStore.push(submission);

    console.log('New lead captured:', submission);
    console.log(`Total leads in memory: ${leadStore.length}`);

    // TODO: Forward lead to Mailchimp, ConvertKit, or your CRM.
    // TODO: Persist leads in a database or email service for production durability.

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to process request.' }, { status: 500 });
  }
}
