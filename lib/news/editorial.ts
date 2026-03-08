const splitSentences = (input: string) =>
  input
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

function normalizeLine(input: string) {
  return input
    .replace(/^llqp exam angle:\s*/i, '')
    .replace(/^what this means for policyholders:\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeForCompare(input: string) {
  return normalizeLine(input)
    .toLowerCase()
    .replace(/\s*-\s*[^-]{2,40}$/, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripPublisherTail(input: string) {
  return input.replace(/\s*-\s*[^-]{2,40}$/g, '').replace(/\s+/g, ' ').trim();
}

function uniqueLines(lines: string[]) {
  const out: string[] = [];

  for (const line of lines) {
    const clean = normalizeLine(line);
    const key = normalizeForCompare(clean);
    if (!clean || !key) continue;

    const hasDup = out.some((existing) => {
      const e = normalizeForCompare(existing);
      return e === key || e.includes(key) || key.includes(e);
    });

    if (!hasDup) out.push(clean);
  }

  return out;
}

const GENERIC_WHY_IT_MATTERS =
  'This development can influence how life insurance products are evaluated, discussed, or recommended by advisors and candidates preparing for licensing exams.';
const GENERIC_WHO_IT_AFFECTS =
  'This may affect policyholders, prospective buyers, and advisors supporting life insurance decisions.';
const GENERIC_LLQP_ANGLE =
  'Use this topic to review policy terms, underwriting logic, claims handling, and client suitability in scenario-style questions.';

function cleanTitle(title: string) {
  return stripPublisherTail(title).replace(/\s+/g, ' ').trim();
}

export function sanitizeExcerpt(input?: string | null) {
  if (!input) return '';
  return input
    .replace(/<[^>]+>/g, ' ')
    .replace(/[|•]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 520);
}

function cleanExcerptAgainstTitle(title: string, excerpt: string) {
  if (!excerpt) return '';

  const t = normalizeForCompare(title);
  const sentences = splitSentences(excerpt).map(stripPublisherTail);

  const filtered = sentences.filter((s) => {
    const n = normalizeForCompare(s);
    if (!n) return false;
    return !(n === t || n.includes(t) || t.includes(n));
  });

  return filtered.join(' ').trim();
}

export function buildTags(title: string, excerpt: string) {
  const source = `${title} ${excerpt}`.toLowerCase();
  const tags: string[] = [];
  const lookup: Record<string, string> = {
    underwriting: 'underwriting',
    premium: 'premiums',
    policyholder: 'policyholders',
    beneficiary: 'beneficiaries',
    annuity: 'annuities',
    claim: 'claims',
    llqp: 'llqp',
    advisor: 'advisors',
    regulation: 'regulation',
    product: 'products'
  };

  Object.entries(lookup).forEach(([needle, tag]) => {
    if (source.includes(needle)) tags.push(tag);
  });

  return Array.from(new Set(tags));
}

function pickWhyItMatters(sentences: string[], title: string) {
  const withSignals = sentences.find((s) => /impact|change|regulat|premium|claim|coverage|policy|risk|market/i.test(s));
  if (withSignals) return withSignals;

  const clean = cleanTitle(title);
  return `This headline highlights a practical life insurance topic that can affect client decisions, product comparisons, and claims expectations. ${clean}.`;
}

function pickWhoItAffects(sentences: string[]) {
  const withAudience = sentences.find((s) => /policyholder|consumer|client|advisor|agent|insurer|applicant|buyer|beneficiary/i.test(s));
  if (withAudience) return withAudience;

  return 'This can affect policyholders, applicants, beneficiaries, and advisors guiding life insurance decisions.';
}

export function buildEditorial(title: string, excerpt: string) {
  const normalizedTitle = normalizeLine(cleanTitle(title));
  const cleanedExcerpt = sanitizeExcerpt(excerpt);
  const excerptWithoutTitle = cleanExcerptAgainstTitle(normalizedTitle, cleanedExcerpt);
  const sentences = uniqueLines(splitSentences(excerptWithoutTitle));

  const summaryLines = uniqueLines([normalizedTitle, ...sentences]).slice(0, 2);
  const summary = summaryLines.join(' ').trim().slice(0, 460) || `${normalizedTitle}.`;

  const whyItMattersRaw = normalizeLine(pickWhyItMatters(sentences, normalizedTitle)).slice(0, 360);
  const whoItAffectsRaw = normalizeLine(pickWhoItAffects(sentences)).slice(0, 280);

  const whyItMatters =
    whyItMattersRaw === GENERIC_WHY_IT_MATTERS
      ? 'This story is relevant for exam prep because it reinforces core life insurance concepts you may need to explain under time pressure.'
      : whyItMattersRaw;

  const whoItAffects =
    whoItAffectsRaw === GENERIC_WHO_IT_AFFECTS
      ? 'This can affect policyholders, applicants, beneficiaries, and advisors guiding life insurance decisions.'
      : whoItAffectsRaw;

  const llqpAngle = /llqp|advisor|compliance|policy|underwriting|claim|beneficiary|premium|suitability/i.test(
    `${title} ${cleanedExcerpt}`
  )
    ? GENERIC_LLQP_ANGLE
    : null;

  return {
    summary,
    whyItMatters,
    whoItAffects,
    llqpAngle
  };
}
