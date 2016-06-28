var UserModel = require('../models/user');
var auth = require('./auth');
var _ = require('lodash');

module.exports = {
  login: function(body) {
    return UserModel.findOne({ email: body.email }).exec()
    .then(function(user){
      if(!user) {
        throw new Error('No user with that email exists');
      }
      return auth.compareHash(body.password, user.password)
      .then(function(match) {
        if(!match) {
          throw new Error('Email or password is incorrect');
        }
        return auth.createToken(user.toObject());
      });
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
  },
  register: function(body) {
    var self = this;
    return UserModel.findOne({ email: body.email }).exec()
    .then(function(exists) {
      if(exists) {
        throw new Error('User with that email already exists');
      } else {
        return auth.createHash(body.password);
      }
    })
    .then(function(hash) {
      var data = _.merge({}, body, { password: hash });
      var user = new UserModel(data);
      return user.save();
    })
    .then(function(user) {
      return self.login(body);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
  }
};
