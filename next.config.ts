import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.transparenttextures.com",
      },
      {
        protocol: "https",
        hostname: "sternbergclinic.com.au",
      },
    ],
  },
};

export default nextConfig;
