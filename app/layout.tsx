import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';

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
      <body>{children}</body>
    </html>
  );
}
