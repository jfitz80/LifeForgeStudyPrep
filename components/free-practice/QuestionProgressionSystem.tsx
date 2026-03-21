'use client';

import { useMemo, useState } from 'react';
import BonusPracticeCapture from '@/components/free-practice/BonusPracticeCapture';
import QuizProgressBar from '@/components/free-practice/QuizProgressBar';
import QuizResultsCard from '@/components/free-practice/QuizResultsCard';
import UpgradeCTA from '@/components/free-practice/UpgradeCTA';

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
    prompt: 'A client takes a policy loan from their permanent life insurance policy. Which is TRUE?',
    options: [
      { id: 'a', label: 'A', text: 'Always tax-free' },
      { id: 'b', label: 'B', text: 'Taxable only at maturity' },
      { id: 'c', label: 'C', text: 'May be taxable if it exceeds ACB' },
      { id: 'd', label: 'D', text: 'No tax impact' }
    ],
    correctOptionId: 'c',
    explanation: 'Policy loans can trigger taxable consequences when values exceed adjusted cost basis thresholds.'
  },
  {
    id: 'q2',
    type: 'scenario',
    prompt: 'An applicant discloses a serious condition. What is MOST likely?',
    options: [
      { id: 'a', label: 'A', text: 'Automatic decline' },
      { id: 'b', label: 'B', text: 'Ignored' },
      { id: 'c', label: 'C', text: 'Rated or excluded' },
      { id: 'd', label: 'D', text: 'Standard issue' }
    ],
    correctOptionId: 'c',
    explanation: 'Serious disclosed conditions are typically assessed through underwriting and may lead to ratings or exclusions.'
  },
  {
    id: 'q3',
    type: 'concept',
    prompt: 'Revocable beneficiary means:',
    options: [
      { id: 'a', label: 'A', text: 'Cannot change' },
      { id: 'b', label: 'B', text: 'Can change anytime' },
      { id: 'c', label: 'C', text: 'Owns policy' },
      { id: 'd', label: 'D', text: 'Permanent' }
    ],
    correctOptionId: 'b',
    explanation: 'Revocable beneficiary designations can generally be changed by the policy owner.'
  },
  {
    id: 'q4',
    type: 'concept',
    prompt: 'Group life insurance coverage is usually:',
    options: [
      { id: 'a', label: 'A', text: 'Health-based' },
      { id: 'b', label: 'B', text: 'Fixed' },
      { id: 'c', label: 'C', text: 'Salary multiple' },
      { id: 'd', label: 'D', text: 'Investment-based' }
    ],
    correctOptionId: 'c',
    explanation: 'Employer-sponsored group life is commonly expressed as a multiple of employee salary.'
  },
  {
    id: 'q5',
    type: 'calculation',
    prompt: 'Which creates a taxable event?',
    options: [
      { id: 'a', label: 'A', text: 'Naming beneficiary' },
      { id: 'b', label: 'B', text: 'Paying premiums' },
      { id: 'c', label: 'C', text: 'Withdrawal' },
      { id: 'd', label: 'D', text: 'Increasing benefit' }
    ],
    correctOptionId: 'c',
    explanation: 'Policy withdrawals can create taxable gains depending on adjusted cost basis and policy structure.'
  },
  {
    id: 'q6',
    type: 'calculation',
    prompt: 'A withdrawal exceeds ACB. What happens?',
    options: [
      { id: 'a', label: 'A', text: 'No tax' },
      { id: 'b', label: 'B', text: 'Fully tax-free' },
      { id: 'c', label: 'C', text: 'Excess is taxable' },
      { id: 'd', label: 'D', text: 'Only taxed at death' }
    ],
    correctOptionId: 'c',
    explanation: 'Amounts withdrawn above ACB are generally taxable under standard policy taxation treatment.'
  },
  {
    id: 'q7',
    type: 'concept',
    prompt: 'What is the PRIMARY purpose of underwriting?',
    options: [
      { id: 'a', label: 'A', text: 'Maximize premiums' },
      { id: 'b', label: 'B', text: 'Eliminate all risk' },
      { id: 'c', label: 'C', text: 'Assess and classify risk' },
      { id: 'd', label: 'D', text: 'Approve all applicants' }
    ],
    correctOptionId: 'c',
    explanation: 'Underwriting evaluates and classifies risk so coverage can be priced and structured appropriately.'
  },
  {
    id: 'q8',
    type: 'concept',
    prompt: 'Irrevocable beneficiary means:',
    options: [
      { id: 'a', label: 'A', text: 'Can change anytime' },
      { id: 'b', label: 'B', text: 'Requires consent to change' },
      { id: 'c', label: 'C', text: 'Has no rights' },
      { id: 'd', label: 'D', text: 'Only applies to group plans' }
    ],
    correctOptionId: 'b',
    explanation: 'Irrevocable beneficiaries usually must consent before ownership or beneficiary changes are made.'
  },
  {
    id: 'q9',
    type: 'scenario',
    prompt: 'If policy loan interest is unpaid:',
    options: [
      { id: 'a', label: 'A', text: 'No effect' },
      { id: 'b', label: 'B', text: 'Added to loan balance' },
      { id: 'c', label: 'C', text: 'Waived' },
      { id: 'd', label: 'D', text: 'Paid by insurer' }
    ],
    correctOptionId: 'b',
    explanation: 'Unpaid loan interest is generally capitalized into the outstanding policy loan balance.'
  },
  {
    id: 'q10',
    type: 'scenario',
    prompt: 'A client withdraws funds and policy collapses. What is MOST likely?',
    options: [
      { id: 'a', label: 'A', text: 'No tax consequence' },
      { id: 'b', label: 'B', text: 'Only future premiums affected' },
      { id: 'c', label: 'C', text: 'Gains may become taxable' },
      { id: 'd', label: 'D', text: 'Death benefit increases' }
    ],
    correctOptionId: 'c',
    explanation: 'When policy values are distributed and coverage collapses, taxable gains may be triggered.'
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

  const score = useMemo(() => answers.filter((a) => a.isCorrect).length, [answers]);

  const breakdown = useMemo(() => {
    const types: QuestionType[] = ['concept', 'scenario', 'calculation'];
    return types.map((type) => {
      const typeQuestions = QUESTIONS.filter((q) => q.type === type).length;
      const correct = answers.filter((a) => a.type === type && a.isCorrect).length;
      return { typeLabel: TYPE_LABEL[type], correct, total: typeQuestions };
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
      <section id="free-practice-quiz" className="scroll-mt-28">
        <QuizResultsCard score={score} total={total} breakdown={breakdown} />

        <UpgradeCTA />

        <div className="mt-6 flex justify-start">
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center rounded-lg border border-slate-500 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Continue Practicing
          </button>
        </div>

        <BonusPracticeCapture />
      </section>
    );
  }

  return (
    <section id="free-practice-quiz" className="scroll-mt-28 rounded-2xl border border-slate-700 bg-[#111A2D] p-6 shadow-xl sm:p-8">
      <QuizProgressBar current={index + 1} total={total} />

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
                className={`rounded-lg border px-4 py-4 text-left text-base font-medium transition ${optionClass} disabled:cursor-not-allowed`}
              >
                <span className="mr-2 inline-block font-semibold">{option.label}.</span>
                <span>{option.text}</span>
              </button>
            );
          })}
        </div>

        {currentAnswer ? (
          <div className="mt-5 rounded-lg border border-slate-600 bg-[#111A2D] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6BC4B8]">Explanation</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">{current.explanation}</p>
          </div>
        ) : null}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            disabled={!currentAnswer}
            className="inline-flex min-w-[170px] items-center justify-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {index === total - 1 ? 'View Results' : 'Next Question'}
          </button>
        </div>
      </article>
    </section>
  );
}
