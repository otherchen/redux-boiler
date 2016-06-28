import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions'

class Logout extends Component {
  render() {
    const {
      dispatch,
      isAuthenticated,
      user
    } = this.props
    console.log("USER from props:", user);
    return (
      <div>
      {
          isAuthenticated ? <button onClick={(e)=> {
            e.preventDefault()
            dispatch(logout());
          }}>Logout </button>
          : <h1> Not logged In </h1>
      }

      {user && <h2>{user.email}, {user.firstName} </h2>}
      </div>
    )
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated, user } = auth
  console.log("USER FROM STATE:", user)
  console.log("total state:", state)
  return {
    isAuthenticated,
    user
  }
}

Logout = connect(mapStateToProps)(Logout)

export default Logout
