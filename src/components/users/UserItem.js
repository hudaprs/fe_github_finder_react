import React, { Component } from "react";

class UserItem extends Component {
  render() {
    const { avatar_url, login, html_url } = this.props.user;

    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          alt=""
          style={{ width: "60px" }}
          className="round-img"
        />
        <h3>{login}</h3>
        <a href={html_url} className="btn btn-sm btn-dark">
          More
        </a>
      </div>
    );
  }
}

export default UserItem;
