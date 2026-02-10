import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useFileStore } from "@/store/useFileStore";
import { filesProvider } from "@/services/files";
import { useLocation } from "react-router";
import { useLoginState } from "@/store/useLoginStore";
import type { files } from "@/interfaces/files";
import {
  FileIcon,
  defaultStyles,
  type DefaultExtensionType,
} from "react-file-icon";
import {
  Item,
  ItemMedia,
  ItemTitle,
  ItemContent,
  ItemActions,
} from "../ui/item";
import { Button } from "../ui/button";
import { Download, Folder, Trash, Info, View } from "lucide-react";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Files() {
  const location = useLocation();
  const selectedBucket = useStore(
    useFileStore,
    (state) => state.selectedBucketName,
  );
  const setBucket = useStore(useFileStore, (state) => state.setAvailBuckets);
  const prefix = useStore(useFileStore, (state) => state.prefix);
  const setPrefix = useStore(useFileStore, (state) => state.setPrefix);
  const isLoggedIn = useStore(useLoginState, (state) => state.isLoggedIn);
  const [files, setFiles] = useState<files[] | null>();
  const [folders, setFolders] = useState<files[] | null>();

  useEffect(() => {
    if (location.pathname === "/" && isLoggedIn) {
      filesProvider.getBuckets().then((data) => setBucket(data.data));
    }
  }, [location.pathname, setBucket, isLoggedIn]);

  useEffect(() => {
    if (location.pathname === "/" && selectedBucket) {
      filesProvider
        .getFiles({ bucketName: selectedBucket, prefix: prefix })
        .then((data) => {
          setFiles(data.data.files);
          setFolders(data.data.folders);
        });
    }
  }, [selectedBucket, location.pathname, prefix]);

  const deleteFile = async (filename: string) => {
    const resp = await filesProvider.deleteFile({
      bucketName: selectedBucket,
      key: filename,
    });
    if (resp.msg === "Success") {
      toast("File was deleted successfully", { position: "bottom-right" });
      setFiles((files) => files?.filter((file) => file.name !== filename));
    }
  };

  const changeParent = (foldername: string) => {
    setPrefix(foldername);
  };

  const downloadFile = async (filename: string) => {
    const resp = await filesProvider.downloadFile({
      bucketName: selectedBucket,
      files: [
        {
          key: filename,
        },
      ],
    });
    if (resp.msg === "Success") {
      resp.data.map((obj: any) => window.open(obj.url, "_blank"));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            {prefix.split("/").map((item, index) => {
              return (
                <>
                  {index !== 0 ? <BreadcrumbSeparator /> : null}
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      onClick={() => changeParent(prefix.split(item)[0])}
                    >
                      {item}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {folders?.map((folder) => {
        return (
          <Item key={folder.name} variant={"outline"}>
            <ItemMedia className="w-8 h-8">
              <Folder />
            </ItemMedia>
            <ItemContent>
              <ItemTitle onClick={() => changeParent(folder.name)}>
                {folder.name.split("/").filter(Boolean).pop()}
              </ItemTitle>
            </ItemContent>
          </Item>
        );
      })}
      {files?.map((file) => {
        const fileExt = file.name.split(".").pop();
        return (
          <Item key={file.name} variant={"outline"}>
            <ItemMedia className="w-8 h-8">
              <FileIcon
                extension={fileExt}
                {...defaultStyles[fileExt as DefaultExtensionType]}
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle> {file.name}</ItemTitle>
            </ItemContent>
            <ItemActions>{file.size}</ItemActions>
            <ItemActions>
              <Button onClick={() => downloadFile(file.name)} variant="ghost">
                <Download />
              </Button>
            </ItemActions>
            <ItemActions>
              <Button variant="ghost">
                <View />
              </Button>
            </ItemActions>
            <ItemActions>
              <Button variant="ghost">
                <Info />
              </Button>
            </ItemActions>
            <ItemActions>
              <Button
                onClick={() => deleteFile(file.name)}
                variant="destructive"
              >
                <Trash />
              </Button>
            </ItemActions>
          </Item>
        );
      })}
    </div>
  );
}
export default Files;
