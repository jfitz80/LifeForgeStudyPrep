"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { marketDeskArticles } from "@/data/marketDeskArticles";

type NewsCategory =
  | "LifeForge Market Desk"
  | "Life Insurance"
  | "Annuities"
  | "Regulation"
  | "Industry Trends"
  | "Claims"
  | "Consumer Protection"
  | "Consumer Education";

type CategoryFilter = "All" | NewsCategory;

const categories: CategoryFilter[] = [
  "All",
  "LifeForge Market Desk",
  "Life Insurance",
  "Annuities",
  "Regulation",
  "Industry Trends",
  "Claims",
  "Consumer Protection",
  "Consumer Education"
];

const weeklyBrief = [
  {
    headline: "Carriers tighten underwriting in selected risk segments",
    summary: "Several insurers signaled stricter evidence requirements in higher-risk profiles.",
    why: "This affects recommendation strategy and expectation setting."
  },
  {
    headline: "Disclosure language updates continue",
    summary: "Plain-language policy communications are expanding across providers.",
    why: "Clear communication helps reduce confusion and complaint risk."
  },
  {
    headline: "Claims servicing turnaround improves",
    summary: "Workflow updates are reducing delays in common claims scenarios.",
    why: "Faster servicing supports client trust and retention."
  }
];

const articles = [
  ...marketDeskArticles.slice(0, 3).map((article) => ({
    id: article.slug,
    category: "LifeForge Market Desk" as const,
    title: article.title,
    date: article.date,
    summary: article.summary,
    whyItMatters: "Educational commentary from the LifeForge Market Desk.",
    href: `/news/market-desk/${article.slug}`
  })),
  {
    id: "1",
    category: "Life Insurance" as const,
    title: "Term product comparisons are shifting in 2026",
    date: "April 28, 2026",
    summary: "Carriers are repositioning term offerings for younger families and digital buyers.",
    whyItMatters: "Helps connect pricing dynamics to recommendation logic.",
    href: "/news/carrier-pricing-updates-term-comparisons"
  },
  {
    id: "2",
    category: "Regulation" as const,
    title: "Suitability and disclosure remain a policy focus",
    date: "April 27, 2026",
    summary: "Guidance continues to emphasize clear explanations and stronger documentation.",
    whyItMatters: "Directly relevant to ethics and suitability scenarios.",
    href: "/news/regulatory-disclosure-suitability-focus"
  },
  {
    id: "3",
    category: "Industry Trends" as const,
    title: "Underwriting modernization expands with human review controls",
    date: "April 26, 2026",
    summary: "Automation is growing, with stronger manual quality checkpoints.",
    whyItMatters: "Supports understanding of underwriting and risk classification.",
    href: "/news/underwriting-modernization-human-review-critical"
  },
  {
    id: "4",
    category: "Claims" as const,
    title: "Claims servicing updates improve response expectations",
    date: "April 25, 2026",
    summary: "Process improvements target faster communication and clearer claim status tracking.",
    whyItMatters: "Useful for client communication during sensitive claim periods.",
    href: "/news/claims-communication-consumer-pain-point"
  }
];

