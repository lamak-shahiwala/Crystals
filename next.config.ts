// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: [
      'pino', 
      'thread-stream', 
      '@reown/appkit', 
      '@reown/appkit-utils' 
    ],
  },
  transpilePackages: ['@privy-io/react-auth'], 
};

export default nextConfig;