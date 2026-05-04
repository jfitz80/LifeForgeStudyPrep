'use client';

import type { FocusEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

type NavLink = {
  label: string;
  href: string;
  accent?: boolean;
};

const primaryLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Exam Prep', href: '/exam-prep' },
  { label: 'Free Practice', href: '/free-practice', accent: true },
  { label: 'App', href: '/app' }
];

const knowledgeLinks: NavLink[] = [
  { label: 'Knowledge Hub Overview', href: '/knowledge' },
  { label: 'Life Insurance Basics', href: '/knowledge/life-insurance-basics' },
  { label: "Buyer's Guides", href: '/knowledge/buyers-guides' },
  { label: 'Annuities', href: '/knowledge/annuities' },
  { label: 'Advisor Guidance', href: '/knowledge/advisor-guidance' },
  { label: 'Product Comparisons', href: '/knowledge/product-comparisons' },
  { label: 'Glossary', href: '/knowledge/glossary' }
];

const newsLinks: NavLink[] = [
  { label: 'All News', href: '/news' },
  { label: 'LifeForge Market Desk', href: '/news/market-desk' },
  { label: 'Regulation', href: '/news?category=Regulation' },
  { label: 'Annuities', href: '/news?category=Annuities' },
  { label: 'Consumer Protection', href: '/news?category=Consumer%20Protection' }
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 7.5 10 12.5 15 7.5" />
    </svg>
  );
}

function HeaderLink({ item, onNavigate }: { item: NavLink; onNavigate?: () => void }) {
  return (
    <Link
      href={item.href}
      className={
        item.accent
          ? 'inline-flex items-center rounded-full bg-[#E8F7F4] px-4 py-2 text-sm font-semibold text-[#1E887B] transition hover:bg-[#D9F1EC]'
          : 'text-sm font-medium text-[#1F2A44] transition hover:text-[#2FAF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2'
      }
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [mobileKnowledgeOpen, setMobileKnowledgeOpen] = useState(false);
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      setMobileKnowledgeOpen(false);
      setMobileNewsOpen(false);
    }
  }, [menuOpen]);

  function closeMobileMenu() {
    setMenuOpen(false);
    setMobileKnowledgeOpen(false);
    setMobileNewsOpen(false);
  }

  function handleKnowledgeBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setKnowledgeOpen(false);
    }
  }

  function handleNewsBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setNewsOpen(false);
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur transition ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[84px] items-center justify-between gap-4 py-3">
          <Link href="/" className="inline-flex min-w-0 items-center gap-2.5">
            <Image
              src="/brand/lifeforge-emblem.png"
              alt="LifeForgePrep emblem"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0"
              priority
            />
            <span className="truncate text-[28px] font-bold leading-none tracking-tight sm:text-[34px]">
              <span className="text-[#1F2A44]">LifeForge</span>
              <span className="text-[#2FAF9E]">Prep</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Main navigation">
            <HeaderLink item={primaryLinks[0]} />
            <HeaderLink item={primaryLinks[1]} />
            <HeaderLink item={primaryLinks[2]} />

            <div
              className="relative"
              onMouseEnter={() => setKnowledgeOpen(true)}
              onMouseLeave={() => setKnowledgeOpen(false)}
              onBlurCapture={handleKnowledgeBlur}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#1F2A44] transition hover:text-[#2FAF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2"
                aria-haspopup="menu"
                aria-expanded={knowledgeOpen}
                onClick={() => setKnowledgeOpen((current) => !current)}
                onFocus={() => setKnowledgeOpen(true)}
              >
                <span>Knowledge Hub</span>
                <Chevron open={knowledgeOpen} />
              </button>

              <div
                className={`absolute left-0 top-full z-50 pt-3 transition-all duration-150 ${
                  knowledgeOpen ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'
                }`}
              >
                <div className="w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/70">
                  {knowledgeLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1F2A44] transition hover:bg-slate-50 hover:text-[#2FAF9E]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setNewsOpen(true)}
              onMouseLeave={() => setNewsOpen(false)}
              onBlurCapture={handleNewsBlur}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#1F2A44] transition hover:text-[#2FAF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2"
                aria-haspopup="menu"
                aria-expanded={newsOpen}
                onClick={() => setNewsOpen((current) => !current)}
                onFocus={() => setNewsOpen(true)}
              >
                <span>News</span>
                <Chevron open={newsOpen} />
              </button>

              <div
                className={`absolute left-0 top-full z-50 pt-3 transition-all duration-150 ${
                  newsOpen ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'
                }`}
              >
                <div className="w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/70">
                  {newsLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1F2A44] transition hover:bg-slate-50 hover:text-[#2FAF9E]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {primaryLinks.slice(3).map((item) => (
              <HeaderLink key={item.href} item={item} />
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/news"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-[#1F2A44] transition hover:border-[#2FAF9E] hover:text-[#2FAF9E]"
              aria-label="Search news"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.1">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </Link>
            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#2C3440] px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-700 xl:text-[18px]"
            >
              Buy Exam Prep - {siteConfig.launchPriceDisplay ?? siteConfig.price}
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-[#1F2A44] lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>

        {menuOpen ? (
          <div id="mobile-nav" className="border-t border-slate-200 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {primaryLinks.slice(0, 3).map((item) => (
                <HeaderLink key={`mobile-${item.href}`} item={item} onNavigate={closeMobileMenu} />
              ))}

              <div className="rounded-xl border border-slate-200 bg-white">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#1F2A44]"
                  onClick={() => setMobileKnowledgeOpen((current) => !current)}
                  aria-expanded={mobileKnowledgeOpen}
                  aria-controls="mobile-knowledge-hub"
                >
                  <span>Knowledge Hub</span>
                  <Chevron open={mobileKnowledgeOpen} />
                </button>
                {mobileKnowledgeOpen ? (
                  <div id="mobile-knowledge-hub" className="space-y-2 border-t border-slate-200 px-4 py-3">
                    {knowledgeLinks.map((item) => (
                      <Link
                        key={`mobile-knowledge-${item.href}`}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1F2A44] transition hover:bg-slate-50 hover:text-[#2FAF9E]"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="rounded-xl border border-slate-200 bg-white">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#1F2A44]"
                  onClick={() => setMobileNewsOpen((current) => !current)}
                  aria-expanded={mobileNewsOpen}
                  aria-controls="mobile-news"
                >
                  <span>News</span>
                  <Chevron open={mobileNewsOpen} />
                </button>
                {mobileNewsOpen ? (
                  <div id="mobile-news" className="space-y-2 border-t border-slate-200 px-4 py-3">
                    {newsLinks.map((item) => (
                      <Link
                        key={`mobile-news-${item.href}`}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1F2A44] transition hover:bg-slate-50 hover:text-[#2FAF9E]"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              {primaryLinks.slice(3).map((item) => (
                <HeaderLink key={`mobile-${item.href}`} item={item} onNavigate={closeMobileMenu} />
              ))}

              <a
                href={siteConfig.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#2C3440] px-4 py-3 text-sm font-semibold text-white"
                onClick={closeMobileMenu}
              >
                Buy Exam Prep - {siteConfig.launchPriceDisplay ?? siteConfig.price}
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
