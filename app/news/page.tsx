type NewsPageProps = {
  searchParams?: {
    category?: string;
  };
};

const categoryLabels: Record<string, string> = {
  'law-and-litigation': 'Law & Litigation',
  'clinical-knowledge': 'Clinical Knowledge',
  'future-risk': 'Future Risk',
  'product-innovation': 'Product Innovation',
  'regulation-compliance': 'Regulation & Compliance'
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const selectedCategory = searchParams?.category?.toLowerCase().trim();

  const { items } = await getHubItems();

  const filteredItems = selectedCategory
    ? items.filter((item) => item.categorySlug === selectedCategory)
    : items;

  const selectedCategoryLabel = selectedCategory
    ? categoryLabels[selectedCategory] ?? 'Filtered News'
    : null;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-[#1F2A44] sm:text-4xl">
              {selectedCategoryLabel ? selectedCategoryLabel : 'Daily Insurance Brief'}
            </h1>
            {selectedCategoryLabel && (
              <Link
                href="/news"
                className="mt-3 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
              >
                View all news
              </Link>
            )}
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredItems.map((item) => (
              <article key={item.id ?? item.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{item.publishedAtLabel}</span>
                  <span>•</span>
                  <span>{item.source}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                    {item.category}
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-bold text-[#1F2A44]">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.summary}</p>
                <Link
                  href={`/news/${item.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-[#2FAF9E] hover:text-[#1F2A44]"
                >
                  Read analysis
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
