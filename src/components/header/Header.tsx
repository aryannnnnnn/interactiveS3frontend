import { useStore } from "zustand";
import { useFileStore } from "../../store/useFileStore";
import { Button } from "../ui/button";

function Header() {
  const bucketName = useStore(useFileStore, (state) => state.bucketName);
  const region = useStore(useFileStore, (state) => state.region);
  return (
    <div className="flex flex-row justify-between h-15 bg-gray-700">
      <div className="w-1/4 flex justify-center self-center">{bucketName}</div>
      <div className="w-2/4 flex justify-center self-center">
        <span>{region}</span>
      </div>
      <div className="w-1/4 self-center flex justify-center">
        <Button name="upload">Upload</Button>
      </div>
    </div>
  );
}
export default Header;
