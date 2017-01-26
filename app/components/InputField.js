import React, { Component } from 'react';

class InputField extends Component {
  render() {
    const { className, input, label, type, placeholder, handleKeyPress, meta: { touched, error } } = this.props;
    return (
      <div>
        <label>{label}</label>
        <input {...input} onKeyDown={handleKeyPress} type={type} className={className} placeholder={placeholder} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
};

export default InputField;
