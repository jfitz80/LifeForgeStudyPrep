import TrackedLink from '@/components/TrackedLink';

export const examWatchTopics = [
  {
    title: 'Ontario LLQP Exams Are Moving In-Person',
    tag: 'Exam Update',
    summary:
      'Online LLQP exams in Ontario are ending July 1, 2026. Candidates should prepare for a more formal test-day environment.',
    cta: 'Read the study plan',
    href: '/news/ontario-llqp-exams-in-person-2026'
  },
  {
    title: 'Why Timed Practice Matters',
    tag: 'Study Strategy',
    summary:
      'With exam integrity under the spotlight, students need to understand concepts under pressure - not just memorize answers.',
    cta: 'Try timed practice',
    href: '/app/version-5'
  },
  {
    title: 'Agent Conduct Is Becoming a Bigger Focus',
    tag: 'Professional Conduct',
    summary:
      "FSRA's supervision work shows why ethics, suitability, disclosure, and documentation matter before and after licensing.",
    cta: 'Review conduct questions',
    href: '/free-practice'
  }
] as const;

const categories = ['Exam Updates', 'Regulation', 'Professional Conduct', 'Product Knowledge', 'Study Strategy', 'Market Trends'] as const;

type WeeklyExamWatchProps = {
  compact?: boolean;
  source?: string;
};

export default function WeeklyExamWatch({ compact = false, source = 'weekly_exam_watch' }: WeeklyExamWatchProps) {
  return (
    <section className={compact ? 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8' : 'mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'}>
      <div className={compact ? '' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2FAF9E]">LifeForge Market Desk</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">
              Exam Watch: What LLQP Students Need to Know This Week
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Current insurance developments translated into future-agent concepts, LLQP study themes, and practical next steps.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {examWatchTopics.map((topic, index) => (
            <article
              key={topic.title}
              className={`flex min-h-full flex-col rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                index === 0 ? 'border-[#99f6e4] bg-[#F1FBF8]' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1E887B] shadow-sm">{topic.tag}</span>
              <h3 className="mt-4 text-xl font-bold leading-7 text-[#1F2A44]">{topic.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{topic.summary}</p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                LLQP connection: {topic.tag === 'Exam Update' ? 'test-day readiness and study planning' : topic.tag === 'Study Strategy' ? 'timed scenario reasoning' : 'ethics, suitability, and documentation'}
              </div>
              <TrackedLink
                href={topic.href}
                eventName={topic.href.startsWith('/app') ? 'click_app_cta' : topic.href === '/free-practice' ? 'click_free_practice_cta' : 'click_new_this_week_brief'}
                eventPayload={{ source, topic: topic.tag }}
                className="mt-5 inline-flex font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
              >
                {topic.cta}
              </TrackedLink>
            </article>
          ))}
        </div>

        <p className="mt-5 text-xs leading-6 text-slate-500">
          LifeForgePrep is an independent study tool and is not affiliated with FSRA, Durham College, or any regulator.
        </p>
      </div>
    </section>
  );
}
