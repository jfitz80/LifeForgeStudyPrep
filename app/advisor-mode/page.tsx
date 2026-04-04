import type { Metadata } from 'next';
import Link from 'next/link';
import { ADVISOR_SCENARIOS } from '@/lib/platform-seed';

export const metadata: Metadata = {
  title: 'Advisor Mode | LifeForgePrep',
  description: 'Practice client-based life insurance scenarios and learn how an advisor thinks through product fit, suitability, and follow-up questions.'
};

export default function AdvisorModePage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Advisor Mode</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">Learn how an advisor thinks</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4A5568]">
            Practice real-world client scenarios, recommendation logic, and product-fit thinking before you ever face an exam vignette or a real client conversation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/free-practice" className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]">
              Start Free Practice
            </Link>
            <Link href="/exam-prep" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50">
              Explore Exam Prep
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {ADVISOR_SCENARIOS.map((scenario) => (
            <article key={scenario.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#1F2A44]">{scenario.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]"><span className="font-semibold text-[#1F2A44]">Client profile:</span> {scenario.clientProfile}</p>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]"><span className="font-semibold text-[#1F2A44]">Need:</span> {scenario.needs}</p>
              <p className="mt-3 text-sm leading-7 text-[#4A5568]"><span className="font-semibold text-[#1F2A44]">Budget context:</span> {scenario.budgetContext}</p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Product options</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {scenario.productOptions.map((option) => (
                    <span key={option} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-[#1F2A44]">
                      {option}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-[#D8ECE8] bg-[#F2FBF8] p-4">
                <p className="text-sm font-semibold text-[#1F2A44]">Best-fit educational direction</p>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">{scenario.bestFit}</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#4A5568]"><span className="font-semibold text-[#1F2A44]">Why not every option:</span> {scenario.whyNotOthers}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-[#1F2A44]">Questions an advisor should clarify</p>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-[#4A5568]">
                  {scenario.advisorQuestions.map((question) => (
                    <li key={question} className="flex gap-2">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#4A5568]"><span className="font-semibold text-[#1F2A44]">Beginner takeaway:</span> {scenario.takeaway}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
