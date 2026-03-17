import GlossaryTerm from '@/components/knowledge/GlossaryTerm';
import { getGlossaryByLetter } from '@/lib/knowledge/content';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryIndex() {
  const groups = getGlossaryByLetter();
  const available = new Set(groups.map((g) => g.letter));

  return (
    <section id="glossary" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[#1F2A44]">Glossary A-Z</h2>
        <div className="flex flex-wrap gap-1 text-xs font-semibold">
          {LETTERS.map((letter) => (
            <a
              key={letter}
              href={available.has(letter) ? `#glossary-${letter}` : '#glossary'}
              className={`rounded px-2 py-1 ${
                available.has(letter)
                  ? 'bg-[#E8F7F4] text-[#1E887B] hover:bg-[#D9F1EC]'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {letter}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {groups.map((group) => (
          <div key={group.letter} id={`glossary-${group.letter}`}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">{group.letter}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.terms.map((term) => (
                <GlossaryTerm key={term.slug} term={term.term} definition={term.definition} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
