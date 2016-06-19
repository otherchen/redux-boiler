var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;

var HelloWorld = require('components/HelloWorld.jsx');
var UserList = require('components/UserList.jsx');
var Error404 = require('components/404.jsx');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute component={HelloWorld} />
      <Route path="/users" component={UserList} />
      <Route path="*" component={Error404} />
    </Route>
  </Router>,
  document.getElementById('root')
);
