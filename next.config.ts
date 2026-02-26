import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
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
      }
    ];
  },
};

export default nextConfig;
