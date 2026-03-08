import LeadForm from '@/components/LeadForm';

export default function NewsletterSection() {
  return (
    <section id="exam-prep" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-16 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Newsletter</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Get the life insurance digest that keeps you informed without the noise.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Weekly context on market shifts, policy concepts, and practical exam-prep insights for learners and professionals.
          </p>
        </div>
      </div>

      <LeadForm
        sectionId="newsletter-signup"
        heading="Join the Weekly Life Insurance Digest"
        description="Receive concise updates, practical explainers, and relevant industry context in one clear weekly email."
        submitLabel="Subscribe"
      />
    </section>
  );
}
