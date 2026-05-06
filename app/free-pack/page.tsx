import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Pack | LifeForgePrep',
  description: 'Access 5 free exam-style life insurance questions and a quick product comparison cheat sheet from LifeForgePrep.'
};

const questions = [
  {
    question: 'A client wants affordable coverage for a 20-year mortgage and young children. What direction is usually strongest?',
    answer: 'Term insurance is usually the strongest starting point because the protection need is high but temporary and affordability matters.'
  },
  {
    question: 'What is the main purpose of underwriting?',
    answer: 'To assess and classify risk before the insurer decides pricing, exclusions, or whether to issue the policy.'
  },
  {
    question: 'What should an advisor clarify before recommending guaranteed issue coverage?',
    answer: 'Whether the client could still qualify for a better-value simplified or fully underwritten option, and what waiting periods or limitations apply.'
  },
  {
    question: 'What usually matters more than the headline premium when comparing policies?',
    answer: 'Long-term fit, renewability, convertibility, exclusions, and whether the structure actually solves the client’s problem.'
  },
  {
    question: 'Why do candidates miss scenario questions they thought they understood?',
    answer: 'Because the exam often tests suitability, ownership, underwriting, or wording details rather than simple definitions.'
  }
] as const;

const cheatSheet = [
  ['Term life insurance', 'Lower cost now, defined coverage period, strong for income replacement and debt protection.'],
  ['Permanent life insurance', 'Long-duration coverage, may include cash value, stronger when lifelong need or estate goals matter.'],
  ['Guaranteed issue life insurance', 'Access-first product for harder-to-insure clients, often with lower face amounts and higher relative cost.'],
  ['Simplified issue coverage', 'Fewer questions than traditional underwriting, often a middle ground between accessibility and value.']
] as const;

export default function FreePackPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Free Pack</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">5 exam-style questions + product comparison cheat sheet</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            Use this quick pack to sharpen your life insurance fundamentals, test basic advisor reasoning, and compare the main product directions before moving into deeper practice.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-[#1F2A44]">5 free questions</h2>
          <div className="mt-5 space-y-4">
            {questions.map((item, index) => (
              <article key={item.question} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Question {index + 1}</p>
                <p className="mt-2 text-base font-semibold text-[#1F2A44]">{item.question}</p>
                <p className="mt-3 text-sm leading-7 text-[#4A5568]"><span className="font-semibold text-[#1F2A44]">Answer:</span> {item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Product comparison cheat sheet</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {cheatSheet.map(([title, body]) => (
              <article key={title} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
                <h3 className="text-lg font-semibold text-[#1F2A44]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#D8ECE8] bg-[#F2FBF8] p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F2A44]">Next step</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4A5568]">
            If this helped, move into the interactive free practice flow for answer feedback and score-based guidance, or go straight to full exam prep for deeper scenario work.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/free-practice" className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]">
              Try 5 Free Questions
            </Link>
            <Link href="/knowledge" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
              Explore Knowledge Hub
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
