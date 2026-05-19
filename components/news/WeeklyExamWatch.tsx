import TrackedLink from '@/components/TrackedLink';
import { weeklyNewsItems, type WeeklyNewsItem } from '@/data/weeklyNews';

const categories = ['Exam Updates', 'Regulation', 'Professional Conduct', 'Product Knowledge', 'Study Strategy', 'Market Trends'] as const;

type WeeklyExamWatchProps = {
  compact?: boolean;
  source?: string;
  items?: WeeklyNewsItem[];
};

function connectionFor(item: WeeklyNewsItem) {
  if (item.category === 'Exam Update') return 'test-day readiness and study planning';
  if (item.category === 'Study Strategy') return 'timed scenario reasoning';
  if (item.category === 'Professional Conduct') return 'ethics, suitability, and documentation';
  return item.examConnection;
}

export default function WeeklyExamWatch({ compact = false, source = 'weekly_exam_watch', items = weeklyNewsItems.slice(0, 3) }: WeeklyExamWatchProps) {
  const displayItems = items.slice(0, compact ? 5 : 3);

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

        <div className={`mt-6 grid gap-4 ${compact ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
          {displayItems.map((topic, index) => (
            <article
              key={topic.title}
              className={`flex min-h-full flex-col rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                index === 0 ? 'border-[#99f6e4] bg-[#F1FBF8]' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1E887B] shadow-sm">{topic.category}</span>
              <h3 className="mt-4 text-xl font-bold leading-7 text-[#1F2A44]">{topic.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{topic.summary}</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                <strong>Why it matters:</strong> {topic.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                Exam connection: {connectionFor(topic)}
              </div>
              <TrackedLink
                href={topic.href}
                eventName={topic.href.startsWith('/app') ? 'click_app_cta' : topic.href === '/free-practice' ? 'click_free_practice_cta' : 'click_new_this_week_brief'}
                eventPayload={{ source, topic: topic.category }}
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
