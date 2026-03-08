import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `Disclaimer | ${siteConfig.brandName}`,
  description: 'Independent exam prep disclaimer for LifeForge Insurance Prep.'
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Disclaimer</h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
          <p>
            {siteConfig.brandName} is an independent exam prep resource. It is not affiliated with any regulator, licensing
            body, exam administrator, insurer, or textbook publisher.
          </p>
          <p>
            All content is original educational support material created to help candidates practice core life insurance
            licensing concepts. This site does not provide leaked exam questions or unauthorized exam content.
          </p>
          <p>
            Materials are provided for educational purposes only and are not a substitute for official curriculum,
            regulatory guidance, or legal advice.
          </p>
          <p>
            No guarantee is made that any user will pass an exam. Outcomes depend on each learner&apos;s preparation,
            current exam standards, and test performance.
          </p>
          <p>
            Users are responsible for verifying current exam requirements and compliance obligations in their own
            jurisdiction.
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
