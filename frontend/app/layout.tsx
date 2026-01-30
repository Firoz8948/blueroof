/**
 * Root Layout
 * Global layout wrapper for entire Next.js application
 */

import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BlueRoof Realty - Your Trusted Real Estate Partner',
  description: 'Find your dream property with BlueRoof Realty. Expert real estate services for buyers and sellers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

