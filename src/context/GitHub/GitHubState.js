import React, { useReducer } from "react";
import axios from "axios";
import GitHubContext from "./gitHubContext";
import GitHubReducer from "./gitHubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
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

  // Get User
  const getUser = async (username) => {
    setLoading();
    try {
      const getUser = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const { data } = getUser;
      dispatch({ type: GET_USER, payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading();
    try {
      const getUsers = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const { data } = getUsers;
      dispatch({ type: GET_REPOS, payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  const { users, user, repos, loading } = state;
  return (
    <GitHubContext.Provider
      value={{
        users,
        user,
        repos,
        loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GitHubContext.Provider>
  );
};

export default GitHubState;
