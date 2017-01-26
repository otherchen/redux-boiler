import React, { Component } from 'react';
import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';

export default class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }
  
  render() {
    const { login } = this.state;
    return (
      <div> 
        {login ? <LoginForm /> : <RegisterForm /> }
        <button onClick={() => { this.setState({ login: !login }); }}>
          {login ? 'Register for Account' : 'Log in to existing Account'}
        </button>
      </div>
    );
  }
};
