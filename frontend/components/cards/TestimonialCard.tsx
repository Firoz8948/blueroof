/**
 * Testimonial Card Component
 * Displays client testimonial with image, name, and testimonial text
 */

import Image from 'next/image';

interface TestimonialCardProps {
  image: string;
  name: string;
  role: string;
  testimonial: string;
  rating?: number;
}

export default function TestimonialCard({
  image,
  name,
  role,
  testimonial,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg md:hover:shadow-xl transition-all duration-300 transform md:hover:-translate-y-2 overflow-hidden">
      {/* Top Container - Image Only */}
      <div className="w-full h-64 relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Bottom Container - Content */}
      <div className="p-6 text-center">
        {/* Client Name */}
        <h4 className="font-bold text-gray-900 text-xl mb-1">{name}</h4>
        <p className="text-gray-600 text-sm mb-4">{role}</p>

        {/* Rating Stars */}
        <div className="flex justify-center mb-4">
          {[...Array(rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Testimonial Content */}
        <p className="text-gray-700 leading-relaxed italic">
          "{testimonial}"
        </p>
      </div>
    </div>
  );
}

