import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      // if (!this.props.isAuthenticated) {
      //   this.context.router.push('/');
      // }
      this.shouldNavigateAway();
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth.isAuthenticated) {
        this.props.history.push('/login');
      }
      // this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth.isAuthenticated) {
        this.props.history.push('/login');
        // return <Redirect to="/" />;
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authentication.propTypes = {
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    return { auth: state.auth };
  };

  return connect(mapStateToProps)(Authentication);
}

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
//
// export default WrappedComponent => {
//   class ComposedComponent extends Component {
//     componentDidMount() {
//       this.shouldNavigateAway();
//     }
//     componentDidUpdate() {
//       this.shouldNavigateAway();
//     }
//
//     shouldNavigateAway() {
//       if (!this.props.auth.isAuthenticated) {
//         this.props.history.push('/');
//       }
//     }
//
//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   }
//
//   const mapStateToProps = ({ auth }) => {
//     return {
//       auth
//     };
//   };
//   ComposedComponent.propTypes = {
//     auth: PropTypes.object.isRequired
//   };
//   return connect(mapStateToProps)(ComposedComponent);
// };
