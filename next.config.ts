import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 960, 1600],
    imageSizes: [160, 320],
  },
  devIndicators: false,
};
export default config;
