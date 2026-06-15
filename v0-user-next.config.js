/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Prevents server-side modules from causing issues
    return config;
  },
}

module.exports = nextConfig


