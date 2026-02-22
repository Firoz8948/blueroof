/**
 * Root Layout
 * Global layout wrapper for entire Next.js application
 */

import './globals.css';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueroofrealty.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'Best Property Consultant in Virar, Vasai, Nallasopara, Naigaon, Mumbai | BlueRoof Realty',
    template: '%s | BlueRoof Realty',
  },
  description:
    'BlueRoof Realty is a trusted property consultant in Virar, Vasai, Nallasopara, Naigaon, and Mumbai. Explore verified properties, book site visits, and get expert real estate guidance.',
  keywords: [
    'best property consultant in virar',
    'property consultant virar',
    'property consultant vasai',
    'property consultant nallasopara',
    'property consultant naigaon',
    'property consultant mumbai',
    'real estate consultant virar',
    'buy property in virar',
    'buy property in vasai',
    'buy property in nallasopara',
    'buy property in naigaon',
    'BlueRoof Realty',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title:
      'Best Property Consultant in Virar, Vasai, Nallasopara, Naigaon, Mumbai | BlueRoof Realty',
    description:
      'Find premium properties with BlueRoof Realty in Virar, Vasai, Nallasopara, Naigaon, and Mumbai.',
    siteName: 'BlueRoof Realty',
    locale: 'en_IN',
    images: [
      {
        url: '/blueroofhero.jpeg',
        width: 1200,
        height: 630,
        alt: 'BlueRoof Realty',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Best Property Consultant in Virar, Vasai, Nallasopara, Naigaon, Mumbai | BlueRoof Realty',
    description:
      'Verified properties and expert guidance from BlueRoof Realty across Mumbai suburbs.',
    images: ['/blueroofhero.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17969138073" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17969138073');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

