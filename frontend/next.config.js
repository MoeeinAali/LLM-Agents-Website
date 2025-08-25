/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['llm-sharif.com', '127.0.0.1:3000'],
    },
  },
};

module.exports = nextConfig;
