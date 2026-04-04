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

const leadStore: LeadSubmission[] = [];
const supportStore: SupportSubmission[] = [];

export function saveLeadSubmission(submission: LeadSubmission) {
  leadStore.push(submission);
  console.log('Lead captured:', submission);
  console.log(`Lead count in memory: ${leadStore.length}`);
  return submission;
}

export function saveSupportSubmission(submission: SupportSubmission) {
  supportStore.push(submission);
  console.log('Support request captured:', submission);
  console.log(`Support count in memory: ${supportStore.length}`);
  return submission;
}
