var Dispatcher = require('../dispatcher');
var UserConstants = require('../constants/user_constants');
var $ = require('jquery');

module.exports = {
  create: function(name) {
    $.post('/api/user', {
      name: name
    })
    .then(function() {
      Dispatcher.dispatch({
        actionType: UserConstants.USER_CREATE
      });
    });
  },

  retrieve: function() {
    $.get('/api/user')
    .then(function(users) {
      Dispatcher.dispatch({
        actionType: UserConstants.USER_RETRIEVE,
        users: users
      });
    });
  }
};
