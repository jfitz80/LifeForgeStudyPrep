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
    text: 'Work through practical questions to reinforce understanding and decision-making.'
  },
  {
    title: 'Learn core insurance concepts',
    text: 'Review key life insurance concepts in a clear, structured mobile format.'
  },
  {
    title: 'Study on the go',
    text: 'Learn in short sessions wherever you are without losing momentum.'
  },
  {
    title: 'Build confidence over time',
    text: 'Track progress through consistent repetition and practical recall.'
  }
] as const;

const appScreenshots = [
  { src: '/app/screen-1.png', alt: 'LifeForgePrep app start screen' },
  { src: '/app/screen-2.png', alt: 'LifeForgePrep app question screen' },
  { src: '/app/screen-3.png', alt: 'LifeForgePrep app results screen' }
] as const;

export default function AppPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Mobile App</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">LifeforgePrep App</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#4A5568]">
              Practice life insurance concepts, strengthen your knowledge, and study with confidence wherever you are.
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
                Get Support
              </Link>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">What the app helps with</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {appFeatures.map((feature) => (
                <article key={feature.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#1F2A44]">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4A5568]">{feature.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">Who it&apos;s for</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
              The app is useful for aspiring advisors, career changers, and beginners learning life insurance. It supports Canadian LLQP
              learners and broader North American users building practical insurance knowledge.
            </p>
          </section>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">App preview</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">Real in-app screenshots from the quiz flow.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {appScreenshots.map((shot) => (
                <figure key={shot.src} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                  <div className="relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-lg bg-white">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 33vw, 280px"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-[#CFEAE4] bg-[#F1FBF8] p-6 sm:p-7">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44]">Need help with the app?</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">
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
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
