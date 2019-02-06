import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { deletePost, addLike, removeLike } from '../../actions/postActions';
import isEmpty from '../../validation/is-empty';

class PostItem extends Component {
  // constructor(props) {
  //   super(props);
  //   const {
  //     post: { likes },
  //     auth: { user }
  //   } = props;
  //   this.state = {
  //     isLiked: !!likes && likes.some(l => l.user === user.id)
  //   };
  // }

  onDeleteClick = postId => {
    //  console.log('delete post', postId);
    this.props.deletePost(postId);
  };

  onLikeClick = postId => {
    //console.log('Liking post', this.state.isLiked);
    this.props.addLike(postId);
  };

  onUnlikeClick = postId => {
    //console.log('Unliking post', postId);
    this.props.removeLike(postId);
  };

  // toggleIsLiked = value => {
  //   this.setState(state => {
  //     const { isLiked } = state;
  //     return {
  //       isLiked: value
  //     };
  //   });
  // };

  // toggleIsLiked = () => {
  //   this.setState(state => {
  //     const { isLiked } = state;
  //     return {
  //       isLiked: !isLiked
  //     };
  //   });
  // };

  // className={`${
  //   this.findUserLike(post.likes)
  //     ? 'text-success'
  //     : 'text-secondary'
  // } fas fa-thumbs-up`}

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return <i className="text-success fas fa-thumbs-up" />;
    } else {
      return <i className="text-secondary fas fa-thumbs-up" />;
    }
  }

  // findUserLike(likes) {
  //   const { auth } = this.props;
  //   if (likes.filter(like => like.user === auth.user.id).length > 0) {
  //     return <FontAwesomeIcon className="text-success fas" icon={faThumbsUp} />;
  //   } else {
  //     return (
  //       <FontAwesomeIcon className="text-secondary fas" icon={faThumbsUp} />
  //     );
  //   }
  // }

  render() {
    const { post, auth, showActions } = this.props;

    if (isEmpty(post)) {
      return null;
    }

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">
              {post.text.split('\n').map((p, index) => (
                <span key={index} style={{ display: 'block' }}>
                  {p}
                </span>
              ))}
            </p>
            {showActions ? (
              <span>
                <button
                  onClick={() => {
                    this.onLikeClick(post._id);
                  }}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  {this.findUserLike(post.likes)}
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={() => {
                    this.onUnlikeClick(post._id);
                  }}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={() => {
                      this.onDeleteClick(post._id);
                    }}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);

// className={`${
//   this.findUserLike(post.likes) ? 'text-info' : 'text-secondary'
// } fas fa-thumbs-up`}
// />

{
  /* <i
  className={`${
    this.findUserLike(post.likes)
      ? 'text-success'
      : 'text-secondary'
  } fas fa-thumbs-up`}
/> */
}

{
  /* <i
  className={classnames('fa fa-thumbs-up', {
    'text-info': this.state.isLiked,
    'text-secondary': !this.state.isLiked
  })}
/> */
}
