/**
 * Landing Page
 * Main public-facing homepage for lead generation
 * Optimized for Google, Instagram, Facebook ads
 */

import Image from 'next/image';
import Link from 'next/link';
import PropertyCard from '@/components/cards/PropertyCard';
import TestimonialCarousel from '@/components/cards/TestimonialCarousel';
import ContactForm from '@/components/forms/ContactForm';
import HeroCtas from '@/components/home/HeroCtas';

// Mock properties data (replace with API data later)
const properties = [
  {
    id: '1',
    title: 'Luxury 3 BHK Apartment',
    location: 'Nallasopara',
    price: '₹ 85 Lakhs',
    area: '1200 sq ft',
    bedrooms: 3,
    bathrooms: 2,
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    amenities: {
      schools: '5 within 2 km',
      colleges: '3 within 3 km',
      malls: '2 within 5 km',
      markets: 'Multiple nearby',
      railwayStation: '1.5 km',
      highways: 'NH-8: 2 km',
      beaches: 'Arnala Beach: 8 km',
      amusementPark: 'Essel World: 15 km',
      gardens: '2 within 3 km',
      hospitals: '3 within 4 km',
    },
  },
  {
    id: '2',
    title: 'Modern 2 BHK Flat',
    location: 'Virar',
    price: '₹ 65 Lakhs',
    area: '950 sq ft',
    bedrooms: 2,
    bathrooms: 2,
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    amenities: {
      schools: '4 within 1.5 km',
      colleges: '2 within 4 km',
      malls: '1 within 3 km',
      markets: 'Local market: 0.5 km',
      railwayStation: '0.8 km',
      highways: 'NH-8: 1 km',
      beaches: 'Virar Beach: 3 km',
      amusementPark: 'Essel World: 12 km',
      gardens: '1 within 2 km',
      hospitals: '2 within 3 km',
    },
  },
  {
    id: '3',
    title: 'Spacious 4 BHK Villa',
    location: 'Vasai',
    price: '₹ 1.2 Cr',
    area: '1800 sq ft',
    bedrooms: 4,
    bathrooms: 3,
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    amenities: {
      schools: '6 within 2.5 km',
      colleges: '4 within 5 km',
      malls: '3 within 6 km',
      markets: 'Multiple nearby',
      railwayStation: '2 km',
      highways: 'NH-8: 3 km',
      beaches: 'Vasai Beach: 5 km',
      amusementPark: 'Essel World: 10 km',
      gardens: '3 within 4 km',
      hospitals: '4 within 5 km',
    },
  },
  {
    id: '4',
    title: 'Premium 2 BHK Apartment',
    location: 'Mumbai',
    price: '₹ 1.5 Cr',
    area: '1100 sq ft',
    bedrooms: 2,
    bathrooms: 2,
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    amenities: {
      schools: '8 within 1 km',
      colleges: '5 within 2 km',
      malls: '4 within 3 km',
      markets: 'Multiple nearby',
      railwayStation: '0.5 km',
      highways: 'WEH: 2 km',
      beaches: 'Juhu Beach: 8 km',
      amusementPark: 'Multiple options',
      gardens: '5 within 2 km',
      hospitals: '6 within 3 km',
    },
  },
  {
    id: '5',
    title: 'Elegant 3 BHK Flat',
    location: 'Nallasopara',
    price: '₹ 78 Lakhs',
    area: '1150 sq ft',
    bedrooms: 3,
    bathrooms: 2,
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    amenities: {
      schools: '5 within 2 km',
      colleges: '3 within 3 km',
      malls: '2 within 5 km',
      markets: 'Multiple nearby',
      railwayStation: '1.5 km',
      highways: 'NH-8: 2 km',
      beaches: 'Arnala Beach: 8 km',
      amusementPark: 'Essel World: 15 km',
      gardens: '2 within 3 km',
      hospitals: '3 within 4 km',
    },
  },
  {
    id: '6',
    title: 'Contemporary 2 BHK',
    location: 'Virar',
    price: '₹ 62 Lakhs',
    area: '900 sq ft',
    bedrooms: 2,
    bathrooms: 1,
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    amenities: {
      schools: '4 within 1.5 km',
      colleges: '2 within 4 km',
      malls: '1 within 3 km',
      markets: 'Local market: 0.5 km',
      railwayStation: '0.8 km',
      highways: 'NH-8: 1 km',
      beaches: 'Virar Beach: 3 km',
      amusementPark: 'Essel World: 12 km',
      gardens: '1 within 2 km',
      hospitals: '2 within 3 km',
    },
  },
];

const operatingAreaStyles: Record<
  string,
  { gradient: string; border: string; text: string }
