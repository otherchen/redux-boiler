import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import postsBySubreddit from 'redux/modules/posts'
import selectedSubreddit from 'redux/modules/select'
import auth from 'redux/modules/auth'

const reducer = combineReducers({
  form,
  auth,
  postsBySubreddit,
  selectedSubreddit
})

export default reducer
