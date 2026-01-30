/**
 * Properties Page
 * Display all available properties
 */

import Image from 'next/image';
import PropertyCard from '@/components/cards/PropertyCard';

// Mock properties data (replace with API data later)
const allProperties = [
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
  {
    id: '7',
    title: 'Luxury 3 BHK Penthouse',
    location: 'Vasai',
    price: '₹ 95 Lakhs',
    area: '1400 sq ft',
    bedrooms: 3,
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
    id: '8',
    title: 'Premium 4 BHK Apartment',
    location: 'Mumbai',
    price: '₹ 1.8 Cr',
    area: '2000 sq ft',
    bedrooms: 4,
    bathrooms: 4,
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
    id: '9',
    title: 'Modern 3 BHK Apartment',
    location: 'Nallasopara',
    price: '₹ 82 Lakhs',
    area: '1250 sq ft',
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
    id: '10',
    title: 'Spacious 2 BHK Flat',
    location: 'Virar',
    price: '₹ 68 Lakhs',
    area: '1000 sq ft',
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
    id: '11',
    title: 'Luxury 5 BHK Villa',
    location: 'Vasai',
    price: '₹ 1.5 Cr',
    area: '2200 sq ft',
    bedrooms: 5,
    bathrooms: 4,
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
    id: '12',
    title: 'Premium 3 BHK Apartment',
    location: 'Mumbai',
    price: '₹ 1.6 Cr',
    area: '1300 sq ft',
    bedrooms: 3,
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
    id: '13',
    title: 'Elegant 2 BHK Flat',
    location: 'Nallasopara',
    price: '₹ 72 Lakhs',
    area: '1050 sq ft',
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
    id: '14',
    title: 'Modern 4 BHK Apartment',
    location: 'Virar',
    price: '₹ 1.1 Cr',
    area: '1700 sq ft',
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
    id: '15',
    title: 'Luxury 3 BHK Villa',
    location: 'Vasai',
    price: '₹ 1.3 Cr',
    area: '1900 sq ft',
    bedrooms: 3,
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
];

export default function PropertiesPage() {
  return (
    <div className="relative">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[80vh] md:h-screen" style={{ minHeight: '400px' }}>
        {/* Mobile Hero Image */}
        <Image
          src="/mobhero.png"
          alt="Properties"
          fill
          className="object-cover md:hidden"
          priority
        />
        {/* Desktop Hero Image */}
        <Image
          src="/blueroofhero.jpeg"
          alt="Properties"
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
              Explore Our Properties
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-white mb-2 drop-shadow-md font-medium px-2">
              Premium Properties in <span className="font-bold" style={{ color: '#2563eb' }}>Virar, Nallasopara, Vasai & Mumbai</span>
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-white mb-6 md:mb-8 drop-shadow-md font-medium px-2">
              Find Your Dream Home Today
            </p>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="container mx-auto px-4 py-16 bg-[#FCF8F8]">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Properties
          </h2>
          <p className="text-xl text-gray-600">
            Browse through our extensive collection of premium properties
          </p>
        </div>

        {/* Properties Grid - 1 per row on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
          {allProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
}
