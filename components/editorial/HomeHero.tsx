import Link from 'next/link';

export default function HomeHero() {
  return (
    <section className="bg-[#F5F7FA]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2FAF9E]">
            LIFE INSURANCE KNOWLEDGE HUB
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1F2A44] sm:text-5xl">
            Life Insurance Explained Clearly
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#4A5568] sm:text-lg">
            News, guides, and practical insights to help you make informed life insurance decisions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/knowledge"
              className="inline-flex items-center rounded-lg bg-[#2FAF9E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#279989] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2"
            >
              Explore the Knowledge Hub
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#1F2A44] hover:border-[#2FAF9E] hover:text-[#2FAF9E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAF9E] focus-visible:ring-offset-2"
            >
              View Latest News
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 h-2 w-28 rounded-full bg-[#6BC4B8]" />
            <div className="space-y-3">
              <div className="h-4 w-5/6 rounded bg-slate-100" />
              <div className="h-4 w-4/6 rounded bg-slate-100" />
              <div className="h-4 w-3/6 rounded bg-slate-100" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-200 bg-[#F5F7FA] p-4">
                <div className="h-3 w-20 rounded bg-[#1F2A44]/20" />
                <div className="mt-3 h-6 w-12 rounded bg-[#2FAF9E]/30" />
              </div>
              <div className="rounded-lg border border-slate-200 bg-[#F5F7FA] p-4">
                <div className="h-3 w-24 rounded bg-[#1F2A44]/20" />
                <div className="mt-3 h-6 w-16 rounded bg-[#6BC4B8]/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
