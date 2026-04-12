import { NextResponse } from 'next/server';
import {
  markSupportCrmStatus,
  markSupportNotificationStatus,
  saveSupportSubmission,
  type SupportIssueType
} from '@/lib/submissions';
import { notifySupportSubmission, sendCrmWebhook } from '@/lib/notifications';

const validIssueTypes = new Set<SupportIssueType>([
  'Exam Prep Access',
  'App Support',
  'Technical Issue',
  'General Question',
  'Partnership / Business Inquiry'
]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      issueType?: SupportIssueType;
      message?: string;
      source?: string;
    };

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const issueType = body.issueType;
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const source = typeof body.source === 'string' ? body.source.trim() : '';

    if (!name) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }
    if (!issueType || !validIssueTypes.has(issueType)) {
      return NextResponse.json({ error: 'Issue type is required.' }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ error: 'Please provide a fuller message.' }, { status: 400 });
    }

    const submissionPayload = {
      name,
      email,
      issueType,
      message,
      source: source || undefined,
      submittedAt: new Date().toISOString()
    };

    const submission = await saveSupportSubmission(submissionPayload);
    const notifyResult = await notifySupportSubmission(submissionPayload);
    await markSupportNotificationStatus(submission.id, notifyResult.status, notifyResult.error);

    const crmResult = await sendCrmWebhook('support', submissionPayload);
    await markSupportCrmStatus(submission.id, crmResult.status, crmResult.error);

    return NextResponse.json(
      {
        ok: true,
        notificationStatus: notifyResult.status,
        crmStatus: crmResult.status
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Unable to process request.' }, { status: 500 });
  }
}
