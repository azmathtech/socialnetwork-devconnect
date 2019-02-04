import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '',
      clientSecret: '',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }
  render() {
    return (
      <div>
        <div>ProfileGithub</div>
      </div>
    );
  }
}

export default ProfileGithub;
