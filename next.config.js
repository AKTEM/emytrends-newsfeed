/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['emytrends.com', 'cms.emytrends.com', 'www.emytrends.com', 'images.pexels.com', 'mapleepoch.com', 'api.mapleepoch.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'emytrends.com',
      },
      {
        protocol: 'https',
        hostname: 'cms.emytrends.com',
      },
      {
        protocol: 'https',
        hostname: 'www.emytrends.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'mapleepoch.com',
      },
      {
        protocol: 'https',
        hostname: 'api.mapleepoch.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  trailingSlash: true,
  experimental: {
    forceSwcTransforms: true,
  },
  async redirects() {
    return [
      {
        source: '/news/:slug',
        destination: '/article/:slug',
        permanent: true,
      },
    ];
  },
  // Add API route configuration
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  // Disable static optimization for dynamic content
  output: 'standalone',
  // Ensure all dynamic routes are handled properly
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // Add error handling for build process
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Optimize for deployment
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false,
  // Disable static page generation for dynamic content
  generateStaticParams: false,
};

module.exports = nextConfig;