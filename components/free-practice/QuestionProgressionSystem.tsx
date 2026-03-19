'use client';

import { useMemo, useState } from 'react';

type QuestionType = 'concept' | 'scenario' | 'calculation';

type QuestionOption = {
  id: string;
  label: string;
  text: string;
};

type Question = {
  id: string;
  type: QuestionType;
  prompt: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
};

type AnswerRecord = {
  questionId: string;
  type: QuestionType;
  selectedOptionId: string;
  isCorrect: boolean;
};

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'concept',
    prompt: 'Which statement best describes the primary purpose of term life insurance?',
    options: [
      { id: 'a', label: 'A', text: 'To provide temporary income protection for a specific period' },
      { id: 'b', label: 'B', text: 'To maximize long-term cash value accumulation only' },
      { id: 'c', label: 'C', text: 'To guarantee investment returns above inflation' },
      { id: 'd', label: 'D', text: 'To replace disability insurance coverage' }
    ],
    correctOptionId: 'a',
    explanation:
      'Term life is designed for temporary protection needs, such as income replacement while dependents are financially reliant.'
  },
  {
    id: 'q2',
    type: 'scenario',
    prompt:
      'A client has two young children, a large mortgage, and limited budget. Which recommendation is most suitable as a starting point?',
    options: [
      { id: 'a', label: 'A', text: 'High-premium whole life policy without needs analysis' },
      { id: 'b', label: 'B', text: '20-year term coverage aligned to mortgage and child dependency years' },
      { id: 'c', label: 'C', text: 'No coverage until income rises significantly' },
      { id: 'd', label: 'D', text: 'Universal life with maximum optional riders by default' }
    ],
    correctOptionId: 'b',
    explanation:
      'Suitability starts with core protection and affordability. Term coverage often fits temporary high-liability family needs.'
  },
  {
    id: 'q3',
    type: 'calculation',
    prompt:
      'If a client earns $90,000 annually, has $250,000 debt, and $100,000 savings, using a simple (10x income + debt - savings) rule, what is the estimated coverage need?',
    options: [
      { id: 'a', label: 'A', text: '$850,000' },
      { id: 'b', label: 'B', text: '$1,050,000' },
      { id: 'c', label: 'C', text: '$1,250,000' },
      { id: 'd', label: 'D', text: '$900,000' }
    ],
    correctOptionId: 'b',
    explanation:
      '10 x $90,000 = $900,000. Add debt ($250,000) and subtract savings ($100,000) for an estimated $1,050,000 need.'
  },
  {
    id: 'q4',
    type: 'scenario',
    prompt:
      'An applicant omits smoking history on the application. Which risk is most relevant during early policy years?',
    options: [
      { id: 'a', label: 'A', text: 'No impact if premiums were paid on time' },
      { id: 'b', label: 'B', text: 'Potential claim dispute due to material misrepresentation' },
      { id: 'c', label: 'C', text: 'Automatic conversion to disability coverage' },
      { id: 'd', label: 'D', text: 'Guaranteed payout regardless of application disclosures' }
    ],
    correctOptionId: 'b',
    explanation:
      'Material misrepresentation can affect claim handling and policy enforceability, especially in contestability review periods.'
  },
  {
    id: 'q5',
    type: 'concept',
    prompt: 'What is the clearest difference between revocable and irrevocable beneficiary designations?',
    options: [
      { id: 'a', label: 'A', text: 'Revocable beneficiaries always receive tax-free proceeds; irrevocable do not' },
      { id: 'b', label: 'B', text: 'Irrevocable designations may restrict owner changes without beneficiary consent' },
      { id: 'c', label: 'C', text: 'Revocable beneficiaries cannot be individuals' },
      { id: 'd', label: 'D', text: 'There is no practical legal difference' }
    ],
    correctOptionId: 'b',
    explanation:
      'Irrevocable beneficiary status can limit policy-owner control, which is why designation choice must be intentional.'
  }
];

