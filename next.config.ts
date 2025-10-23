import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_ASSETS_HOST}/**`)] },
};

export default nextConfig;
