/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/cms',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.stoneoven.in' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
}

module.exports = nextConfig
