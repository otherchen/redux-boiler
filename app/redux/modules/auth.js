import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import { Level } from 'utils/access'
import fetcher from 'utils/fetcher'
import Token from 'utils/token'

/*************************/
// ActionTypes

export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const VERIFY_TOKEN = 'VERIFY_TOKEN'

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
        level: Level.user,
        user: action.user
      })
    case LOGIN_FAILURE:
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
  return fetch('/api/user/register', {
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
    }
  })
}

export function login(user, dispatch) {
  return fetcher.post('/api/user/login', { body: user })
  .then(function(body) {
    dispatch(setUser(body.token))
  })
  .catch(function(err) {
    dispatch(loginFailure())
    return Promise.reject({_error: err.toString()})
  })
}

/*
  Todo:
  1. move setUser logic into loginSuccess
  2. create registerFailure and registerSuccess
  3. change logout to logout Success
  3. switch fetch api out with fetcher
  4. store token in state (to pass into fetcher when calls need to be made)
*/

export const setUser = (token) => {
  return (dispatch, getState) => {
    Token.set(token);
    const user = JSON.parse(Token.decode(token));
    dispatch(loginSuccess(user))
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

    return fetch('/api/user/verify/' + token)
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
        Token.invalidate(token);
      } else {
        dispatch(setUser(body.token))
      }
    })
  }
}
