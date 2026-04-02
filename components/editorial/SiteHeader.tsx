'use client';

import type { FocusEvent, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

type DropdownItem = {
  label: string;
  href: string;
  accent?: boolean;
};

type NavItem = {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Exam Prep',
    dropdown: [
      { label: 'Exam Prep Overview', href: '/exam-prep' },
      { label: 'Free Practice', href: '/free-practice', accent: true }
    ]
  },
  {
    label: 'Knowledge Hub',
    dropdown: [
      { label: 'Knowledge Hub Overview', href: '/knowledge' },
      { label: 'Annuities', href: '/knowledge/annuities' }
    ]
  },
  {
    label: 'News',
    dropdown: [
      { label: 'All News', href: '/news' },
      { label: 'Claims', href: '/news?category=claims' },
      { label: 'Clinical Knowledge', href: '/news?category=clinical-knowledge' },
      { label: 'Industry Trends', href: '/news?category=industry-trends' },
      { label: 'Underwriting', href: '/news?category=underwriting' },
      { label: 'Regulation & Compliance', href: '/news?category=regulation-compliance' }
    ]
  },
  {
    label: 'More',
    dropdown: [
      { label: 'App', href: '/app' },
      { label: 'Support', href: '/support' },
      { label: 'About', href: '/about' }
    ]
  }
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

function DropdownLink({ item, onNavigate }: { item: DropdownItem; onNavigate?: () => void }) {
  return (
    <Link
      href={item.href}
      className={
        item.accent
          ? 'block rounded-lg bg-[#E8F7F4] px-3 py-2 text-sm font-semibold text-[#1E887B] hover:bg-[#D9F1EC]'
          : 'block rounded-lg px-3 py-2 text-sm font-medium text-[#1F2A44] hover:bg-slate-50 hover:text-[#2FAF9E]'
      }
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

function MobileSection({
  label,
  items,
  open,
  onToggle,
  onNavigate
}: {
  label: string;
  items: DropdownItem[];
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#1F2A44]"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`mobile-section-${label}`}
      >
        <span>{label}</span>
        <Chevron open={open} />
      </button>
      {open ? (
        <div id={`mobile-section-${label}`} className="space-y-2 border-t border-slate-200 px-4 py-3">
          {items.map((item) => (
            <DropdownLink key={`${label}-${item.href}`} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      setMobileOpen({});
    }
  }, [menuOpen]);

  function closeMobileMenu() {
    setMenuOpen(false);
    setMobileOpen({});
  }

  function toggleMobileSection(label: string) {
    setMobileOpen((current) => ({
      ...current,
      [label]: !current[label]
    }));
  }

  function handleBlur(label: string, event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDesktopOpen((current) => (current === label ? null : current));
    }
  }

  function renderDesktopItem(item: NavItem): ReactNode {
    if (!item.dropdown) {
      return (
        <Link
          key={item.label}
          href={item.href ?? '/'}
          className="text-[18px] font-medium text-[#1F2A44] transition hover:text-[#2FAF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2"
        >
          {item.label}
        </Link>
      );
    }

    const isOpen = desktopOpen === item.label;

    return (
      <div
        key={item.label}
        className="relative"
        onMouseEnter={() => setDesktopOpen(item.label)}
        onMouseLeave={() => setDesktopOpen((current) => (current === item.label ? null : current))}
        onBlurCapture={(event) => handleBlur(item.label, event)}
      >
        <button
          type="button"
          className="inline-flex items-center gap-1 text-[18px] font-medium text-[#1F2A44] transition hover:text-[#2FAF9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setDesktopOpen((current) => (current === item.label ? null : item.label))}
          onFocus={() => setDesktopOpen(item.label)}
        >
          <span>{item.label}</span>
          <Chevron open={isOpen} />
        </button>
        <div className={`absolute left-0 top-full z-50 pt-3 ${isOpen ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'} transition-all duration-150`}>
          <div className="w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/70">
            {item.dropdown.map((child) => (
              <DropdownLink key={`${item.label}-${child.href}`} item={child} />
            ))}
          </div>
        </div>
      </div>
    );
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

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => renderDesktopItem(item))}
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
              className="rounded-xl bg-[#2C3440] px-5 py-3 text-[18px] font-semibold text-white transition hover:bg-slate-700"
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
            <div className="space-y-3">
              <Link
                href="/"
                className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#1F2A44]"
                onClick={closeMobileMenu}
              >
                Home
              </Link>

              {navItems
                .filter((item) => item.dropdown)
                .map((item) => (
                  <MobileSection
                    key={`mobile-${item.label}`}
                    label={item.label}
                    items={item.dropdown ?? []}
                    open={Boolean(mobileOpen[item.label])}
                    onToggle={() => toggleMobileSection(item.label)}
                    onNavigate={closeMobileMenu}
                  />
                ))}

              <a
                href={siteConfig.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#1F2A44]"
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
