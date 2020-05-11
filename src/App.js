import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const getUsers = await axios.get("https://api.github.com/users");
      const { data } = getUsers;
      this.setState({ loading: false, users: data });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
