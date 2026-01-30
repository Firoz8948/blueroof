/**
 * About Us Page
 * Information about BlueRoof Realty
 */

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[80vh] md:h-screen" style={{ minHeight: '400px' }}>
        {/* Mobile Hero Image */}
        <Image
          src="/mobhero.png"
          alt="About Us"
          fill
          className="object-cover md:hidden"
          priority
        />
        {/* Desktop Hero Image */}
        <Image
          src="/blueroofhero.jpeg"
          alt="About Us"
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
              About BlueRoof Realty
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-white mb-2 drop-shadow-md font-medium px-2">
              Your Trusted Real Estate Partner in <span className="font-bold" style={{ color: '#2563eb' }}>Virar, Nallasopara, Vasai & Mumbai</span>
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-white mb-6 md:mb-8 drop-shadow-md font-medium px-2">
              Building Dreams, One Property at a Time
            </p>
          </div>
        </div>
      </div>

      {/* About Content Section */}
      <div className="container mx-auto px-4 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              BlueRoof Realty is a leading real estate consultancy firm specializing in the Virar–Vasai belt, 
              with extensive expertise in Nallasopara, Vasai, and Mumbai. We have been serving clients with 
              integrity, transparency, and professionalism for years, helping them find their dream properties 
              and make informed real estate decisions.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-12">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our mission is to simplify the real estate journey for our clients by providing expert guidance, 
              verified properties, and transparent processes. We believe that buying or selling a property should 
              be a smooth, stress-free experience, and we're committed to making that happen.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Local Expertise</h3>
                <p className="text-gray-700">
                  Deep knowledge of the Virar–Vasai belt, understanding local market trends, property values, 
                  and neighborhood insights.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Properties</h3>
                <p className="text-gray-700">
                  All properties are thoroughly verified for legal compliance, documentation, and authenticity 
                  before listing.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent Pricing</h3>
                <p className="text-gray-700">
                  Clear pricing with no hidden costs. Complete documentation and legal clarity throughout 
                  the process.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">End-to-End Support</h3>
                <p className="text-gray-700">
                  Complete assistance from site visit to possession. We're with you every step of the way.
                </p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-12">
              Our Commitment
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At BlueRoof Realty, we are committed to providing exceptional service and building long-term 
              relationships with our clients. We understand that real estate is not just about properties—it's 
              about people, dreams, and futures. That's why we go the extra mile to ensure your satisfaction 
              and success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
