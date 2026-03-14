/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Required for Clerk
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
