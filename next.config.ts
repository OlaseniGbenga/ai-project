import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    domains: [],
  },
};

export default nextConfig;