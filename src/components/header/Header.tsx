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

function Header() {
  return (
    <div>
      <header className="w-full flex-1 h-15 bg-red-200">
        <div className="flex justify-between gap-20">
          <SidebarTrigger />
          <Field orientation="horizontal">
            <Input type="search" placeholder="Search..." />
            <Button>Search</Button>
          </Field>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Upload</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Upload New File</DialogTitle>
              </DialogHeader>
              <Field>
                <FieldLabel htmlFor="picture">Picture</FieldLabel>
                <Input id="picture" type="file" />
                <FieldDescription>Select a picture to upload.</FieldDescription>
              </Field>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </div>
  );
}
export default Header;
