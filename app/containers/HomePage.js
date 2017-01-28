import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutSuccess, verifyToken } from 'redux/modules/user';
import Token from 'utils/token';

class HomePage extends Component {
  render() {
    const { user, logoutUser, invalidate, checkToken } = this.props;
    return (
      <div>
        <h1>Hello {user.firstName} {user.lastName} at {user.email}</h1>
        <button onClick={logoutUser}>Logout</button>
        <button onClick={invalidate}>Destroy Token</button>
        <button onClick={checkToken}>Check Token</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: (e) => {
      e.preventDefault();
      dispatch(logoutSuccess());
    },
    invalidate: (e) => {
      e.preventDefault();
      Token.invalidate();
    },
    checkToken: (e) => {
      e.preventDefault();
      dispatch(verifyToken());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
