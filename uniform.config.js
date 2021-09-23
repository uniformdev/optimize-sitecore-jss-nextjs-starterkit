const dotenv = require('dotenv');

// this file is not required, but it provides default standard values for the starter kit
// it is moved to the separate file because it is used in 2 places: server.ts and next.config.js
// you can override the values in the .env file if required

const defaults = {
  UNIFORM_API_SITENAME: 'uniform-jss-kit',
  UNIFORM_PUBLISH_TARGET: 'fake',
  UNIFORM_SSR_ENGINE: 'nextjs',
  UNIFORM_MODE: 'mixed'
};

function processDefault(key, fallback) {
  if (!key) {
    return null;
  }
  process.env[key] = process.env[key] || fallback;
}

module.exports = function () {
  dotenv.config();
  Object.keys(defaults).forEach((k) => processDefault(k, defaults[k]));

  if (!process.env['UNIFORM_API_TOKEN']) {
    throw new Error('UNIFORM_API_TOKEN is absent in .env file. It must be valid URL pointing back to Sitecore CM instance.');
  }

  if (!process.env['UNIFORM_API_URL']) {
    throw new Error('UNIFORM_API_URL is absent in .env file. It must be valid URL pointing back to Sitecore CM instance.');
  }
};
