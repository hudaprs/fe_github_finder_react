import React, { Component } from "react";
import PropTypes from "prop-types";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  static propTypes = {
    users: PropTypes.array,
    loading: PropTypes.bool,
    alert: PropTypes.any,
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

  // Clear users state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set Alert
  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { alert, users, loading } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showUsers={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
