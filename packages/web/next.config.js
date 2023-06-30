/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = {
      'node:fs': false,
      'node:path': false,
    }
    return config
  },
}

module.exports = nextConfig
