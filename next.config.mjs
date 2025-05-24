/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://essential-breeze-a4db0bb3c5.strapiapp.com/'], // ✅ allow Strapi-hosted images
  },
  env: {
    // Optional: only needed if you want envs to be embedded at build time
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  },
};

export default nextConfig;
