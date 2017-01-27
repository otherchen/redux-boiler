import { browserHistory } from 'react-router';
import { serverError } from './error';
import fetcher from 'utils/fetcher';
import Token from 'utils/token';

/*************************/
// Action Types

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS'
export const VERIFY_FAILURE = 'VERIFY_FAILURE'

/*************************/
// Reducer

export default function user(state = null, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user;
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      return null;
    default:
      return state
  }
}

/*************************/
// Action Creators

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

export function loginSuccess(token) {
  Token.set(token)
  let user = JSON.parse(Token.decode(token))
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

export function logoutSuccess() {
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
  return fetcher.post('/api/user/register', dispatch, { body: user, form: true })
  .then((body) => {
    dispatch(registerSuccess())
    dispatch(loginWithRedirect(body.token))
  })
  .catch((err) => {
    dispatch(registerFailure())
    return Promise.reject(err);
  })
}

export function login(user, dispatch) {
  return fetcher.post('/api/user/login', dispatch, { body: user, form: true })
  .then((body) => {
    dispatch(loginWithRedirect(body.token))
  })
  .catch((err) => {
    dispatch(loginFailure());
    return Promise.reject(err);
  })
}

export const loginWithRedirect = (token) => {
  return (dispatch, getState) => {
    dispatch(loginSuccess(token))
    browserHistory.push('/')

    /*
      Is this redirect needed? should the access middleware take care of it?
      - Should the logoutSuccess in fetcher be actually logout()? Probably needs redirect there (test it)
      - What about the loginSuccess in index.js? Probably does not need redirect there
    */
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    Token.invalidate();
    dispatch(logoutSuccess());
    browserHistory.push('/auth');
  }
}

export const verifyToken = () => {
  return (dispatch, getState) => {
    return fetcher.get('/api/user/verify', dispatch)
    .then((body) => {
      dispatch(verifySuccess())
    })
    .catch((err) => {
      dispatch(verifyFailure())
      Token.invalidate()
    })
  }
}
