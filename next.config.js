module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["bit.ly"],
  },

  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
  env: {
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,
    CRYPT_TOKEN: process.env.CRYPT_TOKEN,
  },
};
