import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout } from 'redux/modules/auth'
import { Level } from 'utils/access'

class Logout extends Component {
  render() {
    const {
      dispatch,
      level,
      user
    } = this.props

    return (
      <div>
      {
        level === Level.user ? <button onClick={(e)=> {
          e.preventDefault()
          dispatch(logout());
        }}>Logout</button>
        : <h1> Not logged In </h1>
      }
      {user && <h2>{user.email}, {user.firstName} </h2>}
      </div>
    )
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const { auth } = state
  const { level, user } = auth
  return {
    level,
    user
  }
}

export default connect(mapStateToProps)(Logout)
