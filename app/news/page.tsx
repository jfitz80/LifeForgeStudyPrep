import type { Metadata } from "next";
import NewsPageClient from "./NewsPageClient";

export const metadata: Metadata = {
  title: "LifeForge Market Desk | Life Insurance News and Trends",
  description:
    "Plain-English commentary on life insurance trends, regulation, products, and consumer issues.",
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
