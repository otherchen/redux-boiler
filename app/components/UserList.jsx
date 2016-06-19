var React = require('react');
var UserStore = require('../stores/user_store');
var UserActions = require('../actions/user_actions');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      users: [],
      text: '',
    };
  },

  componentDidMount: function() {
    var listener = UserStore.addListener(this._onChange);
    UserActions.retrieve();
    this.setState({ listener: listener });
  },

  componentWillUnmount: function() {
    this.state.listener.remove();
  },

  render: function() {
    return (
      <div>
        {/* Title*/}
        <h1>User List</h1>

        {/* Form*/}
        <label>Full Name:</label>
        <input type="text" name="name" value={this.state.text} onChange={this._onTextChange} />
        <button onClick={this._onClick}>Add Name</button>

        <br/>
        <br/>

        {/* Display List */}
        {_.map(this.state.users, function(user, i) {
          return <li key={i}>{user.name}</li>
        })}
      </div>
    );
  },

  _onTextChange: function(event) {
    this.setState({ text: event.target.value });
  },

  _onClick: function() {
    if(this.state.text != ''){
      UserActions.create(this.state.text);
      this.setState({ text: '' });
    }
  },

  _onChange: function() {
    this.setState({
      users: UserStore.getUsers()
    });
  }
});
