import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LifeForgePrep | Life Insurance Explained Simply',
  description:
    'Industry news, product insights, and guidance to help you make better insurance decisions.'
};

const nav = [
  { label: 'News', href: '/news' },
  { label: 'Knowledge Hub', href: '/knowledge' },
  { label: 'Exam Prep', href: '/exam-prep' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' }
] as const;

const cards = [
  {
    title: 'News Digest',
    body: 'Latest industry news and updates.',
    cta: 'Read More',
    href: '/news',
    iconBg: 'bg-[#1F2A44]',
    ctaColor: 'text-[#1F2A44]'
  },
  {
    title: 'Knowledge Hub',
    body: 'Learn all about life insurance products.',
    cta: 'View Guides',
    href: '/knowledge',
    iconBg: 'bg-[#2FAF9E]',
    ctaColor: 'text-[#2FAF9E]'
  },
  {
    title: 'Exam Prep',
    body: 'Prepare for the LLQP certification exam.',
    cta: 'Start Studying',
    href: '/exam-prep',
    iconBg: 'bg-[#315B93]',
    ctaColor: 'text-[#315B93]'
  },
  {
    title: 'Tools & Calculators',
    body: 'Calculate, compare & plan your coverage.',
    cta: 'Try Now',
    href: '/tools',
    iconBg: 'bg-[#2FAF9E]',
    ctaColor: 'text-[#2FAF9E]'
  }
] as const;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1F2A44]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/brand/lifeforge-emblem.svg"
              alt="LifeForgePrep emblem"
              width={48}
              height={48}
              className="h-12 w-12"
              priority
            />
            <span className="text-[42px] font-bold tracking-tight leading-none">
              <span className="text-[#1F2A44]">LifeForge</span>
              <span className="text-[#2FAF9E]">Prep</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-3xl font-medium text-[#1F2A44] hover:text-[#2FAF9E]">
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              aria-label="Search"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1F2A44] hover:text-[#2FAF9E]"
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl font-bold tracking-tight text-[#1F2A44] sm:text-6xl">Life Insurance Explained Simply</h1>
              <p className="mt-6 max-w-xl text-2xl leading-relaxed text-[#33415d]">
                Industry news, product insights, and guidance to help you make better insurance decisions.
              </p>
              <div className="mt-8">
                <Link
                  href="/knowledge"
                  className="inline-flex items-center rounded-xl bg-[#2FAF9E] px-10 py-5 text-4xl font-semibold text-white shadow-[0_10px_24px_rgba(47,175,158,0.28)] hover:bg-[#26988a]"
                >
                  Get insights
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute -right-28 -top-8 h-[420px] w-[620px] rounded-[60%] bg-[#dfecef]" />
              <div className="relative">
                <Image
                  src="/brand/lifeforge-emblem.svg"
                  alt="LifeForgePrep emblem"
                  width={380}
                  height={380}
                  className="h-auto w-[320px] drop-shadow-sm sm:w-[380px]"
                  priority
                />
                <div className="absolute -left-10 top-12 h-4 w-4 rounded-full bg-[#2FAF9E]" />
                <div className="absolute -right-8 bottom-10 h-5 w-5 rounded-full bg-[#2FAF9E]" />
                <div className="absolute -right-16 top-1/2 h-8 w-8 rounded-full border-2 border-dashed border-[#2FAF9E]" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto -mt-2 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full ${card.iconBg}`}>
                  <span className="h-7 w-7 rounded-sm border-2 border-white" />
                </div>
                <h2 className="text-4xl font-semibold text-[#1F2A44]">{card.title}</h2>
                <p className="mt-3 text-xl leading-9 text-[#4A5568]">{card.body}</p>
                <Link href={card.href} className={`mt-4 inline-flex items-center gap-2 text-2xl font-semibold ${card.ctaColor}`}>
                  {card.cta}
                  <span aria-hidden>›</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#1F2A44] to-[#2f4d73] p-8 text-white shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <h3 className="text-5xl font-bold">Stay Informed with LifeForgePrep</h3>
                <p className="mt-3 text-2xl text-slate-200">
                  Get the latest life insurance news and expert tips delivered to your inbox.
                </p>
              </div>
              <div>
                <div className="flex overflow-hidden rounded-2xl bg-white">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 text-xl text-[#1F2A44] outline-none"
                  />
                  <button className="bg-[#2FAF9E] px-8 py-4 text-2xl font-semibold text-white hover:bg-[#26988a]">
                    Subscribe
                  </button>
                </div>
                <p className="mt-3 text-base text-slate-200">Your information is kept secure. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-lg font-semibold text-[#1F2A44]">COLOR PALETTE:</span>
            {['#1F2A44', '#2FAF9E', '#6BC4B8', '#F5F7FA', '#4A5568'].map((color) => (
              <div
                key={color}
                className={`inline-flex min-w-[140px] justify-center rounded-2xl border px-5 py-3 text-lg font-semibold ${
                  color === '#F5F7FA' ? 'border-slate-300 text-[#1F2A44]' : 'border-transparent text-white'
                }`}
                style={{ backgroundColor: color }}
              >
                {color}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
