import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GitHubContext from "../../context/GitHub/gitHubContext";

const Search = ({ setAlert, showUsers, clearUsers }) => {
  const [text, setText] = useState("");
  const gitHubContext = useContext(GitHubContext);
  const { searchUsers } = gitHubContext;

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search User..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          className="btn btn-dark btn-block"
          value="Search"
        />
        {showUsers && (
          <button
            type="button"
            className="btn btn-light btn-block"
            onClick={clearUsers}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showUsers: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
