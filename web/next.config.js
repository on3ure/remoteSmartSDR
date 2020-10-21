const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    return config;
  },
};
