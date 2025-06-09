import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/RasamDemo',
  assetPrefix: '/RasamDemo/',
  // Customize the Webpack configuration to handle SVG files
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,  // Target files with .svg extension
      use: ['@svgr/webpack'],  // Use the SVGR webpack loader to import SVGs as React components
    });
    return config;  // Return the modified webpack config
  },
};

export default nextConfig;
