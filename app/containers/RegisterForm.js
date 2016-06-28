import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const fields = [ 'firstName', 'lastName', 'email', 'password', 'confirm' ]
import { register } from '../actions'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if(!values.password) {
    errors.password = 'Required'
  }
  if(!values.confirm) {
    errors.confirm = 'Required'
  } else if (values.password !== values.confirm) {
    errors.password = 'Passwords do not match'
  }
  return errors
}

class RegisterForm extends Component {
  render() {
    const {
      fields: { firstName, lastName, email, password, confirm },
      handleSubmit,
      resetForm,
      submitting,
      error
    } = this.props
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

RegisterForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'register',
  fields,
  validate
})(RegisterForm)
