import React from 'react'
import { render } from 'react-dom'
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
const require = Access(store)

// @todo: Need to verify that the token is valid with server.
// instead of assuming it is always valid. Probably move logic
// into a HOC that does verification before rendering children.
//
// Note: verifyToken action in the auth module was created for this situation
// Reference: https://github.com/rajaraodv/react-redux-blog

const token = Token.get()
if(token) store.dispatch(loginWithRedirect(token))

const routes = (
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

render(routes, document.getElementById('root'))
