import { combineReducers, createStore } from "redux";
import useReducerAuth from "./modules/auth";
import useReducerLoading from "./modules/loading";
import useReducerParamsProduct from "./modules/product";
import useReducerCarts from "./modules/cart";

const rootReducera = combineReducers({
  auth: useReducerAuth,
  loading: useReducerLoading,
  product: useReducerParamsProduct,
  carts: useReducerCarts
});

export default createStore(rootReducera);
