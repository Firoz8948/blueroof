/**
 * Header Component
 * Navigation bar for public pages
 * Includes logo, navigation links, and CTA button
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useInquiryModal } from '@/components/modals/InquiryModalProvider';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openExpert } = useInquiryModal();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { href: '/properties', label: 'Properties', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )},
    { href: '/about', label: 'About Us', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { href: '/contact', label: 'Contact', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )},
  ];

  return (
    <>
      {/* Mobile sidebar animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
        @keyframes fadeInOverlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOutOverlay {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes slideUpItem {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleInCta {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes drawLine {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes shimmerBg {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .sidebar-enter {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .sidebar-closing {
          animation: slideOutRight 0.3s cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }
        .overlay-enter {
          animation: fadeInOverlay 0.3s ease forwards;
        }
        .overlay-closing {
          animation: fadeOutOverlay 0.3s ease forwards;
        }
        .nav-item-enter {
          opacity: 0;
          animation: slideUpItem 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .cta-enter {
          opacity: 0;
          animation: scaleInCta 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .divider-draw {
          animation: drawLine 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .sidebar-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmerBg 4s ease-in-out infinite;
        }
      `}} />

      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-none shadow-none">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:min-h-[7rem] md:py-2">
            {/* Logo - larger on mobile, slightly left and down */}
            <Link href="/" className="flex items-center -ml-4 mt-3 md:ml-0 md:mt-0">
              <Image
                src="/logo.png"
                alt="BlueRoof Realty"
                width={340}
                height={92}
                className="h-24 w-auto md:h-28 object-contain drop-shadow-lg"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-blue-300 transition-colors duration-200 font-medium drop-shadow-lg"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => openExpert()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg"
                suppressHydrationWarning
              >
                Get a Call
              </button>
            </nav>

            {/* Mobile Menu Button (hamburger) */}
            <button
              type="button"
              className="md:hidden flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white rounded-full my-1.5 transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ==================== MOBILE SIDEBAR ==================== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] overlay-enter"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="absolute top-0 right-0 h-full w-[78%] max-w-[320px] bg-white shadow-2xl sidebar-enter flex flex-col">

            {/* Top section with blue accent */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 px-6 pt-14 pb-8 overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />
              <div className="absolute top-8 right-16 w-3 h-3 rounded-full bg-blue-400/30" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors duration-200"
                aria-label="Close menu"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Logo in sidebar */}
              <div
                className="nav-item-enter"
                style={{ animationDelay: '0.1s' }}
              >
                <Image
                  src="/logo.png"
                  alt="BlueRoof Realty"
                  width={180}
                  height={48}
                  className="h-14 w-auto object-contain brightness-0 invert drop-shadow-lg"
                />
                <p className="mt-2 text-blue-200 text-xs font-medium tracking-wide">
                  Your Dream Home Awaits
                </p>
              </div>
            </div>

            {/* Animated divider line */}
            <div className="px-6">
              <div className="h-px bg-gradient-to-r from-blue-500 via-blue-300 to-transparent divider-draw" />
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto sidebar-shimmer">
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-item-enter group flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 active:scale-[0.98]"
                    style={{ animationDelay: `${0.15 + index * 0.07}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {/* Icon container */}
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all duration-200 group-hover:shadow-md group-hover:shadow-blue-100">
                      {link.icon}
                    </span>

                    {/* Label */}
                    <span className="text-[15px] font-semibold tracking-tight">
                      {link.label}
                    </span>

                    {/* Arrow */}
                    <svg className="w-4 h-4 ml-auto text-gray-300 group-hover:text-blue-400 transition-all duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Bottom CTA section */}
            <div className="px-5 pb-6 pt-2">
              {/* Divider */}
              <div className="h-px bg-gray-100 mb-5" />

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  openExpert();
                }}
                className="cta-enter w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3.5 rounded-xl font-semibold text-sm tracking-wide shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 active:scale-[0.98] transition-all duration-200"
                style={{ animationDelay: '0.5s' }}
                suppressHydrationWarning
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Get a Call Back
              </button>

              {/* WhatsApp quick link */}
              <a
                href="https://wa.me/919503009738?text=Hey%2C%20I%20am%20interested%20in%20your%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="cta-enter mt-3 w-full flex items-center justify-center gap-2.5 bg-green-50 text-green-700 border border-green-200 px-5 py-3 rounded-xl font-semibold text-sm hover:bg-green-100 active:scale-[0.98] transition-all duration-200"
                style={{ animationDelay: '0.6s' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>

              {/* Footer text */}
              <p
                className="cta-enter text-center text-[11px] text-gray-400 mt-4 font-medium"
                style={{ animationDelay: '0.7s' }}
              >
                © 2025 BlueRoof Realty. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}