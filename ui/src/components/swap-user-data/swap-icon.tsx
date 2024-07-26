import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function SwapIcon() {
  return (
    <>
      <Button className="mx-auto w-12 h-12 -mb-5 rounded-full mt-1" variant={'secondary'}>
        <ArrowDownUpIcon className="w-10" />
      </Button>
    </>
  );
}
