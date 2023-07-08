import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./assets/css/app.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <main className="app__main">
        <Outlet />
      </main>
    </>
  );
}

export default App;
