import { useStore } from "zustand";
import { useLoginState } from "../../store/useLoginStore";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

function AuthProvider() {
  const isLoggedIn = useStore(useLoginState, (state) => state.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
}

export default AuthProvider;
