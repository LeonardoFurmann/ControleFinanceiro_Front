import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken, clearAuthToken } from "../../services/authToken";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
  iat: number;
  sub: string;
};

const ProtectedRoute = () => {
  const token = getAuthToken();
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (!isExpired) {
        isAuthenticated = true;
      } else {
        clearAuthToken();
      }
    } catch (error) {
      console.error("Invalid token:", error);
      clearAuthToken();
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
