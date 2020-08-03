const withImages = require('next-images');
const path = require('path');

module.exports = withImages({
  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
  webpack: (config) => {
    config.module.resolve.push({
      alias: {
        '@components': path.resolve(__dirname, 'components/'),
        '@styles': path.resolve(__dirname, 'styles/'),
        '@scenes': path.resolve(__dirname, 'scenes/'),
        '@util': path.resolve(__dirname, 'util/'),
      },
      extensions: ['.ts', '.tsx', '.js', '.scss'],
    });
  },
});
