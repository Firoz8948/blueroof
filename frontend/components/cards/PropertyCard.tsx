/**
 * Property Card Component
 * Displays property with image slider, details, and action buttons
 * Desktop: Premium animated experience
 * Mobile: Unchanged
 */

'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import PropertyInquiryModal, { type InquiryType } from '@/components/modals/PropertyInquiryModal';

interface LocationAmenities {
  schools?: string;
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
  bedroomOptions?: string;
  images: string[];
  amenities?: LocationAmenities;
  connectivity?: string[];
  internalAmenities?: string[];
  tag?: string;
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  area,
  bedrooms,
  bedroomOptions,
  images,
  amenities,
  connectivity,
  internalAmenities,
  tag,
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isQuickDetailsOpen, setIsQuickDetailsOpen] = useState(false);
  const [inquiryModalType, setInquiryModalType] = useState<InquiryType | null>(null);

  // Desktop-only animation states
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [imageTransitioning, setImageTransitioning] = useState(false);
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [cardInView, setCardInView] = useState(false);

  const minSwipeDistance = 50;
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  const whatsappUrl = useMemo(() => {
    const WHATSAPP_NUMBER = '919876543210';
    const text = `Hi BlueRoof Realty, I'm interested in "${title}" in ${location}. Please share details and help me with a site visit.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [location, title]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Intersection observer for scroll-triggered entrance animation (desktop only)
  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardInView(true);
          setTimeout(() => setIsPriceVisible(true), 400);
        }
      },
      { threshold: 0.15 }
    );

    const card = document.getElementById(`property-card-${id}`);
    if (card) observer.observe(card);

    return () => observer.disconnect();
  }, [isMounted, id]);

  // Auto-slide with smooth crossfade
  useEffect(() => {
    if (!isMounted || images.length <= 1) return;

    const interval = setInterval(() => {
      if (isHoveredRef.current) return;
      setImageTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setImageTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMounted, images.length]);

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

  const goToSlide = useCallback((index: number) => {
    setImageTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setImageTransitioning(false);
    }, 200);
  }, []);

  const nextSlide = useCallback(() => {
    setImageTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setImageTransitioning(false);
    }, 200);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setImageTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setImageTransitioning(false);
    }, 200);
  }, [images.length]);

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
    if (distance > minSwipeDistance && images.length > 1) nextSlide();
    if (distance < -minSwipeDistance && images.length > 1) prevSlide();
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

  // Connectivity icons
  const connectivityIconMap: Record<string, React.ReactNode> = {
    'Naigaon Station 5 mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Juchandra Station 5 mins walking': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    'From Borivali via Western Express Highway, 20 mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    'Metro 2A, 7 & Proposed 10': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Bhayandar Naigaon Sea Link': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    'Virar Station - 01 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Bus depo - 01 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Virar - Safale Ferry - 8 Min': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    'Ameya club - 4 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Old Viva college - 4 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      </svg>
    ),
    'Virar Station - 8 mins to the station': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Ferry - 10 mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    'Hospitals/Schools - 10 mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    // 4th project (Luxurious Property) connectivity
    'Vasai Station - 14 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Naigaon Station - 12 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Vasai - Bhyander Ferry - 5 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    'Suruchi Beach - 5 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    // 5th project (Elegant 1BHK & 2BHK)
    'Virar Station - 5 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Ferry - 10 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    'Colleges and Hospitals': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Naigaon Station': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Easy Highway access': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    'Vasai Station - 10 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Hospitals & Colleges': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Nallasopara Station - 8 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Colleges & School': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Highway - 15 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    'Beaches': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Virar Station - 7 Mins': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    'Main Road': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  };

  const defaultConnectivityIcon = (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    </svg>
  );

  // Internal amenities icons
  const internalAmenityIconMap: Record<string, React.ReactNode> = {
    'Yoga lawn': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Swimming pool': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Multipurpose hall': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Kids pool': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Cricket ground': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'Forest seating': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Pool table': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    'Contact for more details': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    'Roof top luxury Garden': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'G+ 10 STORES TOWER': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Commercial G+ 2 Floor': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'G+2 Commercial Hub': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    '20ft Grand Double-Height Lobby': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Fitness Center': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    'Yoga Room': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Pickleball Court': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'Live Chess': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    // 5th project internal amenities
    'Club House': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Indoor Gaming Zone': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "Kids' Play Area": (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Gymnasium': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    '50+ more amenities': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Gym': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    'Spa': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Yoga Zone': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Jogging Track': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'Amphitheatre': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Clubhouse': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'EV Charging': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    '50+ Amenities': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Yoga & Meditation Zone': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Porch Swing': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Walkway': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'Barbeque Zone': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 008.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
    'Star Gazing Point & Hangout Deck': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    '35+ more amenities': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Yoga Lawn': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Fitness Track': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'Kids Play Area': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Rooftop Temple': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'BBQ Deck': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 008.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
    'Games Room': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Business Lounge': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    '25+ Amenities': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'Sun Deck with Sea View': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Jivdani Mandir View': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Ample Parking': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    'Gated Community': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    '30+ more amenities': (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  };

  const defaultInternalIcon = (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

  const hasConnectivity = connectivity && connectivity.length > 0;
  const hasInternalAmenities = internalAmenities && internalAmenities.length > 0;
  const hasNearbyAmenities = formattedAmenities.length > 0;

  return (
    <>
      {/* Inline styles for desktop animations (styled-jsx not in App Router by default; use global or pass to style tag) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
        }
        @keyframes floatTag {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes slideInStagger {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderDraw {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes imageKenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @media (min-width: 768px) {
          .desktop-card-entrance { animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .desktop-title-entrance { animation: fadeSlideRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
          .desktop-price-entrance { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
          .desktop-details-entrance { animation: fadeSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
          .desktop-section-entrance-1 { animation: slideInStagger 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both; }
          .desktop-section-entrance-2 { animation: slideInStagger 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both; }
          .desktop-section-entrance-3 { animation: slideInStagger 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both; }
          .desktop-actions-entrance { animation: fadeSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both; }
          .desktop-image-ken-burns { animation: imageKenBurns 8s ease-in-out infinite alternate; }
          .desktop-tag-float { animation: floatTag 2.5s ease-in-out infinite; }
          .desktop-shimmer-border { background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%); background-size: 200% 100%; animation: shimmer 3s ease-in-out infinite; }
          .desktop-cta-pulse { animation: pulseGlow 2s ease-in-out infinite; }
          .desktop-section-divider::before { content: ''; position: absolute; left: 0; top: 0; height: 1px; background: linear-gradient(90deg, #3b82f6, #e5e7eb); animation: borderDraw 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .desktop-amenity-chip { transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
          .desktop-amenity-chip:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
          .desktop-btn-magnetic { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .desktop-btn-magnetic:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3); }
          .desktop-btn-outline-magnetic { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); position: relative; overflow: hidden; }
          .desktop-btn-outline-magnetic::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent); transition: left 0.5s; }
          .desktop-btn-outline-magnetic:hover::before { left: 100%; }
          .desktop-btn-outline-magnetic:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15); }
          .desktop-whatsapp-btn { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .desktop-whatsapp-btn:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 8px 25px rgba(22, 163, 74, 0.35); }
          .desktop-image-overlay { background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%); }
          .desktop-section-heading { position: relative; display: inline-block; }
          .desktop-section-heading::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, #3b82f6, #6366f1); border-radius: 1px; transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          .desktop-section-active .desktop-section-heading::after { width: 32px; }
          .desktop-thumb-btn { transition: all 0.2s ease; }
          .desktop-thumb-btn:hover { transform: scale(1.1); opacity: 1 !important; }
          .desktop-price-badge { position: relative; overflow: hidden; }
          .desktop-price-badge::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%); animation: shimmer 4s ease-in-out infinite; }
        }
      `}} />

      <div
        id={`property-card-${id}`}

