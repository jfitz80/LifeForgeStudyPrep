'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { navLinks } from '@/config/home';
import { siteConfig } from '@/config/site';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = useMemo(() => navLinks, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200/80 bg-[#F2F3F4]/95 backdrop-blur transition ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight text-[#2C3440] sm:text-base">{siteConfig.brandName}</p>
            <p className="hidden text-xs text-[#6B7280] sm:block">{siteConfig.tagline ?? 'Insurance education & exam prep'}</p>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-[#2C3440] hover:text-[#FA933A]">
                {item.label}
              </Link>
            ))}
            <Link href="/news" className="text-sm font-medium text-[#2C3440] hover:text-[#FA933A]">
              News Digest
            </Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/news"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-[#2C3440] hover:border-[#FA933A] hover:text-[#FA933A]"
              aria-label="Search news"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </Link>
            <a
              href={siteConfig.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#2C3440] px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Buy Exam Prep - {siteConfig.launchPriceDisplay ?? siteConfig.price}
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-[#2C3440] lg:hidden"
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
              {links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-[#2C3440]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/news" className="text-sm font-medium text-[#2C3440]" onClick={() => setMenuOpen(false)}>
                News Digest
              </Link>
              <a
                href={siteConfig.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#2C3440]"
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
