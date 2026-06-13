import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';
import { Analytics } from '@vercel/analytics/react';
import AnalyticsClickTracker from '@/components/AnalyticsClickTracker';
import SiteHeader from '@/components/editorial/SiteHeader';
import SiteFooter from '@/components/editorial/SiteFooter';


const siteUrl = `https://${siteConfig.domain}`;

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    type: 'website',
    url: siteUrl,
    siteName: siteConfig.brandName
  },
  metadataBase: new URL(siteUrl)
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <AnalyticsClickTracker />
        <Analytics />
      </body>
    </html>
  );
}
