/** @type {import('next').NextConfig} */

const inDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  // Set assetPrefix to our public URL
  // Checking for inDevelopment as '/' breaks Hot Module Reloading if used during development
  // https://github.com/vercel/next.js/issues/51162#issuecomment-2296134274
  assetPrefix: inDevelopment ? undefined : '/',
};

export default nextConfig;
