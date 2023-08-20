// GET DATA FROM LOCAL STORAGE
const token = localStorage.getItem("token") || null;
const user = JSON.parse(localStorage.getItem("user")) || {};

// STATE
const initialState = {
  user,
  token,
};

// REDUCER
const useReducerAuth = (state = initialState, actions) => {
  switch (actions.type) {
    case "AUTH_TOKEN":
      return {
        ...state,
        token: actions.value,
      };

    case "AUTH_USER":
      return {
        ...state,
        user: actions.value,
      };

    default:
      return state;
  }
};

export default useReducerAuth;
