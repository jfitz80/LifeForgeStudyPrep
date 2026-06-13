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

const CORE_QUESTIONS: Question[] = [
  {
    id: 'core-1',
    type: 'concept',
    prompt: 'A client buys life insurance mainly to transfer the financial risk of premature death. Which statement best describes the purpose of the coverage?',
    options: [
      { id: 'a', label: 'A', text: 'It eliminates every financial risk the family faces' },
      { id: 'b', label: 'B', text: 'It shifts a specified death-risk cost to the insurer in exchange for premiums' },
      { id: 'c', label: 'C', text: 'It guarantees investment profit for the policyowner' },
      { id: 'd', label: 'D', text: 'It replaces the need for beneficiary planning' }
    ],
    correctOptionId: 'b',
    explanation: 'Life insurance transfers a defined financial risk to the insurer. It does not remove every risk or guarantee investment results.'
  },
  {
    id: 'core-2',
    type: 'scenario',
    prompt: 'An applicant has a health history that may increase mortality risk. What is the most likely underwriting response?',
    options: [
      { id: 'a', label: 'A', text: 'Automatic decline' },
      { id: 'b', label: 'B', text: 'The information is ignored if premiums are paid' },
      { id: 'c', label: 'C', text: 'The insurer reviews the risk and may rate, modify, postpone, decline, or issue coverage' },
      { id: 'd', label: 'D', text: 'The applicant is always issued standard coverage' }
    ],
    correctOptionId: 'c',
    explanation: 'Underwriting assesses risk. A health condition does not create one automatic result; the insurer reviews severity, context, and product rules.'
  },
  {
    id: 'core-3',
    type: 'concept',
    prompt: 'What does a revocable beneficiary designation generally allow the policyowner to do?',
    options: [
      { id: 'a', label: 'A', text: 'Change the beneficiary subject to policy rules' },
      { id: 'b', label: 'B', text: 'Transfer ownership automatically to the beneficiary' },
      { id: 'c', label: 'C', text: 'Prevent all future policy changes' },
      { id: 'd', label: 'D', text: 'Make the beneficiary responsible for premiums' }
    ],
    correctOptionId: 'a',
    explanation: 'A revocable beneficiary can generally be changed by the policyowner, subject to policy terms and applicable law.'
  },
  {
    id: 'core-4',
    type: 'concept',
    prompt: 'Why does insurable interest matter when life insurance is purchased?',
    options: [
      { id: 'a', label: 'A', text: 'It helps ensure the policy is connected to a legitimate financial or recognized interest' },
      { id: 'b', label: 'B', text: 'It guarantees that the policy will never lapse' },
      { id: 'c', label: 'C', text: 'It lets anyone insure any stranger for any amount' },
      { id: 'd', label: 'D', text: 'It removes the need for underwriting' }
    ],
    correctOptionId: 'a',
    explanation: 'Insurable interest supports legitimate coverage and helps distinguish insurance from wagering on another person’s life.'
  },
  {
    id: 'core-5',
    type: 'concept',
    prompt: 'A policy grace period is best described as:',
    options: [
      { id: 'a', label: 'A', text: 'A period after a missed premium when coverage may remain in force if payment is made' },
      { id: 'b', label: 'B', text: 'A permanent waiver of every future premium' },
      { id: 'c', label: 'C', text: 'A guarantee that claims can never be reviewed' },
      { id: 'd', label: 'D', text: 'An automatic conversion to an annuity' }
    ],
    correctOptionId: 'a',
    explanation: 'A grace period gives limited time to pay a missed premium before coverage may lapse, depending on policy terms.'
  }
];

