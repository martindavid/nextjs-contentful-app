const withCss = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const nextConfig = {
  webpack: config => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsConfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsConfigPathsPlugin()];
    }

    return config;
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret"
  },
  env: {
    // Will be available on both server and client
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN
  }
};

// next.config.js
module.exports = withPlugins([withCss], nextConfig);
