import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import error from 'redux/modules/error';
import user from 'redux/modules/user';

export default combineReducers({
  form,
  error,
  user
});
