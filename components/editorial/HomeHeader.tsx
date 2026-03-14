'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { label: 'News', href: '/news' },
  { label: 'Knowledge Hub', href: '/knowledge' },
  { label: 'Exam Prep', href: '/exam-prep' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' }
] as const;

export default function HomeHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="h-7 w-7 rounded-md border border-slate-300 bg-[#F5F7FA]" aria-hidden />
          <span className="text-lg font-bold tracking-tight">
            <span className="text-[#1F2A44]">LifeForge</span>
            <span className="text-[#2FAF9E]">Prep</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#4A5568] transition hover:text-[#2FAF9E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2 rounded-sm"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-[#1F2A44] hover:border-[#2FAF9E] hover:text-[#2FAF9E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-[#1F2A44] md:hidden"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[#4A5568] hover:text-[#2FAF9E]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
