require('dotenv').config({ path: '../../.env' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'edge',
    serverComponents: true,
  },
  env: { DATABASE_URL: process.env.DATABASE_URL },
}

module.exports = nextConfig
