/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeDetection: false,
  },
  reactStrictMode: true,
  output: 'standalone',
}

module.exports = nextConfig
