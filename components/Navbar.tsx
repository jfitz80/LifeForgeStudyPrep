import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
            <span className="text-brand-700">LifeForge</span> Insurance Prep
          </Link>
          <Link href="/news" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            News
          </Link>
        </div>
        <a
          href={siteConfig.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-900"
        >
          Get Question Bank - {siteConfig.launchPriceDisplay}
        </a>
      </nav>
    </header>
  );
}
