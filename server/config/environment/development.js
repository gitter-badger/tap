'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/tap-dev'
  },

  seedDB: true,

  aws: {
    s3: {
      prefixKey: '.tmp/'
    }
  }
};
