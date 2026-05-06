'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BonusPracticeCapture from '@/components/free-practice/BonusPracticeCapture';
import QuizProgressBar from '@/components/free-practice/QuizProgressBar';
import QuizResultsCard from '@/components/free-practice/QuizResultsCard';
import UpgradeCTA from '@/components/free-practice/UpgradeCTA';
import { trackEvent } from '@/lib/analytics';

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

const LLQP_QUESTIONS: Question[] = [
  {
    id: 'llqp-1',
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
    id: 'llqp-2',
    type: 'scenario',
    prompt: 'An applicant discloses a serious condition. What is MOST likely?',
    options: [
      { id: 'a', label: 'A', text: 'Automatic decline' },
      { id: 'b', label: 'B', text: 'Ignored' },
      { id: 'c', label: 'C', text: 'Rated or excluded' },
      { id: 'd', label: 'D', text: 'Standard issue' }
    ],
    correctOptionId: 'c',
    explanation: 'Disclosed conditions typically receive ratings or exclusions once underwriting assesses severity.'
  },
  {
    id: 'llqp-3',
    type: 'concept',
    prompt: 'Revocable beneficiary means:',
    options: [
      { id: 'a', label: 'A', text: 'Cannot change' },
      { id: 'b', label: 'B', text: 'Can change anytime' },
      { id: 'c', label: 'C', text: 'Owns policy' },
      { id: 'd', label: 'D', text: 'Permanent' }
    ],
    correctOptionId: 'b',
    explanation: 'Revocable beneficiaries can generally be changed by the policy owner without consent.'
  },
  {
    id: 'llqp-4',
    type: 'concept',
    prompt: 'Group life insurance coverage is usually:',
    options: [
      { id: 'a', label: 'A', text: 'Health-based' },
      { id: 'b', label: 'B', text: 'Fixed' },
      { id: 'c', label: 'C', text: 'Salary multiple' },
      { id: 'd', label: 'D', text: 'Investment-based' }
    ],
    correctOptionId: 'c',
    explanation: 'Most employer plans are expressed as a multiple of salary rather than health-based benefit.'
  },
  {
    id: 'llqp-5',
    type: 'calculation',
    prompt: 'Which creates a taxable event?',
    options: [
      { id: 'a', label: 'A', text: 'Naming beneficiary' },
      { id: 'b', label: 'B', text: 'Paying premiums' },
      { id: 'c', label: 'C', text: 'Withdrawal' },
      { id: 'd', label: 'D', text: 'Increasing benefit' }
    ],
    correctOptionId: 'c',
    explanation: 'Withdrawals can trigger taxable gains depending on the adjusted cost basis and policy structure.'
  }
];

const BASICS_QUESTIONS: Question[] = [
  {
    id: 'basics-1',
    type: 'concept',
    prompt: 'Term life insurance is best suited for clients who:',
    options: [
      { id: 'a', label: 'A', text: 'Need coverage for a specific period such as a mortgage' },
      { id: 'b', label: 'B', text: 'Want a permanent investment vehicle' },
      { id: 'c', label: 'C', text: 'Prefer to tie coverage to an investment account' },
      { id: 'd', label: 'D', text: 'Need coverage that never changes' }
    ],
    correctOptionId: 'a',
    explanation: 'Term life delivers protection for a finite period at a lower premium than permanent plans.'
  },
  {
    id: 'basics-2',
    type: 'calculation',
    prompt: 'Which factor most directly adjusts the premium for a new policy?',
    options: [
      { id: 'a', label: 'A', text: 'The applicant’s age at issue' },
      { id: 'b', label: 'B', text: 'The agent’s commission structure' },
      { id: 'c', label: 'C', text: 'The carrier’s marketing spend' },
      { id: 'd', label: 'D', text: 'The illustration projections' }
    ],
    correctOptionId: 'a',
    explanation: 'Age is a core underwriting factor and directly sets the baseline premium.'
  },
  {
    id: 'basics-3',
    type: 'scenario',
    prompt: 'When matching coverage to a client, what should an advisor focus on first?',
    options: [
      { id: 'a', label: 'A', text: 'The cheapest available policy' },
      { id: 'b', label: 'B', text: 'The provider with the slickest marketing' },
      { id: 'c', label: 'C', text: 'Understanding the client’s goals and risk tolerance' },
      { id: 'd', label: 'D', text: 'The most popular coverage in the market' }
    ],
    correctOptionId: 'c',
    explanation: 'Suitability means aligning insurance with goals, finances, and comfort with risk.'
  },
  {
    id: 'basics-4',
    type: 'concept',
    prompt: 'An accidental death benefit rider is used to:',
    options: [
      { id: 'a', label: 'A', text: 'Add coverage that pays extra if death is accident-related' },
      { id: 'b', label: 'B', text: 'Guarantee investment return' },
      { id: 'c', label: 'C', text: 'Cancel a policy early' },
      { id: 'd', label: 'D', text: 'Provide guaranteed cash value' }
    ],
    correctOptionId: 'a',
    explanation: 'Accidental riders boost the benefit when qualifying accidents occur.'
  },
  {
    id: 'basics-5',
    type: 'concept',
    prompt: 'Guaranteed issue life insurance is defined by:',
    options: [
      { id: 'a', label: 'A', text: 'No medical underwriting and limited face amounts' },
      { id: 'b', label: 'B', text: 'Guaranteed cash value growth' },
      { id: 'c', label: 'C', text: 'Coverage tied to the stock market' },
      { id: 'd', label: 'D', text: 'Coverage that expires every month' }
    ],
    correctOptionId: 'a',
    explanation: 'Guaranteed issue products focus on accessibility with fewer underwriting questions but lower limits.'
  }
];

