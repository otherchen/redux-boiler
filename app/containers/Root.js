import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import AsyncApp from 'containers/AsyncApp'
import RegisterForm from 'containers/RegisterForm'
import LoginForm from 'containers/LoginForm'
import Logout from 'containers/Logout'
import Error404 from 'components/404'
import { setUser } from 'redux/modules/auth'
import { Access, Level } from 'utils/access'
import Token from 'utils/token'
import Store from 'redux/store'

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
            <IndexRoute component={AsyncApp} onEnter={require(Level.user)} />
            <Route path="/sign-up" component={RegisterForm} onEnter={require(Level.guest)} />
            <Route path="/login" component={LoginForm} onEnter={require(Level.guest)} />
            <Route path="/logout" component={Logout} />
            <Route path="*" component={Error404} />
          </Route>
        </Router>
      </Provider>
    )
  }
}
