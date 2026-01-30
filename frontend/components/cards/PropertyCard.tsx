/**
 * Property Card Component
 * Displays property with image slider, details, and action buttons
 */

'use client';

import { useState, useEffect } from 'react';
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

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden md:hover:shadow-xl transition-shadow duration-300">
      {/* Image Slider Section */}
      <div
        className="relative h-48 md:h-80 w-full group touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Image */}
        <Image
          src={images[currentImageIndex] || '/placeholder-property.jpg'}
          alt={title}
          fill
          className="object-cover"
        />

        {/* Location Badge - Bottom Left */}
        <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 bg-black/70 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-md text-xs md:text-sm font-medium backdrop-blur-sm">
          📍 {location}
        </div>

        {/* Image Indicators - Bottom Center */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
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

        {/* Navigation Arrows (on hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentImageIndex(
                  (prev) => (prev - 1 + images.length) % images.length
                )
              }
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentImageIndex((prev) => (prev + 1) % images.length)
              }
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Property Details Section */}
      <div className="p-3 md:p-6">
        <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Price */}
        <div className="text-lg md:text-2xl font-bold text-blue-600 mb-2 md:mb-3">
          {price}
        </div>

        {/* Property Features */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-2 md:mb-4 text-xs md:text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3 md:w-4 md:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            <span>{area}</span>
          </div>
          {bedrooms && (
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3 md:w-4 md:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>{bedrooms} BHK</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3 md:w-4 md:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{bathrooms} Bath</span>
            </div>
          )}
        </div>

        {/* Location Amenities Section */}
        {amenities && (
          <div className="mb-2 md:mb-4 pb-2 md:pb-4 border-b border-gray-200">
            <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 flex items-center gap-1 md:gap-2">
              <svg
                className="w-3 h-3 md:w-4 md:h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="hidden md:inline">Nearby Amenities</span>
              <span className="md:hidden">Amenities</span>
            </h4>
            <div className="grid grid-cols-2 gap-1.5 md:gap-3 text-[10px] md:text-xs">
              {amenities.schools && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Schools:</strong><strong className="md:hidden">S:</strong> {amenities.schools}</span>
                </div>
              )}
              {amenities.schools && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Schools:</strong><strong className="md:hidden">S:</strong> {amenities.schools}</span>
                </div>
              )}
              {amenities.colleges && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Colleges:</strong><strong className="md:hidden">C:</strong> {amenities.colleges}</span>
                </div>
              )}
              {amenities.malls && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Malls:</strong><strong className="md:hidden">M:</strong> {amenities.malls}</span>
                </div>
              )}
              {amenities.markets && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Markets:</strong><strong className="md:hidden">Mkt:</strong> {amenities.markets}</span>
                </div>
              )}
              {amenities.railwayStation && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Railway Station:</strong><strong className="md:hidden">Rly:</strong> {amenities.railwayStation}</span>
                </div>
              )}
              {amenities.highways && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Highways:</strong><strong className="md:hidden">HW:</strong> {amenities.highways}</span>
                </div>
              )}
              {amenities.beaches && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Beaches:</strong><strong className="md:hidden">Bch:</strong> {amenities.beaches}</span>
                </div>
              )}
              {amenities.amusementPark && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Amusement Park:</strong><strong className="md:hidden">Park:</strong> {amenities.amusementPark}</span>
                </div>
              )}
              {amenities.gardens && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Gardens:</strong><strong className="md:hidden">Gdn:</strong> {amenities.gardens}</span>
                </div>
              )}
              {amenities.hospitals && (
                <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="truncate"><strong className="hidden md:inline">Hospitals:</strong><strong className="md:hidden">Hosp:</strong> {amenities.hospitals}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-1.5 md:gap-2">
          <button className="w-full bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-xs md:text-base">
            Book a Site Visit
          </button>
          <button className="w-full bg-white border-2 border-blue-600 text-blue-600 px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium text-xs md:text-base">
            Talk to Expert
          </button>
        </div>
      </div>
    </div>
  );
}

