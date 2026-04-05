'use client';

import { useState } from 'react';

type AccordionItem = {
  question: string;
  answer: string;
};

export default function KnowledgeAccordion({
  items,
  headingLevel = 'h3'
}: {
  items: AccordionItem[];
  headingLevel?: 'h2' | 'h3' | 'h4';
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const HeadingTag = headingLevel;

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="p-4 sm:p-5">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <HeadingTag className="text-base font-semibold text-[#1F2A44] sm:text-lg">{item.question}</HeadingTag>
              <span className={`mt-1 text-xl font-semibold text-[#2FAF9E] transition ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">
                +
              </span>
            </button>
            {isOpen ? <p className="mt-3 text-sm leading-7 text-[#4A5568]">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
