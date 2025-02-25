import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

// Types
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MongoDB ObjectID Generator & Timestamp Tool',
  description: 'Create custom MongoDB ObjectIDs from timestamps using Dayjs expressions. Developer tool for generating ObjectIDs with specific dates.',
  keywords: ['MongoDB', 'ObjectID', 'generator', 'timestamp', 'Dayjs', 'database', 'developer tools'],
  openGraph: {
    title: 'MongoDB ObjectID Generator & Timestamp Tool',
    description: 'Create custom MongoDB ObjectIDs from timestamps using Dayjs expressions',
    url: 'https://mongodb.joshverd.com',
    siteName: 'MongoDB ObjectID Generator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MongoDB ObjectID Generator & Timestamp Tool',
    description: 'Create custom MongoDB ObjectIDs from timestamps using Dayjs expressions',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <GoogleAnalytics gaId="G-PVLTC7BHR5" />
      </body>
    </html>
  );
}
