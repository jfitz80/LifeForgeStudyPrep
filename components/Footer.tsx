import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/disclaimer" className="hover:text-slate-900">
            Disclaimer
          </Link>
          <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-slate-900">
            {siteConfig.supportEmail}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 text-xs text-slate-500 sm:px-6 lg:px-8">
        This is independent educational material and is not affiliated with official exam bodies. Use of this material does
        not guarantee exam success.
      </div>
    </footer>
  );
}
