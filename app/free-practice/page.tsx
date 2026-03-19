import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';
import QuestionProgressionSystem from '@/components/free-practice/QuestionProgressionSystem';

export const metadata: Metadata = {
  title: 'Free Practice | LifeForgePrep',
  description: 'Practice exam-style questions and test your readiness before unlocking full access.'
};

export default function FreePracticePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#0B1323] py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8 rounded-2xl border border-slate-700 bg-[#111A2D] p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6BC4B8]">Free Practice</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Question Progression System</h1>
            <p className="mt-3 max-w-3xl text-slate-300">
              Complete 5 free exam-style questions one at a time, review instant explanations, and get a score breakdown by question type.
            </p>
          </header>

          <QuestionProgressionSystem />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
