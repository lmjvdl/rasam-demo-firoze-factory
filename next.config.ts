import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Customize the Webpack configuration to handle SVG files
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,  // Target files with .svg extension
      use: ['@svgr/webpack'],  // Use the SVGR webpack loader to import SVGs as React components
    });
    return config;  // Return the modified webpack config
  },

  // Define HTTP headers for different routes
  async headers() {
    return [
      {
        source: '/(.*)',  // Apply the headers to all routes
        headers: [
          {
            key: 'X-Content-Type-Options',  // Prevent browsers from interpreting files as a different MIME type
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',  // Prevent the page from being embedded in an iframe
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',  // Control the referrer information sent with requests
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
