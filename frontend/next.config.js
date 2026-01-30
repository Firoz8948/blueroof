/**
 * Next.js Configuration
 * Static export for S3 + CloudFront hosting
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate static HTML files for each page
  output: 'export',

  // Add trailing slash to URLs (e.g., /about/ instead of /about)
  // Better compatibility with S3 static hosting
  trailingSlash: true,

  // Disable server-side image optimization (not available in static export)
  images: {
    unoptimized: true,
  },

  // Ensure TypeScript paths are resolved correctly
  transpilePackages: [],
};

module.exports = nextConfig;

