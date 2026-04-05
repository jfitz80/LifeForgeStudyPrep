import Link from 'next/link';
import { siteConfig } from '@/config/site';

const explore = [
  { label: 'News', href: '/news' },
  { label: 'Knowledge Hub', href: '/knowledge' },
  { label: 'Exam Prep', href: '/exam-prep' },
  { label: 'Tools', href: '/tools' }
] as const;

const resources = [
  { label: 'LLQP Study Guide', href: '/exam-prep' },
  { label: 'Insurance Basics', href: '/knowledge' },
  { label: 'Policy Types', href: '/knowledge' },
  { label: 'Glossary', href: '/knowledge#glossary' }
] as const;

const company = [
  { label: 'About', href: '/about' },
  { label: 'Support', href: '/support' },
  { label: 'App', href: '/app' }
] as const;

const legal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Contact', href: `mailto:${siteConfig.supportEmail}` }
] as const;

export default function SiteFooter() {
  return (
    <footer className="bg-[#1F2A44] text-[#F5F7FA]">
      <div className="mx-auto max-w-7xl px-8 py-14 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-2xl font-bold">LifeForgePrep</h3>
            <p className="mt-2 text-sm uppercase tracking-wide text-[#6BC4B8]">Life Insurance Explained Simply</p>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-200">
              Helping professionals and students understand life insurance products and prepare for certification exams.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Explore</h4>
            <div className="mt-3 space-y-2">
              {explore.map((item) => (
                <Link key={item.href} href={item.href} className="block text-[#6BC4B8] hover:underline">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Resources</h4>
            <div className="mt-3 space-y-2">
              {resources.map((item) => (
                <Link key={item.label} href={item.href} className="block text-[#6BC4B8] hover:underline">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Company</h4>
            <div className="mt-3 space-y-2">
              {company.map((item) => (
                <Link key={item.label} href={item.href} className="block text-[#6BC4B8] hover:underline">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Legal</h4>
            <div className="mt-3 space-y-2">
              {legal.map((item) =>
                item.href.startsWith('mailto:') ? (
                  <a key={item.label} href={item.href} className="block text-[#6BC4B8] hover:underline">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href} className="block text-[#6BC4B8] hover:underline">
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6">
          <p className="text-sm text-slate-300">Built for life insurance professionals and LLQP candidates.</p>
          <p className="mt-2 text-sm text-slate-400">© 2026 LifeForgePrep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
