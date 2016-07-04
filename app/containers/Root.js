import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { loginWithRedirect } from 'redux/modules/auth'
import { Access, Level } from 'utils/access'
import Token from 'utils/token'
import Store from 'redux/store'
import NotFound from 'components/NotFound'
import RegisterForm from 'containers/RegisterForm'
import LoginForm from 'containers/LoginForm'
import Home from 'containers/Home'

const store = Store()
const require = Access(store);

// @todo: Need to verify that the token is valid with server.
// instead of assuming it is always valid. Probably move logic
// into a HOC that does verification before rendering children.
let token = Token.get();
if(token) store.dispatch(loginWithRedirect(token));

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
