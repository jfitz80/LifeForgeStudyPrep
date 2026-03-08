import Link from 'next/link';
import { siteConfig } from '@/config/site';

const footerLinks = [
  { label: 'About', href: '/' },
  { label: 'Knowledge Hub', href: '/#knowledge-hub' },
  { label: 'News Digest', href: '/news' },
  { label: 'Industry Insights', href: '/#industry-insights' },
  { label: 'Exam Prep', href: '/#exam-prep' },
  { label: 'Contact', href: `mailto:${siteConfig.supportEmail}` },
  { label: 'Privacy Policy', href: siteConfig.legalUrls.privacy },
  { label: 'Terms', href: siteConfig.legalUrls.terms }
] as const;

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">{siteConfig.brandName}</p>
            <p className="mt-2 max-w-md text-sm leading-7 text-slate-600">
              A trusted destination for life insurance education, digest-style updates, and practical industry insight.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-600 sm:grid-cols-3">
            {footerLinks.map((item) =>
              item.href.startsWith('mailto:') ? (
                <a key={item.label} href={item.href} className="hover:text-slate-900">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className="hover:text-slate-900">
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-xs leading-6 text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <p className="mt-2">
            Independent educational resource. Not affiliated with any regulator, licensing body, or exam administrator.
          </p>
        </div>
      </div>
    </footer>
  );
}
