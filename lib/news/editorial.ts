const splitSentences = (input: string) =>
  input
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

export function sanitizeExcerpt(input?: string | null) {
  if (!input) return '';
  return input
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 420);
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
    advisor: 'advisors'
  };

  Object.entries(lookup).forEach(([needle, tag]) => {
    if (source.includes(needle)) tags.push(tag);
  });

  return Array.from(new Set(tags));
}

export function buildEditorial(title: string, excerpt: string) {
  const cleaned = sanitizeExcerpt(excerpt);
  const sentences = splitSentences(cleaned);
  const first = sentences[0] ?? 'This update highlights an important development in life insurance.';
  const second =
    sentences[1] ??
    'It may affect how advisors explain coverage options, policy value, and client risk decisions.';

  const summary = `${first} ${second}`.trim().slice(0, 420);
  const whyItMatters =
    'Changes in life insurance products, regulation, pricing, or claims handling can affect client recommendations and planning outcomes.';
  const whoItAffects =
    'This may affect current policyholders, prospective buyers, and advisors helping clients evaluate coverage choices.';

  const llqpAngle = /llqp|advisor|compliance|policy|underwriting|claim|beneficiary|premium/i.test(`${title} ${cleaned}`)
    ? 'LLQP exam angle: Use this topic to review policy terms, underwriting logic, and claims-related concepts that commonly appear in scenario questions.'
    : null;

  return {
    summary,
    whyItMatters,
    whoItAffects,
    llqpAngle
  };
}
