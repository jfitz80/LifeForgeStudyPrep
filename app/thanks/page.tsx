import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">You're in</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Thanks. Your free practice set is ready.</h1>
        <p className="mt-4 text-slate-600">
          Placeholder download link below. Replace this with your hosted PDF link or delivery flow.
        </p>

        <a
          href="#"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Download Free 50 Practice Questions (Placeholder)
        </a>

        <p className="mt-6 text-sm text-slate-600">
          Ready for more? Get the {siteConfig.productName}.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          <span className="mr-2 text-slate-400 line-through">{siteConfig.regularPriceDisplay}</span>
          <span className="font-semibold text-slate-900">{siteConfig.launchPriceDisplay} launch price</span>
        </p>
        <a
          href={siteConfig.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center rounded-lg bg-brand-700 px-5 py-3 text-sm font-semibold text-white"
        >
          Get the Study Guide
        </a>

        <div className="mt-8">
          <Link href="/" className="text-sm font-medium text-brand-700 hover:text-brand-900">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
