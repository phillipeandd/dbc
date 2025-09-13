const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts.push('db', 'mp3', 'ttf', 'obj', 'png', 'jpg');

// Add support for resolving modules
config.resolver.alias = {
  '@': __dirname,
  '@components': `${__dirname}/components`,
  '@hooks': `${__dirname}/hooks`,
  '@utils': `${__dirname}/utils`,
  '@theme': `${__dirname}/theme`,
  '@styles': `${__dirname}/styles`,
};

module.exports = config;