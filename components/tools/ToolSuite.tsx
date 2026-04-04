'use client';

import { useEffect, useMemo, useState } from 'react';
import SmartCoverageFinder from '@/components/tools/SmartCoverageFinder';
import { trackEvent } from '@/lib/analytics';

type ToolKey = 'coverage' | 'comparison' | 'needs' | 'premium';

type ComparisonState = {
  lowerCost: number;
  lifelongCoverage: number;
  cashValue: number;
  simplicity: number;
  healthConcerns: number;
  estateGoals: number;
};

type NeedsState = {
  familyStatus: string;
  debts: string;
  dependents: string;
  goals: string;
  budgetSensitivity: string;
};

type PremiumState = {
  age: string;
  coverage: string;
  term: string;
  healthClass: string;
};

const STORAGE_KEY = 'lifeforge-tools-suite';

const tabs = [
  { key: 'coverage', label: 'Coverage Calculator' },
  { key: 'comparison', label: 'Term vs Permanent' },
  { key: 'needs', label: 'Needs Analysis' },
  { key: 'premium', label: 'Premium Estimator' }
] as const;

const defaultComparison: ComparisonState = {
  lowerCost: 4,
  lifelongCoverage: 2,
  cashValue: 1,
  simplicity: 3,
  healthConcerns: 1,
  estateGoals: 1
};

const defaultNeeds: NeedsState = {
  familyStatus: 'young-family',
  debts: 'high',
  dependents: '2+',
  goals: 'income-replacement',
  budgetSensitivity: 'high'
};

const defaultPremium: PremiumState = {
  age: '35',
  coverage: '500000',
  term: '20',
  healthClass: 'standard'
};

