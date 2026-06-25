/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/partner',
        destination: '/partners',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
