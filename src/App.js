import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  static propTypes = {
    users: PropTypes.array,
    loading: PropTypes.bool,
    alert: PropTypes.any,
    repos: PropTypes.array,
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   try {
  //     const getUsers = await axios.get(
  //       `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     const { data } = getUsers;
  //     this.setState({ loading: false, users: data });
  //   } catch (err) {
  //     console.log(err);
  //     this.setState({ loading: false });
  //   }
  // }

  // Search GitHub users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    try {
      const getUsers = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const { items } = getUsers.data;
      this.setState({ loading: false, users: items });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  // Get one user
  getUser = async (username) => {
    this.setState({ loading: true });
    try {
      const getUsers = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const { data } = getUsers;
      this.setState({ loading: false, user: data });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  // Get user repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    try {
      const getUsers = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const { data } = getUsers;
      this.setState({ loading: false, repos: data });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  // Clear users state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set Alert
  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { alert, users, user, repos, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showUsers={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    loading={loading}
                    user={user}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
