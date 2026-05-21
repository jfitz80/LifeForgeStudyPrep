"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import TrackedLink from "@/components/TrackedLink";
import WeeklyExamWatch from "@/components/news/WeeklyExamWatch";
import { marketDeskArticles } from "@/data/marketDeskArticles";
import type { WeeklyNewsItem } from "@/data/weeklyNews";
import { trackEvent } from "@/lib/analytics";

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

type ArticleCard = {
  id: string;
  category: NewsCategory;
  title: string;
  date: string;
  summary: string;
  llqpConnection: string;
  href: string;
};

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

const marketDeskConnections: Record<string, string> = {
  "Market Trends": "Needs analysis and risk awareness",
  Annuities: "Retirement income concepts",
  Regulation: "Regulation and advisor responsibility",
  "Consumer Protection": "Consumer protection and advisor ethics",
  Claims: "Claims process",
  Underwriting: "Underwriting and risk classification",
  "Exam Insight": "Exam-style scenario reasoning"
};

const watchlistItems = [
  {
    title: "Underwriting expectations remain a key study theme",
    summary:
      "Evidence requirements, risk classification, disclosure quality, and lifestyle factors continue to matter in both real-world insurance conversations and LLQP-style scenarios.",
    why:
      "Learners should understand how underwriting connects to insurability, premium classification, exclusions, and advisor fact-finding.",
    badge: "Underwriting"
  },
  {
    title: "Suitability and disclosure remain central to consumer trust",
    summary:
      "Clear explanations, documented recommendations, and client understanding are recurring themes in insurance compliance and advisor conduct.",
    why:
      "LLQP learners should be able to identify when an advisor must ask more questions before making a recommendation.",
    badge: "Suitability"
  },
  {
    title: "Claims communication is a major consumer protection issue",
    summary:
      "Timelines, documentation, beneficiary communication, and policy status can all affect how smoothly a claim is handled.",
    why:
      "Learners should understand the claims process, policy conditions, grace periods, beneficiaries, and documentation expectations.",
    badge: "Claims"
  }
];

const contentBuckets = [
  {
    title: "This Week in Life Insurance",
    label: "Exam Updates",
    summary:
      "Ontario LLQP online exams are ending July 1, 2026, making timed, scenario-based preparation more important for candidates.",
    href: "/news/ontario-llqp-exams-in-person-2026",
    cta: "Read the study plan"
  },
  {
    title: "Regulation Watch",
    label: "Study insight",
    summary:
      "Suitability, disclosure clarity, and documented recommendations remain high-value study themes for new advisors.",
    href: "/news/regulatory-disclosure-suitability-focus",
    cta: "Read regulation note"
  },
  {
    title: "Consumer Impact",
    label: "Plain-English takeaway",
    summary:
      "Claims communication, beneficiary expectations, and policy status reviews all connect market themes to exam-ready reasoning.",
    href: "/news/claims-communication-consumer-pain-point",
    cta: "Read consumer impact"
  }
];

