import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, PAGE AND AUTH
import App from "../App";

// LAYOUT PRODUCT
import LayoutProduct from "../Layouts/LayoutProduct";

// LAYOUT AUTH
import LayoutAuth from "../Layouts/LayoutAuth";

// PAGE CUSTOMER
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import Carts from "../pages/Carts";

// NEGATIVE PAGE
import Error from "../pages/Error";

import store from "../stores";
const { auth } = store.getState();

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route
        element={
          <LayoutAuth auth={auth}>
            <LayoutProduct />
          </LayoutAuth>
        }
      >
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Carts />} />
      </Route>

      {/* PAGE LOGIN & REGISTER */}
      <Route
        element={
          <LayoutAuth auth={auth}>
            <App />
          </LayoutAuth>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Route>

      {/* NEGATIVE PAGE OR 404 */}
      <Route path="*" element={<Error />} />
    </Route>
  )
);
