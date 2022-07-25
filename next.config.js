/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['deno.land', 'i.ibb.co'],
  },
};

module.exports = nextConfig;
