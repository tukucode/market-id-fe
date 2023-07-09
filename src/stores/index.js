import { combineReducers, createStore } from "redux";
import useReducerAuth from "./modules/auth";
import useReducerLoading from "./modules/loading";
import useReducerParamsProduct from "./modules/product";

const rootReducera = combineReducers({
  auth: useReducerAuth,
  loading: useReducerLoading,
  product: useReducerParamsProduct,
});

export default createStore(rootReducera);
