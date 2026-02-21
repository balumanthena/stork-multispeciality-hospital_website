import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/departments',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/departments/:slug',
        destination: '/services/:slug',
        permanent: true,
      },
      {
        source: '/treatments',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/treatments/:slug',
        destination: '/services', // Fallback for unmatched nested routes
        permanent: false,
      }
    ];
  },
};

export default nextConfig;
