import TrackedLink from '@/components/TrackedLink';

type CTAAction = {
  label: string;
  href: string;
  eventPayload: Record<string, string>;
  style?: 'primary' | 'secondary';
};

type ContextualCTAProps = {
  eyebrow?: string;
  title: string;
  body: string;
  variant?: 'studying' | 'gap' | 'app';
  actions: CTAAction[];
};

const variantStyles = {
  studying: {
    wrapper: 'border-[#D6E8E5] bg-[#F2FBF8]',
    eyebrow: 'text-[#2FAF9E]',
    title: 'text-[#1F2A44]',
    body: 'text-[#315A55]'
  },
  gap: {
    wrapper: 'border-[#D9E3F0] bg-[#F4F8FC]',
    eyebrow: 'text-[#355C9A]',
    title: 'text-[#1F2A44]',
    body: 'text-[#4A5568]'
  },
  app: {
    wrapper: 'border-[#E7E3F5] bg-[#F8F6FC]',
    eyebrow: 'text-[#4F46A5]',
    title: 'text-[#1F2A44]',
    body: 'text-[#4A5568]'
  }
} as const;

export default function ContextualCTA({
  eyebrow = 'Next step',
  title,
  body,
  variant = 'studying',
  actions
}: ContextualCTAProps) {
  const styles = variantStyles[variant];

  return (
    <section className={`rounded-2xl border p-6 shadow-sm sm:p-8 ${styles.wrapper}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${styles.eyebrow}`}>{eyebrow}</p>
      <h2 className={`mt-2 text-2xl font-bold ${styles.title}`}>{title}</h2>
      <p className={`mt-3 max-w-3xl text-sm leading-7 ${styles.body}`}>{body}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {actions.map((action) => (
          <TrackedLink
            key={`${action.href}-${action.label}`}
            href={action.href}
            eventName="contextual_cta_click"
            eventPayload={action.eventPayload}
            className={
              action.style === 'secondary'
                ? 'inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] transition hover:bg-slate-50'
                : 'inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26988a]'
            }
          >
            {action.label}
          </TrackedLink>
        ))}
      </div>
    </section>
  );
}
