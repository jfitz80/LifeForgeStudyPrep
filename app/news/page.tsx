import type { Metadata } from "next";
import { getWeeklyNewsItems } from "@/lib/news/published";
import NewsPageClient from "./NewsPageClient";

export const metadata: Metadata = {
  title: "Life Insurance News & LLQP Study Insights | LifeForgePrep",
  description:
    "Current life insurance and LLQP exam developments explained for future agents, with practical study insights, exam connections, and LifeForgePrep practice recommendations.",
  openGraph: {
    title: "LifeForge Market Desk",
    description:
      "Insurance trend commentary translated into practical learning insights for LLQP candidates, new advisors, and curious consumers.",
    url: "/news",
    type: "website"
  }
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const weeklyItems = await getWeeklyNewsItems();
  return <NewsPageClient weeklyItems={weeklyItems} />;
}
