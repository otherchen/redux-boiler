import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { register } from 'redux/modules/user';
import { createValidator, required, email, maxLength, minLength, match } from 'utils/validation';
import InputField from './InputField';

class RegisterForm extends Component {
  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <form onSubmit={handleSubmit(register)}>
        {error && <div>{error}</div>}
        <Field name="firstName" type="text" component={InputField} label="First Name:" placeholder="First Name" />
        <Field name="lastName" type="text" component={InputField} label="Last Name:" placeholder="Last Name" />
        <Field name="email" type="text" component={InputField} label="Email:" placeholder="Email" />
        <Field name="password" type="password" component={InputField} label="Password:" placeholder="Password" />
        <Field name="confirm" type="password" component={InputField} label="Confirm Password:" placeholder="Confirm Password" />
        <button type="submit" disabled={submitting}>Register</button>
      </form>
    );
  }
};

const validate = createValidator({
  firstName: [required, minLength(1), maxLength(50)],
  lastName: [required, minLength(1), maxLength(50)],
  email: [required, email],
  password: [required, minLength(6)],
  confirm: [required, match('password')]
});

export default reduxForm({
  form: 'register',
  validate
})(RegisterForm);
