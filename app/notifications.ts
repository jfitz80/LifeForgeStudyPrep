import { siteConfig } from '@/config/site';
import type { LeadInterest, SupportIssueType } from '@/lib/submissions';

type DeliveryStatus = 'SENT' | 'FAILED' | 'SKIPPED';

type DeliveryResult = {
  status: DeliveryStatus;
  error?: string;
};

type LeadPayload = {
  name?: string;
  email: string;
  interest: LeadInterest;
  source?: string;
  submittedAt: string;
};

type SupportPayload = {
  name: string;
  email: string;
  issueType: SupportIssueType;
  message: string;
  source?: string;
  submittedAt: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;
const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;

function getLeadMagnetUrl() {
  return `${siteConfig.siteUrl}${siteConfig.leadMagnetPath}`;
}

async function sendResendEmail(args: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<DeliveryResult> {
  if (!resendApiKey || !resendFromEmail) {
    return { status: 'SKIPPED' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: args.to,
        subject: args.subject,
        html: args.html,
        reply_to: args.replyTo
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        status: 'FAILED',
        error: `Resend request failed: ${response.status} ${text}`
      };
    }

    return { status: 'SENT' };
  } catch (error) {
    return {
      status: 'FAILED',
      error: error instanceof Error ? error.message : 'Unknown email error'
    };
  }
}

export async function sendLeadMagnetEmail(payload: LeadPayload): Promise<DeliveryResult> {
  if (!['free-pack', 'newsletter', 'exam-prep'].includes(payload.interest)) {
    return { status: 'SKIPPED' };
  }

  const firstName = payload.name?.trim()?.split(' ')[0] ?? 'there';
  const freePackUrl = getLeadMagnetUrl();

  return sendResendEmail({
    to: payload.email,
    subject: 'Your LifeForgePrep free pack is ready',
    html: `
      <div style="font-family: Arial, sans-serif; color: #1F2A44; line-height: 1.6;">
        <h1 style="margin-bottom: 12px;">Your free LifeForgePrep pack is ready</h1>
        <p>Hi ${firstName},</p>
        <p>
          Thanks for your interest in LifeForgePrep. You can access your free exam-style questions
          and product comparison cheat sheet here:
        </p>
        <p>
          <a
            href="${freePackUrl}"
            style="display:inline-block;background:#2FAF9E;color:#ffffff;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:600;"
          >
            Open Free Pack
          </a>
        </p>
        <p>
          If you want more practice after that, the next best step is to continue with free practice
          or move into the full Exam Prep path.
        </p>
        <p>
          <a href="${siteConfig.siteUrl}/free-practice">Free Practice</a>
          &nbsp;|&nbsp;
          <a href="${siteConfig.siteUrl}/exam-prep">Exam Prep</a>
        </p>
        <p style="font-size: 14px; color: #4A5568;">
          This material is for educational purposes only and does not constitute legal, tax, or financial advice.
        </p>
      </div>
    `
  });
}

export async function notifyLeadSubmission(payload: LeadPayload): Promise<DeliveryResult> {
  return sendResendEmail({
    to: siteConfig.supportEmail,
    subject: `New lead capture: ${payload.interest}`,
    replyTo: payload.email,
    html: `
      <div style="font-family: Arial, sans-serif; color: #1F2A44; line-height: 1.6;">
        <h2>New lead capture</h2>
        <p><strong>Name:</strong> ${payload.name ?? 'Not provided'}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Interest:</strong> ${payload.interest}</p>
        <p><strong>Source:</strong> ${payload.source ?? 'Not provided'}</p>
        <p><strong>Submitted:</strong> ${payload.submittedAt}</p>
      </div>
    `
  });
}

export async function notifySupportSubmission(payload: SupportPayload): Promise<DeliveryResult> {
  return sendResendEmail({
    to: siteConfig.supportEmail,
    subject: `Support request: ${payload.issueType}`,
    replyTo: payload.email,
    html: `
      <div style="font-family: Arial, sans-serif; color: #1F2A44; line-height: 1.6;">
        <h2>New support request</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Issue type:</strong> ${payload.issueType}</p>
        <p><strong>Source:</strong> ${payload.source ?? 'Not provided'}</p>
        <p><strong>Submitted:</strong> ${payload.submittedAt}</p>
        <hr style="margin: 16px 0;" />
        <p style="white-space: pre-wrap;">${payload.message}</p>
      </div>
    `
  });
}

export async function sendCrmWebhook(
  type: 'lead' | 'support',
  payload: LeadPayload | SupportPayload
): Promise<DeliveryResult> {
  if (!crmWebhookUrl) {
    return { status: 'SKIPPED' };
  }

  try {
    const response = await fetch(crmWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type,
        submittedAt: new Date().toISOString(),
        payload
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        status: 'FAILED',
        error: `CRM webhook failed: ${response.status} ${text}`
      };
    }

    return { status: 'SENT' };
  } catch (error) {
    return {
      status: 'FAILED',
      error: error instanceof Error ? error.message : 'Unknown CRM error'
    };
  }
}
