import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function ToAddress() {
  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <p className="text-lg">To</p>
        <Button className="rounded-full w-32" size={"sm"}>
          <PlusIcon className="w-4 h-4 mr-1" /> Add Address
        </Button>
      </div>
    </>
  );
}
