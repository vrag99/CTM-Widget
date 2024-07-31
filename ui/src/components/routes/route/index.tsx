import { type Route } from "@/lib/types";
import Metadata from "./metadata";
import Path from "./path";

interface SwapRouteProps {
  route: Route;
  selected: boolean;
  index: number;
  setSelectedRouteIndex: (index: number) => void;
}

export default function SwapRoute({
  route,
  selected,
  index,
  setSelectedRouteIndex,
}: SwapRouteProps) {
  return (
    <div
      className={`flex flex-col w-full gap-4 border cursor-pointer rounded-md pt-3 px-3 pb-2 transition-all duration-300 ${
        selected && "border-primary cursor-auto"
      }`}
      onClick={() => setSelectedRouteIndex(index)}
    >
      <Metadata metadata={route.metadata} />
      <Path path={route.path} />
    </div>
  );
}
