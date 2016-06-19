var _ = require('lodash');

var actions = [
  'USER_CREATE',
  'USER_RETRIEVE'
];

var hash = {};

_.forEach(actions, function(action) {
  hash[action] = action;
});

module.exports = hash;
