import Link from 'next/link';
import { siteConfig } from '@/config/site';

const footerColumns = [
  {
    title: 'Learn',
    links: [
      { label: 'Insurance Foundations', href: '/foundations' },
      { label: 'Knowledge Hub', href: '/knowledge' },
      { label: 'Glossary', href: '/knowledge/glossary' },
      { label: 'Learning Tools', href: '/tools' }
    ]
  },
  {
    title: 'Exam Prep',
    links: [
      { label: 'Canadian LLQP Prep', href: '/exam-prep' },
      { label: 'Free Practice', href: '/free-practice' },
      { label: 'Question of the Week', href: '/free-practice/question-of-the-week' },
      { label: 'Exam Traps', href: '/knowledge/exam-traps' }
    ]
  },
  {
    title: 'Market Desk',
    links: [
      { label: 'Market Desk Hub', href: '/market-desk' },
      { label: 'All News', href: '/news' },
      { label: 'Original Commentary', href: '/news/market-desk' },
      { label: 'Consumer Impact', href: '/news?category=Consumer%20Protection' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'App', href: '/app' },
      { label: "What's New in 5.0", href: '/app/version-5' },
      { label: 'Support', href: '/support' },
      { label: 'Contact', href: `mailto:${siteConfig.supportEmail}` }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Disclaimer', href: '/disclaimer' }
    ]
  }
] as const;

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#0f172a] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">LifeForgePrep</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#6BC4B8]">Empowering Future Advisors</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              A modern insurance learning platform for licensing candidates, beginner advisors, career changers, and curious consumers building life insurance fluency.
            </p>
          </div>

          <form action="https://app.kit.com/forms/9376932/subscriptions" method="post" acceptCharset="UTF-8" className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-bold">Get the weekly insurance brief</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Market Desk notes, exam traps, and plain-English insurance insights.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <input
                id="footer-email"
                name="email_address"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                className="min-w-0 rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none focus:border-[#6BC4B8] focus:ring-2 focus:ring-[#6BC4B8]/30"
              />
              <button type="submit" className="rounded-xl bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-400">{column.title}</h3>
              <div className="mt-4 space-y-2">
                {column.links.map((item) =>
                  item.href.startsWith('mailto:') ? (
                    <a key={item.label} href={item.href} className="block text-sm text-slate-300 transition hover:text-white">
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.href} href={item.href} className="block text-sm text-slate-300 transition hover:text-white">
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-6 text-slate-400">
          <p>
            Educational content only. LifeForgePrep is not a regulator, insurer, legal advisor, tax advisor, or financial advisor. Always confirm licensing and product decisions with official materials and licensed professionals.
          </p>
          <p className="mt-3">© 2026 LifeForgePrep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
