import type { Metadata } from 'next';
import Link from 'next/link';
import QuestionOfWeekPanel from '@/components/free-practice/QuestionOfWeekPanel';

export const metadata: Metadata = {
  title: 'Life Insurance Question of the Week | LifeForgePrep',
  description:
    'Try a weekly LLQP-style life insurance practice question with answer explanation and exam-style reasoning.'
};

export default function QuestionOfTheWeekPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/free-practice" className="text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]">
          Back to Free Practice
        </Link>
        <div className="mt-5">
          <QuestionOfWeekPanel />
        </div>
      </div>
    </main>
  );
}
