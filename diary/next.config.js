/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
  },
};

module.exports = nextConfig;

// https:// nextjs.org/docs/pages/api-reference/next-config-js/images
module.exports = {
  images: {
    loader: 'akamai',
    path: '/',
  },
};
