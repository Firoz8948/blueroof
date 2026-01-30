/**
 * Hero CTA Buttons (client)
 * Opens the global Expert modal on "Get a Call"
 */

'use client';

import Link from 'next/link';
import { useInquiryModal } from '@/components/modals/InquiryModalProvider';

export default function HeroCtas() {
  const { openExpert } = useInquiryModal();

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
      <Link
        href="/properties"
        className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-base sm:text-lg shadow-lg"
      >
        View Properties
      </Link>
      <button
        type="button"
        onClick={() => openExpert()}
        className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium text-base sm:text-lg shadow-lg"
        suppressHydrationWarning
      >
        Get a Call
      </button>
    </div>
  );
}

