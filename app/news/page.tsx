    whyItMatters: "Supports understanding of underwriting and risk classification.",
    href: "/news/underwriting-modernization-human-review-critical"
  },
  {
    id: "4",
    category: "Claims",
    title: "Claims servicing updates improve response expectations",
    date: "April 25, 2026",
    summary: "Process improvements target faster communication and clearer claim status tracking.",
    whyItMatters: "Useful for client communication during sensitive claim periods.",
    href: "/news/claims-communication-consumer-pain-point"
  }
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return articles;
    return articles.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <p className={styles.eyebrow}>LifeForge News Digest</p>
          <h1 className={styles.title}>Life Insurance News, Explained Simply</h1>
          <p className={styles.intro}>
            A weekly digest of insurance headlines, product trends, regulation, and what they
            mean for learners, advisors, and curious consumers.
          </p>

          <div className={styles.signupRow}>
            <div className={styles.signupCard}>
              <p>Get the 2-minute insurance brief every week.</p>
              <div className={styles.signupBox}>
                <SubscribeForm
                  label="Join the newsletter"
                  buttonLabel="Subscribe"
                  message="No spam. Just the weekly life insurance brief."
                />
              </div>
            </div>

            <Link href="#latest-news" className={styles.secondaryLink}>
              Browse Latest News
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.section}`}>
        <div className={styles.featureGrid}>
          <article className={styles.card}>
            <h2>This Week&apos;s Brief</h2>
            <ul className={styles.briefList}>
              {weeklyBrief.map((item) => (
                <li key={item.headline} className={styles.briefItem}>
                  <h3>{item.headline}</h3>
                  <p>{item.summary}</p>
                  <div className={styles.why}>Why it matters: {item.why}</div>
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.card}>
            <p className={styles.eyebrow}>Featured Insight</p>
            <h2>{featuredInsight.title}</h2>
            <p className={styles.cardText}>{featuredInsight.summary}</p>
            <div className={styles.insightBox}>
              <p>
                <strong>Why it matters:</strong> {featuredInsight.why}
              </p>
            </div>
            <Link href={featuredInsight.href} className={styles.darkLink}>
              Read analysis
            </Link>
          </article>
        </div>
      </section>

      <section className={`${styles.container} ${styles.sectionTight}`}>
        <h2 className={styles.categoryHeader}>News Categories</h2>
        <div className={styles.categoryButtons}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.activeCategory : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section id="latest-news" className={`${styles.container} ${styles.section}`}>
        {filteredArticles.length === 0 ? (
          <div className={styles.emptyState}>No articles available in this category yet.</div>
        ) : (
          <div className={styles.articleGrid}>
            {filteredArticles.map((item) => (
              <article key={item.id} className={styles.articleCard}>
                <div className={styles.meta}>
                  <span className={styles.pill}>{item.category}</span>
                  <span aria-hidden="true">•</span>
                  <span>{item.date}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                {item.whyItMatters ? (
                  <p>
                    <strong>Why it matters:</strong> {item.whyItMatters}
                  </p>
                ) : null}
                <Link href={item.href} className={styles.brandLink}>
                  Read More
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className={`${styles.container} ${styles.section}`}>
        <div className={styles.cta}>
          <h2>Studying insurance? Turn headlines into exam knowledge.</h2>
          <p>
            LifeForgePrep connects real insurance trends to the concepts learners need to
            understand.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/free-practice" className={styles.brandCta}>
              Start Free Practice
            </Link>
            <Link href="/exam-prep" className={styles.outlineLink}>
              Explore Exam Prep
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