function clamp(value: number) {
  return Math.max(0, Math.min(5, value));
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export default function ToolSuite() {
  const [activeTab, setActiveTab] = useState<ToolKey>('coverage');
  const [comparison, setComparison] = useState<ComparisonState>(defaultComparison);
  const [needs, setNeeds] = useState<NeedsState>(defaultNeeds);
  const [premium, setPremium] = useState<PremiumState>(defaultPremium);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setHydrated(true);
        return;
      }
      const parsed = JSON.parse(raw) as {
        activeTab?: ToolKey;
        comparison?: ComparisonState;
        needs?: NeedsState;
        premium?: PremiumState;
      };
      if (parsed.activeTab) setActiveTab(parsed.activeTab);
      if (parsed.comparison) setComparison(parsed.comparison);
      if (parsed.needs) setNeeds(parsed.needs);
      if (parsed.premium) setPremium(parsed.premium);
    } catch {
      // Ignore invalid local storage state.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ activeTab, comparison, needs, premium })
    );
  }, [activeTab, comparison, needs, premium, hydrated]);

  const comparisonResult = useMemo(() => {
    const termScore = comparison.lowerCost * 2 + comparison.simplicity + comparison.healthConcerns;
    const permanentScore = comparison.lifelongCoverage * 2 + comparison.cashValue * 2 + comparison.estateGoals * 2;
    const leaning = termScore >= permanentScore ? 'Term leaning' : 'Permanent leaning';
    const recommendation =
      termScore >= permanentScore
        ? 'Term appears stronger because lower cost now, simpler structure, and temporary protection needs are carrying more weight.'
        : 'Permanent appears stronger because lifelong coverage, estate goals, or policy value features matter more in this profile.';
    return { termScore, permanentScore, leaning, recommendation };
  }, [comparison]);

  const needsResult = useMemo(() => {
    const product =
      needs.familyStatus === 'young-family' || needs.debts === 'high'
        ? 'Term insurance'
        : needs.goals === 'estate-support'
          ? 'Permanent insurance'
          : needs.goals === 'final-expense'
            ? 'Simplified or guaranteed issue coverage'
            : 'A mix of term and permanent options';

    return {
      summary: `This profile points first toward ${product.toLowerCase()} because the primary obligations, dependents, and budget constraints suggest that direction.`,
      considerations: [
        'Clarify who is financially exposed if the insured dies.',
        'Test how long the obligation lasts before choosing permanent features.',
        'Check whether underwriting access could limit the realistic product menu.'
      ]
    };
  }, [needs]);

  const premiumResult = useMemo(() => {
    const age = Number(premium.age) || 35;
    const coverage = Number(premium.coverage) || 250000;
    const term = Number(premium.term) || 20;
    const classFactor = premium.healthClass === 'preferred' ? 0.8 : premium.healthClass === 'standard' ? 1 : 1.5;
    const monthlyBase = (coverage / 1000) * (0.08 + Math.max(age - 30, 0) * 0.003) * classFactor * (term / 20);
    return {
      low: Math.max(18, Math.round(monthlyBase * 0.8)),
      high: Math.max(25, Math.round(monthlyBase * 1.25))
    };
  }, [premium]);

  useEffect(() => {
    if (!hydrated) return;
    if (activeTab === 'comparison') {
      trackEvent('calculator_usage', { tool: 'comparison', action: 'state_change', leaning: comparisonResult.leaning });
    }
    if (activeTab === 'needs') {
      trackEvent('calculator_usage', { tool: 'needs', action: 'state_change', goal: needs.goals });
    }
    if (activeTab === 'premium') {
      trackEvent('calculator_usage', { tool: 'premium', action: 'state_change', health_class: premium.healthClass });
    }
  }, [activeTab, comparisonResult.leaning, hydrated, needs.goals, premium.healthClass]);

  function openTab(key: ToolKey) {
    trackEvent('calculator_usage', { tool: key, action: 'open_tab' });
    setActiveTab(key);
  }

  function resetCurrentTool() {
    if (activeTab === 'comparison') setComparison(defaultComparison);
    if (activeTab === 'needs') setNeeds(defaultNeeds);
    if (activeTab === 'premium') setPremium(defaultPremium);
    trackEvent('calculator_usage', { tool: activeTab, action: 'reset' });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => openTab(tab.key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? 'border-[#2FAF9E] bg-[#E8F7F4] text-[#1E887B]'
                  : 'border-slate-200 bg-white text-[#1F2A44] hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm text-[#4A5568]">
          <span>{hydrated ? 'Progress saved on this device' : 'Loading saved tool state...'}</span>
          {activeTab !== 'coverage' ? (
            <button type="button" onClick={resetCurrentTool} className="font-semibold text-[#1F2A44] underline-offset-4 hover:underline">
              Reset tab
            </button>
          ) : null}
        </div>
      </div>

      {activeTab === 'coverage' ? <SmartCoverageFinder /> : null}

      {activeTab === 'comparison' ? (
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Term vs Permanent comparison</h2>
            <p className="mt-2 text-sm leading-7 text-[#4A5568]">Set the factors that matter most, then see which direction the profile leans toward. This is educational guidance, not personalized advice.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ['lowerCost', 'Lower cost now'],
                ['lifelongCoverage', 'Lifelong coverage'],
                ['cashValue', 'Cash value importance'],
                ['simplicity', 'Simplicity'],
                ['healthConcerns', 'Health concerns'],
                ['estateGoals', 'Estate / legacy goals']
              ].map(([key, label]) => (
                <label key={key} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4 text-sm text-[#1F2A44]">
                  <span className="font-semibold">{label}</span>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    value={comparison[key as keyof ComparisonState]}
                    onChange={(event) => setComparison((current) => ({ ...current, [key]: clamp(Number(event.target.value)) }))}
                    className="mt-3 w-full"
                  />
                  <span className="mt-2 block text-xs text-[#4A5568]">Priority: {comparison[key as keyof ComparisonState]} / 5</span>
                </label>
              ))}
            </div>
          </article>
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Recommendation leaning</p>
            <h3 className="mt-2 text-2xl font-bold text-[#1F2A44]">{comparisonResult.leaning}</h3>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">{comparisonResult.recommendation}</p>
            <div className="mt-5 rounded-xl border border-slate-200 bg-[#F9FAFB] p-4 text-sm text-[#4A5568]">
              <p><span className="font-semibold text-[#1F2A44]">Term score:</span> {comparisonResult.termScore}</p>
              <p className="mt-2"><span className="font-semibold text-[#1F2A44]">Permanent score:</span> {comparisonResult.permanentScore}</p>
            </div>
            <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
              Educational disclaimer: this tool highlights product direction only. Suitability still depends on goals, budget, underwriting, and policy details.
            </p>
          </aside>
        </section>
      ) : null}

      {activeTab === 'needs' ? (
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Needs Analysis Tool</h2>
            <p className="mt-2 text-sm leading-7 text-[#4A5568]">Use a simple advisor-style intake to organize household obligations, goals, and budget sensitivity before talking product.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-[#1F2A44]">Family status
                <select value={needs.familyStatus} onChange={(e) => setNeeds((current) => ({ ...current, familyStatus: e.target.value }))} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="young-family">Young family</option>
                  <option value="single">Single</option>
                  <option value="near-retiree">Near retiree</option>
                  <option value="business-owner">Business owner</option>
                </select>
              </label>
              <label className="text-sm font-medium text-[#1F2A44]">Debts
                <select value={needs.debts} onChange={(e) => setNeeds((current) => ({ ...current, debts: e.target.value }))} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
              <label className="text-sm font-medium text-[#1F2A44]">Dependents
                <select value={needs.dependents} onChange={(e) => setNeeds((current) => ({ ...current, dependents: e.target.value }))} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2+">2+</option>
                </select>
              </label>
              <label className="text-sm font-medium text-[#1F2A44]">Primary goal
                <select value={needs.goals} onChange={(e) => setNeeds((current) => ({ ...current, goals: e.target.value }))} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="income-replacement">Income replacement</option>
                  <option value="estate-support">Estate support</option>
                  <option value="final-expense">Final expense</option>
                  <option value="business-continuity">Business continuity</option>
                </select>
              </label>
              <label className="text-sm font-medium text-[#1F2A44] md:col-span-2">Budget sensitivity
                <select value={needs.budgetSensitivity} onChange={(e) => setNeeds((current) => ({ ...current, budgetSensitivity: e.target.value }))} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </label>
            </div>
          </article>
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Summary</p>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">{needsResult.summary}</p>
            <div className="mt-5 rounded-xl border border-slate-200 bg-[#F9FAFB] p-4">
              <p className="text-sm font-semibold text-[#1F2A44]">Key considerations</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4A5568]">
                {needsResult.considerations.map((item) => (
                  <li key={item} className="flex gap-2"><span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2FAF9E]" aria-hidden="true" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      ) : null}

      {activeTab === 'premium' ? (
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F2A44]">Premium Estimator</h2>
            <p className="mt-2 text-sm leading-7 text-[#4A5568]">This beta estimator provides rough, non-binding educational ranges only. It is designed to help users understand what factors move price, not quote a policy.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-[#1F2A44]">Age
                <input type="number" min={18} max={80} value={premium.age} onChange={(e) => setPremium((current) => ({ ...current, age: e.target.value }))} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
              </label>
              <label className="text-sm font-medium text-[#1F2A44]">Coverage amount
                <input type="number" min={50000} step={50000} value={premium.coverage} onChange={(e) => setPremium((current) => ({ ...current, coverage: e.target.value }))} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
              </label>
              <label className="text-sm font-medium text-[#1F2A44]">Term length
                <select value={premium.term} onChange={(e) => setPremium((current) => ({ ...current, term: e.target.value }))} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="10">10 years</option>
                  <option value="20">20 years</option>
                  <option value="30">30 years</option>
                </select>
              </label>
              <label className="text-sm font-medium text-[#1F2A44]">Health class
                <select value={premium.healthClass} onChange={(e) => setPremium((current) => ({ ...current, healthClass: e.target.value }))} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
                  <option value="preferred">Preferred</option>
                  <option value="standard">Standard</option>
                  <option value="rated">Rated / health concerns</option>
                </select>
              </label>
            </div>
          </article>
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Estimated monthly range</p>
            <p className="mt-3 text-3xl font-bold text-[#1F2A44]">{formatMoney(premiumResult.low)} - {formatMoney(premiumResult.high)}</p>
            <p className="mt-3 text-sm leading-7 text-[#4A5568]">Use this range to understand how age, face amount, term, and health class can move premiums. Final pricing depends on underwriting, carrier selection, and policy design.</p>
            <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
              Disclaimer: educational estimate only. Not a quote, not guaranteed, and not individualized financial advice.
            </p>
          </aside>
        </section>
      ) : null}
    </div>
  );
}
