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

function Header() {
  return (
    <div>
      <header className="w-full flex-1 h-15">
        <div className="flex justify-between gap-20">
          <div className="flex gap-5">
            <span className="pl-2 pt-1.5">
              <SidebarTrigger />
            </span>
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
                  <FieldDescription>
                    Select a picture to upload.
                  </FieldDescription>
                </Field>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-3">
            <div>
              <Field orientation="horizontal">
                <Input type="search" placeholder="Search..." />
                <Button>Search</Button>
              </Field>
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>
    </div>
  );
}
export default Header;
