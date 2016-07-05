import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout } from 'redux/modules/auth'
import { Level } from 'utils/access'

class Home extends Component {
  render() {
    const { level, user, handleClick } = this.props
    return (
      <div>
        {user && <h1>{user.firstName} {user.lastName}, {user.email}</h1>}
        {level === Level.user ? <button onClick={handleClick}>Logout</button> : <h1>Not Logged In</h1>}
      </div>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  handleClick: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { auth } = state
  const { level, user } = auth
  return {
    level,
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (e) => {
      e.preventDefault()
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
