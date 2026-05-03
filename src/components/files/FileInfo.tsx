import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { files } from "@/interfaces/files";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}

function formatDate(raw: string): string {
  const d = new Date(raw);
  return isNaN(d.getTime()) ? raw : d.toLocaleString();
}

type Props = {
  file: files | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function FileInfo({ file, open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="break-all">
            {file?.name.split("/").filter(Boolean).pop() ?? ""}
          </SheetTitle>
          <SheetDescription>File details</SheetDescription>
        </SheetHeader>

        {file && (
          <div className="flex flex-col gap-4 px-4 text-sm">
            <Row label="Full path" value={file.name} mono />
            <Row label="Size" value={formatBytes(file.size)} />
            <Row label="Type" value={file.fileType || "—"} />
            <Row
              label="Previewable"
              value={file.isPreviewable ? "Yes" : "No"}
            />
            {file.lastModified && (
              <Row label="Last modified" value={formatDate(file.lastModified)} />
            )}
            {file.owner && <Row label="Owner" value={file.owner} mono />}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-muted-foreground text-xs uppercase tracking-wide">
        {label}
      </span>
      <span className={mono ? "font-mono break-all text-xs" : ""}>{value}</span>
    </div>
  );
}

export default FileInfo;
