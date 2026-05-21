import Link from 'next/link';
import { siteConfig } from '@/config/site';

const nextSteps = [
  {
    title: 'Open the free pack',
    body: 'Use the direct link below if you want to start immediately instead of waiting for the email.'
  },
  {
    title: 'Check your inbox',
    body: 'A follow-up email should arrive shortly with the same free-pack link and next-step guidance.'
  },
  {
    title: 'Move into practice',
    body: 'Once you finish the pack, shift into the interactive free practice flow or the full Exam Prep path.'
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
            If you requested the free pack or newsletter updates, the next email from LifeForgePrep should arrive shortly. You can also open the free pack immediately below.
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
          <h2 className="text-2xl font-bold text-[#1F2A44]">Access the free pack now</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
            The email should still arrive, but you do not need to wait for it. Open the free pack now and start with the questions and cheat sheet right away.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={siteConfig.leadMagnetPath}
              className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Open Free Pack
            </Link>
            <Link
              href="/free-practice"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Try 15 Free Questions
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Keep the momentum going</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
            The free resources help you get oriented. The best next step depends on whether you want quick repetition, deeper understanding, or structured exam prep.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
              Get Life Insurance Practice Guide - {siteConfig.launchPriceDisplay}
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
