import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from 'redux/reducer'


let middleware = [thunkMiddleware];

if(process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}

export default (initialState) => {
  return createStore(reducer, initialState, applyMiddleware(...middleware))
}
