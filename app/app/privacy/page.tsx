import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'App Privacy | LifeForgePrep',
  description: 'Privacy information for the LifeForgePrep app.'
};

const commitments = [
  {
    title: 'No personal account data collection',
    body: 'LifeForgePrep does not require users to create an account or submit personal profile information to use the app experience currently described on this site.'
  },
  {
    title: 'No user data sold or shared',
    body: 'LifeForgePrep does not sell user information and does not share personal data for advertising or broker-style data monetization.'
  },
  {
    title: 'Minimal operational handling',
    body: 'If you contact support by email, we only see the information you choose to include so we can respond to your request.'
  }
] as const;

const faq = [
  {
    question: 'Does the app collect personal information?',
    answer: 'LifeForgePrep does not state that it collects personal user profile data through the app. If that changes in the future, this page should be updated before new collection begins.'
  },
  {
    question: 'Does the app track my study behavior?',
    answer: 'This privacy page is intended to make clear that LifeForgePrep is not positioning the app as a data-harvesting product. Any future analytics or account features should be disclosed before they are enabled.'
  },
  {
    question: 'What happens if I email support?',
    answer: 'Support emails go to the LifeForgePrep support inbox and are used only to answer the issue or question you send.'
  },
  {
    question: 'Will this page stay the same forever?',
    answer: 'If app features change, the privacy statement should be updated to match the actual behavior of the product and the tools it uses.'
  }
] as const;

export default function AppPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">App Privacy</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
            LifeForgePrep App Privacy
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            LifeForgePrep does not present the app as a user-data collection product. The intent of the app is educational access to study content, not harvesting personal information.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {commitments.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1F2A44]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">What this means in practice</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#4A5568]">
            <p>
              The LifeForgePrep app is described as a study tool for life insurance learning, not as a platform built around accounts, social profiles, or advertising audiences.
            </p>
            <p>
              If you choose to contact support, the only information available to LifeForgePrep is the information you include in your email. That information is used only to respond to the message and troubleshoot the issue you raised.
            </p>
            <p>
              If future versions of the app introduce sign-in, analytics, subscriptions, cloud sync, or any other data-handling feature, this page should be updated to reflect the actual behavior before that feature is rolled out broadly.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">FAQ</h2>
          <div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50">
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

        <section className="mt-8 rounded-2xl border border-slate-200 bg-[#F9FAFB] p-6 text-sm leading-7 text-[#4A5568] shadow-sm">
          <p>
            This page is intended as an app-specific privacy summary. It should remain aligned with the actual product behavior and be revised if the app begins collecting, storing, syncing, or processing user data in any expanded way.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
          >
            Back to App
          </Link>
          <Link
            href="/support"
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
