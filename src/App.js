import { Outlet } from "react-router-dom";
import "./assets/css/app.css";

function App() {
  return (
    <main className="app__main">
      <Outlet />
    </main>
  );
}

export default App;