const BASICS_QUESTIONS: Question[] = [
  {
    id: 'basics-1',
    type: 'concept',
    prompt: 'Term life insurance is often best suited for clients who:',
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
    prompt: 'Which factor commonly affects the premium for a new individually underwritten life insurance policy?',
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

const EXTRA_FREE_QUESTIONS: Question[] = [
  {
    id: 'free-11',
    type: 'scenario',
    prompt: 'A client wants affordable coverage while their mortgage and dependent children create a temporary high need. Which starting point is usually most suitable?',
    options: [
      { id: 'a', label: 'A', text: 'Whole life insurance' },
      { id: 'b', label: 'B', text: 'Term life insurance' },
      { id: 'c', label: 'C', text: 'Universal life insurance' },
      { id: 'd', label: 'D', text: 'An annuity contract' }
    ],
    correctOptionId: 'b',
    explanation: 'The need is temporary, high-coverage, and affordability-sensitive. Term insurance is often the stronger starting point.'
  },
  {
    id: 'free-12',
    type: 'scenario',
    prompt: 'Before recommending a replacement policy, what should an advisor review most carefully?',
    options: [
      { id: 'a', label: 'A', text: 'Only the new premium' },
      { id: 'b', label: 'B', text: 'Coverage, costs, exclusions, surrender values, and client impact' },
      { id: 'c', label: 'C', text: 'Only the application signature page' },
      { id: 'd', label: 'D', text: 'The product with the most features' }
    ],
    correctOptionId: 'b',
    explanation: 'Replacement can create risks. The advisor must compare the existing and proposed policies and document the reasoning.'
  },
  {
    id: 'free-13',
    type: 'concept',
    prompt: 'Who normally has the contractual right to request policy changes, subject to policy terms?',
    options: [
      { id: 'a', label: 'A', text: 'The policy owner' },
      { id: 'b', label: 'B', text: 'The insured' },
      { id: 'c', label: 'C', text: 'The beneficiary' },
      { id: 'd', label: 'D', text: 'The medical examiner' }
    ],
    correctOptionId: 'a',
    explanation: 'The owner controls many policy rights, while the insured and beneficiary may be different people.'
  },
  {
    id: 'free-14',
    type: 'scenario',
    prompt: 'A beneficiary asks why a claim is delayed. Which response is most appropriate?',
    options: [
      { id: 'a', label: 'A', text: 'Promise immediate payment' },
      { id: 'b', label: 'B', text: 'Explain that claims may require documentation, policy review, and beneficiary verification' },
      { id: 'c', label: 'C', text: 'Tell the beneficiary to cancel the policy' },
      { id: 'd', label: 'D', text: 'Avoid communication until the insurer pays' }
    ],
    correctOptionId: 'b',
    explanation: 'Claims handling requires documentation and review. Advisors should communicate clearly without promising outcomes they cannot control.'
  },
  {
    id: 'free-15',
    type: 'calculation',
    prompt: 'Which is the safest general starting point about cash value taxation?',
    options: [
      { id: 'a', label: 'A', text: 'Every cash value transaction is tax-free' },
      { id: 'b', label: 'B', text: 'Tax treatment depends on the transaction, policy structure, and applicable rules' },
      { id: 'c', label: 'C', text: 'Policy loans are never relevant for tax' },
      { id: 'd', label: 'D', text: 'Premiums are always personally deductible' }
    ],
    correctOptionId: 'b',
    explanation: 'Tax treatment depends on the details. Exam-style questions often test overly broad assumptions.'
  }
];

const FREE_QUESTIONS: Question[] = [...CORE_QUESTIONS, ...BASICS_QUESTIONS, ...EXTRA_FREE_QUESTIONS];

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
  free15: {
    title: 'Free Life Insurance Practice',
    description: 'Fifteen scenario-based questions covering core insurance concepts, policy provisions, underwriting, beneficiaries, annuities, and advisor judgment.',
    questions: FREE_QUESTIONS
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
  const [selectedTest] = useState<TestKey>('free15');
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

  useEffect(() => {
    trackEvent('start_free_practice', { quiz_set: selectedTest, source_page: 'free-practice' });
  }, [selectedTest]);

  const restart = useCallback(() => {
    setIndex(0);
    setAnswers([]);
    setFinished(false);
  }, []);

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
      trackEvent('complete_free_practice', {
        quiz_set: selectedTest ?? 'unknown',
        source_page: 'free-practice',
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
      primary: { label: 'Explore Exam Prep', href: '/exam-prep' },
      secondary: { label: 'Download the LifeforgePrep app', href: '/app', variant: 'muted' }
    };
  }, [resultTier, restart]);

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

        <section className="rounded-2xl border border-slate-700 bg-[#0F1A2E] p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">You&apos;ve completed your free practice session.</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            You&apos;ve seen the basics. The real learning happens when questions get more scenario-based, time-limited, and judgment-driven.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
            {['Harder scenario questions', 'Timed exam practice', 'Detailed explanations', 'Topic and difficulty progression'].map((item) => (
              <li key={item} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" /><span>{item}</span></li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/app" data-cta="unlock-full-practice" data-location="free-practice-results" data-campaign="post-quiz-conversion" className="inline-flex items-center justify-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]">
              Unlock Full Practice
            </Link>
            <Link href="/app" data-cta="download-free-app" data-location="free-practice-results" data-campaign="post-quiz-conversion" className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Download Free App
            </Link>
            <button type="button" onClick={restart} data-cta="try-another-free-set" data-location="free-practice-results" data-campaign="post-quiz-conversion" className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Try Another Free Set
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-[#0F1A2E] p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white">Advanced scenario-based questions are available in Exam Prep</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Push beyond the free set with layered client situations, comparison logic, and harder suitability traps.
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
          <Link href="/app" className="underline-offset-4 hover:underline">
            Choose your study path in the app
          </Link>
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
