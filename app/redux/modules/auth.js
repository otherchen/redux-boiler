import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import { Level } from 'utils/access'
import fetcher from 'utils/fetcher'
import Token from 'utils/token'

/*************************/
// ActionTypes

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS'
export const VERIFY_FAILURE = 'VERIFY_FAILURE'

/*************************/
// Reducer

const initialState = {
  level: Level.guest,
  user: null,
  token: null
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        level: Level.user,
        user: action.user,
        token: action.token
      })
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        level: Level.guest,
        user: null,
        token: null
      })
    default:
      return state
  }
}

/*************************/
// Actions

function registerSuccess() {
  return {
    type: REGISTER_SUCCESS
  }
}

function registerFailure() {
  return {
    type: REGISTER_FAILURE
  }
}

function loginSuccess(token) {
  Token.set(token)
  let user = JSON.parse(Token.decode(token))
  return {
    type: LOGIN_SUCCESS,
    user,
    token
  }
}

function loginFailure() {
  return {
    type: LOGIN_FAILURE
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

function verifySuccess() {
  return {
    type: VERIFY_SUCCESS
  }
}

function verifyFailure() {
  return {
    type: VERIFY_FAILURE
  }
}

export function register(user, dispatch) {
  return fetcher.post('/api/user/register', { body: user })
  .then((body) => {
    dispatch(registerSuccess())
    dispatch(loginWithRedirect(body.token))
  })
  .catch((err) => {
    dispatch(registerFailure())
    return Promise.reject({ _error: err.toString() })
  })
}

export function login(user, dispatch) {
  return fetcher.post('/api/user/login', { body: user })
  .then((body) => {
    dispatch(loginWithRedirect(body.token))
  })
  .catch((err) => {
    dispatch(loginFailure())
    return Promise.reject({_error: err.toString()})
  })
}

export const loginWithRedirect = (token) => {
  return (dispatch, getState) => {
    dispatch(loginSuccess(token))
    browserHistory.push('/')
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    Token.invalidate();
    dispatch(logoutSuccess())
    browserHistory.push('/login')
  }
}

export const verifyToken = (token) => {
  return (dispatch, getState) => {
    if(!token || token === '') return;
    return fetcher.get('/api/user/verify/' + token)
    .then((body) => {
      dispatch(verifySuccess())
      return true
    })
    .catch((err) => {
      dispatch(verifyFailure())
      return false
    })
  }
}
