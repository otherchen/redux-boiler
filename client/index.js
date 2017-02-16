import React from 'react';
import Store from 'redux/store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import PageContainer from 'containers/PageContainer';
import NotFoundPage from 'containers/NotFoundPage';
import AuthPage from 'containers/AuthPage';
import HomePage from 'containers/HomePage';
import { loginSuccess } from 'redux/modules/user';
import { levels } from 'utils/access';
import Token from 'utils/token';

const store = Store();

// @todo: Abstract persistent login into HOC.
// Should verify token on refresh by hitting API.
const token = Token.get();
if(token) store.dispatch(loginSuccess(token));

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        {/* Routes that require a logged in user */}
        <Route component={PageContainer(levels.USER)}>
          <IndexRoute component={HomePage}/>
        </Route>
        {/* Routes that require a guest user */}
        <Route component={PageContainer(levels.GUEST)}>
          <Route path="/auth" component={AuthPage}/>
        </Route>
        {/* Routes that are available to all */}
        <Route component={PageContainer(levels.ALL)}>
          <Route path="/*" component={NotFoundPage}/>
        </Route>
      </Route>
    </Router>
  </Provider>
);

render(routes, document.getElementById('root'));
