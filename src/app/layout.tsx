import { Inter } from 'next/font/google';
import './globals.css';

// Types
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MongoDB ObjectID generator',
  description: 'Create a MongoDB ObjectID from a Dayjs expression',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
