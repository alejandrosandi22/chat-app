/** @type {import('next').NextConfig} */

const domains = [
  'deno.land',
  'i.ibb.co',
  'deno.com',
  'velociraptor.run',
  'images.unsplash.com',
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains,
  },
};

module.exports = nextConfig;