className={`bg-white rounded-2xl shadow-lg overflow-hidden w-full ${cardInView ? 'md:desktop-card-entrance' : 'md:opacity-0'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setActiveSection(null); }}
      >
        <div className="flex flex-col md:flex-row md:min-h-[420px]">
          {/* Image Section - left 40% on desktop */}
        
<div
  className="relative h-56 md:h-auto md:min-h-[420px] md:w-[35%] w-full group touch-pan-y flex-shrink-0 overflow-hidden md:self-stretch"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
            <div className={`absolute inset-0 transition-opacity duration-500 ${imageTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <Image
                src={images[currentImageIndex] || '/placeholder-property.jpg'}
                alt={title}
                fill
                className={`object-cover ${isHovered ? 'md:desktop-image-ken-burns' : ''}`}
              />
            </div>
            <div className="hidden md:block absolute inset-0 desktop-image-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="hidden md:flex absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {currentImageIndex + 1} / {images.length}
            </div>
            {tag && (
              <div className="absolute top-3 right-3 md:desktop-tag-float">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-amber-400/90 text-amber-900 backdrop-blur-sm shadow-lg">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {tag}
                </span>
              </div>
            )}
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-black/70 text-white px-2.5 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-xs font-medium backdrop-blur-sm">
              📍 {location}
            </div>
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 md:bottom-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'w-6 bg-white md:w-8 md:shadow-lg' : 'w-2 bg-white/50 hover:bg-white/75 md:hover:w-3'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
            {images.length > 1 && (
              <>
                <button type="button" suppressHydrationWarning onClick={prevSlide} className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0 shadow-lg hover:shadow-xl hover:scale-110" aria-label="Previous image">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button type="button" suppressHydrationWarning onClick={nextSlide} className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0 shadow-lg hover:shadow-xl hover:scale-110" aria-label="Next image">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
            {images.length > 1 && (
              <div className="hidden md:flex absolute bottom-0 left-0 right-0 p-3 pt-8 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 gap-2 justify-center" suppressHydrationWarning>
                {images.slice(0, 5).map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => goToSlide(index)}
                    className={`desktop-thumb-btn relative w-12 h-9 rounded-md overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-white shadow-lg scale-110' : 'border-white/40 opacity-70'}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="48px" />
                  </button>
                ))}
                {images.length > 5 && (
                  <div className="flex items-center justify-center w-12 h-9 rounded-md bg-black/60 border-2 border-white/40 text-white text-xs font-bold">+{images.length - 5}</div>
                )}
              </div>
            )}
          </div>

          {/* Mobile view */}
          <div className="p-4 md:hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-base md:text-xl font-bold text-gray-900 leading-snug line-clamp-2">{title}</h3>
                <p className="mt-1 text-sm text-gray-600 flex items-center gap-1"><span aria-hidden>📍</span><span className="truncate">{location}</span></p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-500">Starting</p>
                <p className="text-base md:text-lg font-bold text-blue-600 leading-tight">{price}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" suppressHydrationWarning onClick={() => setInquiryModalType('site-visit')} className="w-full text-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">Book Site Visit</button>
              <button type="button" suppressHydrationWarning onClick={() => setInquiryModalType('expert')} className="w-full text-center bg-white border-2 border-blue-600 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium text-sm">Talk to Expert</button>
            </div>
            <button type="button" suppressHydrationWarning onClick={() => setIsQuickDetailsOpen(true)} className="mt-3 w-full text-center bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-black transition-colors duration-200 font-medium text-sm">Quick Details</button>
          </div>

          {/* Desktop view - right 60% */}
          <div className="hidden md:flex md:w-[65%] md:flex-col p-6 relative">
            <div className="absolute left-0 top-4 bottom-4 w-px desktop-shimmer-border" />
            <div className={`flex items-start justify-between gap-4 ${cardInView ? 'desktop-title-entrance' : 'opacity-0'}`}>
              <div className="min-w-0">
                <h3 className="text-2xl font-bold text-gray-900 leading-snug tracking-tight">{title}</h3>
                <p className="mt-1.5 text-base text-gray-500 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                  {location}
                </p>
              </div>
              <div className={`text-right flex-shrink-0 ${cardInView ? 'desktop-price-entrance' : 'opacity-0'}`}>
                <div className="desktop-price-badge bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl px-5 py-3">
                  <p className="text-xs text-blue-600/70 font-medium uppercase tracking-wider">Starting</p>
                  <p className={`text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-700 ${isPriceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>{price}</p>
                </div>
              </div>
            </div>
            <div className={`mt-5 flex flex-wrap items-center gap-3 ${cardInView ? 'desktop-details-entrance' : 'opacity-0'}`}>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 transition-all duration-200 hover:bg-gray-100 hover:border-gray-200">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                <span className="text-sm font-semibold text-gray-900">{area}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 transition-all duration-200 hover:bg-gray-100 hover:border-gray-200">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span className="text-sm font-semibold text-gray-900">{bedroomOptions ?? (bedrooms ? `${bedrooms} BHK` : '—')}</span>
              </div>
              {tag && (
                <span className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 desktop-tag-float">
                  <svg className="w-3 h-3 mr-1.5 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  {tag}
                </span>
              )}
            </div>
            {hasConnectivity && (
              <div className={`mt-5 pt-5 relative desktop-section-divider ${cardInView ? 'desktop-section-entrance-1' : 'opacity-0'} ${activeSection === 'connectivity' ? 'desktop-section-active' : ''}`} onMouseEnter={() => setActiveSection('connectivity')}>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 desktop-section-heading">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Connectivity
                  </span>
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {connectivity!.map((item, index) => (
                    <div key={index} className="desktop-amenity-chip inline-flex items-center gap-2 bg-gradient-to-b from-white to-gray-50 hover:from-blue-50 hover:to-white px-4 py-2.5 rounded-xl border border-gray-200 hover:border-blue-200 cursor-default">
                      <span className="text-blue-500 flex-shrink-0">{connectivityIconMap[item] ?? defaultConnectivityIcon}</span>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {hasInternalAmenities && (
              <div className={`mt-5 pt-5 relative desktop-section-divider ${cardInView ? 'desktop-section-entrance-2' : 'opacity-0'} ${activeSection === 'internal' ? 'desktop-section-active' : ''}`} onMouseEnter={() => setActiveSection('internal')}>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 desktop-section-heading">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    Internal Amenities
                  </span>
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {internalAmenities!.map((item, index) => (
                    <div key={index} className={`desktop-amenity-chip inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${item === 'Contact for more details' ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-gradient-to-b from-white to-gray-50 hover:from-indigo-50 hover:to-white border-gray-200 hover:border-indigo-200'}`}>
                      <span className={`flex-shrink-0 ${item === 'Contact for more details' ? 'text-gray-400' : 'text-indigo-500'}`}>{internalAmenityIconMap[item] ?? defaultInternalIcon}</span>
                      <span className={`text-sm font-medium ${item === 'Contact for more details' ? 'text-gray-400' : 'text-gray-700'}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {hasNearbyAmenities && (
              <div className={`mt-5 pt-5 relative desktop-section-divider ${cardInView ? 'desktop-section-entrance-3' : 'opacity-0'} ${activeSection === 'nearby' ? 'desktop-section-active' : ''}`} onMouseEnter={() => setActiveSection('nearby')}>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 desktop-section-heading">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Nearby Amenities
                  </span>
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {formattedAmenities.map((a, index) => (
                    <div key={a.key} className="desktop-amenity-chip inline-flex items-center gap-2 bg-gradient-to-b from-white to-gray-50 hover:from-emerald-50 hover:to-white px-4 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-200 cursor-default" title={`${a.label}: ${a.value}`}>
                      <span className="text-emerald-500">{a.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{a.label}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm font-bold text-gray-900">{a.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex-grow min-h-4" />
            <div className={`mt-6 flex items-center gap-3 flex-shrink-0 ${cardInView ? 'desktop-actions-entrance' : 'opacity-0'}`}>
              <button type="button" suppressHydrationWarning onClick={() => setInquiryModalType('site-visit')} className={`desktop-btn-magnetic flex-1 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3.5 rounded-xl font-semibold text-sm tracking-wide ${isHovered ? 'desktop-cta-pulse' : ''}`}>
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Site Visit
                </span>
              </button>
              <button type="button" suppressHydrationWarning onClick={() => setInquiryModalType('expert')} className="desktop-btn-outline-magnetic flex-1 text-center bg-white border-2 border-blue-600 text-blue-600 px-4 py-3.5 rounded-xl font-semibold text-sm tracking-wide">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Talk to Expert
                </span>
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="desktop-whatsapp-btn w-14 h-14 p-3.5 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md" aria-label="WhatsApp" title="Chat on WhatsApp">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Quick Details Modal */}
      {isQuickDetailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden" role="dialog" aria-modal="true" aria-label={`Quick details for ${title}`} onClick={() => setIsQuickDetailsOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 p-4 border-b border-gray-200">
              <div className="min-w-0">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 line-clamp-2">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">📍 {location}</p>
              </div>
              <button type="button" onClick={() => setIsQuickDetailsOpen(false)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Close">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto">
              <div className="relative h-56 md:h-80 w-full bg-gray-100">
                <Image src={images[currentImageIndex] || '/placeholder-property.jpg'} alt={title} fill className="object-cover" />
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_, index) => (
                      <button key={index} type="button" onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all ${index === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'}`} aria-label={`Go to slide ${index + 1}`} />
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-500">Price</p><p className="text-sm font-semibold text-gray-900">{price}</p></div>
                  <div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-500">Area</p><p className="text-sm font-semibold text-gray-900">{area}</p></div>
                  <div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-500">Bedrooms</p><p className="text-sm font-semibold text-gray-900">{bedroomOptions ?? (bedrooms ? `${bedrooms} BHK` : '—')}</p></div>
                </div>
                {tag && <div className="mt-3"><span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">{tag}</span></div>}
                {connectivity && connectivity.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Connectivity</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {connectivity.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-gray-500 flex-shrink-0">{connectivityIconMap[item] ?? defaultConnectivityIcon}</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {internalAmenities && internalAmenities.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Internal Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {internalAmenities.map((item, index) => (
                        <span key={index} className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg ${item === 'Contact for more details' ? 'bg-gray-100 text-gray-500' : 'bg-gray-100 text-gray-800'}`}>
                          <span className="flex-shrink-0">{internalAmenityIconMap[item] ?? defaultInternalIcon}</span>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {formattedAmenities.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Nearby Amenities</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {formattedAmenities.map((a) => (
                        <div key={a.key} className="flex items-center gap-2">
                          <div className="text-gray-500 flex-shrink-0">{a.icon}</div>
                          <div className="min-w-0"><p className="text-xs text-gray-500">{a.label}</p><p className="text-sm font-medium text-gray-900 truncate" title={a.value}>{a.value}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex items-center gap-2">
              <button type="button" onClick={() => { setIsQuickDetailsOpen(false); setInquiryModalType('expert'); }} className="flex-1 text-center bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold">Talk to Expert</button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-green-600 hover:bg-green-700 transition-colors duration-200 flex items-center justify-center" aria-label="WhatsApp" title="WhatsApp">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
        </div>
      )}

      <PropertyInquiryModal
        isOpen={inquiryModalType !== null}
        onClose={() => setInquiryModalType(null)}
        type={inquiryModalType ?? 'site-visit'}
        property={{ id, title, location, price, images }}
      />
    </>
  );
}