const s: Record<string, CSSProperties> = {
  page: { minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "Arial, sans-serif" },
  container: { width: "min(100% - 32px, 1120px)", margin: "0 auto" },
  hero: { background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "56px 0" },
  eyebrow: { color: "#0f766e", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" },
  title: { maxWidth: 880, margin: "12px 0 0", fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 1 },
  intro: { maxWidth: 760, color: "#475569", lineHeight: 1.8 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 24 },
  muted: { color: "#475569", lineHeight: 1.65 },
  button: { border: 0, borderRadius: 6, background: "#0f172a", color: "#fff", padding: "12px 18px", fontWeight: 700 },
  linkButton: { display: "inline-flex", borderRadius: 8, background: "#0f172a", color: "#fff", padding: "12px 18px", fontWeight: 700, textDecoration: "none" },
  categoryButton: { border: "1px solid #cbd5e1", borderRadius: 999, background: "#fff", padding: "9px 16px", cursor: "pointer" }
};

function NewsletterForm() {
  return (
    <form action="https://app.kit.com/forms/9376932/subscriptions" method="post" acceptCharset="UTF-8">
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 10 }}>
        <input
          name="email_address"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          required
          style={{ minWidth: 0, border: "1px solid #cbd5e1", borderRadius: 6, padding: 12 }}
        />
        <button type="submit" style={s.button}>Subscribe</button>
      </div>
      <p style={{ ...s.muted, margin: "12px 0 0", fontSize: 13 }}>
        No spam. Just the weekly life insurance brief.
      </p>
    </form>
  );
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(() => {
    if (typeof window === "undefined") return "All";
    const category = new URLSearchParams(window.location.search).get("category");
    return categories.includes(category as CategoryFilter) ? (category as CategoryFilter) : "All";
  });

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return articles;
    return articles.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <main style={s.page}>
      <section style={s.hero}>
        <div style={s.container}>
          <p style={s.eyebrow}>LifeForge Market Desk</p>
          <h1 style={s.title}>LifeForge Market Desk</h1>
          <p style={s.intro}>
            Plain-English commentary on life insurance trends, regulation, product changes, and
            market news — written for learners, advisors, and curious consumers.
          </p>

          <div style={{ ...s.card, marginTop: 28 }}>
            <p style={s.muted}>Get periodic LifeForge insurance commentary and learning notes.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section style={{ ...s.container, padding: "40px 0" }}>
        <div style={s.grid}>
          <article style={s.card}>
            <h2>Industry Headlines</h2>
            <p style={s.muted}>Curated life insurance headlines and market developments, refreshed periodically.</p>
            {weeklyBrief.map((item) => (
              <div key={item.headline} style={{ ...s.card, background: "#f8fafc", marginTop: 14 }}>
                <h3>{item.headline}</h3>
                <p style={s.muted}>{item.summary}</p>
                <p style={{ color: "#0f766e", fontWeight: 700 }}>Why it matters: {item.why}</p>
              </div>
            ))}
          </article>

          <article style={s.card}>
            <p style={s.eyebrow}>LifeForge Market Desk</p>
            <h2>How claims communication quality is becoming a competitive advantage</h2>
            <p style={s.muted}>
              Insurers are improving timelines, status updates, and plain-language claims
              communication to reduce friction for policyholders and beneficiaries.
            </p>
            <Link href="/news/claims-communication-consumer-pain-point" style={s.linkButton}>
              Read analysis
            </Link>
          </article>
        </div>
      </section>

      <section style={{ ...s.container, paddingBottom: 24 }}>
        <h2>News Categories</h2>
        <p style={s.muted}>
          Follow all headlines or browse focused editorial coverage from LifeForge Market Desk.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              style={{
                ...s.categoryButton,
                ...(activeCategory === category ? { background: "#0f172a", color: "#fff" } : {})
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section id="latest-news" style={{ ...s.container, padding: "24px 0 40px" }}>
        <article
          style={{
            ...s.card,
            marginBottom: 24,
            borderColor: "#bae6fd",
            background: "linear-gradient(135deg, #ffffff 0%, #eef6ff 48%, #f2fbf8 100%)"
          }}
        >
          <p style={{ ...s.eyebrow, margin: 0 }}>Original commentary</p>
          <h2 style={{ marginBottom: 0 }}>LifeForge Market Desk</h2>
          <p style={s.muted}>
            Clear, independent commentary on life insurance, annuities, regulation,
            consumer protection, underwriting, claims, and insurance education.
          </p>
          <Link href="/news/market-desk" style={s.linkButton}>
            Visit Market Desk
          </Link>
        </article>

        <div style={s.grid}>
          {filteredArticles.map((item) => (
            <article key={item.id} style={s.card}>
              <p style={{ color: "#64748b", fontSize: 13 }}>{item.category} - {item.date}</p>
              <h3>{item.title}</h3>
              <p style={s.muted}>{item.summary}</p>
              <p style={s.muted}><strong>Why it matters:</strong> {item.whyItMatters}</p>
              <Link href={item.href} style={{ color: "#0f766e", fontWeight: 700 }}>
                Read More
              </Link>
            </article>
          ))}
        </div>

        <div style={{ ...s.card, marginTop: 24, background: "#f8fafc" }}>
          <h2>Educational disclaimer</h2>
          <p style={s.muted}>
            LifeForge Prep content is for education only and should not be treated as financial,
            legal, tax, or licensing advice.
          </p>
        </div>
      </section>
    </main>
  );
}
