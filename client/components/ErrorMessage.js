import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from 'redux/modules/error';

class ErrorMessage extends Component {
  render() {
    const { error, handleClick } = this.props;
    return <div onClick={handleClick}>{error}</div>;
  }
};

function mapStateToProps(state) {
  const { error } = state;
  return { error };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (e) => {
      e.preventDefault();
      dispatch(clearError());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
