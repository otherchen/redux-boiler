import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import auth from 'redux/modules/auth'

export default combineReducers({
  form,
  auth
})
