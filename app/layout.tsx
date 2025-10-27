import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/error-boundary';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  // Basic metadata - pages will override with Yoast SEO data
  metadataBase: new URL('https://www.emytrends.com'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  // Global metadata that applies to all pages unless overridden
  keywords: 'news, breaking news, politics, business, technology, health, sports, entertainment, world news',
  authors: [{ name: 'The Maple Epoch Editorial Team' }],
  creator: 'The Maple Epoch',
  publisher: 'The Maple Epoch',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable}`}>
        <ErrorBoundary>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}