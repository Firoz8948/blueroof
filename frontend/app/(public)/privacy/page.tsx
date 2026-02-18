/**
 * Privacy Policy Page
 */

import Image from 'next/image';

export default function PrivacyPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh]" style={{ minHeight: '280px' }}>
        <Image
          src="/blueroofhero.jpeg"
          alt="Privacy Policy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg px-4">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto prose prose-lg text-gray-700">
          <p className="text-gray-600 mb-8">
            Last updated: January 2025
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Information We Collect</h2>
          <p className="mb-6">
            We collect information you provide when you enquire about properties, request a call back, or contact us. This may include your name, phone number, email address, and any message you send. We use this information to respond to your enquiries and provide real estate services.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. How We Use Your Information</h2>
          <p className="mb-6">
            Your information is used to communicate with you about properties and services, schedule site visits, and improve our offerings. We do not sell your personal information to third parties.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Data Security</h2>
          <p className="mb-6">
            We take reasonable steps to protect your personal information from unauthorized access, loss, or misuse. Data is stored and transmitted in a secure manner consistent with industry practices.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Cookies and Usage Data</h2>
          <p className="mb-6">
            Our website may use cookies and similar technologies to improve your experience and analyze site usage. You can adjust your browser settings to limit or block cookies if you prefer.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Contact Us</h2>
          <p className="mb-6">
            For any questions about this Privacy Policy or your data, please contact us at{' '}
            <a href="mailto:blueroofrealty1@gmail.com" className="text-blue-600 hover:underline">blueroofrealty1@gmail.com</a> or call{' '}
            <a href="tel:+919503009738" className="text-blue-600 hover:underline">+91 9503009738</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
