import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `Refund Policy | ${siteConfig.brandName}`,
  description: 'Refund policy for LifeForge Insurance Prep digital products.'
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Refund Policy</h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">Last updated: March 7, 2026</p>

        <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700 sm:text-base">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Digital Product Sales</h2>
            <p className="mt-2">
              Because this is a digital-access product, sales are generally final once access is delivered.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Support-Based Exceptions</h2>
            <p className="mt-2">
              We may offer refunds or credits in fair cases such as duplicate purchases or technical access problems that
              cannot be resolved by support.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">How to Request Help</h2>
            <p className="mt-2">
              Contact us at{' '}
              <a className="font-medium text-brand-700 hover:text-brand-900" href={`mailto:${siteConfig.supportEmail}`}>
                {siteConfig.supportEmail}
              </a>{' '}
              with your purchase details and issue description. We will review your request promptly and work toward a fair
              resolution.
            </p>
          </section>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
            Return to home
          </Link>
        </div>
      </div>
    </main>
  );
}
