import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { register } from 'redux/modules/auth'
import { createValidator, required, email, maxLength, minLength, match } from 'utils/validation'

class RegisterForm extends Component {
  render() {
    const { fields: { firstName, lastName, email, password, confirm }, handleSubmit, resetForm, submitting, error } = this.props
    return (
      <form onSubmit={handleSubmit(register)}>
        {error && <div>{error}</div>}
        <div>
          <label>First Name</label>
          <input type="text" placeholder="First Name" {...firstName}/>
          {firstName.touched && firstName.error && <div>{firstName.error}</div>}
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" {...lastName}/>
          {lastName.touched && lastName.error && <div>{lastName.error}</div>}
        </div>
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
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" {...confirm}/>
          {confirm.touched && confirm.error && <div>{confirm.error}</div>}
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

RegisterForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

const validate = createValidator({
  firstName: [required, minLength(3), maxLength(20)],
  lastName: [required, minLength(3), maxLength(20)],
  email: [required, email],
  password: [required, minLength(6)],
  confirm: [required, match('password')]
})

export default reduxForm({
  form: 'register',
  fields: [ 'firstName', 'lastName', 'email', 'password', 'confirm' ],
  validate
})(RegisterForm)