const articles: ArticleCard[] = [
  ...marketDeskArticles.slice(0, 3).map((article) => ({
    id: article.slug,
    category: "LifeForge Market Desk" as const,
    title: article.title,
    date: article.date,
    summary: article.summary,
    llqpConnection: marketDeskConnections[article.category],
    href: `/news/market-desk/${article.slug}`
  })),
  {
    id: "term-product-comparisons",
    category: "Life Insurance",
    title: "Term product comparisons are shifting in 2026",
    date: "April 28, 2026",
    summary:
      "Pricing, term length, conversion features, and policy flexibility can change how similar-looking products compare.",
    llqpConnection: "Product comparison",
    href: "/news/carrier-pricing-updates-term-comparisons"
  },
  {
    id: "suitability-disclosure-focus",
    category: "Regulation",
    title: "Suitability and disclosure remain a policy focus",
    date: "April 27, 2026",
    summary:
      "Clear explanations, documented recommendations, and client understanding continue to be major themes in insurance compliance.",
    llqpConnection: "Ethics, needs analysis, and advisor responsibility",
    href: "/news/regulatory-disclosure-suitability-focus"
  },
  {
    id: "underwriting-modernization",
    category: "Industry Trends",
    title: "Underwriting modernization expands with human review controls",
    date: "April 26, 2026",
    summary:
      "Digital workflows may speed up intake, but accurate disclosure and human review still matter in complex risk cases.",
    llqpConnection: "Underwriting",
    href: "/news/underwriting-modernization-human-review-critical"
  },
  {
    id: "claims-communication",
    category: "Claims",
    title: "Claims communication quality is becoming a competitive advantage",
    date: "April 25, 2026",
    summary:
      "Plain-language updates, documentation clarity, and beneficiary communication can reduce friction during claim reviews.",
    llqpConnection: "Claims process",
    href: "/news/claims-communication-consumer-pain-point"
  }
];

const s: Record<string, CSSProperties> = {
  page: { minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "Arial, sans-serif" },
  container: { width: "min(100% - 32px, 1120px)", margin: "0 auto" },
  hero: { background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "64px 0" },
  eyebrow: { color: "#0f766e", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" },
  title: { maxWidth: 880, margin: "12px 0 0", fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 1 },
  sectionTitle: { margin: 0, fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.12 },
  intro: { maxWidth: 820, color: "#475569", lineHeight: 1.8 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 24 },
  muted: { color: "#475569", lineHeight: 1.65 },
  button: { border: 0, borderRadius: 6, background: "#0f172a", color: "#fff", padding: "12px 18px", fontWeight: 700 },
  linkButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    background: "#0f172a",
    color: "#fff",
    padding: "12px 18px",
    fontWeight: 700,
    textDecoration: "none"
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#fff",
    color: "#0f172a",
    padding: "12px 18px",
    fontWeight: 700,
    textDecoration: "none"
  },
  categoryButton: { border: "1px solid #cbd5e1", borderRadius: 999, background: "#fff", padding: "9px 16px", cursor: "pointer" },
  pill: {
    display: "inline-flex",
    width: "fit-content",
    borderRadius: 999,
    background: "#ecfeff",
    color: "#0f766e",
    padding: "6px 10px",
    fontSize: 12,
    fontWeight: 700
  }
};

function NewsletterForm() {
  return (
    <form
      action="https://app.kit.com/forms/9376932/subscriptions"
      method="post"
      acceptCharset="UTF-8"
      onSubmit={() => trackEvent("newsletter_signup_attempt", { source: "news_market_desk" })}
    >
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
      <p style={{ ...s.muted, margin: "12px 0 0", fontSize: 13 }}>No spam. Just practical insurance learning notes.</p>
    </form>
  );
}

function ArticleCard({ item }: { item: ArticleCard }) {
  return (
    <article style={{ ...s.card, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={s.pill}>{item.category}</span>
        <span style={{ color: "#64748b", fontSize: 13 }}>{item.date}</span>
      </div>
      <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.25 }}>{item.title}</h3>
      <p style={{ ...s.muted, margin: 0 }}>{item.summary}</p>
      <p style={{ margin: 0, color: "#334155", fontSize: 14 }}>
        <strong>LLQP connection:</strong> {item.llqpConnection}
      </p>
      <TrackedLink
        href={item.href}
        eventName="click_new_this_week_brief"
        eventPayload={{ source: "news_latest_commentary", category: item.category }}
        style={{ color: "#0f766e", fontWeight: 700, marginTop: "auto" }}
      >
        Read more
      </TrackedLink>
    </article>
  );
}

type NewsPageClientProps = {
  weeklyItems: WeeklyNewsItem[];
};

