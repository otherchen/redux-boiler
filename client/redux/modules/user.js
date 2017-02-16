import actionCreatorFactory from 'utils/action-creator-factory';
import fetcher from 'utils/fetcher';
import Token from 'utils/token';

/*************************/
// Action Types

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

/*************************/
// Reducer

export default function user(state = null, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user;
    case LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};

/*************************/
// Action Creators


export function loginSuccess(token) { 
  let user = JSON.parse(Token.decode(token));
  Token.set(token);
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

export function logoutSuccess() {
  Token.invalidate();
  return {
    type: LOGOUT_SUCCESS
  };
};

export function login(user, dispatch) {
  return fetcher.post('/api/user/login', dispatch, { body: user, form: true })
  .then((body) => {
    dispatch(loginSuccess(body.token));
  });
};

export function register(user, dispatch) {
  return fetcher.post('/api/user/register', dispatch, { body: user, form: true })
  .then((body) => {
    dispatch(loginSuccess(body.token));
  });
};

export const verifyToken = () => {
  return (dispatch, getState) => {
    return fetcher.get('/api/user/verify', dispatch)
    .catch((err) => {});
  };
};
