import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/components/editorial/SiteFooter';
import KnowledgeHubHomeSection from '@/components/knowledge/KnowledgeHubHomeSection';
import NewsletterSignup from '@/components/home/NewsletterSignup';


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
    iconBg: 'bg-[#24334E]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="16" y2="11" />
        <line x1="8" y1="15" x2="13" y2="15" />
      </svg>
    )
  },
  {
    title: 'Knowledge Hub',
    body: 'Learn all about life insurance products.',
    cta: 'View Guides',
    href: '/knowledge',
    iconBg: 'bg-[#2FA99C]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H3z" />
        <path d="M21 5h-7a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  {
    title: 'Exam Prep',
    body: 'Prepare for the LLQP certification exam.',
    cta: 'Start Studying',
    href: '/exam-prep',
    iconBg: 'bg-[#355C8C]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    )
  },
  {
    title: 'Tools & Calculators',
    body: 'Calculate, compare & plan your coverage.',
    cta: 'Try Now',
    href: '/tools',
    iconBg: 'bg-[#2FA99C]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="8" y2="11" />
        <line x1="12" y1="11" x2="12" y2="11" />
        <line x1="16" y1="11" x2="16" y2="11" />
        <line x1="8" y1="15" x2="8" y2="15" />
        <line x1="12" y1="15" x2="12" y2="15" />
        <line x1="16" y1="15" x2="16" y2="15" />
      </svg>
    )
  }
] as const;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1F2A44]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/brand/lifeforge-emblem.png"
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
        <section className="bg-[#1F2A44] px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6BC4B8]">Advisor Career Path</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Interested in Becoming a Life Insurance Advisor?
            </h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
              Practice real exam-style questions, learn key concepts, and prepare for licensing exams in Canada and the United States.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/exam-prep"
                className="inline-flex items-center rounded-xl bg-[#2FAF9E] px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(47,175,158,0.28)] transition hover:bg-[#26988a]"
              >
                Start Free Practice
              </Link>
              <Link
                href="/exam-prep"
                className="inline-flex items-center rounded-xl border border-slate-300/70 bg-white px-6 py-3 text-base font-semibold text-[#1F2A44] transition hover:bg-slate-100"
              >
                Choose Your Exam Path
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-300">
              Trusted by LLQP candidates and career-switching professionals. Independent educational resource.
            </p>
          </div>
        </section>

        <section className="bg-[#F5F7FA] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4 md:grid-cols-2">
              <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1F2A44]">
                  <svg viewBox="0 0 28 28" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="14" cy="14" r="13" fill="white" />
                    <path d="M1 1h6v26H1z" fill="#D62828" />
                    <path d="M21 1h6v26h-6z" fill="#D62828" />
                    <path
                      d="M14 8.2 15.1 10.4 17.6 9.9 16 12 18.2 13.3 15.7 14.1 16.4 16.8 14 15.4 11.6 16.8 12.3 14.1 9.8 13.3 12 12 10.4 9.9 12.9 10.4 14 8.2Z"
                      fill="#D62828"
                    />
                    <circle cx="14" cy="14" r="13" stroke="#D1D5DB" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#1F2A44]">Canada</h2>
                <p className="mt-2 text-base text-[#4A5568]">LLQP Exam Prep</p>
                <Link
                  href="/exam-prep"
                  className="mt-5 inline-flex items-center rounded-lg bg-[#2FAF9E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26988a]"
                >
                  Start LLQP Prep
                </Link>
              </article>

              <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#355C8C]">
                  <svg viewBox="0 0 28 28" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="14" cy="14" r="13" fill="white" />
                    <path d="M1 4.5h26v3H1z" fill="#B22234" />
                    <path d="M1 10.5h26v3H1z" fill="#B22234" />
                    <path d="M1 16.5h26v3H1z" fill="#B22234" />
                    <path d="M1 22.5h26v3H1z" fill="#B22234" />
                    <path d="M1 1h13v12H1z" fill="#1F3B73" />
                    <circle cx="5" cy="5" r="0.9" fill="white" />
                    <circle cx="8" cy="7" r="0.9" fill="white" />
                    <circle cx="11" cy="5" r="0.9" fill="white" />
                    <circle cx="5" cy="9" r="0.9" fill="white" />
                    <circle cx="9" cy="10" r="0.9" fill="white" />
                    <circle cx="12" cy="8" r="0.9" fill="white" />
                    <circle cx="14" cy="14" r="13" stroke="#D1D5DB" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#1F2A44]">United States</h2>
                <p className="mt-2 text-base text-[#4A5568]">State Licensing Exam Prep</p>
                <Link
                  href="/exam-prep#us"
                  className="mt-5 inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50"
                >
                  Start US Exam Prep
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#f7f9fb] to-white">
          <div className="mx-auto -mt-2 max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {cards.map((card) => (
                <article
                  key={card.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.08)]"
                >
                  <div className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full ${card.iconBg} transition duration-300 group-hover:scale-105`}>
                    <span className="h-[30px] w-[30px]">{card.icon}</span>
                  </div>

                  <h2 className="mb-[10px] mt-[22px] text-4xl font-semibold text-[#1F2A44]">{card.title}</h2>
                  <p className="mt-3 text-xl leading-9 text-[#4A5568]">{card.body}</p>

                  <Link href={card.href} className="mt-4 inline-flex items-center gap-2 text-2xl font-semibold text-[#2FA99C] hover:underline">
                    {card.cta}
                    <span aria-hidden>›</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <KnowledgeHubHomeSection />

        <NewsletterSignup />
      </main>
      <SiteFooter />
    </div>
  );
}
