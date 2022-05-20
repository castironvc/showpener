module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["bit.ly"],
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
  /*  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      fs: false,
      path: require.resolve("path-browserify"),
      querystring: require.resolve("querystring-es3"),
    };
  }, */
};
