/** @type {import('next').NextConfig} */

const domains = [
  'deno.land',
  'i.ibb.co',
  'deno.com',
  'velociraptor.run',
  'images.unsplash.com',
  'firebasestorage.googleapis.com',
];

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/signin',
        destination: '/chat',
        permanent: false,
      },
    ];
  },
  strictMode: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains,
  },
};

module.exports = nextConfig;
