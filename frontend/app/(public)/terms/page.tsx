/**
 * Terms of Service Page
 */

import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms of service for BlueRoof Realty website usage.',
  alternates: {
    canonical: '/terms/',
  },
};

export default function TermsPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh]" style={{ minHeight: '280px' }}>
        <Image
          src="/blueroofhero.jpeg"
          alt="Terms of Service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg px-4">
            Terms of Service
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto prose prose-lg text-gray-700">
          <p className="text-gray-600 mb-8">
            Last updated: January 2025
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By using this website and our services, you agree to these Terms of Service. If you do not agree, please do not use our website or services. BlueRoof Realty reserves the right to update these terms at any time; continued use after changes constitutes acceptance.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Our Services</h2>
          <p className="mb-6">
            BlueRoof Realty provides real estate consultancy, property listings, and related services in Virar, Nallasopara, Vasai, and Mumbai. Listings and information on this site are for general information only and do not constitute a guarantee of availability or terms. All transactions are subject to separate agreements and applicable laws.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. User Conduct</h2>
          <p className="mb-6">
            You agree to use this website only for lawful purposes. You must not use it to submit false information, harass others, or attempt to gain unauthorized access to our systems or data. We may suspend or terminate access if we believe these terms have been violated.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Intellectual Property</h2>
          <p className="mb-6">
            All content on this website, including text, images, logos, and design, is owned by BlueRoof Realty or used with permission. You may not copy, modify, or distribute our content without prior written consent.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Limitation of Liability</h2>
          <p className="mb-6">
            To the fullest extent permitted by law, BlueRoof Realty shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or our services. Our liability is limited to the extent permitted under applicable law.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">6. Contact</h2>
          <p className="mb-6">
            For questions about these Terms of Service, contact us at{' '}
            <a href="mailto:blueroofrealty1@gmail.com" className="text-blue-600 hover:underline">blueroofrealty1@gmail.com</a> or{' '}
            <a href="tel:+919503009738" className="text-blue-600 hover:underline">+91 9503009738</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
