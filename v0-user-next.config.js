/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    outputFileTracingExcludes: {
      "/api/**/*": ["**/*.+(js|ts|tsx)"],
    },
  },
}

module.exports = nextConfig

