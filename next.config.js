const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  //allowedDevOrigins: ["10.51.91.254", "localhost"],
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
