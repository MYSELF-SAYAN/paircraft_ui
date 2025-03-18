/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
      },
      experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
