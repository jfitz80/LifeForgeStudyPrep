import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `Privacy Policy | ${siteConfig.brandName}`,
  description: 'Privacy policy for LifeForge Insurance Prep.'
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">Last updated: March 7, 2026</p>

        <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700 sm:text-base">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">What We Collect</h2>
            <p className="mt-2">
              We may collect personal information such as your name, email address, and purchase details when you request
              free questions, join our email list, or make a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">How We Use Information</h2>
            <p className="mt-2">
              We use your information to deliver products, send requested materials, provide support, improve our content,
              and communicate important updates about your purchase or account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Email Communications</h2>
            <p className="mt-2">
              If you request free questions or otherwise opt in, we may send exam prep emails. Marketing emails are sent
              only where consent is provided or otherwise permitted by applicable law. You can unsubscribe at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Third-Party Service Providers</h2>
            <p className="mt-2">
              We may use third-party providers for payment processing, email delivery, analytics, and hosting. These
              providers process information only as needed to provide their services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Data Retention</h2>
            <p className="mt-2">
              We retain personal information for as long as needed to deliver services, meet legal obligations, resolve
              disputes, and enforce agreements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Your Choices</h2>
            <p className="mt-2">
              You can unsubscribe from marketing emails using the link in any email. You may also contact us to request
              updates or deletion of your personal information where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Children</h2>
            <p className="mt-2">
              This website is intended for educational and business use by adults and is not directed to children.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
            <p className="mt-2">
              For privacy questions, contact us at{' '}
              <a className="font-medium text-brand-700 hover:text-brand-900" href={`mailto:${siteConfig.supportEmail}`}>
                {siteConfig.supportEmail}
              </a>
              .
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
