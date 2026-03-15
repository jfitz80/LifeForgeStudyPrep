export type BriefSourceItem = {
  slug: string;
  title: string;
  summary: string;
  tag: string;
  source: string;
};

export type DailyInsuranceBrief = {
  title: string;
  summary: string;
  keyThemes: string[];
  whyItMatters: string;
  worthReading: Array<{ slug: string; title: string; reason: string }>;
};

const THEME_RULES: Array<{ test: RegExp; theme: string }> = [
  { test: /claim|contestab|beneficiar|denied/i, theme: 'Claims Scrutiny' },
  { test: /underwriting|risk|medical|insurability/i, theme: 'Underwriting Shift' },
  { test: /price|premium|cost|rate/i, theme: 'Pricing Pressure' },
  { test: /regulat|disclosure|compliance|suitability/i, theme: 'Suitability Focus' },
  { test: /ai|digital|automation|technology/i, theme: 'Tech Adoption' }
];

function briefDateLabel() {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());
}

function cleanTitle(title: string) {
  return title.replace(/\s+-\s+[^-]+$/, '').trim();
}

function detectThemes(items: BriefSourceItem[]) {
  const counts = new Map<string, number>();

  for (const item of items.slice(0, 12)) {
    const text = `${item.title} ${item.summary} ${item.tag}`;
    let matched = false;

    for (const rule of THEME_RULES) {
      if (rule.test.test(text)) {
        counts.set(rule.theme, (counts.get(rule.theme) ?? 0) + 1);
        matched = true;
      }
    }

    if (!matched && item.tag) {
      const fallback = item.tag.length > 18 ? 'Market Trends' : item.tag;
      counts.set(fallback, (counts.get(fallback) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([theme]) => theme);
}

export function buildDailyInsuranceBrief(items: BriefSourceItem[]): DailyInsuranceBrief {
  const top = items.slice(0, 5);
  const themes = detectThemes(items);

  const summary =
    top.length >= 3
      ? `Today's coverage centers on ${themes[0] ?? 'core insurance operations'}, with headlines highlighting ${cleanTitle(
          top[0].title
        )}, ${cleanTitle(top[1].title)}, and ${cleanTitle(top[2].title)}. The pattern points to practical implications for claims handling, underwriting judgment, and product/suitability conversations.`
      : 'Today’s headlines emphasize practical developments across claims, underwriting, and policy guidance for advisors and learners.';

  const whyItMatters =
    'For professionals and LLQP students, the signal is clear: strong documentation, accurate disclosure, and defensible recommendations remain critical.';

  const worthReading = top.map((item) => ({
    slug: item.slug,
    title: cleanTitle(item.title),
    reason: item.tag || 'Market update'
  }));

  return {
    title: `Daily Insurance Brief — ${briefDateLabel()}`,
    summary,
    keyThemes: themes.length ? themes : ['Claims Scrutiny', 'Underwriting Shift', 'Suitability Focus'],
    whyItMatters,
    worthReading
  };
}
