import { combineReducers, createStore } from "redux";
import useReducerAuth from "./modules/auth";

const rootReducera = combineReducers({
  auth: useReducerAuth,
});

export default createStore(rootReducera);
