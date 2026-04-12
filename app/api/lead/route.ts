import { NextResponse } from 'next/server';
import { markLeadCrmStatus, markLeadDeliveryStatus, saveLeadSubmission, type LeadInterest } from '@/lib/submissions';
import { notifyLeadSubmission, sendCrmWebhook, sendLeadMagnetEmail } from '@/lib/notifications';

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

    const submission = await saveLeadSubmission({
      name: name || undefined,
      email,
      interest,
      source: source || undefined,
      submittedAt: new Date().toISOString()
    });

    const leadPayload = {
      name: name || undefined,
      email,
      interest,
      source: source || undefined,
      submittedAt: new Date().toISOString()
    };

    const deliveryResult = await sendLeadMagnetEmail(leadPayload);
    await markLeadDeliveryStatus(submission.id, deliveryResult.status, deliveryResult.error);

    const crmResult = await sendCrmWebhook('lead', leadPayload);
    await markLeadCrmStatus(submission.id, crmResult.status, crmResult.error);

    await notifyLeadSubmission(leadPayload);

    return NextResponse.json(
      {
        ok: true,
        deliveryStatus: deliveryResult.status,
        crmStatus: crmResult.status
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Unable to process request.' }, { status: 500 });
  }
}
