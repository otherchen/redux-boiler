import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'components/Navbar';
import ErrorMessage from 'components/ErrorMessage';
import { access, levels } from 'utils/access';

export default function(level) {
  class PageContainer extends Component {
    constructor(props) {
      super(props);
      this.state = { verified: false };
    } 

    componentDidMount() {
      const { user } = this.props;
      const verified = access(level, user);
      this.setState({ verified });
    }

    componentWillReceiveProps(nextProps){
      if (nextProps.user !== this.props.user) {
        const verified = access(level, nextProps.user);
        this.setState({ verified });
      }
    }

    render() {
      const { children, user } = this.props;
      const { verified } = this.state;
      return (
        <div>
          <Navbar />
          <ErrorMessage />
          {verified && children}
        </div>
      );
    }
  };

  function mapStateToProps(state) {
    const { user } = state;
    return { user };
  }

  return connect(mapStateToProps)(PageContainer);
}
