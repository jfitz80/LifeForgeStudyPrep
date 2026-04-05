import Link from 'next/link';
import { siteConfig } from '@/config/site';

const nextSteps = [
  {
    title: 'Check your inbox',
    body: 'Your free question pack or newsletter confirmation should arrive shortly. If it does not, check spam or promotions first.'
  },
  {
    title: 'Start free practice',
    body: 'Use the interactive quick tests while the concepts are still fresh so you can turn passive reading into active recall.'
  },
  {
    title: 'Explore deeper resources',
    body: 'Move into the Knowledge Hub or Exam Prep depending on whether you need understanding, harder questions, or both.'
  }
] as const;

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">You’re in</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Thanks. Your request has been received.</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#4A5568]">
            If you requested the free pack or newsletter updates, watch your inbox for the next message from LifeForgePrep. This page is your fastest route back into practice, product learning, or full exam prep while you wait.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {nextSteps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Step {index + 1}</p>
              <h2 className="mt-2 text-xl font-bold text-[#1F2A44]">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]">{step.body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-[#D8ECE8] bg-[#F2FBF8] p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Keep the momentum going</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
            The free resources help you get oriented. The best next step depends on whether you want quick repetition, deeper understanding, or structured exam prep.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/free-practice"
              className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Start Free Practice
            </Link>
            <Link
              href="/knowledge"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Explore Knowledge Hub
            </Link>
            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-[#1F2A44] bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#162033]"
            >
              Buy Exam Prep - {siteConfig.launchPriceDisplay}
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Need help or did not receive anything?</h2>
          <p className="mt-3 text-sm leading-7 text-[#4A5568]">
            If you do not receive the expected email, or if you need help with access, app support, or exam prep questions, contact us and we will review it.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/support"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Contact Support
            </Link>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="inline-flex items-center justify-center rounded-lg text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
            >
              {siteConfig.supportEmail}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
