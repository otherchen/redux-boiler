import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { login } from 'redux/modules/auth'
import { createValidator, email, required } from 'utils/validation'

class LoginForm extends Component {
  render() {
    const { fields: { email, password }, handleSubmit, resetForm, submitting, error } = this.props
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
          <button type="submit" disabled={submitting}>Submit</button>
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

const validate = createValidator({
  email: [required, email],
  password: [required]
})

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate
})(LoginForm)
