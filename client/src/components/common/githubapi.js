import React from 'react';

const api = {
  clientId: process.env.REACT_APP_GITHUB_API_KEY,
  clientSecret: process.env.REACT_APP_GITHUB_API_SECRET,
  count: 5,
  sorted: 'created: asc'
};

const getGithub = username =>
  fetch(
    `https://api.github.com/users/${username}/repos?per_page=${
      api.count
    }&sort=${api.sorted}&client_id=${api.clientId}&client_secret=${
      api.clientSecret
    }`
  )
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));

export default getGithub;

// Backend:
//
// // @route       GET api/profile/github/:username/:count/:sort
// // @desc        Get github data from github api
// // @access      Public
// router.get("/github/:username/:count/:sort", (req, res) => {
//   username = req.params.username;
//   clientId = "XXXX";
//   clientSecret = "XXXX";
//   count = req.params.count;
//   sort = req.params.sort;
//   const options = {
//     url: `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`,
//     headers: {
//       "User-Agent": "request"
//     }
//   };
//   function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       const info = JSON.parse(body);
//       res.json(info);
//     }
//   }
//   request(options, callback);
// });
//
//
// frontend:
//
// componentDidMount() {
//     const { username } = this.props;
//     const { count, sort } = this.state;
//
//     fetch(`/api/profile/github/${username}/${count}/${sort}`)
//       .then(res => res.json())
//       .then(data => {
//         if (this.refs.myRef) {
//           this.setState({ data });
//         }
//       })
//       .catch(err => console.log(err));
//   }
//
//   render() {
//     const repos = this.state.data;
//     let repoItens;
//
//     if (repos) {
//       repoItens = repos.slice(0, 5).map(repo => (
//         <div key={repo.id} className="card card-body mb-2">
//           <div className="row">
//             <div className="col-md-6">
//               <h4>
//                 <a href={repo.html_url} className="text-info" target="_blank">
//                   {" "}
//                   {repo.name}
//                 </a>
//               </h4>
//               <p>{repo.description}</p>
//             </div>
//             <div className="col-md-6">
//
//                 Stars: {repo.stargazers_count}
//
//
//                 Watchers: {repo.watchers_count}
//
//
//                 Forks: {repo.forks_count}
//
//             </div>
//           </div>
//         </div>
//       ));
//     }
//
//     return (
//       <div ref="myRef">
//         <hr />
//         <h3 className="mb-4">Latest Github Repos</h3>
//         {repoItens ? repoItens : undefined}
//       </div>
//     );
//   }
