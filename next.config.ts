import type { NextConfig } from "next"

const { version } = require("./package.json");

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    version,
  },
};

export default nextConfig;
