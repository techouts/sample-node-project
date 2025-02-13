import { createRequire } from "node:module";
import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
const require = createRequire(import.meta.url);

const intercept = require("intercept-stdout");
const cacheHandler = require.resolve("./cache-handler.js");

const isProdEnv = process.env.NODE_ENV === "production";

function interceptStdout(text) {
  if (text.includes("Duplicate atom key")) {
    return "";
  }
  return text;
}

intercept(interceptStdout);

function removeConsole() {
  if (isProdEnv) {
    return {
      exclude: ["error"],
    };
  }

  return false;
}

/**
 * @type {import('next').NextConfig}
 */
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const config = withPlugins([[bundleAnalyzer]], {
  async headers() {
    return [
      {
        source: "/api/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    config.resolve.fallback = { async_hooks: false, dgram: false };
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  compiler: {
    removeConsole: removeConsole(),
  },
  experimental: {
    nextScriptWorkers: false,
    swcMinify: true,
    serverMinification: true,
    isrMemoryCacheSize: 0,
    incrementalCacheHandlerPath: cacheHandler,
    webpackBuildWorker: true,
    workerThreads: true,
    optimisticClientCache: true,
    appDocumentPreloading: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "cmsimages.ssbeauty.in",
      "localhost",
      "images-cms.uat.shopper-stop.in",
      "images-cms.sit.shopper-stop.in",
      "images-cms.dev.shopper-stop.in",
      "images-magento.uat.shopper-stop.in",
      "s3.ap-south-1.amazonaws.com",
      "storage.googleapis.com",
    ],
  },
});

export default config;
