import GlossaryTerm from '@/components/knowledge/GlossaryTerm';
import { GLOSSARY_TERMS } from '@/lib/knowledge/content';

function escapeRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const sortedTerms = [...GLOSSARY_TERMS].sort((a, b) => b.term.length - a.term.length);
const termMap = new Map(sortedTerms.map((t) => [t.term.toLowerCase(), t]));
const termRegex = new RegExp(`\\b(${sortedTerms.map((t) => escapeRegex(t.term)).join('|')})\\b`, 'gi');

type InlineGlossaryTextProps = {
  text: string;
  className?: string;
};

export default function InlineGlossaryText({ text, className }: InlineGlossaryTextProps) {
  const parts = text.split(termRegex);

  return (
    <p className={className}>
      {parts.map((part, index) => {
        const match = termMap.get(part.toLowerCase());
        if (!match) return <span key={`${part}-${index}`}>{part}</span>;
        return <GlossaryTerm key={`${part}-${index}`} term={match.term} definition={match.definition} />;
      })}
    </p>
  );
}
