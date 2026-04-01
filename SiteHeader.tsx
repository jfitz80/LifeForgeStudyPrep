'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SiteHeader() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="font-bold text-[#1F2A44]">
          LifeForgePrep
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="text-sm font-medium text-[#1F2A44]">
            Home
          </Link>
          <Link href="/exam-prep" className="text-sm font-medium text-[#1F2A44]">
            Exam Prep
          </Link>
          <Link href="/free-practice" className="text-sm font-medium text-[#1F2A44]">
            Free Practice
          </Link>
          <Link href="/knowledge" className="text-sm font-medium text-[#1F2A44]">
            Knowledge Hub
          </Link>
          <Link href="/news" className="text-sm font-medium text-[#1F2A44]">
            News
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              className="text-sm font-medium text-[#1F2A44]"
            >
              More
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-md border border-slate-200 bg-white p-2 shadow-lg">
                <Link href="/app" className="block px-3 py-2 text-sm text-[#1F2A44]">
                  App
                </Link>
                <Link href="/support" className="block px-3 py-2 text-sm text-[#1F2A44]">
                  Support
                </Link>
                <Link href="/about" className="block px-3 py-2 text-sm text-[#1F2A44]">
                  About
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
