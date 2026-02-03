import { useStore } from "zustand";
import { useFileStore } from "../../store/useFileStore";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

function Header() {
  const bucketName = useStore(useFileStore, (state) => state.bucketName);
  const region = useStore(useFileStore, (state) => state.region);
  return (
    <header className="flex flex-row justify-between h-15 bg-gray-700">
      <SidebarTrigger />
      <div className="w-1/4 flex justify-center self-center">{bucketName}</div>
      <div className="w-2/4 flex justify-center self-center">
        <span>{region}</span>
      </div>
      <div className="w-1/4 self-center flex justify-center">
        <Button name="upload">Upload</Button>
      </div>
    </header>
  );
}
export default Header;