const ADVANCED_PREVIEW = [
  'A replacement scenario where affordability, underwriting, and disclosure all conflict',
  'A business-owner case requiring key-person protection and succession logic',
  'A policy-loan question with tax consequences and lapse risk layered together'
] as const;

const TYPE_LABEL: Record<QuestionType, string> = {
  concept: 'Concept',
  scenario: 'Scenario',
  calculation: 'Calculation'
};

const QUIZ_SETS = {
  llqp: {
    title: 'LLQP Quick Test',
    description: 'Five exam-style questions pulling from LLQP Life Insurance module reasoning and taxation logic.',
    questions: LLQP_QUESTIONS
  },
  basics: {
    title: 'Life Insurance Basics Quick Test',
    description: 'Five prompts that reinforce advisor thinking, product logic, and suitability reasoning.',
    questions: BASICS_QUESTIONS
  }
} as const;

type TestKey = keyof typeof QUIZ_SETS;

type ResultAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'muted';
};

function getResultTier(score: number, total: number) {
  const ratio = total > 0 ? score / total : 0;
  if (ratio <= 0.4) return 'low' as const;
  if (ratio <= 0.7) return 'mid' as const;
  return 'high' as const;
}

export default function QuestionProgressionSystem() {
  const [selectedTest, setSelectedTest] = useState<TestKey | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [finished, setFinished] = useState(false);

  const currentSet = selectedTest ? QUIZ_SETS[selectedTest] : null;
  const questions = currentSet?.questions ?? [];
  const total = questions.length;
  const current = questions[index];
  const currentAnswer = current ? answers.find((a) => a.questionId === current.id) : undefined;

  const score = useMemo(() => answers.filter((answer) => answer.isCorrect).length, [answers]);
  const wrongAnswers = useMemo(
    () =>
      answers
        .filter((answer) => !answer.isCorrect)
        .map((answer) => {
          const question = questions.find((item) => item.id === answer.questionId);
          return question ? { question, answer } : null;
        })
        .filter((entry): entry is { question: Question; answer: AnswerRecord } => Boolean(entry)),
    [answers, questions]
  );

  const breakdown = useMemo(() => {
    const types: QuestionType[] = ['concept', 'scenario', 'calculation'];
    return types.map((type) => {
      const typeQuestions = questions.filter((q) => q.type === type).length;
      const correct = answers.filter((a) => a.type === type && a.isCorrect).length;
      return { typeLabel: type.charAt(0).toUpperCase() + type.slice(1), correct, total: typeQuestions };
    });
  }, [answers, questions]);

  useEffect(() => {
    setIndex(0);
    setAnswers([]);
    setFinished(false);
  }, [selectedTest]);

  const restart = useCallback(() => {
    setIndex(0);
    setAnswers([]);
    setFinished(false);
  }, []);

  function chooseTest(test: TestKey) {
    trackEvent('free_practice_start', { quiz_set: test });
    setSelectedTest(test);
  }

  function handleSelect(optionId: string) {
    if (!current || currentAnswer) return;
    const isCorrect = optionId === current.correctOptionId;
    setAnswers((prev) => [
      ...prev,
      { questionId: current.id, type: current.type, selectedOptionId: optionId, isCorrect }
    ]);
  }

  function handleNext() {
    if (!current || !currentAnswer) return;
    if (index === total - 1) {
      trackEvent('free_practice_complete', {
        quiz_set: selectedTest ?? 'unknown',
        score,
        total,
        percentage: Math.round((score / Math.max(total, 1)) * 100)
      });
      setFinished(true);
      return;
    }
    setIndex((prev) => prev + 1);
  }

  const resultTier = getResultTier(score, total);

  const resultActions = useMemo<{ primary: ResultAction; secondary: ResultAction }>(() => {
    if (resultTier === 'low') {
      return {
        primary: { label: 'Read beginner guides', href: '/knowledge' },
        secondary: { label: 'Try another practice set', onClick: () => restart() }
      };
    }

    if (resultTier === 'mid') {
      return {
        primary: { label: 'Try another practice set', onClick: () => restart() },
        secondary: { label: 'Try harder questions', href: '/exam-prep', variant: 'muted' }
      };
    }

    return {
      primary: { label: 'Explore Life Insurance Module Prep', href: '/exam-prep' },
      secondary: { label: 'Download the LifeforgePrep app', href: '/app', variant: 'muted' }
    };
  }, [resultTier, restart]);

  if (!selectedTest) {
    return (
      <section id="free-practice-quiz" className="scroll-mt-28 rounded-2xl border border-slate-700 bg-[#111A2D] p-6 shadow-xl sm:p-8">
        <h2 className="text-2xl font-bold text-white">Choose your quick test</h2>
        <p className="mt-2 text-sm text-slate-300">
          Select a 5-question set that matches your focus: Canadian LLQP Life Insurance module logic or broader life insurance fundamentals.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(Object.keys(QUIZ_SETS) as TestKey[]).map((key) => {
            const test = QUIZ_SETS[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => chooseTest(key)}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-700 bg-[#0E1628] p-5 text-left transition hover:border-[#2FAF9E] hover:bg-[#142039]"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6BC4B8]">{test.title}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{test.description}</p>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">5 questions • start learning</p>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  if (finished && currentSet) {
    return (
      <section id="free-practice-quiz" className="scroll-mt-28 space-y-6">
        <QuizResultsCard score={score} total={total} breakdown={breakdown} />

        <div className="rounded-2xl border border-slate-700 bg-[#111A2D] p-6 text-sm text-slate-200">
          <p>
            This is for learning, not just memorizing—focus on advisor thinking, product logic, and suitability reasoning with every question.
          </p>
        </div>

        {wrongAnswers.length > 0 ? (
          <section className="rounded-2xl border border-slate-700 bg-[#111A2D] p-6 shadow-xl sm:p-8">
            <h3 className="text-xl font-bold text-white">Review the questions you missed</h3>
            <div className="mt-4 space-y-4">
              {wrongAnswers.map(({ question, answer }) => {
                const selectedOption = question.options.find((option) => option.id === answer.selectedOptionId);
                const correctOption = question.options.find((option) => option.id === question.correctOptionId);
                return (
                  <article key={question.id} className="rounded-xl border border-slate-700 bg-[#0E1628] p-4">
                    <p className="text-sm font-semibold text-white">{question.prompt}</p>
                    <p className="mt-2 text-sm text-rose-200">Your answer: {selectedOption?.text}</p>
                    <p className="mt-1 text-sm text-emerald-200">Correct answer: {correctOption?.text}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{question.explanation}</p>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <div className="grid gap-3 md:grid-cols-2">
          {resultActions.primary.href ? (
            <Link
              href={resultActions.primary.href}
              className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              {resultActions.primary.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={resultActions.primary.onClick}
              className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]"
            >
              {resultActions.primary.label}
            </button>
          )}

          {resultActions.secondary.href ? (
            <Link
              href={resultActions.secondary.href}
              className={`inline-flex items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold transition ${
                resultActions.secondary.variant === 'muted'
                  ? 'border-slate-500 text-slate-100 hover:border-white'
                  : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {resultActions.secondary.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={resultActions.secondary.onClick}
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {resultActions.secondary.label}
            </button>
          )}
        </div>

        <section className="rounded-2xl border border-slate-700 bg-[#0F1A2E] p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">Advanced scenario-based questions are available in Exam Prep</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Push beyond the 5-question free set with layered client situations, comparison logic, and harder suitability traps.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {ADVANCED_PREVIEW.map((item) => (
              <article key={item} className="relative overflow-hidden rounded-xl border border-slate-700 bg-[#111A2D] p-4 text-sm text-slate-300">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111A2D]/70 backdrop-blur-[2px]" aria-hidden="true" />
                <p className="relative font-medium">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <UpgradeCTA />

        <div className="flex justify-between text-sm text-slate-400">
          <button type="button" onClick={restart} className="underline-offset-4 hover:underline">
            Try the same quick test again
          </button>
          <button type="button" onClick={() => setSelectedTest(null)} className="underline-offset-4 hover:underline">
            Choose a different quick test
          </button>
        </div>

        <BonusPracticeCapture />
      </section>
    );
  }

  if (!currentSet || !current) return null;

  return (
    <section id="free-practice-quiz" className="scroll-mt-28 space-y-6">
      <div className="rounded-2xl border border-slate-700 bg-[#111A2D] p-6 shadow-xl sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6BC4B8]">{currentSet.title}</p>
            <p className="text-sm text-slate-300">{currentSet.description}</p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedTest(null)}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4A5568]"
          >
            Change test
          </button>
        </div>

        <QuizProgressBar current={index + 1} total={total} />

        <div className="mt-4 rounded-2xl border border-slate-600 bg-[#0E1628] p-4 text-sm text-slate-200">
          <p>
            This is for learning, not just memorizing—focus on advisor thinking, product logic, and suitability reasoning as you answer each question.
          </p>
        </div>

        <article className="mt-6 rounded-xl border border-slate-700 bg-[#0E1628] p-5">
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

          <div className="mt-5 flex justify-between">
            {index > 0 ? (
              <button
                type="button"
                onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                className="inline-flex items-center rounded-lg border border-slate-600 bg-transparent px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-400"
              >
                Back
              </button>
            ) : <span />}
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
      </div>
    </section>
  );
}
