"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { getSortedNewsItems, marketDeskDisclaimer, newsItems, type MarketDeskCategory } from "@/data/news";

type CategoryFilter = "All" | MarketDeskCategory;

const categories: CategoryFilter[] = [
  "All",
  "Market Watch",
  "Regulation & Compliance",
  "Product Trends",
  "Advisor Practice",
  "Retirement Income",
  "Underwriting",
  "Technology & Risk",
  "Carrier Moves",
  "Claims",
  "Learner Corner"
];

const s: Record<string, CSSProperties> = {
  page: { minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "Arial, sans-serif" },
  container: { width: "min(100% - 32px, 1120px)", margin: "0 auto" },
  hero: { background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "64px 0 44px" },
  eyebrow: { color: "#0f766e", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" },
  title: { maxWidth: 880, margin: "12px 0 0", fontSize: "clamp(38px, 6vw, 76px)", lineHeight: 1 },
  intro: { maxWidth: 840, color: "#475569", lineHeight: 1.8, fontSize: 17 },
  note: { marginTop: 18, color: "#64748b", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, boxShadow: "0 1px 2px rgba(15,23,42,0.04)" },
  leadCard: { background: "linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)", border: "1px solid #99f6e4", borderRadius: 14, padding: 28 },
  muted: { color: "#475569", lineHeight: 1.65 },
  pill: { display: "inline-flex", borderRadius: 999, background: "#ecfeff", color: "#0f766e", padding: "5px 10px", fontSize: 12, fontWeight: 800 },
  linkButton: { display: "inline-flex", borderRadius: 8, background: "#0f172a", color: "#fff", padding: "12px 18px", fontWeight: 700, textDecoration: "none" },
  textLink: { color: "#0f766e", fontWeight: 800, textDecoration: "none" },
  categoryButton: { border: "1px solid #cbd5e1", borderRadius: 999, background: "#fff", padding: "9px 16px", cursor: "pointer", color: "#334155" },
  disclaimer: { marginTop: 28, borderTop: "1px solid #e2e8f0", color: "#64748b", fontSize: 13, lineHeight: 1.7, paddingTop: 18 }
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filteredArticles = useMemo(() => {
    const sortedItems = getSortedNewsItems(newsItems);
    if (activeCategory === "All") return sortedItems;
    return sortedItems.filter((item) => item.tag === activeCategory || item.secondaryCategory === activeCategory);
  }, [activeCategory]);

  const [lead, ...rest] = filteredArticles;

  return (
    <main style={s.page}>
      <section style={s.hero}>
        <div style={s.container}>
          <p style={s.eyebrow}>Market Desk Commentary</p>
          <h1 style={s.title}>LifeForge Market Desk</h1>
          <p style={s.intro}>
            Life insurance news, market commentary, and practical advisor-focused insight — written for agents, brokers, advisors, and serious learners who want to understand the business behind the policy.
          </p>
          <p style={s.intro}>
            Market Desk looks beyond the headline and asks what a development could mean for client conversations, product suitability, regulation, underwriting, retirement income, and advisor practice.
          </p>
          <p style={s.note}>Updated regularly.</p>
        </div>
      </section>

      <section style={{ ...s.container, padding: "34px 0 18px" }}>
        <h2>Market Desk Categories</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
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

      <section style={{ ...s.container, padding: "24px 0 52px" }}>
        {lead ? (
          <article style={{ ...s.leadCard, marginBottom: 24 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              <span style={s.pill}>{lead.tag}</span>
              <span style={{ color: "#64748b", fontSize: 13 }}>{lead.publishedAtLabel}</span>
              {lead.updatedAtLabel ? <span style={{ color: "#64748b", fontSize: 13 }}>Updated {lead.updatedAtLabel}</span> : null}
              {lead.readingTime ? <span style={{ color: "#64748b", fontSize: 13 }}>{lead.readingTime}</span> : null}
            </div>
            <h2 style={{ maxWidth: 820, margin: "16px 0 0", fontSize: "clamp(28px, 4vw, 46px)", lineHeight: 1.05 }}>
              {lead.title}
            </h2>
            <p style={{ ...s.muted, maxWidth: 780 }}>{lead.summary}</p>
            <div style={{ marginTop: 18, borderLeft: "4px solid #0f766e", paddingLeft: 16 }}>
              <p style={{ ...s.eyebrow, margin: 0 }}>Market Desk view</p>
              <p style={{ ...s.muted, margin: "8px 0 0" }}>{lead.marketDeskView}</p>
            </div>
            <Link href={`/news/${lead.slug}`} style={{ ...s.linkButton, marginTop: 20 }}>
              Read Commentary
            </Link>
          </article>
        ) : null}

        <div style={s.grid}>
          {rest.map((item) => (
            <article key={item.slug} style={s.card}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                <span style={s.pill}>{item.tag}</span>
                <span style={{ color: "#64748b", fontSize: 13 }}>{item.publishedAtLabel}</span>
                {item.updatedAtLabel ? <span style={{ color: "#64748b", fontSize: 13 }}>Updated {item.updatedAtLabel}</span> : null}
                {item.readingTime ? <span style={{ color: "#64748b", fontSize: 13 }}>{item.readingTime}</span> : null}
              </div>
              <h3 style={{ marginTop: 14, fontSize: 22, lineHeight: 1.2 }}>{item.title}</h3>
              <p style={s.muted}>{item.summary}</p>
              <div style={{ marginTop: 14, borderRadius: 10, background: "#f8fafc", padding: 14 }}>
                <p style={{ ...s.eyebrow, margin: 0 }}>Market Desk view</p>
                <p style={{ ...s.muted, margin: "8px 0 0", fontSize: 14 }}>{item.marketDeskView}</p>
              </div>
              <Link href={`/news/${item.slug}`} style={{ ...s.textLink, display: "inline-flex", marginTop: 18 }}>
                Read Commentary
              </Link>
            </article>
          ))}
        </div>

        <p style={s.disclaimer}>{marketDeskDisclaimer}</p>
        <div style={{ marginTop: 18 }}>
          <Link href="/free-practice" style={s.textLink}>
            New to life insurance? Try 15 free questions.
          </Link>
        </div>
      </section>
    </main>
  );
}
