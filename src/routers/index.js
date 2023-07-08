import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, PAGE AND AUTH
import App from "../App";

// LAYOUT PRODUCT
import LayoutProduct from "../Layouts/LayoutProduct";

// PAGE CUSTOMER
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";

// NEGATIVE PAGE
import Error from "../pages/Error";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route element={<LayoutProduct />}>
        <Route path="/" element={<Products />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);
