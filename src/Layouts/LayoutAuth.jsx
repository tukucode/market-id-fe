import { Navigate, useLocation } from "react-router-dom";

const LayoutAuth = ({ auth, children }) => {
  const { token } = auth;
  const location = useLocation();
  const isPage = ["/login", "/register"].includes(location.pathname);

  if (!token) {
    if (isPage) return children;

    return <Navigate to="/login" replace />;
  }

  if (token && isPage) return <Navigate to="/" replace />;

  return children;
};

export default LayoutAuth;
