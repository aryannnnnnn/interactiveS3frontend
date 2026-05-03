import { SidebarTrigger } from "../ui/sidebar";
import { Input } from "../ui/input";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "../ui/dialog";
import { FieldLabel, FieldDescription } from "../../components/ui/field";
import { ModeToggle } from "../theme/mode-toggle";
import Logout from "../auth/Logout";
import { useStore } from "zustand";
import { useFileStore } from "@/store/useFileStore";
import { useLoginState } from "@/store/useLoginStore";
import { useRef, useState } from "react";
import { toast } from "sonner";
import config from "@/config/config";

function Header() {
  const isLoggedIn = useStore(useLoginState, (state) => state.isLoggedIn);
  const selectedBucket = useStore(useFileStore, (state) => state.selectedBucketName);
  const prefix = useStore(useFileStore, (state) => state.prefix);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast("Please select a file first.", { position: "bottom-right" });
      return;
    }
    if (!selectedBucket) {
      toast("Please select a bucket first.", { position: "bottom-right" });
      return;
    }

    setUploading(true);
    try {
      const key = prefix ? `${prefix}${file.name}` : file.name;
      const token = useLoginState.getState().token;
      const params = new URLSearchParams({ bucketName: selectedBucket, key });
      const resp = await fetch(`${config.url}/upload-file?${params}`, {
        method: "POST",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
          Authorization: `Bearer ${token}`,
        },
        body: file,
      });

      if (!resp.ok) throw new Error(`Upload failed (${resp.status})`);

      toast("File uploaded successfully.", { position: "bottom-right" });
      setDialogOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      toast("Upload failed. Please try again.", { position: "bottom-right" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <header className="w-full flex-1 h-15">
        <div className="flex items-center justify-between gap-20">
          <div className="flex items-center gap-5">
            <span className="pl-2">
              <SidebarTrigger />
            </span>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Upload</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Upload New File</DialogTitle>
                </DialogHeader>
                <Field>
                  <FieldLabel htmlFor="picture">File</FieldLabel>
                  <Input id="picture" type="file" ref={fileInputRef} />
                  <FieldDescription>
                    {selectedBucket
                      ? `Uploading to: ${selectedBucket}${prefix ? `/${prefix}` : ""}`
                      : "Select a bucket from the sidebar first."}
                  </FieldDescription>
                </Field>
                <Button onClick={handleUpload} disabled={uploading || !selectedBucket}>
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <Field orientation="horizontal">
                <Input type="search" placeholder="Search..." />
                <Button>Search</Button>
              </Field>
            </div>
            <ModeToggle />
            {isLoggedIn && <Logout />}
          </div>
        </div>
      </header>
    </div>
  );
}
export default Header;
