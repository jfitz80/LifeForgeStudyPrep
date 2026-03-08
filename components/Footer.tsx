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
          <Link href={siteConfig.legalUrls.privacy} className="hover:text-slate-900">
            Privacy
          </Link>
          <Link href={siteConfig.legalUrls.terms} className="hover:text-slate-900">
            Terms
          </Link>
          <Link href={siteConfig.legalUrls.refundPolicy} className="hover:text-slate-900">
            Refund Policy
          </Link>
          <Link href={siteConfig.legalUrls.disclaimer} className="hover:text-slate-900">
            Disclaimer
          </Link>
          <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-slate-900">
            {siteConfig.supportEmail}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 text-xs text-slate-500 sm:px-6 lg:px-8">
        LifeForge Insurance Prep is an independent educational resource and is not affiliated with any regulator, licensing
        body, or exam provider.
      </div>
    </footer>
  );
}
