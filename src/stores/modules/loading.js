// STATE
const isLoading = false;

// REDUCER
const useReducerLoading = (state = isLoading, actions) => {
  switch (actions.type) {
    case "SET_LOADING":
      return {
        isLoading: actions.value,
      };

    default:
      return state;
  }
};

export default useReducerLoading;
