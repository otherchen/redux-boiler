var _ = require('lodash');
var path = require('path');
var fs = require('fs');

// Config setup
var config = {};
var rootPath = 'config/default.js';
var overridePath = 'config/' + (process.env.NODE_ENV || 'development') + '.js';

// Include the base config
if (fs.existsSync(rootPath)) {
  config = _.merge(config, require(path.resolve(rootPath)));
}

// Include the environment config
if (fs.existsSync(overridePath)) {
  config = _.merge(config, require(path.resolve(overridePath)));
}

module.exports = config;
