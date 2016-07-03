import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import { Level } from 'utils/access'
import Token from 'utils/token'

/*************************/
// ActionTypes

export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

/*************************/
// Reducer

const initialState = {
  level: Level.guest,
  user: null
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        // @todo: should set level depending on fields
        // found in action.user (ex. user_type = 'admin')
        level: Level.user,
        user: action.user
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        level: Level.guest,
        user: null
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        level: Level.guest,
        user: null
      })
    default:
      return state
  }
}

/*************************/
// Actions

function registerUser(user) {
  type: REGISTER_USER,
  user
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
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

export function register(user, dispatch) {
  return fetch('/api/register', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then((response) => {
    return response.json()
    .then((json) => {
      return {
        status: response.status,
        body: json
      }
    })
  })
  .then(({ status, body }) => {
    if(status >= 400) {
      dispatch(loginFailure())
      return Promise.reject({ _error: body.error })
    } else {
      dispatch(setUser(body.token))
      browserHistory.push('/')
    }
  })
}

export function login(user, dispatch) {
  return fetch('/api/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then((response) => {
    return response.json()
    .then((json) => {
      return {
        status: response.status,
        body: json
      }
    })
  })
  .then(({ status, body }) => {
    if(status >= 400) {
      dispatch(loginFailure())
      return Promise.reject({ _error: body.error })
    } else {
      dispatch(setUser(body.token))
      browserHistory.push('/')
    }
  })
}

export const setUser = (token) => {
  return (dispatch, getState) => {
    Token.set(token);
    const user = JSON.parse(Token.decode(token));
    dispatch(loginSuccess(user));
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    localStorage.removeItem('token');
    dispatch(logoutSuccess())
    browserHistory.push('/login')
  }
}
