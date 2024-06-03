/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io'], // Add the domain of your IPFS gateway here
  },
};

export default nextConfig;
