import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // NOTE: You mentioned an error about 'serverExternalPackages'.
  // Ensure you remove or update any deprecated keys in your 'experimental' object.
  experimental: {
    // If the fix below doesn't work, you might try disabling Turbopack explicitly:
    // turbopack: false, 
  },

  webpack: (config, { isServer }) => {
    
    // --- STRATEGY 1: Ignore Non-JS Files in node_modules ---
    // This addresses errors where files like LICENSE, .ts, .md, .zip are being 
    // incorrectly parsed as JavaScript modules by the bundler.
    
    config.module.rules.push({
      // We use a general regex to catch the common non-code files found in test directories 
      // or distribution folders that Next.js might incorrectly try to process.
      test: [
        /\.md$/,
        /\.zip$/,
        /\.sh$/,
        /\.yml$/,
        // Specifically targeting the files causing errors (e.g., test TS files and LICENSE)
        /node_modules\/.*thread-stream\/.*(LICENSE|\.ts)$/
      ],
      // Use ignore-loader to tell Webpack/Turbopack to skip these files entirely
      loader: 'ignore-loader',
    });


    // --- STRATEGY 2: Externals for Server-Side Modules (Crucial for Node.js libs like thread-stream/pino) ---
    // Since thread-stream and pino are Node.js-specific for logging/threading, they 
    // must be treated as external modules when building the server bundle.
    if (isServer) {
      config.externals = [
        ...(config.externals || []), // Keep existing externals
        // Explicitly exclude Node.js specific libraries that are causing issues
        'thread-stream',
        'pino',
        // Excluding the parent packages might also help prevent deep imports from failing
        '@reown/appkit', 
        '@reown/appkit-controllers', 
        '@reown/appkit-utils'
      ];
    }

    return config;
  },
};

export default nextConfig;