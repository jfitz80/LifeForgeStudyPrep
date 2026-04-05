export default function BuyerGuideWatchouts({ items }: { items: string[] }) {
  return (
    <section className="rounded-2xl border border-[#E8D9D9] bg-[#FFF8F7] p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B45309]">What to watch out for</p>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5568]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[10px] h-2 w-2 rounded-full bg-[#B45309]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
