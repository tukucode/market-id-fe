import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, PAGE AND AUTH
import App from "../App";

// CUSTOMER
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

// NEGATIVE PAGE
import Error from "../pages/Error";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);
