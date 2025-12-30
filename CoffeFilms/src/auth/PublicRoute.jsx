import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth") === "true";
  return isAuth ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
