'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

type HeaderLink = {
  label: string;
  href: string;
  highlight?: boolean;
};

const mainLinks: HeaderLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Exam Prep', href: '/exam-prep' },
  { label: 'Free Practice', href: '/free-practice' },
  { label: 'Knowledge Hub', href: '/knowledge' },
  { label: 'News', href: '/news' }
];

const moreLinks: HeaderLink[] = [
  { label: 'App', href: '/app' },
  { label: 'Support', href: '/support' },
  { label: 'About', href: '/about' }
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const desktopLinkClass = (href: string) =>
    href === '/free-practice'
      ? 'rounded-lg bg-[#E8F7F4] px-3 py-1.5 text-[17px] font-semibold text-[#1E887B] hover:bg-[#D9F1EC]'
      : 'text-[18px] font-medium text-[#1F2A44] hover:text-[#2FAF9E]';

  const mobileLinkClass = (href: string) =>
    href === '/free-practice'
      ? 'rounded-md bg-[#E8F7F4] px-3 py-2 text-sm font-semibold text-[#1E887B]'
      : 'text-sm font-medium text-[#1F2A44]';

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur transition ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
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

          <nav className="hidden items-center gap-8 lg:flex">
            {mainLinks.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={desktopLinkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}

            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[18px] font-medium text-[#1F2A44] hover:text-[#2FAF9E]"
                aria-haspopup="true"
              >
                More
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="invisible absolute right-0 top-full z-50 mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {moreLinks.map((item) => (
                  <Link
                    key={`more-${item.label}-${item.href}`}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-[16px] font-medium text-[#1F2A44] hover:bg-slate-50 hover:text-[#2FAF9E]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/news"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-[#1F2A44] hover:border-[#2FAF9E] hover:text-[#2FAF9E]"
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
              className="rounded-xl bg-[#2C3440] px-4 py-2.5 text-[18px] font-semibold text-white hover:bg-slate-700"
            >
              Buy Exam Prep - {siteConfig.launchPriceDisplay ?? siteConfig.price}
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-[#1F2A44] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-nav" className="border-t border-slate-200 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {mainLinks.map((item) => (
                <Link
                  key={`mobile-${item.label}-${item.href}`}
                  href={item.href}
                  className={mobileLinkClass(item.href)}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="rounded-md border border-slate-200">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold text-[#1F2A44]"
                  onClick={() => setMobileMoreOpen((v) => !v)}
                  aria-expanded={mobileMoreOpen}
                >
                  More
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-4 w-4 transition ${mobileMoreOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {mobileMoreOpen && (
                  <div className="flex flex-col gap-2 border-t border-slate-200 px-3 py-3">
                    {moreLinks.map((item) => (
                      <Link
                        key={`mobile-more-${item.label}-${item.href}`}
                        href={item.href}
                        className="text-sm font-medium text-[#1F2A44]"
                        onClick={() => {
                          setMenuOpen(false);
                          setMobileMoreOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a
                href={siteConfig.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#1F2A44]"
                onClick={() => setMenuOpen(false)}
              >
                Buy Exam Prep - {siteConfig.launchPriceDisplay ?? siteConfig.price}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
