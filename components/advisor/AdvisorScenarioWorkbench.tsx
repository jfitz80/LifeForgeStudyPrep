'use client';

import { useMemo, useState } from 'react';
import { ADVISOR_SCENARIOS } from '@/lib/platform-seed';
import { trackEvent } from '@/lib/analytics';

type ScenarioSlug = (typeof ADVISOR_SCENARIOS)[number]['slug'];

type Answers = {
  objective: string;
  priority: string;
  product: string;
  clarify: string;
};

const priorityOptions = [
  { label: 'Affordability', value: 'affordability' },
  { label: 'Permanence', value: 'permanence' },
  { label: 'Guaranteed acceptance', value: 'guaranteed acceptance' },
  { label: 'Estate planning', value: 'estate planning' },
  { label: 'Simplicity', value: 'simplicity' }
] as const;

export default function AdvisorScenarioWorkbench() {
  const [selectedSlug, setSelectedSlug] = useState<ScenarioSlug>(ADVISOR_SCENARIOS[0].slug);
  const [answers, setAnswers] = useState<Record<string, Answers>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const scenario = useMemo(
    () => ADVISOR_SCENARIOS.find((item) => item.slug === selectedSlug) ?? ADVISOR_SCENARIOS[0],
    [selectedSlug]
  );

  const currentAnswers = answers[selectedSlug] ?? {
    objective: '',
    priority: '',
    product: '',
    clarify: ''
  };

  const resultReady = submitted[selectedSlug];
  const objectiveMatch = currentAnswers.objective === scenario.primaryObjective;
  const priorityMatch = currentAnswers.priority === scenario.priority;
  const productMatch = currentAnswers.product === scenario.recommendedProduct;
  const clarifyMatch = currentAnswers.clarify.length > 0;
  const fitScore = [objectiveMatch, priorityMatch, productMatch, clarifyMatch].filter(Boolean).length;

  function updateAnswer(key: keyof Answers, value: string) {
    setAnswers((current) => ({
      ...current,
      [selectedSlug]: {
        ...(current[selectedSlug] ?? { objective: '', priority: '', product: '', clarify: '' }),
        [key]: value
      }
    }));
    setSubmitted((current) => ({ ...current, [selectedSlug]: false }));
  }

  function evaluateScenario() {
    trackEvent('advisor_mode_start', { scenario: selectedSlug, action: 'evaluate' });
    setSubmitted((current) => ({ ...current, [selectedSlug]: true }));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Scenario library</p>
        <div className="mt-4 space-y-3">
          {ADVISOR_SCENARIOS.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => {
                trackEvent('advisor_mode_start', { scenario: item.slug, action: 'select' });
                setSelectedSlug(item.slug);
              }}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                item.slug === selectedSlug
                  ? 'border-[#2FAF9E] bg-[#F2FBF8]'
                  : 'border-slate-200 bg-[#F9FAFB] hover:border-slate-300 hover:bg-white'
              }`}
            >
              <p className="text-sm font-semibold text-[#1F2A44]">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-[#4A5568]">{item.clientProfile}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="space-y-6">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Client profile</p>
          <h2 className="mt-2 text-3xl font-bold text-[#1F2A44]">{scenario.title}</h2>
          <p className="mt-4 text-sm leading-7 text-[#4A5568]">{scenario.clientProfile}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
              <p className="text-sm font-semibold text-[#1F2A44]">Need</p>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">{scenario.needs}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
              <p className="text-sm font-semibold text-[#1F2A44]">Budget context</p>
              <p className="mt-2 text-sm leading-7 text-[#4A5568]">{scenario.budgetContext}</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Advisor decision flow</p>
          <div className="mt-5 space-y-6">
            <div>
              <p className="text-base font-semibold text-[#1F2A44]">1. What is the client trying to protect?</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {[scenario.primaryObjective, 'Build estate value and long-term legacy planning only', 'Maximize cash value growth first', 'Buy the largest face amount regardless of fit'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateAnswer('objective', option)}
                    className={`rounded-xl border p-4 text-left text-sm transition ${
                      currentAnswers.objective === option
                        ? 'border-[#2FAF9E] bg-[#F2FBF8] text-[#1F2A44]'
                        : 'border-slate-200 bg-[#F9FAFB] text-[#4A5568] hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-base font-semibold text-[#1F2A44]">2. What matters most in this case?</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {priorityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateAnswer('priority', option.value)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      currentAnswers.priority === option.value
                        ? 'border-[#2FAF9E] bg-[#E8F7F4] text-[#1E887B]'
                        : 'border-slate-200 bg-white text-[#1F2A44] hover:bg-slate-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-base font-semibold text-[#1F2A44]">3. Which product direction is most suitable?</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {scenario.productOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateAnswer('product', option)}
                    className={`rounded-xl border p-4 text-left text-sm transition ${
                      currentAnswers.product === option
                        ? 'border-[#2FAF9E] bg-[#F2FBF8] text-[#1F2A44]'
                        : 'border-slate-200 bg-[#F9FAFB] text-[#4A5568] hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-base font-semibold text-[#1F2A44]">4. What should the advisor clarify before recommending?</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {scenario.advisorQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => updateAnswer('clarify', question)}
                    className={`rounded-xl border p-4 text-left text-sm transition ${
                      currentAnswers.clarify === question
                        ? 'border-[#2FAF9E] bg-[#F2FBF8] text-[#1F2A44]'
                        : 'border-slate-200 bg-[#F9FAFB] text-[#4A5568] hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={evaluateScenario}
            className="mt-8 inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
          >
            Evaluate recommendation
          </button>
        </article>

        {resultReady ? (
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Recommendation output</p>
                <h3 className="mt-2 text-2xl font-bold text-[#1F2A44]">Best-fit educational recommendation</h3>
              </div>
              <span className="rounded-full border border-slate-200 bg-[#F9FAFB] px-4 py-2 text-sm font-semibold text-[#1F2A44]">
                Fit score: {fitScore}/4
              </span>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-[#D8ECE8] bg-[#F2FBF8] p-5">
                <p className="text-sm font-semibold text-[#1F2A44]">Recommended direction</p>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">{scenario.bestFit}</p>
                <p className="mt-3 text-sm font-semibold text-[#1F2A44]">Why not other options</p>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">{scenario.whyNotOthers}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-5">
                <p className="text-sm font-semibold text-[#1F2A44]">Client questions to ask</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4A5568]">
                  {scenario.advisorQuestions.map((question) => (
                    <li key={question} className="flex gap-2">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold text-[#1F2A44]">Beginner advisor takeaway</p>
                <p className="mt-2 text-sm leading-7 text-[#4A5568]">{scenario.takeaway}</p>
              </div>
            </div>
          </article>
        ) : null}
      </section>
    </div>
  );
}
