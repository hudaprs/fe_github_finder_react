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

  // Get Users

  // Get Repos

  // Clear Users

  // Set Loading

  const { users, user, repos, loading } = state;
  return (
    <GitHubContext.provider value={{ users, user, repos, loading }}>
      {props.children}
    </GitHubContext.provider>
  );
};

export default GitHubState;
