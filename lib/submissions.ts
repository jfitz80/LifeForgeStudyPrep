import { db } from '@/lib/db';

export type LeadInterest = 'free-pack' | 'newsletter' | 'exam-prep' | 'general';

export type LeadSubmission = {
  name?: string;
  email: string;
  interest: LeadInterest;
  source?: string;
  submittedAt: string;
};

export type SupportIssueType =
  | 'Exam Prep Access'
  | 'App Support'
  | 'Technical Issue'
  | 'General Question'
  | 'Partnership / Business Inquiry';

export type SupportSubmission = {
  name: string;
  email: string;
  issueType: SupportIssueType;
  message: string;
  source?: string;
  submittedAt: string;
};

const memoryLeadStore: Array<LeadSubmission & { id: string }> = [];
const memorySupportStore: Array<SupportSubmission & { id: string }> = [];

function isMissingTableError(error: unknown) {
  return error instanceof Error && /does not exist|no such table|P2021/i.test(error.message);
}

function memoryId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function saveLeadSubmission(submission: LeadSubmission) {
  try {
    return await db.leadCapture.create({
      data: {
        name: submission.name,
        email: submission.email,
        interest: submission.interest,
        source: submission.source,
        submittedAt: new Date(submission.submittedAt)
      }
    });
  } catch (error) {
    if (!isMissingTableError(error)) throw error;
    const fallback = { id: memoryId('lead'), ...submission };
    memoryLeadStore.push(fallback);
    console.warn('LeadCapture table missing; stored lead in memory fallback.', fallback.email);
    return fallback;
  }
}

export async function markLeadDeliveryStatus(id: string, status: 'SENT' | 'FAILED' | 'SKIPPED', error?: string) {
  if (id.startsWith('lead-')) return;
  try {
    await db.leadCapture.update({
      where: { id },
      data: {
        deliveryStatus: status,
        deliveryAttemptedAt: new Date(),
        deliveryError: error ?? null
      }
    });
  } catch (updateError) {
    if (!isMissingTableError(updateError)) {
      console.error('Failed to update lead delivery status', updateError);
    }
  }
}

export async function markLeadCrmStatus(id: string, status: 'SENT' | 'FAILED' | 'SKIPPED', error?: string) {
  if (id.startsWith('lead-')) return;
  try {
    await db.leadCapture.update({
      where: { id },
      data: {
        crmStatus: status,
        crmAttemptedAt: new Date(),
        crmError: error ?? null
      }
    });
  } catch (updateError) {
    if (!isMissingTableError(updateError)) {
      console.error('Failed to update lead CRM status', updateError);
    }
  }
}

export async function saveSupportSubmission(submission: SupportSubmission) {
  try {
    return await db.supportRequest.create({
      data: {
        name: submission.name,
        email: submission.email,
        issueType: submission.issueType,
        message: submission.message,
        source: submission.source,
        submittedAt: new Date(submission.submittedAt)
      }
    });
  } catch (error) {
    if (!isMissingTableError(error)) throw error;
    const fallback = { id: memoryId('support'), ...submission };
    memorySupportStore.push(fallback);
    console.warn('SupportRequest table missing; stored support request in memory fallback.', fallback.email);
    return fallback;
  }
}

export async function markSupportNotificationStatus(id: string, status: 'SENT' | 'FAILED' | 'SKIPPED', error?: string) {
  if (id.startsWith('support-')) return;
  try {
    await db.supportRequest.update({
      where: { id },
      data: {
        notificationStatus: status,
        notificationAttemptedAt: new Date(),
        notificationError: error ?? null
      }
    });
  } catch (updateError) {
    if (!isMissingTableError(updateError)) {
      console.error('Failed to update support notification status', updateError);
    }
  }
}

export async function markSupportCrmStatus(id: string, status: 'SENT' | 'FAILED' | 'SKIPPED', error?: string) {
  if (id.startsWith('support-')) return;
  try {
    await db.supportRequest.update({
      where: { id },
      data: {
        crmStatus: status,
        crmAttemptedAt: new Date(),
        crmError: error ?? null
      }
    });
  } catch (updateError) {
    if (!isMissingTableError(updateError)) {
      console.error('Failed to update support CRM status', updateError);
    }
  }
}
