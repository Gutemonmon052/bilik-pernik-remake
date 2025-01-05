import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "x8ki-letl-twmt.n7.xano.io",
      },
    ],
  },
};

export default nextConfig;

