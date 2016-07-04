import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import RegisterForm from 'containers/RegisterForm'
import LoginForm from 'containers/LoginForm'
import Home from 'containers/Home'
import NotFound from 'components/NotFound'
import { setUser } from 'redux/modules/auth'
import { Access, Level } from 'utils/access'
import Token from 'utils/token'
import Store from 'redux/store'

/*
  MOVE THIS INTO INDEX.js
*/

// Create initial store
const store = Store()
const require = Access(store);

// Login if token already exists
let token = Token.get();
if(token) store.dispatch(setUser(token));

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/">
            <IndexRoute component={Home} onEnter={require(Level.user)} />
            <Route path="/sign-up" component={RegisterForm} onEnter={require(Level.guest)} />
            <Route path="/login" component={LoginForm} onEnter={require(Level.guest)} />
            <Route path="/*" component={NotFound} />
          </Route>
        </Router>
      </Provider>
    )
  }
}
