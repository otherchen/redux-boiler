var jwt = require('jsonwebtoken');
var _ = require('lodash');
var auth = require('./auth');
var config = require('../config');
var UserModel = require('../models/user');

module.exports = {
  login: function(body) {
    return UserModel.findOne({ email: body.email }).exec()
    .then(function(user){
      if(!user || !auth.compareHash(body.password, user.password)) {
        throw new Error('Email or password is incorrect');
      } else {
        return auth.createToken(user.toObject());
      }
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
  },
  register: function(body) {
    var self = this;
    return UserModel.findOne({email: body.email}).exec()
    .then(function(existingUser) {
      if(existingUser) {
        throw new Error('User with that email already exists');
      } else {
        return auth.createHash(body.password);
      }
    })
    .then(function(hash) {
      body.password = hash;
      return new UserModel(body);
    })
    .then(function(user) {
      return user.save();
    })
    .then(function(user) {
      return self.login(user.toObject());
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
  }
};
