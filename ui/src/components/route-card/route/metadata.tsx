import { type Route } from "@/lib/types";
import { FuelIcon, ClockIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
export default function Metadata({
  metadata,
}: {
  metadata: Route["metadata"];
}) {
  return (
    <div className="flex gap-2 text-xs">
      <div className="flex flex-row gap-1 pr-2 items-center border-r border-muted-foreground">
        <p className="text-muted-foreground">
          <FuelIcon className="h-4 w-4" />
        </p>
        <p>${metadata.gasPrice.toFixed(2)}</p>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <p className="text-muted-foreground">
          <ClockIcon className="h-4 w-4" />
        </p>
        <p>
          {metadata.time.getMinutes()}:{metadata.time.getSeconds()}
        </p>
      </div>
    </div>
  );
}
