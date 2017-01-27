var config = require('../config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var _ = require('lodash');

var SALT_WORK_FACTOR = 10;

module.exports = {
  createToken: function(profile, options) {
    options = options || { expiresIn: 60*60*5 };
    return jwt.sign(_.omit(profile, 'password'), config.application.secret, options);
  },
  verifyToken: function(token) {
    return new Promise(function(resolve, reject) {
      jwt.verify(token, config.application.secret, function(err, user) {
        if (err) reject(err);
        else resolve(token);
      })
    });
  },
  createHash: function(password) {
    return new Promise(function(resolve, reject) {
      bcrypt.hash(password, SALT_WORK_FACTOR, function(err, hash) {
        if(err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  },
  compareHash: function(password, hash) {
    return new Promise(function(resolve, reject) {
      bcrypt.compare(password, hash, function(err, res) {
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
