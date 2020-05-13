import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USERS,
  GET_REPOS,
} from "../types";

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
