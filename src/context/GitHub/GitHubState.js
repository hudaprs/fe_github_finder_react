import React, { useReducer } from "react";
import axios from "axios";
import GitHubContext from "./gitHubContext";
import GitHubReducer from "./gitHubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USERS,
  GET_REPOS,
} from "../types";

const GitHubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GitHubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    try {
      const getUsers = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const { items } = getUsers.data;
      dispatch({ type: SEARCH_USERS, payload: items });
    } catch (err) {
      console.log(err);
    }
  };

  // Get Users

  // Get Repos

  // Clear Users

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
      }}
    >
      {props.children}
    </GitHubContext.Provider>
  );
};

export default GitHubState;
