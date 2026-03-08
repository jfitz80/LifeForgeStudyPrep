import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `Terms of Use | ${siteConfig.brandName}`,
  description: 'Terms of use for LifeForge Insurance Prep digital products.'
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Terms of Use</h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">Last updated: March 7, 2026</p>

        <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700 sm:text-base">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Educational Purpose</h2>
            <p className="mt-2">
              {siteConfig.brandName} provides independent exam prep materials for educational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">No Guarantee of Exam Results</h2>
            <p className="mt-2">
              We do not guarantee that use of our products will result in passing any exam. Outcomes depend on your own
              preparation and performance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Suitability and Jurisdiction</h2>
            <p className="mt-2">
              You are responsible for determining whether our materials are suitable for your licensing system and for
              confirming current exam requirements in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">License and Permitted Use</h2>
            <p className="mt-2">
              Purchases are for personal, non-transferable use only. You may not reproduce, resell, redistribute, share
              access, or publish the content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Intellectual Property</h2>
            <p className="mt-2">
              All content, branding, and materials are owned by {siteConfig.brandName} and protected by applicable
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Limitation of Liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, {siteConfig.brandName} is not liable for indirect or consequential
              damages arising from use of the website or products.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Content and Pricing Updates</h2>
            <p className="mt-2">
              We may update content, features, and pricing at any time. Changes do not create obligations for previously
              purchased versions unless explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Governing Law</h2>
            <p className="mt-2">These terms are governed by the laws of Ontario, Canada.</p>
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
