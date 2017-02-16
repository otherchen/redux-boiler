import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import def from './default';

// Config setup
let config = {};
let rootPath = './default.js';
let overridePath = `./${process.env.NODE_ENV || 'development'}.js`;

// Include the base config
if (fs.existsSync(path.resolve('server', 'config', rootPath))) {
  config = _.merge(config, require(rootPath));
} 

// Include the environment config
if (fs.existsSync(path.resolve('server', 'config', overridePath))) {
  config = _.merge(config, require(overridePath));
} 

export default config;
