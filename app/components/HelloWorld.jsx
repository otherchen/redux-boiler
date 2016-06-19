var React = require('react');
var Link = require('react-router').Link

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Link to="/users">Go to User List</Link>
      </div>
    );
  }
});
