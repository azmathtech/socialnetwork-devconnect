import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import store from './store/configureStore';

//import PrivateRoute from './components/common/PrivateRoute';
import RequireAuth from './components/common/RequireAuth';

import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/NotFound/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';

// check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user into and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expried token
  const currentTime = Math.floor(Date.now() / 1000);
  console.log('outside check, current time: ', currentTime);
  console.log('outside check, decode experation: ', decoded.exp);
  if (decoded.exp < currentTime) {
    console.log('Inside check: ', currentTime);
    // Logout User
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}
console.log('When is this logged');
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route path="/" component={Landing} exact />
            <div className="container">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/dashboard"
                  component={RequireAuth(Dashboard)}
                />
                <Route
                  exact
                  path="/create-profile"
                  component={RequireAuth(CreateProfile)}
                />
                <Route
                  exact
                  path="/edit-profile"
                  component={RequireAuth(EditProfile)}
                />
                <Route
                  exact
                  path="/add-experience"
                  component={RequireAuth(AddExperience)}
                />
                <Route
                  exact
                  path="/add-education"
                  component={RequireAuth(AddEducation)}
                />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Route exact path="/feed" component={RequireAuth(Posts)} />
                <Route exact path="/post/:id" component={RequireAuth(Post)} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

//component={RequireAuth(Dashboard)}
