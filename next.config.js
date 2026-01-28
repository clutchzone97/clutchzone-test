/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  output: 'standalone',
  images: {
    domains: ['res.cloudinary.com', 'picsum.photos', 'images.unsplash.com', 'via.placeholder.com'],
  },
};

module.exports = nextConfig;
