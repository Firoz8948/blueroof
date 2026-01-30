/**
 * Contact Us Page
 * Contact information and enquiry form
 */

import Image from 'next/image';
import ContactForm from '@/components/forms/ContactForm';

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

export default function ContactPage() {
  return (
    <div className="relative">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[80vh] md:h-screen" style={{ minHeight: '400px' }}>
        {/* Mobile Hero Image */}
        <Image
          src="/mobhero.png"
          alt="Contact Us"
          fill
          className="object-cover md:hidden"
          priority
        />
        {/* Desktop Hero Image */}
        <Image
          src="/blueroofhero.jpeg"
          alt="Contact Us"
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
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-white mb-2 drop-shadow-md font-medium px-2">
              Contact Us for Properties in <span className="font-bold" style={{ color: '#2563eb' }}>Virar, Nallasopara, Vasai & Mumbai</span>
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-white mb-6 md:mb-8 drop-shadow-md font-medium px-2">
              We're Here to Help You Find Your Dream Property
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
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
