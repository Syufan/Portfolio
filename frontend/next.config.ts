import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/((?!visual-search).*)",
        destination: `${process.env.API_URL || "http://backend:8080"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
