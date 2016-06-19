var Dispatcher = require('../dispatcher');
var UserConstants = require('../constants/user_constants');
var fetch = require('isomorphic-fetch');

module.exports = {
  create: function(name) {
    fetch('/api/user', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    })
    .then(function() {
      Dispatcher.dispatch({
        actionType: UserConstants.USER_CREATE
      });
    });
  },

  retrieve: function() {
    fetch('/api/user')
    .then(function(res) {
      return res.json();
    })
    .then(function(users) {
      Dispatcher.dispatch({
        actionType: UserConstants.USER_RETRIEVE,
        users: users
      });
    });
  }
};
