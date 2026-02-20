/**
 * Properties Page
 * Display all available properties
 */

import Image from 'next/image';
import type { Metadata } from 'next';
import PropertyCard from '@/components/cards/PropertyCard';

export const metadata: Metadata = {
  title:
    'Properties in Virar, Vasai, Nallasopara, Naigaon, Mumbai',
  description:
    'Browse verified properties in Virar, Vasai, Nallasopara, Naigaon, and Mumbai with BlueRoof Realty. Compare options, prices, amenities, and book site visits.',
  alternates: {
    canonical: '/properties/',
  },
};

// Mock properties data (replace with API data later)
const allProperties = [
  {
    id: '1',
    title: 'Premium 1 BHK and 2 BHK',
    location: 'Naigaon',
    price: '₹ 31.4 Lakhs',
    area: 'Multiple options',
    bedroomOptions: '1 BHK, 2 BHK',
    images: [
      '/f1.png',
      '/f2.png',
      '/f3.png',
      '/f4.png',
      '/f5.png',
    ],
    connectivity: [
      'Bhayandar Naigaon Sea Link',
      'Naigaon Station 5 mins',
      'Juchandra Station 5 mins walking',
      'From Borivali via Western Express Highway, 20 mins',
      'Metro 2A, 7 & Proposed 10',
    ],
    internalAmenities: [
      'Yoga lawn',
      'Swimming pool',
      'Multipurpose hall',
      'Kids pool',
      'Cricket ground',
      'Forest seating',
      'Pool table',
      '50+ more amenities',
      'Contact for more details',
    ],
  },
  {
    id: '2',
    title: 'Luxury 3, 4, 5 BHK',
    location: 'Virar West',
    price: '₹ 1.23 Cr',
    area: 'Multiple Options Available',
    bedroomOptions: '3 BHK, 4 BHK, 5 BHK',
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    connectivity: [
      'Virar Station - 01 Mins',
      'Bus depo - 01 Mins',
      'Virar - Safale Ferry - 8 Min',
      'Ameya club - 4 Mins',
      'Old Viva college - 4 Mins',
    ],
    internalAmenities: [
      'Roof top luxury Garden',
      'G+ 10 STORES TOWER',
      'Commercial G+ 2 Floor',
    ],
  },
  {
    id: '3',
    title: 'Parikh Group (Modern 1 & 2 BHK)',
    location: 'Virar',
    price: '₹ 44 Lacs',
    area: '460+ Sq. Ft, 700+ Sq. Ft',
    bedroomOptions: '1 BHK, 2 BHK',
    tag: 'PRE-LAUNCH Project',
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    connectivity: [
      'Virar Station - 8 mins to the station',
      'Ferry - 10 mins',
      'Hospitals/Schools - 10 mins',
    ],
    internalAmenities: [
      'G+2 Commercial Hub',
      '20ft Grand Double-Height Lobby',
      'Fitness Center',
      'Yoga Room',
      'Pickleball Court',
      'Live Chess',
    ],
  },
  {
    id: '4',
    title: 'Luxurious Property',
    location: 'Vasai West',
    price: '₹ 84.33 Lacs',
    area: 'Multiple options available in area sq ft',
    bedroomOptions: '2BHK, 3BHK, 4BHK, 5BHK',
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    connectivity: [
      'Vasai Station - 14 Mins',
      'Naigaon Station - 12 Mins',
      'Vasai - Bhyander Ferry - 5 Mins',
      'Suruchi Beach - 5 Mins',
    ],
    amenities: {
      markets: 'Cafes',
      malls: '4 Malls and Dmart',
      colleges: 'Colleges and School',
      hospitals: 'Hospitals',
    },
  },
  {
    id: '5',
    title: 'Elegant 1BHK & 2BHK',
    location: 'Virar',
    price: '₹ 28.99 Lacs',
    area: 'Multiple options',
    bedroomOptions: '1 BHK, 2 BHK',
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    connectivity: [
      'Virar Station - 5 Mins',
      'Ferry - 10 Mins',
      'Colleges and Hospitals',
    ],
    internalAmenities: [
      'Club House',
      'Swimming Pool',
      'Indoor Gaming Zone',
      "Kids' Play Area",
      'Gymnasium',
    ],
  },
  {
    id: '6',
    title: 'Modern 1BHK, 2BHK, 3BHK',
    location: 'Naigaon',
    price: '₹ 48.91 Lacs',
    area: '485+ sq ft',
    bedroomOptions: '1 BHK, 2 BHK, 3 BHK',
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    connectivity: [
      'Naigaon Station',
      'Easy Highway access',
    ],
    internalAmenities: [
      'Swimming Pool',
      'Gym',
      'Spa',
      'Yoga Zone',
      'Jogging Track',
      'Amphitheatre',
      'Clubhouse',
      'EV Charging',
      '50+ Amenities',
    ],
  },
  {
    id: '7',
    title: 'Spacious 2BHK and 3BHK',
    location: 'Vasai West',
    price: '₹ 86.71 Lacs',
    area: '698 – 1076 sq.ft',
    bedroomOptions: '2 BHK, 3 BHK',
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    connectivity: [
      'Vasai Station - 10 Mins',
      'Hospitals & Colleges',
    ],
    internalAmenities: [
      'Gym',
      'Yoga & Meditation Zone',
      'Porch Swing',
      'Walkway',
      'Barbeque Zone',
      'Star Gazing Point & Hangout Deck',
      '35+ more amenities',
    ],
  },
  {
    id: '8',
    title: 'Premium 2, 3, 4 BHK',
    location: 'Nallasopara (W)',
    price: '₹ 86.02 Lacs',
    area: 'Multiple options',
    bedroomOptions: '2 BHK, 3 BHK, 4 BHK',
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    connectivity: [
      'Nallasopara Station - 8 Mins',
      'Colleges & School',
      'Highway - 15 Mins',
    ],
    internalAmenities: [
      'Yoga Lawn',
      'Fitness Track',
      'Amphitheatre',
      'Kids Play Area',
      'Rooftop Temple',
      'BBQ Deck',
      'Games Room',
      'Business Lounge',
      '25+ Amenities',
    ],
  },
  {
    id: '10',
    title: 'High Luxurious 1, 2, 3 BHK',
    location: 'Virar (W)',
    price: '₹ 48.07 Lacs',
    area: '487 sq ft',
    bedroomOptions: '1 BHK, 2 BHK, 3 BHK',
    images: [
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
      '/brr4.png',
      '/brr1.png',
      '/brr2.png',
      '/brr3.png',
    ],
    connectivity: [
      'Beaches',
      'Virar Station - 7 Mins',
      'Main Road',
    ],
    internalAmenities: [
      'Sun Deck with Sea View',
      'Jivdani Mandir View',
      'Ample Parking',
      'Gated Community',
      '30+ more amenities',
    ],
  },
  {
    id: '11',
    title: 'Luxury 5 BHK Villa',
    location: 'Vasai',
    price: '₹ 1.5 Cr',
    area: '2200 sq ft',
    bedrooms: 5,
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
      <div className="container mx-auto px-4 py-16 bg-[#FCF8F8] max-w-[1380px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Properties
          </h2>
          <p className="text-xl text-gray-600">
            Browse through our extensive collection of premium properties
          </p>
        </div>

        {/* Properties - 1 card per row on all breakpoints */}
        <div className="grid grid-cols-1 gap-4 md:gap-20">
          {allProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
}
