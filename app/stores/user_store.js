var Dispatcher = require('../dispatcher');
var UserConstants = require('../constants/user_constants');
var UserActions = require('../actions/user_actions');
var FluxStore = require('flux/utils').Store;
var _ = require('lodash');

var _privateData = {
  users: []
}

function setUsers(users) {
  _privateData.users = users;
}

module.exports = _.assign(new FluxStore(Dispatcher), {

  getUsers: function() {
    return _privateData.users;
  },

  __onDispatch: function(action) {
    switch(action.actionType) {
      case UserConstants.USER_CREATE:
        UserActions.retrieve();
        this.__emitChange();
        break;
      case UserConstants.USER_RETRIEVE:
        setUsers(action.users);
        this.__emitChange();
        break;
    }
  }

});
