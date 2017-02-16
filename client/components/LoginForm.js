import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { login } from 'redux/modules/user';
import { createValidator, email, required } from 'utils/validation';
import InputField from './InputField';

class LoginForm extends Component {
  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <form onSubmit={handleSubmit(login)}>
        {error && <div>{error}</div>}
        <Field name="email" type="text" component={InputField} label="Email:" placeholder="Email" />
        <Field name="password" type="password" component={InputField} label="Password:" placeholder="Password" />
        <button type="submit" disabled={submitting}>Log in</button>
      </form>
    );
  }
};

const validate = createValidator({
  email: [required, email],
  password: [required]
});

export default reduxForm({
  form: 'login',
  validate
})(LoginForm);
