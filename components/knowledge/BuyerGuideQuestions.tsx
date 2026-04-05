export default function BuyerGuideQuestions({ items }: { items: string[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2FAF9E]">Questions to ask before buying</p>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[10px] h-2 w-2 rounded-full bg-[#2FAF9E]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
