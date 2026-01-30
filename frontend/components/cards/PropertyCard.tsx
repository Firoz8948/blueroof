/**
 * Property Card Component
 * Displays property with image slider, details, and action buttons
 */

'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LocationAmenities {
  schools?: string; // Distance or count
  colleges?: string;
  malls?: string;
  markets?: string;
  railwayStation?: string;
  highways?: string;
  beaches?: string;
  amusementPark?: string;
  gardens?: string;
  hospitals?: string;
}

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  images: string[]; // Array of image URLs
  amenities?: LocationAmenities; // Location-based amenities
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  area,
  bedrooms,
  bathrooms,
  images,
  amenities,
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isQuickDetailsOpen, setIsQuickDetailsOpen] = useState(false);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const whatsappUrl = useMemo(() => {
    // Keep consistent with the WhatsApp number used in the Contact page.
    const WHATSAPP_NUMBER = '919876543210';
    const text = `Hi BlueRoof Realty, I'm interested in "${title}" in ${location}. Please share details and help me with a site visit.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [location, title]);

  // Set mounted flag after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-slide images every 3 seconds (only after mount to prevent hydration issues)
  useEffect(() => {
    if (!isMounted || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMounted, images.length]);

  // Close modal on Escape + prevent background scroll when open
  useEffect(() => {
    if (!isQuickDetailsOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsQuickDetailsOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isQuickDetailsOpen]);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && images.length > 1) {
      nextSlide();
    }
    if (isRightSwipe && images.length > 1) {
      prevSlide();
    }

    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Amenity configuration with icons
  const amenityConfig: Record<string, { label: string; icon: React.ReactNode }> = {
    schools: {
      label: 'Schools',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    colleges: {
      label: 'Colleges',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    malls: {
      label: 'Malls',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    markets: {
      label: 'Markets',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    railwayStation: {
      label: 'Railway',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    highways: {
      label: 'Highways',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    beaches: {
      label: 'Beaches',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    amusementPark: {
      label: 'Fun Parks',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    gardens: {
      label: 'Gardens',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    hospitals: {
      label: 'Hospitals',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  };

  const formattedAmenities = useMemo(() => {
    if (!amenities) return [];

    return Object.entries(amenities)
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => ({
        key,
        label: amenityConfig[key]?.label ?? key,
        value: String(value),
        icon: amenityConfig[key]?.icon,
      }));
  }, [amenities]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:hover:shadow-xl transition-shadow duration-300 w-full">
        {/* Image Slider Section */}
        <div
          className="relative h-56 md:h-80 w-full group touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[currentImageIndex] || '/placeholder-property.jpg'}
            alt={title}
            fill
            className="object-cover"
          />

          {/* Location Badge */}
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2.5 py-1 rounded-md text-xs font-medium backdrop-blur-sm">
            📍 {location}
          </div>

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-6 bg-white'
                      : 'w-2 bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows (desktop hover) */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Mobile view (keep as-is) */}
        <div className="p-4 md:hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base md:text-xl font-bold text-gray-900 leading-snug line-clamp-2">
                {title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
                <span aria-hidden>📍</span>
                <span className="truncate">{location}</span>
              </p>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-500">Starting</p>
              <p className="text-base md:text-lg font-bold text-blue-600 leading-tight">
                {price}
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={`/contact?type=site-visit&propertyId=${encodeURIComponent(
                id
              )}&property=${encodeURIComponent(title)}`}
              className="w-full text-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
            >
              Book Site Visit
            </Link>
            <Link
              href={`/contact?type=expert&propertyId=${encodeURIComponent(
                id
              )}&property=${encodeURIComponent(title)}`}
              className="w-full text-center bg-white border-2 border-blue-600 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium text-sm"
            >
              Talk to Expert
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsQuickDetailsOpen(true)}
            className="mt-3 w-full text-center bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-black transition-colors duration-200 font-medium text-sm"
          >
            Quick Details
          </button>
        </div>

        {/* Desktop view (show all details inline; no Quick Details) */}
        <div className="hidden md:block p-6">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h3 className="text-2xl font-bold text-gray-900 leading-snug">
                {title}
              </h3>
              <p className="mt-1 text-base text-gray-600">📍 {location}</p>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-sm text-gray-500">Starting</p>
              <p className="text-2xl font-bold text-blue-600">{price}</p>
            </div>
          </div>

          {/* Key details */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Area:</span>
              <span>{area}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Bedrooms:</span>
              <span>{bedrooms ? `${bedrooms} BHK` : '—'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Bathrooms:</span>
              <span>{bathrooms ? `${bathrooms}` : '—'}</span>
            </div>
          </div>

          {/* Amenities */}
          {formattedAmenities.length > 0 && (
            <div className="mt-5 pt-5 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                Nearby Amenities
              </h4>
              <div className="flex flex-wrap gap-3">
                {formattedAmenities.map((a) => (
                  <div
                    key={a.key}
                    className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 transition-colors px-4 py-2.5 rounded-full border border-gray-200"
                    title={`${a.label}: ${a.value}`}
                  >
                    <span className="text-gray-600">{a.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{a.label}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm font-semibold text-gray-900">{a.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Desktop actions: 3 buttons in a row */}
          <div className="mt-6 flex items-center gap-3">
            <Link
              href={`/contact?type=site-visit&propertyId=${encodeURIComponent(
                id
              )}&property=${encodeURIComponent(title)}`}
              className="flex-1 text-center bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Book Site Visit
            </Link>
            <Link
              href={`/contact?type=expert&propertyId=${encodeURIComponent(
                id
              )}&property=${encodeURIComponent(title)}`}
              className="flex-1 text-center bg-white border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 font-semibold"
            >
              Talk to Expert
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-green-600 hover:bg-green-700 transition-colors duration-200 flex items-center justify-center flex-shrink-0"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Details Modal (mobile only) */}
      {isQuickDetailsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick details for ${title}`}
          onClick={() => setIsQuickDetailsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-4 border-b border-gray-200">
              <div className="min-w-0">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 line-clamp-2">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">📍 {location}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickDetailsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[75vh] overflow-auto">
              {/* Photos */}
              <div className="relative h-56 md:h-80 w-full bg-gray-100">
                <Image
                  src={images[currentImageIndex] || '/placeholder-property.jpg'}
                  alt={title}
                  fill
                  className="object-cover"
                />
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'w-6 bg-white'
                            : 'w-2 bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4">
                {/* Key details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-sm font-semibold text-gray-900">{price}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Area</p>
                    <p className="text-sm font-semibold text-gray-900">{area}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Bedrooms</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {bedrooms ? `${bedrooms} BHK` : '—'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Bathrooms</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {bathrooms ? `${bathrooms}` : '—'}
                    </p>
                  </div>
                </div>

                {/* Amenities */}
                {formattedAmenities.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Nearby Amenities
                    </h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {formattedAmenities.map((a) => (
                        <div key={a.key} className="flex items-center gap-2">
                          <div className="text-gray-500 flex-shrink-0">{a.icon}</div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">{a.label}</p>
                            <p className="text-sm font-medium text-gray-900 truncate" title={a.value}>
                              {a.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer actions */}
            <div className="p-4 border-t border-gray-200 flex items-center gap-2">
              <Link
                href={`/contact?type=expert&propertyId=${encodeURIComponent(
                  id
                )}&property=${encodeURIComponent(title)}`}
                className="flex-1 text-center bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Talk to Expert
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-green-600 hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

