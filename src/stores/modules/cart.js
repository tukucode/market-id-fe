// STATE
const initialState = {
  dataCart: [],
};

// REDUCER
const useReducerCarts = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_CARTS":
      return {
        ...state,
        dataCart: actions.value,
      };

    default:
      return { ...state };
  }
};

export default useReducerCarts;
