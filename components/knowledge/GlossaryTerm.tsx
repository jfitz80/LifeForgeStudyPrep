'use client';

import { useState } from 'react';

type GlossaryTermProps = {
  term: string;
  definition: string;
};

export default function GlossaryTerm({ term, definition }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block align-baseline">
      <button
        type="button"
        className="rounded-sm bg-[#E8F7F4] px-1 font-semibold text-[#1E887B] underline decoration-dotted underline-offset-2 hover:bg-[#D9F1EC]"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
      >
        {term}
      </button>
      {open && (
        <span className="absolute left-0 top-[120%] z-20 w-64 rounded-lg border border-slate-200 bg-white p-3 text-left text-xs font-normal leading-5 text-slate-700 shadow-lg">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#2FAF9E]">Glossary</span>
          <span className="mb-1 block text-sm font-semibold text-[#1F2A44]">{term}</span>
          <span>{definition}</span>
        </span>
      )}
    </span>
  );
}
