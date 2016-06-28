import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const fields = [ 'email', 'password' ]
import { login, logout } from '../actions'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if(!values.password) {
    errors.password = 'Required'
  }
  return errors
}

class LoginForm extends Component {
  render() {
    const {
      fields: { firstName, lastName, email, password, confirm },
      handleSubmit,
      resetForm,
      submitting,
      error
    } = this.props
    return (
      <form onSubmit={handleSubmit(login)}>
        {error && <div>{error}</div>}
        <div>
          <label>Email</label>
          <input type="text" placeholder="Email" {...email}/>
          {email.touched && email.error && <div>{email.error}</div>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Password" {...password}/>
          {password.touched && password.error && <div>{password.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}


export default reduxForm({
  form: 'login',
  fields,
  validate
})(LoginForm)
