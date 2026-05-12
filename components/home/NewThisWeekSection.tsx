'use client';

import TrackedLink from '@/components/TrackedLink';
import { weeklyContent } from '@/data/weeklyContent';

export default function NewThisWeekSection() {
  const { weeklyBrief, questionOfTheWeek, examTrap, recentlyUpdated } = weeklyContent;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">Updated weekly</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">New This Week</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Fresh study signals, one exam-style question, and recently updated guides for LLQP Life Insurance module learners.
            </p>
          </div>
          <p className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            Week of {weeklyContent.weekOf}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#E8F7F4] px-2.5 py-1 text-xs font-semibold text-[#1E887B]">
                {weeklyBrief.category}
              </span>
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">
                {weeklyBrief.updatedLabel}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{weeklyBrief.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{weeklyBrief.summary}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Exam connection: {weeklyBrief.examConnection}
            </p>
            <TrackedLink
              href={weeklyBrief.href}
              eventName="click_new_this_week_brief"
              eventPayload={{ source: 'homepage_new_this_week' }}
              className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-slate-900"
            >
              Read this week’s brief
            </TrackedLink>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <span className="w-fit rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
              Difficulty: {questionOfTheWeek.difficulty}
            </span>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{questionOfTheWeek.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{questionOfTheWeek.question}</p>
            <TrackedLink
              href={questionOfTheWeek.href}
              eventName="click_question_of_week"
              eventPayload={{ source: 'homepage_new_this_week', difficulty: questionOfTheWeek.difficulty }}
              className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-slate-900"
            >
              Try this question
            </TrackedLink>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <span className="w-fit rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
              This week’s focus
            </span>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{examTrap.title}</h3>
            <p className="mt-2 text-sm font-semibold text-slate-800">{examTrap.trap}</p>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{examTrap.explanation}</p>
            <TrackedLink
              href={examTrap.href}
              eventName="click_exam_trap"
              eventPayload={{ source: 'homepage_new_this_week', trap: examTrap.trap }}
              className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-slate-900"
            >
              See the trap
            </TrackedLink>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-slate-900">Recently Updated</h3>
            <div className="mt-3 space-y-3">
              {recentlyUpdated.slice(0, 4).map((guide) => (
                <TrackedLink
                  key={guide.href}
                  href={guide.href}
                  eventName="click_recently_updated_guide"
                  eventPayload={{ source: 'homepage_new_this_week', guide: guide.title }}
                  className="block rounded-xl border border-slate-200 bg-white p-3 transition hover:border-brand-500"
                >
                  <span className="block text-sm font-semibold text-slate-900">{guide.title}</span>
                  <span className="mt-1 block text-xs text-slate-500">Updated {guide.updated}</span>
                </TrackedLink>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
