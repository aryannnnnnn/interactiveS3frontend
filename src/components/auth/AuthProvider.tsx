import { useStore } from "zustand";
import { useLoginState } from "../../store/useLoginStore";
import { Outlet, Navigate, useLocation } from "react-router";

const PUBLIC_PATHS = ["/login"];

function AuthProvider() {
  const isLoggedIn = useStore(useLoginState, (state) => state.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn && !PUBLIC_PATHS.includes(location.pathname)) {
    return <Navigate to="login" replace />;
  }
  if (isLoggedIn && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default AuthProvider;
