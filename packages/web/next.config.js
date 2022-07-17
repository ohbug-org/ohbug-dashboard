/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'experimental-edge',
    serverComponents: true,
  },
}

module.exports = nextConfig
