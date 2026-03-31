import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';

export const metadata: Metadata = {
  title: 'LifeforgePrep App | Study On the Go',
  description:
    'Practice life insurance concepts, strengthen your knowledge, and study with confidence wherever you are with the LifeforgePrep app.'
};

const appFeatures = [
  {
    title: 'Practice questions',
    text: 'Tackle exam-style drills that mirror LLQP wording, keeping your edge sharp between meetings.'
  },
  {
    title: 'Concept reviews',
    text: 'Quick explanations reinforce core product mechanics so you can book calls with clarity.'
  },
  {
    title: 'Quick study sessions',
    text: 'Pocket-friendly bursts fit into commutes, lunch breaks, or waiting rooms.'
  },
  {
    title: 'Confidence building',
    text: 'Track streaks, review results instantly, and feel prepared before you step into an exam.'
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

export default function AppPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Mobile App</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Study life insurance on the go</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#4A5568]">
              LifeforgePrep’s app delivers real practice questions, quick concept refreshers, and instant feedback wherever you have a minute.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Download the App
              </a>
              <Link
                href="/support"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
              >
                Contact Support
              </Link>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">Feature benefits</h2>
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
            <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-3">
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
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">Why study on mobile?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {mobileReasons.map((reason) => (
                <article key={reason} className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-[#4A5568]">
                  {reason}
                </article>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[#4A5568]">
              For technical issues, questions, or feedback, contact us or visit the support page.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/support"
                className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
              >
                Visit Support Page
              </Link>
              <a
                href="mailto:lifeforgewealth@gmail.com"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
              >
                Email Support
              </a>
            </div>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-[#1F2A44]">
                LifeforgePrep app is backed by the same editorial team that powers the knowledge hub and exam prep tools on the site.
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
                <a href="mailto:lifeforgewealth@gmail.com" className="text-[#2FAF9E]">
                  lifeforgewealth@gmail.com
                </a>{' '}
                with device type, app version, and a brief issue description.
              </p>
              <p>
                <span className="font-semibold text-[#1F2A44]">Updates:</span> Question banks refresh regularly to reflect LLQP focus areas and core product logic.
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
