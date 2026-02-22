import type { Metadata } from 'next';
import ThankYouClient from '@/components/thank-you/ThankYouClient';

export const metadata: Metadata = {
  title: 'Thank You',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/thankyou/',
  },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}

