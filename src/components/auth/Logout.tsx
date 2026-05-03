import { useStore } from "zustand";
import { useLoginState } from "../../store/useLoginStore";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

function Logout() {
  const unsetToken = useStore(useLoginState, (state) => state.unsetToken);
  const navigate = useNavigate();

  const handleLogout = () => {
    unsetToken();
    navigate("/login");
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
      <LogOut />
    </Button>
  );
}

export default Logout;
