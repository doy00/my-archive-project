import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 외부 이미지 도메인 허용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',  // [ ] hostname 설정
      },
    ],
    // 이미지 크기 설정
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 이미지 포맷
    formats: ['image/avif', 'image/webp'],
    // [ ] 최소 캐시 시간 (초)
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