const TYPE_LABEL: Record<QuestionType, string> = {
  concept: 'Concept',
  scenario: 'Scenario',
  calculation: 'Calculation'
};

export default function QuestionProgressionSystem() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [finished, setFinished] = useState(false);

  const total = QUESTIONS.length;
  const current = QUESTIONS[index];
  const currentAnswer = answers.find((a) => a.questionId === current.id);

  const progressPercent = Math.round(((index + (finished ? 1 : 0)) / total) * 100);

  const score = useMemo(() => answers.filter((a) => a.isCorrect).length, [answers]);

  const breakdown = useMemo(() => {
    const types: QuestionType[] = ['concept', 'scenario', 'calculation'];
    return types.map((type) => {
      const typeQuestions = QUESTIONS.filter((q) => q.type === type).length;
      const correct = answers.filter((a) => a.type === type && a.isCorrect).length;
      return { type, correct, total: typeQuestions };
    });
  }, [answers]);

  function handleSelect(optionId: string) {
    if (currentAnswer) return;

    const isCorrect = optionId === current.correctOptionId;
    setAnswers((prev) => [
      ...prev,
      {
        questionId: current.id,
        type: current.type,
        selectedOptionId: optionId,
        isCorrect
      }
    ]);
  }

  function handleNext() {
    if (!currentAnswer) return;
    if (index === total - 1) {
      setFinished(true);
      return;
    }
    setIndex((prev) => prev + 1);
  }

  function restart() {
    setAnswers([]);
    setIndex(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <section className="rounded-2xl border border-slate-700 bg-[#111A2D] p-6 shadow-xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6BC4B8]">Free Practice Complete</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Your Score: {score}/{total}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Great progress. Review your breakdown, then continue practicing or unlock full access for deeper scenario sets and full exam simulations.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {breakdown.map((item) => (
            <article key={item.type} className="rounded-xl border border-slate-700 bg-[#0E1628] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6BC4B8]">{TYPE_LABEL[item.type]}</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {item.correct}/{item.total}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="/exam-prep"
            className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
          >
            Unlock Full Access
          </a>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center rounded-lg border border-slate-500 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Continue Practicing
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-700 bg-[#111A2D] p-6 shadow-xl sm:p-8">
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6BC4B8]">Free Question Set</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Question {index + 1} of {total}
          </p>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-2 rounded-full bg-[#2FAF9E] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      <article className="rounded-xl border border-slate-700 bg-[#0E1628] p-5 transition-all duration-300">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6BC4B8]">{TYPE_LABEL[current.type]}</p>
        <h2 className="mt-2 text-xl font-bold leading-8 text-white">{current.prompt}</h2>

        <div className="mt-5 grid gap-3">
          {current.options.map((option) => {
            const isSelected = currentAnswer?.selectedOptionId === option.id;
            const isCorrect = option.id === current.correctOptionId;

            let optionClass = 'border-slate-600 bg-[#111A2D] text-slate-200 hover:border-slate-400';

            if (currentAnswer) {
              if (isCorrect) {
                optionClass = 'border-emerald-500 bg-emerald-500/15 text-emerald-100';
              } else if (isSelected && !isCorrect) {
                optionClass = 'border-rose-500 bg-rose-500/15 text-rose-100';
              } else {
                optionClass = 'border-slate-700 bg-[#111A2D] text-slate-400';
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                disabled={Boolean(currentAnswer)}
                className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${optionClass} disabled:cursor-not-allowed`}
              >
                <span className="mr-2 inline-block font-semibold">{option.label}.</span>
                <span>{option.text}</span>
              </button>
            );
          })}
        </div>

        {currentAnswer && (
          <div className="mt-5 rounded-lg border border-slate-600 bg-[#111A2D] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6BC4B8]">Explanation</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">{current.explanation}</p>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            disabled={!currentAnswer}
            className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26988a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {index === total - 1 ? 'View Results' : 'Next Question'}
          </button>
        </div>
      </article>
    </section>
  );
}
