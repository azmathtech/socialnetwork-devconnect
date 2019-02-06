import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import getGithub from '../common/githubapi';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }

  async componentDidMount() {
    const { username } = this.props;
    console.log('inside did mount: ', username);
    const data = await getGithub(username);
    if (this.refs.myRef) {
      this.setState({
        repos: data
      });
    }
  }

  render() {
    const { repos } = this.state;
    console.log('inside render: ', repos);
    let repoItems;

    if (repos.length > 0) {
      repoItems = repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a
                  href={repo.html_url}
                  className="text-info"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-info mr-1">
                Stars: {repo.watchers_count}
              </span>
              <span className="badge badge-info">
                Stars: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));
    } else {
      repoItems = null;
    }

    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
