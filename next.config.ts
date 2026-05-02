import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const apiHostname = new URL(API_URL).hostname;
const apiProtocol = new URL(API_URL).protocol.replace(":", "") as
  | "http"
  | "https";
const apiPort = new URL(API_URL).port || undefined;

const nextConfig: NextConfig = {
  images: {
    // BE에서 호스팅하는 카탈로그/광고 이미지를 next/image로 표시 가능하게
    remotePatterns: [
      {
        protocol: apiProtocol,
        hostname: apiHostname,
        ...(apiPort ? { port: apiPort } : {}),
        pathname: "/uploads/**",
      },
    ],
  },
  // 카탈로그 외 정적 이미지(/uploads/products|ads|intermediate)는 인증 필요라
  // <img>로 직접 못 띄움 → useAuthenticatedImage 훅으로 blob URL 변환해서 사용
  async rewrites() {
    return [
      {
        source: "/uploads/catalog/:path*",
        destination: `${API_URL}/uploads/catalog/:path*`,
      },
    ];
  },
};

export default nextConfig;
