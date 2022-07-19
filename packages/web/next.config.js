/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'experimental-edge',
    serverComponents: true,
  },
  output: 'standalone',
}

module.exports = nextConfig
