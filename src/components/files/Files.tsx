import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useFileStore } from "@/store/useFileStore";
import { filesProvider } from "@/services/files";
import { useLocation } from "react-router";
import { useLoginState } from "@/store/useLoginStore";
import type { files } from "@/interfaces/files";

function Files() {
  const location = useLocation();
  const selectedBucket = useStore(
    useFileStore,
    (state) => state.selectedBucketName,
  );
  const setBucket = useStore(useFileStore, (state) => state.setAvailBuckets);
  const isLoggedIn = useStore(useLoginState, (state) => state.isLoggedIn);
  const [files, setFiles] = useState<files[] | null>();

  useEffect(() => {
    if (location.pathname === "/" && isLoggedIn) {
      filesProvider.getBuckets().then((data) => setBucket(data.data));
    }
  }, [location.pathname, setBucket, isLoggedIn]);

  useEffect(() => {
    if (location.pathname === "/" && selectedBucket) {
      filesProvider
        .getFiles({ bucketName: selectedBucket })
        .then((data) => setFiles(data.data.files));
    }
  }, [selectedBucket, location.pathname]);

  return (
    <div>
      <ul>
        {files?.map((file) => (
          <li>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default Files;
