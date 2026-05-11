import type { Metadata } from "next";
import NewsPageClient from "./NewsPageClient";

export const metadata: Metadata = {
  title: "LifeForge Market Desk | Life Insurance News & LLQP Study Insights",
  description:
    "Plain-English life insurance commentary, regulatory themes, product trends, consumer protection insights, and LLQP study connections from LifeForge Prep.",
  openGraph: {
    title: "LifeForge Market Desk",
    description:
      "Insurance trend commentary translated into practical learning insights for LLQP candidates, new advisors, and curious consumers.",
    url: "/news",
    type: "website"
  }
};

export default function NewsPage() {
  return <NewsPageClient />;
}
