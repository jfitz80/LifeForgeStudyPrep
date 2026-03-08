import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureGrid from '@/components/FeatureGrid';
import HowItWorks from '@/components/HowItWorks';
import SampleQuestion from '@/components/SampleQuestion';
import WhoThisIsFor from '@/components/WhoThisIsFor';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SampleQuestion />
        <WhoThisIsFor />
        <FeatureGrid />
        <HowItWorks />

        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">What Learners Say</h2>
            <p className="mt-3 text-slate-600">Placeholder testimonials for launch. Replace with verified customer feedback.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {['Placeholder testimonial #1', 'Placeholder testimonial #2', 'Placeholder testimonial #3'].map((item) => (
                <article key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-slate-700">"{item}: Practical format and easy to study in short sessions."</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Placeholder Reviewer</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <LeadForm />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
