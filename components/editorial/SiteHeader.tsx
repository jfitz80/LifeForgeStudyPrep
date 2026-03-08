'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navLinks } from '@/config/home';
import { siteConfig } from '@/config/site';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur transition ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
              {siteConfig.brandName}
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">{siteConfig.tagline}</p>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                {item.label}
              </a>
            ))}
            <Link href="/news" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Latest News
            </Link>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <form action="/news" method="GET" className="flex items-center gap-2">
              <label htmlFor="site-search" className="sr-only">
                Search articles or topics
              </label>
              <input
                id="site-search"
                name="q"
                placeholder="Search articles or topics"
                className="w-56 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              />
              <button type="submit" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700">
                Search
              </button>
            </form>
          </div>

          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 lg:hidden"
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
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link href="/news" className="text-sm font-medium text-slate-700" onClick={() => setMenuOpen(false)}>
                Latest News
              </Link>

              <form action="/news" method="GET" className="mt-1 flex items-center gap-2">
                <label htmlFor="site-search-mobile" className="sr-only">
                  Search articles or topics
                </label>
                <input
                  id="site-search-mobile"
                  name="q"
                  placeholder="Search articles or topics"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                />
                <button type="submit" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700">
                  Go
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
