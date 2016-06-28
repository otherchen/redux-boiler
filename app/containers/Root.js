import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from '../store'
import AsyncApp from './AsyncApp'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import Error404 from '../components/404'
// import { requireAuth, requireGuest } from './Authenticate'
import Logout from './Logout'

const store = Store()

const _decodeToken = (token) => {
  return window.atob(token.split('.')[1]);
};

function loginSuccess(user) {
  return {
    type: 'LOGIN_SUCCESS',
    user
  }
}

export const setUser = () => {
  console.log("inside set User!");
  return (dispatch, getState) => {
    var token = _getToken();
    var user = JSON.parse(_decodeToken(token));
    localStorage.setItem('token', token);

    console.log("token", token);
    dispatch(loginSuccess(user));
    // dispatch action to set user & token in redux state
    console.log("user!!", user);
  };
};

const _getToken = () => {
  return localStorage.getItem('token');
};

const isAuthenticated = () => {
  return !!_getToken();
};

console.log("checking authentication");
if (isAuthenticated()) {
  console.log("is authenticated!!");
  store.dispatch(setUser());
}

function requireAuth(nextState, replace) {
  console.log("store", store);
  var auth = {
    loggedIn: () => {
      // return !!localStorage.getItem('token')
      console.log("try ====>" , store);
      console.log("again ====>", store.getState())
      var state = store.getState()
      return state.auth.isAuthenticated
    }
  }
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireAnon(nextState, replace) {
  var auth = {
    isAnon: () => {
      // return !localStorage.getItem('token')
      var state = store.getState()
      return !state.auth.isAuthenticated
    }
  }
  if (!auth.isAnon()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/">
            <IndexRoute component={AsyncApp} onEnter={requireAuth} />
            <Route path="/sign-up" component={RegisterForm} onEnter={requireAnon} />
            <Route path="/login" component={LoginForm} onEnter={requireAnon} />
            <Route path="/logout" component={Logout} />
            <Route path="*" component={Error404} />
          </Route>
        </Router>
      </Provider>
    )
  }
}
