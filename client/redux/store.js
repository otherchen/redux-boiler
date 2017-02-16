import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from 'redux/reducer'

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunkMiddleware)
} else {
  enhancer = applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
}

export default (initialState) => {
  return createStore(reducer, initialState, enhancer)
}
