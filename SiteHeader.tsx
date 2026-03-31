'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

type PrimaryLink = {
  label: string;
  href: string;
  highlight?: boolean;
  emphatic?: boolean;
};

const primaryLinks: PrimaryLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Free Practice', href: '/free-practice', highlight: true },
  { label: 'Exam Prep', href: '/exam-prep', emphatic: true },
  { label: 'Knowledge Hub', href: '/knowledge' },
  { label: 'News', href: '/news' },
];

const secondaryLinks = [
  { label: 'App', href: '/app' },
  { label: 'Support', href: '/support' },
  { label: 'About', href: '/about' },
] as const;

const knowledgeLinks = [
  { label: 'All Knowledge Hub', href: '/knowledge' },
  { label: 'Life Insurance', href: '/knowledge/life-insurance' },
  { label: 'Annuities', href: '/knowledge/annuities' },
] as const;

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileKnowledgeOpen, setMobileKnowledgeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur transition ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight text-[#1F2A44] sm:text-base">
              {siteConfig.brandName}
            </p>
            <p className="hidden text-xs text-[#4A5568] sm:block">
              {siteConfig.tagline ?? 'Insurance education & exam prep'}
            </p>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-sm text-sm font-medium transition hover:text-[#2FAF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2 ${
                  item.highlight || item.emphatic
                    ? 'font-semibold text-[#1F2A44]'
                    : 'text-[#1F2A44]'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-[#1F2A44] transition hover:text-[#2FAF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2"
                aria-haspopup="menu"
              >
                More
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 transition group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 7.5 10 12.5 15 7.5" />
                </svg>
              </button>

              <div className="pointer-events-none absolute right-0 top-full pt-2 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  {secondaryLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm text-[#1F2A44] hover:bg-slate-50 hover:text-[#2FAF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-[#1F2A44] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-nav" className="border-t border-slate-200 py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {primaryLinks
                .filter((item) => item.label !== 'Knowledge Hub')
                .map((item) => (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    className="rounded-md px-1 py-2 text-sm font-medium text-[#1F2A44]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

              <div>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-1 py-2 text-left text-sm font-medium text-[#1F2A44]"
                  onClick={() => setMobileKnowledgeOpen((open) => !open)}
                  aria-expanded={mobileKnowledgeOpen}
                  aria-controls="mobile-knowledge-submenu"
                >
                  <span>Knowledge Hub</span>
                  <svg
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 transition ${
                      mobileKnowledgeOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 7.5 10 12.5 15 7.5" />
                  </svg>
                </button>

                {mobileKnowledgeOpen && (
                  <div
                    id="mobile-knowledge-submenu"
                    className="ml-3 mt-1 flex flex-col border-l border-slate-200 pl-3"
                  >
                    {knowledgeLinks.map((item) => (
                      <Link
                        key={`mobile-${item.href}`}
                        href={item.href}
                        className="rounded-md py-2 text-sm text-[#4A5568]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-3">
                {secondaryLinks.map((item) => (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    className="block rounded-md px-1 py-2 text-sm font-medium text-[#1F2A44]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
