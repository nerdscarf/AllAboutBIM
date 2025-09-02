import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 👈 Required for static export

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'mainfacts.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
