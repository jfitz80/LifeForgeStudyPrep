import { siteConfig } from '@/config/site';
import type { LeadSubmission, SupportSubmission } from '@/lib/submissions';

export type DeliveryResult = {
  status: 'SENT' | 'FAILED' | 'SKIPPED';
  error?: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;
const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
const freePackUrl = process.env.LEAD_MAGNET_URL || `${siteConfig.siteUrl}/free-pack`;
const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL || siteConfig.supportEmail;

async function sendResendEmail(to: string, subject: string, html: string): Promise<DeliveryResult> {
  if (!resendApiKey || !resendFromEmail) {
    return { status: 'SKIPPED', error: 'Missing RESEND_API_KEY or RESEND_FROM_EMAIL.' };
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
        to: [to],
        subject,
        html
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return { status: 'FAILED', error: text || 'Resend request failed.' };
    }

    return { status: 'SENT' };
  } catch (error) {
    return { status: 'FAILED', error: error instanceof Error ? error.message : 'Unknown email error.' };
  }
}

export async function sendCrmWebhook(kind: 'lead' | 'support', payload: Record<string, unknown>): Promise<DeliveryResult> {
  if (!crmWebhookUrl) {
    return { status: 'SKIPPED', error: 'Missing CRM_WEBHOOK_URL.' };
  }

  try {
    const response = await fetch(crmWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, payload })
    });

    if (!response.ok) {
      const text = await response.text();
      return { status: 'FAILED', error: text || 'CRM webhook failed.' };
    }

    return { status: 'SENT' };
  } catch (error) {
    return { status: 'FAILED', error: error instanceof Error ? error.message : 'Unknown CRM webhook error.' };
  }
}

export async function sendLeadMagnetEmail(lead: LeadSubmission): Promise<DeliveryResult> {
  const greeting = lead.name ? `Hi ${lead.name},` : 'Hi,';
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1F2A44;max-width:640px;margin:0 auto;">
      <h1 style="font-size:24px;margin-bottom:12px;">Your LifeForgePrep free pack</h1>
      <p>${greeting}</p>
      <p>Thanks for requesting the free LifeForgePrep pack. You can access it here:</p>
      <p><a href="${freePackUrl}" style="display:inline-block;background:#2FAF9E;color:#ffffff;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:700;">Open the free pack</a></p>
      <p>This includes 5 exam-style questions plus a product comparison cheat sheet to help you build practical life insurance understanding.</p>
      <p>When you are ready for more, you can continue with free practice or move into full exam prep.</p>
      <p><a href="${siteConfig.siteUrl}/free-practice">Start Free Practice</a> · <a href="${siteConfig.checkoutUrl}">Buy Exam Prep</a></p>
    </div>
  `;

  return sendResendEmail(lead.email, 'Your LifeForgePrep free pack', html);
}

export async function notifyLeadSubmission(lead: LeadSubmission): Promise<DeliveryResult> {
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1F2A44;max-width:640px;margin:0 auto;">
      <h1 style="font-size:20px;margin-bottom:12px;">New lead captured</h1>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Name:</strong> ${lead.name ?? 'Not provided'}</p>
      <p><strong>Interest:</strong> ${lead.interest}</p>
      <p><strong>Source:</strong> ${lead.source ?? 'Unknown'}</p>
      <p><strong>Submitted at:</strong> ${lead.submittedAt}</p>
    </div>
  `;

  return sendResendEmail(notificationEmail, `New lead: ${lead.email}`, html);
}

export async function notifySupportSubmission(request: SupportSubmission): Promise<DeliveryResult> {
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1F2A44;max-width:640px;margin:0 auto;">
      <h1 style="font-size:20px;margin-bottom:12px;">New support request</h1>
      <p><strong>Name:</strong> ${request.name}</p>
      <p><strong>Email:</strong> ${request.email}</p>
      <p><strong>Issue type:</strong> ${request.issueType}</p>
      <p><strong>Source:</strong> ${request.source ?? 'Unknown'}</p>
      <p><strong>Submitted at:</strong> ${request.submittedAt}</p>
      <hr style="margin:16px 0;border:none;border-top:1px solid #d1d5db;" />
      <p>${request.message.replace(/\n/g, '<br/>')}</p>
    </div>
  `;

  return sendResendEmail(notificationEmail, `Support request: ${request.issueType}`, html);
}
