import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'LifeForgePrep App | Free Life Insurance Practice Questions',
  description:
    'Life insurance exam prep app with scenario-based practice, timed exam preparation, progressive difficulty, insurance compliance, and professional-practice study support for U.S. and Canadian learners.'
};

const appFeatures = [
  {
    title: '15 free practice questions',
    text: 'Start free before deciding whether full scenario-based practice is right for your study plan.'
  },
  {
    title: 'Scenario-based explanations',
    text: 'Review reasoning that connects policy features, client needs, suitability, and advisor judgment.'
  },
  {
    title: 'Timed exam mode',
    text: 'Practise pacing, focus, and exam-style decision-making under pressure.'
  },
  {
    title: 'Full practice unlock',
    text: 'Unlock deeper practice, harder scenarios, topic progression, and detailed explanations when you are ready.'
  }
] as const;

const appScreenshots = [
  { src: '/app/screen-1.png', alt: 'LifeForgePrep app start screen' },
  { src: '/app/screen-2.png', alt: 'LifeForgePrep app question screen' },
  { src: '/app/screen-3.png', alt: 'LifeForgePrep app results screen' }
] as const;

const whoItServes = [
  {
    title: 'LLQP learners',
    copy: 'Keep exam study steady between classes with practice that mirrors real question language.'
  },
  {
    title: 'Aspiring advisors',
    copy: 'Build product literacy, underwriting awareness, and suitability logic before your first client conversation.'
  },
  {
    title: 'Life insurance learners',
    copy: 'Understand policies, taxation, and coverage scenarios in short sessions without committing to a classroom.'
  }
] as const;

const mobileReasons = [
  'Short sessions that respect busy schedules',
  'Repetition that cements retention',
  'Study anytime, anywhere convenience',
  'Momentum from daily streak tracking'
] as const;

const whatsNew = [
  'New professional practice and compliance practice questions',
  'More scenario-based questions',
  'Stronger explanations that explain the trap, deciding fact, and why the answer matters',
  'Improved Easy / Medium / Hard progression',
  'Timed exam practice',
  'Better preparation for judgment-based insurance questions'
] as const;

export default function AppPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Mobile App</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Study life insurance on the go.</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#4A5568]">
            Start with 15 free questions. Then choose your path in the app: U.S. Life Insurance Practice, Canadian LLQP Practice, or Insurance Foundations.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={siteConfig.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="app-store"
              data-location="app-hero"
              data-campaign="freemium-funnel"
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Download Free App
            </a>
            <Link
              href="/free-practice"
              data-cta="try-free-practice"
              data-location="app-hero"
              data-campaign="freemium-funnel"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Try Free Practice Online
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[#CFEAE4] bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Coming in the next app update</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1F2A44]">What&apos;s new</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
            LifeForgePrep is becoming a deeper insurance exam preparation tool, focused on judgment, application, and professional understanding, not just memorization.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {whatsNew.map((item) => (
              <article key={item} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4 text-sm leading-6 text-[#1F2A44]">
                {item}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">What you get</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {appFeatures.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">Who it&apos;s for</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {whoItServes.map((persona) => (
              <article key={persona.title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{persona.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4A5568]">{persona.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">App preview</h2>
          <p className="mt-3 text-sm leading-7 text-[#4A5568]">Screenshots explain how the app keeps learning fast and focused.</p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {appScreenshots.map((shot, index) => (
              <figure key={shot.src} className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-white shadow-inner">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 33vw, 280px"
                  />
                </div>
                <figcaption className="text-center text-sm font-medium text-[#1F2A44]">
                  {index === 0
                    ? 'Start screen: fast entry into study'
                    : index === 1
                    ? 'Question screen: focused quiz flow'
                    : 'Results screen: quick feedback and progress'}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[#CFEAE4] bg-[#F1FBF8] p-6 sm:p-7">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">How it helps</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {mobileReasons.map((reason) => (
              <article key={reason} className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-[#4A5568]">
                {reason}
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-[#4A5568]">
            Start with 15 free questions. Then choose your path in the app: U.S. Life Insurance Practice, Canadian LLQP Practice, or Insurance Foundations.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={siteConfig.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="app-store"
              data-location="app-bottom"
              data-campaign="freemium-funnel"
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              Download Free App
            </a>
            <Link
              href="/free-practice"
              data-cta="try-free-practice"
              data-location="app-bottom"
              data-campaign="freemium-funnel"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Try Free Practice Online
            </Link>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
            >
              Email Support
            </a>
          </div>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-[#1F2A44]">
              LifeForgePrep is an independent study tool designed to support your approved course materials. No pass guarantee is provided.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">App trust & FAQ</h2>
          <div className="mt-4 space-y-4 text-sm text-[#4A5568]">
            <p>
              <span className="font-semibold text-[#1F2A44]">Trust:</span> Built by the same editorial team that powers the knowledge hub and exam prep content.
            </p>
            <p>
              <span className="font-semibold text-[#1F2A44]">FAQ:</span> How do I get support? Email{' '}
              <a href={`mailto:${siteConfig.supportEmail}`} className="text-[#2FAF9E]">
                {siteConfig.supportEmail}
              </a>{' '}
              with device type, app version, and a brief issue description.
            </p>
            <p>
              <span className="font-semibold text-[#1F2A44]">Updates:</span> The next app update is designed to add deeper scenario practice, professional-practice and compliance content, stronger explanations, and improved difficulty progression for U.S. life insurance learners, Canadian LLQP candidates, and insurance foundations study.
            </p>
            <p>
              <span className="font-semibold text-[#1F2A44]">Privacy:</span>{' '}
              <Link href="/privacy" className="text-[#2FAF9E] hover:text-[#1F2A44]">
                Read the privacy page
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
