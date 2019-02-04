import React, { Component } from 'react';

import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  // renderSocialLinks = (socObj, icon) => {
  //   if (socObj) {
  //     let iconLink;
  //     if (icon === 'globe') {
  //       iconLink = <i className={`fas fa-globe fa-2x`} />;
  //     } else {
  //       iconLink = <i className={`fab fa-${icon} fa-2x`} />;
  //     }
  //     const link = `https://${socObj}`;
  //     return (
  //       <a
  //         className="text-white p-2"
  //         href={link}
  //         rel="noopener noreferrer"
  //         target="_blank"
  //       >
  //         {iconLink}
  //       </a>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  renderSocialLinks = socObj => {
    return Object.keys(socObj).map(key => {
      if (socObj[key]) {
        const link = `https://${socObj[key]}`;
        return (
          <a
            key={key}
            className="text-white p-2"
            href={link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className={`fab fa-${key} fa-2x`} />
          </a>
        );
      } else return null;
    });
  };

  someFunction = () => {};

  render() {
    const { profile } = this.props;
    const { social } = profile;
    let siteLink;
    if (profile.website) {
      siteLink = `https://${profile.website}`;
    }
    //const { twitter } = profile.social;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.name}</h1>
              <p className="lead text-center">
                {profile.status}{' '}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              <p>
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </p>
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={siteLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social)
                  ? null
                  : this.renderSocialLinks(social)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;

// // function to use to add the https to sites, this loops through a social array
// // Need to add an array for social links to consolodate code
// const renderSocialLinks = socObj => {
//   return Object.keys(socObj).map(key => {
//     if (socObj[key]) {
//       const link = `https://${socObj[key]}`;
//       return (
//         <a key={key} className="text-white p-2" href={link} rel="noopener noreferrer" target="_blank">
//         <i className={`fab fa-${key} fa-2x`} />
//         </a>
//       );
//     } else return null;
//   });
// };

// function removeProtocol(str) {
//   return str.replace(/(^\w+:|^)\/\//, '');
// }
//
// <div className="input-group mb-3">
//   <div className="input-group-prepend">
//     <span className="input-group-text" id="your_id">https://</span>
//   </div>
//   <input type="text" className="form-control" id="your_id"/>
//   </div>

// renderSocialLinks = (socObj, icon) => {
//   if (socObj) {
//     let iconLink;
//     if (icon === 'globe') {
//       iconLink = <i className={`fas fa-globe fa-2x`} />;
//     } else {
//       iconLink = <i className={`fab fa-${icon} fa-2x`} />;
//     }
//     const link = `https://${socObj}`;
//     return (
//       <a
//         className="text-white p-2"
//         href={link}
//         rel="noopener noreferrer"
//         target="_blank"
//       >
//         {iconLink}
//       </a>
//     );
//   } else {
//     return null;
//   }
// };
