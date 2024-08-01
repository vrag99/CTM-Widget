import { type Route } from "@/lib/types";
import { FuelIcon, ClockIcon } from "lucide-react";

export default function Metadata({
  metadata,
}: {
  metadata: Route["metadata"];
}) {
  function secondsToTime(e:number){
    const h = Math.floor(e / 3600).toString().padStart(2,'0'),
          m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
          s = Math.floor(e % 60).toString().padStart(2,'0');
    if(h==='00'){
      return m + ':' + s;
    } 
    return h + ':' + m + ':' + s;
}
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
         {secondsToTime(metadata.time)}
        </p>
      </div>
    </div>
  );
}
