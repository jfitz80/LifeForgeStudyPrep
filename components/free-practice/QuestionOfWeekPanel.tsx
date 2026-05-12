'use client';

import { useState } from 'react';
import TrackedLink from '@/components/TrackedLink';
import { weeklyContent } from '@/data/weeklyContent';
import { trackEvent } from '@/lib/analytics';

export default function QuestionOfWeekPanel() {
  const [revealed, setRevealed] = useState(false);
  const question = weeklyContent.questionOfTheWeek;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#E8F7F4] px-3 py-1 text-xs font-semibold text-[#1E887B]">Updated weekly</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          Difficulty: {question.difficulty}
        </span>
      </div>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">Life Insurance Question of the Week</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
        Try one LLQP-style Life Insurance module question, then reveal the answer and study the reasoning.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">{question.title}</p>
        <h2 className="mt-3 text-xl font-bold leading-snug text-[#1F2A44]">{question.question}</h2>
        <div className="mt-5 grid gap-3">
          {question.choices.map((choice) => (
            <div key={choice} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
              {choice}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            if (!revealed) {
              trackEvent('reveal_question_answer', {
                source: 'question_of_week_page',
                difficulty: question.difficulty
              });
            }
            setRevealed(true);
          }}
          className="mt-5 rounded-xl bg-[#1F2A44] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Reveal answer
        </button>
      </div>

      {revealed ? (
        <div className="mt-6 rounded-2xl border border-[#CFEAE4] bg-[#F1FBF8] p-5">
          <p className="text-sm font-semibold text-[#1F2A44]">Correct answer: {question.correctAnswer}</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{question.explanation}</p>
          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-lg font-bold text-[#1F2A44]">Want more exam-style questions?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Try the full LifeForgePrep practice set and keep building exam-ready reasoning.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/free-practice"
                eventName="click_free_practice_cta"
                eventPayload={{ source: 'question_of_week_answer' }}
                className="rounded-xl bg-[#2FAF9E] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#26988a]"
              >
                Try Free Practice
              </TrackedLink>
              <TrackedLink
                href="/app"
                eventName="click_app_cta"
                eventPayload={{ source: 'question_of_week_answer' }}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-[#1F2A44] hover:bg-slate-50"
              >
                Explore the App
              </TrackedLink>
              <TrackedLink
                href="/exam-prep"
                eventName="click_exam_prep_cta"
                eventPayload={{ source: 'question_of_week_answer' }}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-[#1F2A44] hover:bg-slate-50"
              >
                View Exam Prep Guide
              </TrackedLink>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
