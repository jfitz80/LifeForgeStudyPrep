import Link from 'next/link';
import Logo from '@/components/brand/Logo';

const navItems = [
  { label: 'News Digest', href: '/news' },
  { label: 'Knowledge Hub', href: '/knowledge' },
  { label: 'Exam Prep', href: '/#exam-prep' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' }
] as const;

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#F2F3F4]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#2C3440] hover:text-[#FA933A]"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-[#2C3440] hover:border-[#FA933A] hover:text-[#FA933A]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-[#2C3440] md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
