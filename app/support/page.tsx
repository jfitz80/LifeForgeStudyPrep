import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LifeforgePrep Support',
  description: 'Support for the LifeforgePrep app, technical help, and general inquiries.'
};

const faq = [
  {
    question: 'How do I get support?',
    answer: 'Email us at lifeforgewealth@gmail.com and include a summary of your question, device, and app version.'
  },
  {
    question: 'What should I include in my email?',
    answer: 'Share your device type, app version, short description, and screenshots if relevant so we can act faster.'
  },
  {
    question: 'Can I report a bug?',
    answer: 'Yes. Bug reports are welcome—please describe the steps to reproduce the issue as clearly as possible.'
  },
  {
    question: 'Can I suggest a feature?',
    answer: 'Absolutely. We review ideas from learners and advisors when planning future releases.'
  }
] as const;

const supportTopics = [
  {
    title: 'App issues',
    copy: 'Crashes, sync problems, or unexpected behavior inside the mobile experience.'
  },
  {
    title: 'Account & purchases',
    copy: 'Subscription, billing, or access questions related to LifeForgePrep services.'
  },
  {
    title: 'Content questions',
    copy: 'Clarifications about guides, practice questions, or concepts inside the app.'
  },
  {
    title: 'Feature requests & bugs',
    copy: 'Share ideas or report glitches so we can improve the product roadmap.'
  }
] as const;

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Support Center</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">We are here for you</h1>
            <p className="mt-4 text-base leading-8 text-[#4A5568]">
              Reach out for app help, account questions, content clarifications, or product ideas. Email <strong>lifeforgewealth@gmail.com</strong>
              or use the form below to get the conversation started.
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1F2A44]">Support topics</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {supportTopics.map((topic) => (
                <article key={topic.title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
                  <h3 className="text-sm font-semibold text-[#1F2A44]">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4A5568]">{topic.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1F2A44]">Contact form</h2>
            <p className="mt-2 text-sm leading-7 text-[#4A5568]">
              Not into email? Fill out the form below and we will open a prefilled email on your device. Submissions are still sent via your mail client for privacy.
            </p>
            <form
              action="mailto:lifeforgewealth@gmail.com"
              className="mt-4 grid gap-3"
              method="POST"
              encType="text/plain"
            >
              <input
                type="text"
                name="Name"
                placeholder="Your name"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#1F2A44]"
                required
              />
              <input
                type="email"
                name="Email"
                placeholder="you@example.com"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#1F2A44]"
                required
              />
              <select
                name="Issue type"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#1F2A44]"
                defaultValue="App issues"
              >
                {supportTopics.map((topic) => (
                  <option key={topic.title} value={topic.title}>
                    {topic.title}
                  </option>
                ))}
              </select>
              <textarea
                name="Message"
                placeholder="Describe your issue or question"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#1F2A44]"
                rows={4}
                required
              />
              <label className="flex items-center gap-2 text-xs font-semibold text-[#1F2A44]">
                <input type="file" name="Screenshot" className="hidden" />
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px]">Attach screenshot (optional)</span>
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Open email draft
              </button>
            </form>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1F2A44]">What to include</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              To help us assist you faster, include your device type, app version, a short description, and screenshots when relevant.
            </p>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-[#4A5568] md:grid-cols-2">
              {['Device type', 'App version', 'Issue description', 'Steps to reproduce', 'Screenshots if available'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1F2A44]">FAQ & trust</h2>
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
                <span className="font-semibold text-[#1F2A44]">Response expectations:</span> We aim to respond as quickly as possible while reviewing every message carefully.
              </p>
              <p className="mt-2">
                <span className="font-semibold text-[#1F2A44]">Related links:</span>{' '}
                <Link href="/app" className="text-[#2FAF9E] hover:text-[#1F2A44]">
                  LifeforgePrep App
                </Link>{' '}
                ·{' '}
                <Link href="/knowledge" className="text-[#2FAF9E] hover:text-[#1F2A44]">
                  Knowledge Hub
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
  );
}
