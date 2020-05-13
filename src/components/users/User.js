import React, { Component } from "react";

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  render() {
    const { user } = this.props;
    const {
      login,
      avatar_url,
      name,
      company,
      blog,
      location,
      email,
      hireable,
      bio,
      public_repos,
      public_gists,
      followers,
      following,
    } = user;

    return <div>{login}</div>;
  }
}

export default User;
