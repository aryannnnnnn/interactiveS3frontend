import { useEffect } from "react";
import { useStore } from "zustand";
import { useFileStore } from "@/store/useFileStore";
import { filesProvider } from "@/services/files";
import { useLoginState } from "@/store/useLoginStore";
import { useLocation } from "react-router";

function Files() {
  const location = useLocation();
  const selectedBucket = useStore(
    useFileStore,
    (state) => state.selectedBucketName,
  );
  const setBucket = useStore(useFileStore, (state) => state.setAvailBuckets);
  const token = useStore(useLoginState, (state) => state.token);

  useEffect(() => {
    if (location.pathname === "/") {
      filesProvider.getBuckets(token).then((data) => setBucket(data.data));
    }
  }, []);
  //
  useEffect(() => {
    if (location.pathname === "/" && selectedBucket) {
      filesProvider
        .getFiles({ bucketName: selectedBucket }, token)
        .then((data) => console.log(data));
    }
  }, [selectedBucket]);

  return <></>;
}
export default Files;
