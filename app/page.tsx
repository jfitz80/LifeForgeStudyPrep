import type { Metadata } from 'next';
import SiteHeader from '@/components/editorial/SiteHeader';
import HeroSection from '@/components/editorial/HeroSection';
import CredibilityStrip from '@/components/editorial/CredibilityStrip';
import FeaturedGrid from '@/components/editorial/FeaturedGrid';
import NewsDigestSection from '@/components/editorial/NewsDigestSection';
import KnowledgeHubSection from '@/components/editorial/KnowledgeHubSection';
import IndustryInsightsSection from '@/components/editorial/IndustryInsightsSection';
import ReturnValueSection from '@/components/editorial/ReturnValueSection';
import NewsletterSection from '@/components/editorial/NewsletterSection';
import SiteFooter from '@/components/editorial/SiteFooter';
import { digestPreviewItems } from '@/config/home';

export const metadata: Metadata = {
  title: 'LifeForge Insurance Prep | Life Insurance News, Knowledge, and Insights',
  description:
    'A trusted destination for life insurance education, weekly digest updates, and industry insights for consumers, learners, and professionals.'
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CredibilityStrip />
        <FeaturedGrid />
        <NewsDigestSection items={digestPreviewItems} />
        <KnowledgeHubSection />
        <IndustryInsightsSection />
        <ReturnValueSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
