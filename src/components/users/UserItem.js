import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserItem = ({ user: { avatar_url, login } }) => {
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        style={{ width: "60px" }}
        className="round-img"
      />
      <h3>{login}</h3>
      <Link to={`/user/${login}`} className="btn btn-sm btn-dark">
        More
      </Link>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
