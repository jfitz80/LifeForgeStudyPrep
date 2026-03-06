import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `Disclaimer | ${siteConfig.brandName}`,
  description: 'Legal disclaimer for independent LLQP study material.'
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Disclaimer</h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
          <p>
            {siteConfig.brandName} and the {siteConfig.productName} are independent educational resources. They are not
            affiliated with, endorsed by, or sponsored by any regulator, licensing body, insurer, or official LLQP provider.
          </p>
          <p>
            This material is provided for study support and informational purposes only. It does not replace official course
            content, legal guidance, or regulatory requirements.
          </p>
          <p>
            No guarantee is made that any user will pass an exam. Outcomes depend on each learner&apos;s preparation, current
            standards, and exam conditions.
          </p>
          <p>
            Users are responsible for confirming all current exam requirements, compliance obligations, and eligibility rules
            from official sources in their jurisdiction.
          </p>
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
