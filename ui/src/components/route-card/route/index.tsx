import { type Route } from "@/lib/types";
import Metadata from "./metadata";
import Path from "./path";

export default function SwapRoute({ route }: { route: Route }) {
  return (
    <div className="flex flex-col w-full gap-4 border rounded-md py-2 px-3">
      <Metadata metadata={route.metadata} />
      <Path path={route.path} />
    </div>
  );
}
