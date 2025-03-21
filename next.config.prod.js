/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/oupener_gen',
  assetPrefix: '/oupener_gen/',
  trailingSlash: true,
};

module.exports = nextConfig; 