> = {
  Virar: {
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-200 hover:border-blue-400',
    text: 'text-blue-900',
  },
  Nallasopara: {
    gradient: 'from-fuchsia-50 to-pink-100',
    border: 'border-fuchsia-200 hover:border-fuchsia-400',
    text: 'text-fuchsia-900',
  },
  Vasai: {
    gradient: 'from-emerald-50 to-teal-100',
    border: 'border-emerald-200 hover:border-emerald-400',
    text: 'text-emerald-900',
  },
  Mumbai: {
    gradient: 'from-amber-50 to-orange-100',
    border: 'border-amber-200 hover:border-amber-400',
    text: 'text-amber-900',
  },
};

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[80vh] md:h-screen" style={{ minHeight: '400px' }}>
        {/* Mobile Hero Image */}
        <Image
          src="/mobhero.png"
          alt="BlueRoof Realty Hero"
          fill
          className="object-cover md:hidden"
          priority
        />
        {/* Desktop Hero Image */}
        <Image
          src="/blueroofhero.jpeg"
          alt="BlueRoof Realty Hero"
          fill
          className="object-cover hidden md:block"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full py-16 md:py-0">
          <div className="text-center px-4 sm:px-6 max-w-4xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
              Welcome to BlueRoof Realty
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-white mb-2 drop-shadow-md font-medium px-2">
              Premium Properties in <span className="font-bold" style={{ color: '#2563eb' }}>Virar, Nallasopara, Vasai & Mumbai</span>
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-white mb-6 md:mb-8 drop-shadow-md font-medium px-2">
              Your Trusted Real Estate Partner
            </p>
            <HeroCtas />
          </div>
        </div>
      </div>
      
      {/* Properties Section */}
      <div className="container mx-auto px-4 py-16 bg-[#FCF8F8]">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600">
            Discover premium properties in Virar, Nallasopara, Vasai & Mumbai
          </p>
        </div>

        {/* Properties Grid - 1 per row on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-8 mb-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {/* View All Properties Button */}
        <div className="text-center">
          <Link
            href="/properties"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-lg"
          >
            View All Properties
          </Link>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make your real estate journey smooth, transparent, and trustworthy
          </p>
        </div>

        {/* Features Grid - Horizontal scroll on mobile, grid on desktop */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 max-w-7xl mx-auto">
          <div className="flex md:contents gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {/* Feature 1: Local Expertise */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg md:hover:shadow-xl transition-all duration-300 transform md:hover:-translate-y-2 flex-shrink-0 w-[80vw] md:w-auto">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-white"
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
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Local Expertise
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              Deep knowledge of the <span className="font-semibold text-blue-600">Virar–Vasai belt</span>, understanding local market trends and property values
            </p>
          </div>

          {/* Feature 2: Verified Properties */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg md:hover:shadow-xl transition-all duration-300 transform md:hover:-translate-y-2 flex-shrink-0 w-[80vw] md:w-auto">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Verified Properties
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              All properties are thoroughly verified for legal compliance, documentation, and authenticity
            </p>
          </div>

          {/* Feature 3: Transparent Pricing */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-lg md:hover:shadow-xl transition-all duration-300 transform md:hover:-translate-y-2 flex-shrink-0 w-[80vw] md:w-auto">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Transparent Pricing
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              <span className="font-semibold text-purple-600">Clear pricing</span> with no hidden costs. Complete documentation and legal clarity
            </p>
          </div>

          {/* Feature 4: End-to-End Support */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl shadow-lg md:hover:shadow-xl transition-all duration-300 transform md:hover:-translate-y-2 flex-shrink-0 w-[80vw] md:w-auto">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              End-to-End Support
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              Complete assistance from <span className="font-semibold text-orange-600">site visit to possession</span>. We're with you every step of the way
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="container mx-auto px-4 py-16 bg-[#FCF8F8]">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive real estate solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid - Horizontal scroll on mobile, grid on desktop */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 max-w-7xl mx-auto">
          <div className="flex md:contents gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {/* Service 1: Property Buying Assistance */}
          <div className="bg-white p-6 rounded-2xl shadow-lg md:hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-1 text-center flex-shrink-0 w-[80vw] md:w-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
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
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Property Buying Assistance
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Expert guidance through the entire buying process. From property search to final possession, we ensure you find your dream home with complete peace of mind.
            </p>
          </div>

          {/* Service 2: Property Selling Support */}
          <div className="bg-white p-6 rounded-2xl shadow-lg md:hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-1 text-center flex-shrink-0 w-[80vw] md:w-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Property Selling Support
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Maximize your property's value with professional marketing, pricing strategies, and negotiation support. We help you get the best deal for your property.
            </p>
          </div>

          {/* Service 3: Investment Consulting */}
          <div className="bg-white p-6 rounded-2xl shadow-lg md:hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-1 text-center flex-shrink-0 w-[80vw] md:w-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Investment Consulting
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Strategic investment advice to help you build wealth through real estate. Market analysis, ROI projections, and portfolio diversification guidance.
            </p>
          </div>

          {/* Service 4: Home Loan Assistance */}
          <div className="bg-white p-6 rounded-2xl shadow-lg md:hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-1 text-center flex-shrink-0 w-[80vw] md:w-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Home Loan Assistance
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Expert guidance on home loan options, documentation, and approval processes. We connect you with trusted lenders and help you secure the best rates.
            </p>
          </div>

          {/* Service 5: Legal & Documentation Support */}
          <div className="bg-white p-6 rounded-2xl shadow-lg md:hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-1 text-center flex-shrink-0 w-[80vw] md:w-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Legal & Documentation Support
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Complete legal support for all property transactions. Title verification, due diligence, agreement drafting, and registration assistance.
            </p>
          </div>

          {/* Service 6: Property Valuation & Inspection */}
          <div className="bg-white p-6 rounded-2xl shadow-lg md:hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-1 text-center flex-shrink-0 w-[80vw] md:w-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Property Valuation & Inspection
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Professional property valuation and thorough inspection services. Accurate market assessment and detailed property condition reports for informed decisions.
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from satisfied customers who found their dream properties with us
          </p>
        </div>

        {/* Testimonials Carousel */}
        <TestimonialCarousel
          testimonials={[
            {
              image: '/test1.jpeg',
              name: 'Rajesh Kumar',
              role: 'Property Buyer, Nallasopara',
              testimonial:
                "BlueRoof Realty made our home buying journey so smooth! Their local expertise in Nallasopara helped us find the perfect 3 BHK apartment. The team was professional, transparent, and always available. Highly recommended!",
            },
            {
              image: '/test2.jpeg',
              name: 'Priya Sharma',
              role: 'Property Seller, Virar',
              testimonial:
                'Excellent service from start to finish! They helped me sell my property in Virar at the best price. The legal documentation support was outstanding, and I felt completely secure throughout the process.',
            },
            {
              image: '/test3.jpeg',
              name: 'Amit Patel',
              role: 'Investor, Mumbai',
              testimonial:
                "As a real estate investor, I rely on BlueRoof Realty for their investment consulting. Their market insights and property valuation services have been invaluable. They truly understand the Virar-Vasai market!",
            },
          ]}
          autoSlideInterval={5000}
        />
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Looking to buy a property in Virar, Nallasopara, Vasai, or Mumbai?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg shadow-lg min-w-[200px]"
            >
              Book a Site Visit
            </a>
            <a
              href="/contact"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-400 transition-colors duration-200 font-semibold text-lg shadow-lg border-2 border-white min-w-[200px]"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </div>

      {/* Contact & Enquiry Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact & Enquiry
            </h2>
            <p className="text-lg text-gray-600">
              Get in touch with us for property enquiries, site visits, and expert consultation
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                  
                  {/* Phone */}
                  <div className="mb-6">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-4 p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <p className="text-lg font-semibold text-gray-900">+91 98765 43210</p>
                      </div>
                    </a>
                  </div>

                  {/* WhatsApp */}
                  <div className="mb-6">
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
                        <p className="text-lg font-semibold text-gray-900">Chat with us</p>
                      </div>
                    </a>
                  </div>

                  {/* Office Location */}
                  <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Office Location</p>
                        <p className="font-semibold text-gray-900 mb-1">BlueRoof Realty</p>
                        <p className="text-gray-600 text-sm mb-1">123 Main Street, Virar</p>
                        <p className="text-gray-600 text-sm mb-3">Mumbai, Maharashtra 401303</p>
                        <p className="text-gray-600 text-sm">Mon - Sat: 10:00 AM - 7:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operating Areas */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Operating Areas</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Virar', 'Nallasopara', 'Vasai', 'Mumbai'].map((area) => (
                      (() => {
                        const styles = operatingAreaStyles[area] ?? {
                          gradient: 'from-gray-50 to-gray-100',
                          border: 'border-gray-200 hover:border-gray-300',
                          text: 'text-gray-900',
                        };
                        return (
                      <div
                        key={area}
                        className={`p-4 rounded-lg border text-center transition-all bg-gradient-to-br ${styles.gradient} ${styles.border} hover:shadow-md`}
                      >
                        <p className={`font-semibold ${styles.text}`}>{area}</p>
                      </div>
                        );
                      })()
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Enquiry Form */}
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg border border-blue-200/60">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send Us an Enquiry</h3>
                <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you within 24 hours</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

