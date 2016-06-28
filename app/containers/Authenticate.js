import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export function requireGuest(Component) {
  class Guest extends React.Component {
    componentWillMount() {
      this.checkGuest();
    }

    componentWillReceiveProps(nextProps) {
      this.checkGuest();
    }

    checkGuest() {
      if(this.props.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
        browserHistory.push('/')
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated !== true ?
            <Component {...this.props}/> : null }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message
  })

  return connect(mapStateToProps)(Guest)

}

export function requireAuth(Component) {
  class Authenticate extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      console.log("IS AUTHENTICATED: ", this.props.isAuthenticated)
      if(!this.props.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
        browserHistory.push('/login')
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true ?
            <Component {...this.props}/> : null }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message
  })

  return connect(mapStateToProps)(Authenticate)
}
