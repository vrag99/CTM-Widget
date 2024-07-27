import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ToAddress() {
  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <p className="text-lg">To</p>
        <Dialog>
          <DialogTrigger>
            {" "}
            <Button className="rounded-full w-32" size={"sm"}>
              <PlusIcon className="w-4 h-4 mr-1" /> Add Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
