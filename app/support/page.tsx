import type { Metadata } from 'next';
import Link from 'next/link';
import SupportContactForm from '@/components/support/SupportContactForm';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Support | LifeForgePrep',
  description: 'Get support for the app, exam prep access, technical issues, and general LifeForgePrep questions.'
};

const faq = [
  {
    question: 'How do I get support?',
    answer: `Use the contact form below or email us directly at ${siteConfig.supportEmail}.`
  },
  {
    question: 'What should I include?',
    answer: 'Include your device, issue type, app version if relevant, and a concise description of the problem or question.'
  },
  {
    question: 'Can I report a bug or suggest a feature?',
    answer: 'Yes. Both bug reports and feature suggestions are useful and help shape future improvements.'
  },
  {
    question: 'How fast do you respond?',
    answer: 'We aim to respond as quickly as possible while reviewing each message carefully.'
  }
] as const;

const supportTopics = [
  'Exam Prep Access',
  'App Support',
  'Technical Issue',
  'General Question',
  'Partnership / Business Inquiry'
] as const;

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Support Center</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Need help with LifeForgePrep?</h1>
          <p className="mt-4 text-base leading-8 text-[#4A5568]">
            Reach out for app help, exam prep access, technical issues, or general questions. For direct contact, email{' '}
            <a href={`mailto:${siteConfig.supportEmail}`} className="font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#1F2A44]">Support topics</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {supportTopics.map((topic) => (
              <article key={topic} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
                <h3 className="text-sm font-semibold text-[#1F2A44]">{topic}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#1F2A44]">Contact form</h2>
          <p className="mt-2 text-sm leading-7 text-[#4A5568]">
            Use the form below for support and business inquiries. This keeps requests structured so they can be reviewed faster.
          </p>
          <SupportContactForm />
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#1F2A44]">What to include</h2>
          <p className="mt-3 text-sm leading-7 text-[#4A5568]">
            To help us assist you faster, include your device type, app version if relevant, and a brief description of the issue.
          </p>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-[#4A5568] md:grid-cols-2">
            {['Device type', 'App version', 'Issue description', 'Steps to reproduce', 'Relevant screenshots if available'].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#1F2A44]">FAQ</h2>
          <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50">
            {faq.map((item) => (
              <details key={item.question} className="group p-4">
                <summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-[#1F2A44]">
                  {item.question}
                  <span className="float-right text-[#2FAF9E] transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-[#4A5568]">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-slate-200 bg-[#F9FAFB] p-4 text-sm text-[#4A5568]">
            <p>
              <span className="font-semibold text-[#1F2A44]">Helpful links:</span>{' '}
              <Link href="/app" className="text-[#2FAF9E] hover:text-[#1F2A44]">App</Link> ·{' '}
              <Link href="/exam-prep" className="text-[#2FAF9E] hover:text-[#1F2A44]">Exam Prep</Link> ·{' '}
              <Link href="/knowledge" className="text-[#2FAF9E] hover:text-[#1F2A44]">Knowledge Hub</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
