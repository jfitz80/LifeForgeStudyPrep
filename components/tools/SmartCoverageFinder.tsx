'use client';

import { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

type FinderForm = {
  age: string;
  annualIncome: string;
  dependents: string;
  debt: string;
  savings: string;
  smoker: '' | 'yes' | 'no';
};

type PolicyType = 'Term' | 'Whole' | 'Universal';

type FinderResult = {
  lowCoverage: number;
  highCoverage: number;
  policyType: PolicyType;
  termLength: string;
  lowPremium: number;
  highPremium: number;
  explanation: string;
};

const STORAGE_KEY = 'lifeforge-tools-coverage-finder';

const steps: Array<{
  key: keyof FinderForm;
  label: string;
  hint: string;
  type: 'number' | 'select';
}> = [
  { key: 'age', label: 'How old are you?', hint: 'Used for risk and term guidance.', type: 'number' },
  { key: 'annualIncome', label: 'What is your annual income?', hint: 'Enter before-tax yearly income.', type: 'number' },
  { key: 'dependents', label: 'How many dependents rely on you?', hint: 'Children or others relying on your income.', type: 'number' },
  { key: 'debt', label: 'What is your mortgage/debt total?', hint: 'Include mortgage and other major obligations.', type: 'number' },
  { key: 'savings', label: 'How much savings do you have?', hint: 'Emergency fund + investable liquid savings.', type: 'number' },
  { key: 'smoker', label: 'Do you currently smoke?', hint: 'Smoking status materially affects premium estimates.', type: 'select' }
];

const emptyForm: FinderForm = {
  age: '',
  annualIncome: '',
  dependents: '',
  debt: '',
  savings: '',
  smoker: ''
};

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function parseNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function calculateResult(input: FinderForm): FinderResult {
  const age = parseNumber(input.age);
  const annualIncome = parseNumber(input.annualIncome);
  const dependents = parseNumber(input.dependents);
  const debt = parseNumber(input.debt);
  const savings = parseNumber(input.savings);
  const smoker = input.smoker === 'yes';

  const incomeNeed = annualIncome * 10;
  const dependentNeed = dependents * 100000;
  const grossNeed = incomeNeed + dependentNeed + debt;
  const netNeed = Math.max(100000, grossNeed - savings);

  const lowCoverage = Math.max(100000, Math.round((netNeed * 0.85) / 50000) * 50000);
  const highCoverage = Math.max(lowCoverage + 50000, Math.round((netNeed * 1.2) / 50000) * 50000);

  let policyType: PolicyType = 'Universal';
  if (age <= 45 && (dependents > 0 || debt > 0)) {
    policyType = 'Term';
  } else if (age >= 50 && savings > netNeed * 0.35) {
    policyType = 'Whole';
  }

  let termLength = '20 years';
  if (policyType === 'Whole') {
    termLength = 'Lifetime coverage';
  } else if (age < 35) {
    termLength = '30 years';
  } else if (age < 45) {
    termLength = '25 years';
  } else if (age < 55) {
    termLength = '20 years';
  } else {
    termLength = '15 years';
  }

  const ageFactor = Math.max(age - 30, 0);
  const ratePerThousand =
    policyType === 'Term'
      ? 0.09 + ageFactor * 0.004 + (smoker ? 0.12 : 0)
      : policyType === 'Whole'
        ? 0.35 + ageFactor * 0.008 + (smoker ? 0.2 : 0)
        : 0.28 + ageFactor * 0.007 + (smoker ? 0.18 : 0);

  const midpointCoverage = (lowCoverage + highCoverage) / 2;
  const midpointPremium = (midpointCoverage / 1000) * ratePerThousand;

  const lowPremium = Math.max(20, Math.round(midpointPremium * 0.75));
  const highPremium = Math.max(lowPremium + 10, Math.round(midpointPremium * 1.25));

  const explanation =
    policyType === 'Term'
      ? 'Term is usually the most efficient fit for income replacement and debt protection over a defined period.'
      : policyType === 'Whole'
        ? 'Whole coverage may fit long-duration protection goals where stability and permanence are prioritized.'
        : 'Universal can offer flexible long-term structure when protection and adaptability are both important.';

  return {
    lowCoverage,
    highCoverage,
    policyType,
    termLength,
    lowPremium,
    highPremium,
    explanation
  };
}

export default function SmartCoverageFinder() {
  const [stepIndex, setStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [form, setForm] = useState<FinderForm>(emptyForm);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setHydrated(true);
        return;
      }
      const parsed = JSON.parse(raw) as { stepIndex?: number; showResult?: boolean; form?: FinderForm };
      if (parsed.form) setForm(parsed.form);
      if (typeof parsed.stepIndex === 'number') setStepIndex(Math.max(0, Math.min(parsed.stepIndex, steps.length - 1)));
      if (typeof parsed.showResult === 'boolean') setShowResult(parsed.showResult);
    } catch {
      // Ignore malformed local storage.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ stepIndex, showResult, form }));
  }, [form, hydrated, showResult, stepIndex]);

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const canContinue = useMemo(() => {
    const value = form[currentStep.key];
    if (currentStep.type === 'select') return value === 'yes' || value === 'no';
    return String(value).trim() !== '' && Number(value) >= 0;
  }, [currentStep, form]);

  const isComplete = steps.every((step) => {
    const value = form[step.key];
    if (step.type === 'select') return value === 'yes' || value === 'no';
    return String(value).trim() !== '';
  });

  const result = useMemo(() => (isComplete ? calculateResult(form) : null), [form, isComplete]);

  useEffect(() => {
    if (showResult && result) {
      trackEvent('calculator_usage', {
        tool: 'coverage',
        action: 'show_result',
        suggested_policy: result.policyType,
        low_coverage: result.lowCoverage,
        high_coverage: result.highCoverage
      });
    }
  }, [result, showResult]);

  function resetFinder() {
    setStepIndex(0);
    setShowResult(false);
    setForm(emptyForm);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Smart Coverage Finder</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1F2A44]">Step-by-step estimate</h2>
            <p className="mt-2 text-sm text-[#4A5568]">Answer a few key questions to get a practical starting range.</p>
          </div>
          <button type="button" onClick={resetFinder} className="text-sm font-semibold text-[#1F2A44] underline-offset-4 hover:underline">
            Reset
          </button>
        </div>

        <div className="mb-5 h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-[#2FAF9E] transition-all" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Step {stepIndex + 1} of {steps.length}
        </p>
        {!hydrated ? <p className="mt-2 text-xs text-slate-500">Loading saved progress...</p> : null}

        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <label htmlFor={currentStep.key} className="block text-lg font-semibold text-[#1F2A44]">
            {currentStep.label}
          </label>
          <p className="mt-1 text-sm text-[#4A5568]">{currentStep.hint}</p>

          {currentStep.type === 'number' ? (
            <input
              id={currentStep.key}
              type="number"
              inputMode="numeric"
              min={0}
              value={form[currentStep.key]}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, [currentStep.key]: e.target.value }));
                setShowResult(false);
              }}
              className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-[#2FAF9E] focus:ring"
            />
          ) : (
            <select
              id={currentStep.key}
              value={form[currentStep.key]}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, [currentStep.key]: e.target.value as 'yes' | 'no' }));
                setShowResult(false);
              }}
              className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-[#2FAF9E] focus:ring"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (showResult) {
                setShowResult(false);
                return;
              }
              setStepIndex((prev) => Math.max(0, prev - 1));
            }}
            disabled={stepIndex === 0}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#1F2A44] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>

          <button
            type="button"
            onClick={() => {
              if (isLastStep) {
                if (canContinue) setShowResult(true);
                return;
              }
              setStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
            }}
            disabled={!canContinue}
            className="rounded-lg bg-[#2FAF9E] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLastStep ? 'See result' : 'Next'}
          </button>
        </div>
      </section>

      <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
        <h3 className="text-lg font-bold text-[#1F2A44]">Coverage Recommendation</h3>

        {result && showResult ? (
          <div className="mt-4 space-y-4 text-sm text-[#4A5568]">
            <div className="rounded-lg border border-[#D2ECE8] bg-[#F3FBF9] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1E887B]">Recommended Coverage</p>
              <p className="mt-1 text-xl font-bold text-[#1F2A44]">
                {formatMoney(result.lowCoverage)} - {formatMoney(result.highCoverage)}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p>
                <span className="font-semibold text-[#1F2A44]">Suggested policy:</span> {result.policyType}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-[#1F2A44]">Suggested term:</span> {result.termLength}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-[#1F2A44]">Estimated monthly premium:</span> {formatMoney(result.lowPremium)} - {formatMoney(result.highPremium)}
              </p>
            </div>

            <p className="leading-6">{result.explanation}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-[#4A5568]">Complete all steps to generate your recommendation.</p>
        )}

        <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
          Disclaimer: This tool provides educational estimates only and is not financial, tax, or legal advice. Final pricing and suitability depend on full underwriting and policy terms.
        </p>
      </aside>
    </div>
  );
}
