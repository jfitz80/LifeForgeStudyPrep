'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getGlossaryByLetter } from '@/lib/knowledge/content';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryIndex() {
  const [query, setQuery] = useState('');
  const groups = getGlossaryByLetter();

  const filteredGroups = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return groups;

    return groups
      .map((group) => ({
        ...group,
        terms: group.terms.filter(
          (term) => term.term.toLowerCase().includes(normalized) || term.definition.toLowerCase().includes(normalized)
        )
      }))
      .filter((group) => group.terms.length > 0);
  }, [groups, query]);

  const available = new Set(filteredGroups.map((g) => g.letter));

  return (
    <section id="glossary" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1F2A44]">Glossary A-Z</h2>
          <p className="mt-2 text-sm leading-7 text-[#4A5568]">Search core terms, jump by letter, or open a term page for a fuller explanation and related articles.</p>
        </div>
        <div className="w-full max-w-sm">
          <label htmlFor="glossary-search" className="sr-only">Search glossary</label>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search terms or definitions"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-[#2FAF9E] focus:ring"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-1 text-xs font-semibold">
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

      <div className="mt-8 space-y-8">
        {filteredGroups.map((group) => (
          <div key={group.letter} id={`glossary-${group.letter}`}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">{group.letter}</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {group.terms.map((term) => (
                <Link key={term.slug} href={`/knowledge/glossary/${term.slug}`} className="rounded-xl border border-slate-200 bg-[#F9FAFB] p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm">
                  <p className="text-sm font-semibold text-[#1F2A44]">{term.term}</p>
                  <p className="mt-2 text-sm leading-6 text-[#4A5568]">{term.definition}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