export default function NewsPageClient({ weeklyItems }: NewsPageClientProps) {
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
          <p style={s.eyebrow}>Market Desk + Study Insights</p>
          <h1 style={s.title}>LifeForge Market Desk</h1>
          <p style={{ ...s.intro, fontSize: 18 }}>
            Weekly plain-English commentary on life insurance trends, regulation, products, and consumer issues.
          </p>
          <p style={{ ...s.intro, marginTop: 12 }}>
            We connect insurance market themes to the concepts learners need to understand before exam day.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            <TrackedLink
              href="/free-practice"
              eventName="click_free_practice_cta"
              eventPayload={{ source: "news_hero" }}
              style={s.linkButton}
            >
              Try 15 Free Questions
            </TrackedLink>
            <TrackedLink
              href="/exam-prep"
              eventName="click_exam_prep_cta"
              eventPayload={{ source: "news_hero" }}
              style={s.secondaryButton}
            >
              Explore Exam Prep
            </TrackedLink>
          </div>
        </div>
      </section>

      <section style={{ ...s.container, padding: "40px 0 20px" }}>
        <WeeklyExamWatch compact source="news_exam_watch" items={weeklyItems} />
      </section>

      <section style={{ ...s.container, padding: "24px 0 20px" }}>
        <div style={{ marginBottom: 18 }}>
          <p style={s.eyebrow}>This week’s focus</p>
          <h2 style={s.sectionTitle}>Current developments by study category</h2>
          <p style={s.muted}>
            Current insurance developments, translated into practical study insights for future life insurance agents.
          </p>
        </div>
        <div style={s.grid}>
          {contentBuckets.map((bucket) => (
            <article key={bucket.title} style={s.card}>
              <span style={s.pill}>{bucket.label}</span>
              <h3>{bucket.title}</h3>
              <p style={s.muted}>{bucket.summary}</p>
              <TrackedLink
                href={bucket.href}
                eventName="click_new_this_week_brief"
                eventPayload={{ source: "news_content_bucket", bucket: bucket.title }}
                style={{ color: "#0f766e", fontWeight: 700 }}
              >
                {bucket.cta}
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>

      <section style={{ ...s.container, padding: "48px 0 28px" }}>
        <div style={{ marginBottom: 18 }}>
          <p style={s.eyebrow}>Featured Insight</p>
          <h2 style={s.sectionTitle}>Claims communication, translated into study value</h2>
        </div>
        <article
          style={{
            ...s.card,
            borderColor: "#bae6fd",
            background: "linear-gradient(135deg, #ffffff 0%, #eef6ff 48%, #f2fbf8 100%)"
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span style={s.pill}>Claims</span>
            <span style={{ color: "#64748b", fontSize: 13 }}>March 7, 2026</span>
            <span style={{ ...s.pill, background: "#f0fdf4", color: "#166534" }}>LLQP connection: Claims process</span>
          </div>
          <h3 style={{ marginBottom: 0, fontSize: "clamp(24px, 4vw, 34px)", lineHeight: 1.15 }}>
            How claims communication quality is becoming a competitive advantage
          </h3>
          <p style={{ ...s.muted, maxWidth: 760 }}>
            Insurers are improving timelines, status updates, and plain-language claims communication
            to reduce friction for policyholders and beneficiaries.
          </p>
          <TrackedLink
            href="/news/claims-communication-consumer-pain-point"
            eventName="click_new_this_week_brief"
            eventPayload={{ source: "news_featured_insight" }}
            style={s.linkButton}
          >
            Read analysis
          </TrackedLink>
        </article>
      </section>

      <section id="latest-commentary" style={{ ...s.container, padding: "28px 0" }}>
        <div style={{ marginBottom: 18 }}>
          <p style={s.eyebrow}>Latest Commentary</p>
          <h2 style={s.sectionTitle}>Insurance themes with LLQP study connections</h2>
          <p style={s.muted}>
            Browse original Market Desk commentary and evergreen insurance explainers by the study concept they reinforce.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
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

        <article
          style={{
            ...s.card,
            marginBottom: 24,
            borderColor: "#99f6e4",
            background: "linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)"
          }}
        >
          <p style={{ ...s.eyebrow, margin: 0 }}>Original editorial desk</p>
          <h3 style={{ marginBottom: 0, fontSize: 26 }}>LifeForge Market Desk</h3>
          <p style={s.muted}>
            Clear, independent commentary on life insurance, annuities, regulation, consumer protection,
            underwriting, claims, and insurance education.
          </p>
          <TrackedLink
            href="/news/market-desk"
            eventName="click_new_this_week_brief"
            eventPayload={{ source: "news_market_desk_card" }}
            style={s.linkButton}
          >
            Visit Market Desk
          </TrackedLink>
        </article>

        <div style={s.grid}>
          {filteredArticles.map((item) => (
            <ArticleCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section style={{ ...s.container, padding: "28px 0" }}>
        <div style={{ marginBottom: 18 }}>
          <p style={s.eyebrow}>Industry Watchlist</p>
          <h2 style={s.sectionTitle}>Educational trend notes, not breaking-news reports</h2>
          <p style={s.muted}>
            Educational trend notes on life insurance, regulation, underwriting, claims, and consumer protection.
            These are not breaking-news reports or product recommendations.
          </p>
          <p style={{ ...s.muted, fontSize: 14 }}>
            For official updates, always refer to insurers, regulators, licensed professionals, and primary source material.
          </p>
        </div>
        <div style={s.grid}>
          {watchlistItems.map((item) => (
            <article key={item.title} style={s.card}>
              <span style={s.pill}>LLQP connection: {item.badge}</span>
              <h3>{item.title}</h3>
              <p style={s.muted}>{item.summary}</p>
              <p style={{ color: "#0f766e", fontWeight: 700 }}>Why it matters: {item.why}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ ...s.container, padding: "28px 0" }}>
        <div
          style={{
            ...s.card,
            background: "linear-gradient(135deg, #0f172a 0%, #164e63 100%)",
            color: "#fff",
            padding: 32
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.12 }}>
            Reading about insurance helps. Practising scenarios builds exam confidence.
          </h2>
          <p style={{ lineHeight: 1.75, color: "#dbeafe", maxWidth: 780 }}>
            Use LifeForge Prep to practise LLQP Life Insurance module questions, review explanations,
            and learn how exam-style traps are usually framed.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
            <TrackedLink
              href="/free-practice"
              eventName="click_free_practice_cta"
              eventPayload={{ source: "news_study_cta" }}
              style={{ ...s.linkButton, background: "#fff", color: "#0f172a" }}
            >
              Try 15 Free Questions
            </TrackedLink>
            <TrackedLink
              href="/exam-prep"
              eventName="click_exam_prep_cta"
              eventPayload={{ source: "news_study_cta" }}
              style={{ ...s.secondaryButton, borderColor: "#bae6fd", background: "transparent", color: "#fff" }}
            >
              Get the Life Insurance Module Guide
            </TrackedLink>
          </div>
        </div>
      </section>

      <section style={{ ...s.container, padding: "28px 0" }}>
        <div style={s.card}>
          <p style={s.eyebrow}>Insurance learning notes</p>
          <h2 style={{ marginTop: 0 }}>Subscribe to the Weekly Insurance Brief</h2>
          <p style={s.muted}>
            Get the weekly insurance brief, exam traps, and plain-English insurance insights.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <section style={{ ...s.container, padding: "28px 0 56px" }}>
        <div style={{ ...s.card, background: "#f8fafc" }}>
          <h2>Educational disclaimer</h2>
          <p style={s.muted}>
            LifeForge Prep content is for education only and should not be treated as financial, legal,
            tax, insurance, or licensing advice. Always refer to official course materials, regulators,
            insurers, and licensed professionals for decisions involving insurance products or licensing requirements.
          </p>
        </div>
      </section>
    </main>
  );
}
