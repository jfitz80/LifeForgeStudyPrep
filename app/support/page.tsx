import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';

export const metadata: Metadata = {
  title: 'LifeforgePrep Support',
  description: 'Support for the LifeforgePrep app, technical help, and general inquiries.'
};

const faq = [
  {
    question: 'How do I get support?',
    answer: 'Email us at lifeforgewealth@gmail.com and include a brief summary of your question or issue.'
  },
  {
    question: 'What should I include in my email?',
    answer: 'Please include your device type, app version, and a short description so we can help faster.'
  },
  {
    question: 'Can I report a bug?',
    answer: 'Yes. Bug reports are welcome and helpful. Include screenshots if possible.'
  },
  {
    question: 'Can I suggest a feature?',
    answer: 'Yes. We review user suggestions as we plan future app improvements.'
  }
] as const;

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Support</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">LifeforgePrep Support</h1>
            <p className="mt-4 text-base leading-8 text-[#4A5568]">Need help with the LifeforgePrep app? We&apos;re here to help.</p>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1F2A44]">Contact</h2>
            <a
              href="mailto:lifeforgewealth@gmail.com"
              className="mt-3 inline-flex text-lg font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
            >
              lifeforgewealth@gmail.com
            </a>
            <p className="mt-4 text-sm leading-7 text-[#4A5568]">
              For support with the app, technical issues, content questions, or general inquiries, please contact us at
              lifeforgewealth@gmail.com.
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1F2A44]">What to include</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              To help us assist you faster, please include your device type, app version, and a brief description of the issue.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[#4A5568]">
              <li className="flex gap-2">
                <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>Device type</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>App version</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>Brief description of the issue</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                <span>Screenshots if relevant</span>
              </li>
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
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
