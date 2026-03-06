import { siteConfig } from '@/config/site';

export default function CTA() {
  return (
    <section className="bg-slate-900 py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Ready to prep smarter for your LLQP Life Insurance exam?
        </h2>
        <p className="mt-3 text-slate-300">
          Get immediate access to the {siteConfig.productName} and study with a focused, practical format.
        </p>
        <a
          href={siteConfig.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Download the Study Guide - {siteConfig.price}
        </a>
      </div>
    </section>
  );
}
